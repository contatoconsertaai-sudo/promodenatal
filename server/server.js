const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const QRCode = require('qrcode');
const syncpayService = require('./services/syncpay.service');

const PORT = process.env.PORT || 3000;
const rootDir = path.resolve(__dirname, '..');

// Banco em memória para acompanhamento em tempo real dos pedidos
const ordersDB = new Map();

/**
 * Gera um código de rastreio padrão Correios/Transportadora Expressa (ex: XP948271645BR)
 */
function generateTrackingCode() {
    const digits = Math.floor(100000000 + Math.random() * 900000000);
    return `XP${digits}BR`;
}

async function startServer() {
    const app = express();

    // Middlewares
    app.use(cors());
    app.use(express.json());

    // Servir pasta de imagens reais do produto (/img) e estáticos
    app.use('/img', express.static(path.join(rootDir, 'img')));
    app.use(express.static(rootDir));

    // Rota explícita da página principal
    app.get('/', (req, res) => {
        res.sendFile(path.join(rootDir, 'index.html'));
    });

    /**
     * Rota para criar cobrança PIX via SyncPay
     * POST /api/payment/pix
     */
    app.post('/api/payment/pix', async (req, res) => {
        try {
            const { amount, description, client, address } = req.body;

            if (!amount || !client || !client.name || !client.cpf) {
                return res.status(400).json({
                    error: 'Dados incompletos: nome, CPF e valor são obrigatórios.'
                });
            }

            if (!address || !address.cep || !address.street || !address.number || !address.city || !address.state) {
                return res.status(400).json({
                    error: 'Endereço incompleto: CEP, Rua, Número, Cidade e Estado são obrigatórios para gerar o rastreio.'
                });
            }

            // 1. Gera a solicitação na SyncPay
            const syncResponse = await syncpayService.createCashIn({
                amount,
                description: description || 'Presente de Natal - Cachorro Robô Inteligente Smart Pet Dogbot',
                client
            });

            // 2. Converte o pix_code (copia e cola) em imagem QR Code Base64
            let qrCodeBase64 = '';
            if (syncResponse.pix_code) {
                qrCodeBase64 = await QRCode.toDataURL(syncResponse.pix_code, {
                    width: 280,
                    margin: 2
                });
            }

            // 3. Gera código de rastreio reservado para o pedido
            const trackingCode = generateTrackingCode();

            // 4. Salva no banco de pedidos interno
            const orderData = {
                identifier: syncResponse.identifier,
                pixCode: syncResponse.pix_code,
                amount,
                client,
                address,
                trackingCode,
                status: 'pending', // pending | paid | cancelled
                createdAt: new Date().toISOString()
            };
            ordersDB.set(syncResponse.identifier, orderData);

            return res.status(201).json({
                success: true,
                identifier: syncResponse.identifier,
                pixCode: syncResponse.pix_code,
                qrCodeImage: qrCodeBase64,
                trackingCode,
                status: 'pending'
            });
        } catch (error) {
            console.error('Erro na rota /api/payment/pix:', error.message);
            return res.status(500).json({
                error: error.message || 'Erro interno ao processar cobrança Pix'
            });
        }
    });

    /**
     * Consulta de status do pagamento (utilizado pelo Frontend para polling)
     * GET /api/payment/status/:identifier
     */
    app.get('/api/payment/status/:identifier', async (req, res) => {
        const { identifier } = req.params;
        const order = ordersDB.get(identifier);

        if (!order) {
            return res.status(404).json({ error: 'Transação não encontrada.' });
        }

        return res.json({
            identifier: order.identifier,
            status: order.status,
            paidAt: order.paidAt || null,
            trackingCode: order.trackingCode,
            client: order.client,
            address: order.address,
            amount: order.amount
        });
    });

    /**
     * Webhook recebido da SyncPay
     * POST /api/webhook/syncpay
     * Nota: Documentação da SyncPay exige resposta em menos de 5 segundos.
     */
    app.post('/api/webhook/syncpay', async (req, res) => {
        res.status(200).json({ received: true });

        try {
            const payload = req.body;
            console.log('[Webhook SyncPay Recebido]:', JSON.stringify(payload, null, 2));

            const identifier = payload.identifier || payload.id;
            const status = payload.status;

            if (identifier && ordersDB.has(identifier)) {
                const order = ordersDB.get(identifier);
                if (status === 'paid' || status === 'completed' || status === 'approved') {
                    order.status = 'paid';
                    order.paidAt = new Date().toISOString();
                    ordersDB.set(identifier, order);
                    console.log(`[Pedido Atualizado]: Pedido ${identifier} PAGO! Rastreio liberado: ${order.trackingCode}`);
                }
            }
        } catch (err) {
            console.error('[Webhook SyncPay] Erro no processamento assíncrono:', err);
        }
    });

    // Servir arquivos no modo Produção ou integrar Vite HMR em Desenvolvimento
    if (process.env.NODE_ENV === 'production') {
        const distDir = path.join(rootDir, 'dist');
        if (fs.existsSync(distDir)) {
            app.use(express.static(distDir));
        }
        app.use(express.static(rootDir));
        app.get('*', (req, res) => {
            const distIndex = path.join(distDir, 'index.html');
            if (fs.existsSync(distIndex)) {
                return res.sendFile(distIndex);
            }
            res.sendFile(path.join(rootDir, 'index.html'));
        });
        console.log('📦 Servindo aplicação em modo de PRODUÇÃO.');
    } else {
        // Integrar Vite (React HMR) em modo desenvolvimento
        try {
            const { createServer: createViteServer } = await import('vite');
            const vite = await createViteServer({
                root: rootDir,
                server: { middlewareMode: true },
                appType: 'spa'
            });
            app.use(vite.middlewares);
            console.log('⚡ Frontend React (Vite HMR) integrado ao servidor Node.js!');
        } catch (viteErr) {
            console.warn('Vite middleware indisponível, servindo página HTML estática:', viteErr.message);
            app.use(express.static(rootDir));
            app.get('*', (req, res) => {
                res.sendFile(path.join(rootDir, 'index.html'));
            });
        }
    }

    const server = app.listen(PORT, () => {
        console.log(`🚀 Aplicação (React + Node.js SyncPay) rodando em: http://localhost:${PORT}`);
        console.log(`🔗 Webhook endpoint: http://localhost:${PORT}/api/webhook/syncpay`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`\n⚠️ ERRO: A porta ${PORT} já está sendo utilizada por outra instância ou processo.`);
            console.error(`👉 Para liberar a porta no Windows, execute no PowerShell:\n   Stop-Process -Id (Get-NetTCPConnection -LocalPort ${PORT}).OwningProcess -Force\n`);
        } else {
            console.error('Erro no servidor:', err);
        }
    });
}

startServer();
