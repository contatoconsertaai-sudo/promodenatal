const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const syncpayService = require('./services/syncpay.service');

async function testConnection() {
    console.log('--- TESTANDO CONEXÃO COM SYNCPAY ---');
    console.log('Base URL:', process.env.SYNCPAY_BASE_URL);
    console.log('Client ID:', process.env.SYNCPAY_CLIENT_ID ? process.env.SYNCPAY_CLIENT_ID.substring(0, 8) + '...' : 'NÃO CONFIGURADO');

    try {
        console.log('\n1. Solicitando Auth Token...');
        const token = await syncpayService.getAccessToken();
        console.log('✅ Token obtido com sucesso! Formato:', token ? token.substring(0, 15) + '...' : 'Vazio');

        console.log('\n2. Testando criação de Cash-In Pix (teste de R$ 1,00)...');
        const pixResult = await syncpayService.createCashIn({
            amount: 1.00,
            description: 'Teste de Integração SyncPay',
            client: {
                name: 'Cliente Teste',
                cpf: '12345678909',
                email: 'teste@email.com',
                phone: '11999998888'
            }
        });

        console.log('✅ Cash-In Pix gerado com sucesso!');
        console.log('Resultado:', JSON.stringify(pixResult, null, 2));
    } catch (err) {
        console.error('❌ Falha no teste:', err.message);
        if (err.response) {
            console.error('Status Code:', err.response.status);
            console.error('Data:', err.response.data);
        }
    }
}

testConnection();

