const tiktokService = require('./services/tiktok.service');

async function testTikTokAPI() {
    console.log('--- Testando TikTok Events API (Server-Side) ---');
    console.log('Pixel ID:', tiktokService.pixelId);
    console.log('Access Token:', tiktokService.accessToken.slice(0, 8) + '...' + tiktokService.accessToken.slice(-8));

    const result = await tiktokService.trackEvent({
        eventName: 'ViewContent',
        eventId: `test_${Date.now()}`,
        client: {
            email: 'cliente.teste@exemplo.com',
            phone: '11999998888'
        },
        clientIp: '187.100.50.10',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Teste/1.0',
        value: 99.90
    });

    console.log('Resultado da API do TikTok:', JSON.stringify(result, null, 2));
}

testTikTokAPI();

