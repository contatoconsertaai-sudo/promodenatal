const API_BASE_URL = '/api';

/**
 * Envia os dados do cliente, endereço de entrega e produto para o backend Node.js gerar a cobrança Pix via SyncPay
 */
export async function createPixOrder({ amount, description, client, address }) {
  const response = await fetch(`${API_BASE_URL}/payment/pix`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ amount, description, client, address })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Erro ao gerar cobrança Pix na SyncPay');
  }

  return data; // { identifier, pixCode, qrCodeImage, trackingCode, status }
}

/**
 * Consulta status do pagamento e dados do rastreio (polling em tempo real)
 */
export async function checkPaymentStatus(identifier) {
  const response = await fetch(`${API_BASE_URL}/payment/status/${identifier}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Erro ao consultar status');
  }
  return data; // { identifier, status, paidAt, trackingCode, client, address, amount }
}

/**
 * Dispara uma chamada real para o endpoint POST /api/webhook/syncpay simulando a confirmação do banco
 */
export async function simulateWebhookPayment(identifier, amount = 99.90) {
  const response = await fetch(`${API_BASE_URL}/webhook/syncpay`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      event: 'cashin.updated',
      identifier,
      status: 'paid',
      amount,
      paid_at: new Date().toISOString()
    })
  });

  return response.json();
}
