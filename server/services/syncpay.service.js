const axios = require('axios');

class SyncPayService {
    constructor() {
        this.baseUrl = process.env.SYNCPAY_BASE_URL || 'https://api.syncpayments.com.br';
        this.clientId = process.env.SYNCPAY_CLIENT_ID;
        this.clientSecret = process.env.SYNCPAY_CLIENT_SECRET;
        this.webhookUrl = process.env.SYNCPAY_WEBHOOK_URL;

        // Cache em memória do token para otimizar requisições
        this.cachedToken = null;
        this.tokenExpiresAt = 0;
    }

    /**
     * Obtém ou renova o Bearer Token na API da SyncPay
     */
    async getAccessToken() {
        const now = Date.now();
        // Reutiliza o token em cache se ainda for válido com margem de segurança de 2 minutos
        if (this.cachedToken && this.tokenExpiresAt > now + 120000) {
            return this.cachedToken;
        }

        try {
            const response = await axios.post(`${this.baseUrl}/api/partner/v1/auth-token`, {
                client_id: this.clientId,
                client_secret: this.clientSecret
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                timeout: 10000
            });

            const data = response.data;
            this.cachedToken = data.access_token;
            // expires_in geralmente é 3600 segundos (1 hora)
            const expiresInMs = (data.expires_in || 3600) * 1000;
            this.tokenExpiresAt = now + expiresInMs;

            return this.cachedToken;
        } catch (error) {
            console.error('[SyncPay] Erro ao autenticar:', error.response?.data || error.message);
            throw new Error('Falha na autenticação com a SyncPay');
        }
    }

    /**
     * Gera uma solicitação de Pix Cash-in
     * @param {Object} params
     * @param {number} params.amount - Valor da cobrança (ex: 197.90)
     * @param {string} params.description - Descrição do pedido
     * @param {Object} params.client - Dados do pagador { name, cpf, email, phone }
     */
    async createCashIn({ amount, description, client }) {
        const token = await this.getAccessToken();

        try {
            const payload = {
                amount: Number(amount),
                description: description || 'Pagamento do Pedido',
                webhook_url: this.webhookUrl,
                client: {
                    name: client.name,
                    cpf: client.cpf.replace(/\D/g, ''), // apenas números
                    email: client.email,
                    phone: client.phone ? client.phone.replace(/\D/g, '') : undefined
                }
            };

            const response = await axios.post(`${this.baseUrl}/api/partner/v1/cash-in`, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                timeout: 15000
            });

            return response.data; // { message, pix_code, identifier }
        } catch (error) {
            console.error('[SyncPay] Erro ao criar Cash-In Pix:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Falha ao gerar cobrança Pix');
        }
    }

    /**
     * Consulta o status de uma transação pelo identifier
     * @param {string} identifier
     */
    async getTransactionStatus(identifier) {
        const token = await this.getAccessToken();

        try {
            const response = await axios.get(`${this.baseUrl}/api/partner/v1/transactions/${identifier}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                timeout: 10000
            });

            return response.data;
        } catch (error) {
            console.error(`[SyncPay] Erro ao consultar transação ${identifier}:`, error.response?.data || error.message);
            throw error;
        }
    }
}

module.exports = new SyncPayService();

