const axios = require('axios');

class SyncPayService {
    constructor() {
        // Cache em memória do token para otimizar requisições
        this.cachedToken = null;
        this.tokenExpiresAt = 0;
    }

    /**
     * Recupera as configurações dinamicamente tratando espaços e aspas
     */
    getConfig() {
        const clean = (val) => val ? String(val).trim().replace(/^["']|["']$/g, '') : '';
        return {
            baseUrl: clean(process.env.SYNCPAY_BASE_URL) || 'https://api.syncpayments.com.br',
            clientId: clean(process.env.SYNCPAY_CLIENT_ID),
            clientSecret: clean(process.env.SYNCPAY_CLIENT_SECRET),
            webhookUrl: clean(process.env.SYNCPAY_WEBHOOK_URL)
        };
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

        const config = this.getConfig();

        if (!config.clientId || !config.clientSecret) {
            console.error('[SyncPay Config Error] SYNCPAY_CLIENT_ID ou SYNCPAY_CLIENT_SECRET não configurados!');
            throw new Error('Credenciais da SyncPay não configuradas nas Variáveis de Ambiente do Render (Configure SYNCPAY_CLIENT_ID e SYNCPAY_CLIENT_SECRET na aba Environment da Render)');
        }

        try {
            const response = await axios.post(`${config.baseUrl}/api/partner/v1/auth-token`, {
                client_id: config.clientId,
                client_secret: config.clientSecret
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                timeout: 15000
            });

            const data = response.data;
            this.cachedToken = data.access_token;
            // expires_in geralmente é 3600 segundos (1 hora)
            const expiresInMs = (data.expires_in || 3600) * 1000;
            this.tokenExpiresAt = now + expiresInMs;

            return this.cachedToken;
        } catch (error) {
            const apiMsg = error.response?.data?.message || error.response?.data?.error || (typeof error.response?.data === 'string' ? error.response.data : error.message);
            console.error('[SyncPay] Erro ao autenticar:', error.response?.data || error.message);
            throw new Error(`Falha na autenticação com a SyncPay (${apiMsg})`);
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
        const config = this.getConfig();

        try {
            const payload = {
                amount: Number(amount),
                description: description || 'Presente de Natal - Cachorro Robô Inteligente Smart Pet Dogbot',
                webhook_url: config.webhookUrl || undefined,
                client: {
                    name: client.name,
                    cpf: client.cpf.replace(/\D/g, ''), // apenas números
                    email: client.email,
                    phone: client.phone ? client.phone.replace(/\D/g, '') : undefined
                }
            };

            const response = await axios.post(`${config.baseUrl}/api/partner/v1/cash-in`, payload, {
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

