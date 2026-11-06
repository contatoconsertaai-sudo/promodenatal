const axios = require('axios');
const crypto = require('crypto');

class TikTokEventsService {
    constructor() {
        this.pixelId = (process.env.TIKTOK_PIXEL_ID || 'DBMJV8JC77UFMFQAB2G0').trim();
        this.accessToken = (process.env.TIKTOK_ACCESS_TOKEN || 'a7d1c7845083ce990b4f4de74ffe0513c1263cb5').trim();
        this.apiUrl = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';
    }

    getConfig() {
        const clean = (val) => val ? String(val).trim().replace(/^["']|["']$/g, '') : '';
        return {
            pixelId: clean(process.env.TIKTOK_PIXEL_ID) || this.pixelId,
            accessToken: clean(process.env.TIKTOK_ACCESS_TOKEN) || this.accessToken
        };
    }

    /**
     * Gera hash SHA-256 padronizado para dados do usuário (email/telefone)
     */
    hashData(value) {
        if (!value) return undefined;
        const normalized = String(value).trim().toLowerCase();
        return crypto.createHash('sha256').update(normalized).digest('hex');
    }

    /**
     * Envia evento para a API de Eventos do TikTok (Server-Side)
     * @param {Object} params
     * @param {string} params.eventName - ViewContent | InitiateCheckout | CompletePayment
     * @param {string} [params.eventId] - ID único para deduplicação com o Pixel Web
     * @param {Object} [params.client] - { email, phone, name }
     * @param {string} [params.clientIp] - IP do usuário
     * @param {string} [params.userAgent] - User-Agent do navegador
     * @param {number} [params.value=99.90] - Valor do evento
     * @param {string} [params.currency='BRL']
     */
    async trackEvent({ eventName, eventId, client = {}, clientIp, userAgent, value = 99.90, currency = 'BRL' }) {
        const config = this.getConfig();

        if (!config.pixelId || !config.accessToken) {
            console.warn('[TikTok API] Pixel ID ou Access Token não configurados. Evento ignorado.');
            return null;
        }

        const nowSeconds = Math.floor(Date.now() / 1000);
        const uniqueEventId = eventId || `tt_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

        // Formata e criptografa telefone (deve ser no formato E.164 ou apenas números)
        let hashedPhone = undefined;
        if (client.phone) {
            const rawPhone = client.phone.replace(/\D/g, '');
            // Se não tiver código de país do Brasil (55), adiciona
            const formattedPhone = rawPhone.startsWith('55') ? rawPhone : `55${rawPhone}`;
            hashedPhone = this.hashData(formattedPhone);
        }

        const hashedEmail = client.email ? this.hashData(client.email) : undefined;

        const payload = {
            event_source: 'web',
            event_source_id: config.pixelId,
            data: [
                {
                    event: eventName,
                    event_time: nowSeconds,
                    event_id: uniqueEventId,
                    user: {
                        ...(hashedEmail && { email: hashedEmail }),
                        ...(hashedPhone && { phone: hashedPhone }),
                        ...(clientIp && { ip: clientIp }),
                        ...(userAgent && { user_agent: userAgent })
                    },
                    properties: {
                        currency: currency,
                        value: Number(value),
                        content_type: 'product',
                        contents: [
                            {
                                content_id: 'smartpet-dogbot-99',
                                content_type: 'product',
                                content_name: 'Cachorro Robô Inteligente Smart Pet Dogbot - Promoção de Natal',
                                quantity: 1,
                                price: Number(value)
                            }
                        ]
                    }
                }
            ]
        };

        try {
            const response = await axios.post(this.apiUrl, payload, {
                headers: {
                    'Access-Token': config.accessToken,
                    'Content-Type': 'application/json'
                },
                timeout: 8000
            });

            console.log(`[TikTok Events API] Evento "${eventName}" enviado com sucesso! Status:`, response.data?.code, response.data?.message || 'OK');
            return response.data;
        } catch (error) {
            console.error(`[TikTok Events API Error] Falha ao enviar evento "${eventName}":`, error.response?.data || error.message);
            return null;
        }
    }
}

module.exports = new TikTokEventsService();
