import React, { useState, useEffect } from 'react';

export default function OrderTrackingPage({ orderData, onBackToStore }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!orderData) return null;

  const {
    identifier,
    trackingCode = 'XP849201745BR',
    client = {},
    address = {},
    amount = 99.90,
    paidAt
  } = orderData;

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(trackingCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const formattedDate = paidAt
    ? new Date(paidAt).toLocaleString('pt-BR')
    : new Date().toLocaleString('pt-BR');

  return (
    <div className="tracking-page-wrapper">
      {/* Topo da Página de Rastreio */}
      <div className="timer-bar xmas-bar">
        <span>✅ PAGAMENTO PIX CONFIRMADO COM SUCESSO — SEU PEDIDO DE NATAL JÁ ESTÁ EM SEPARAÇÃO!</span>
      </div>

      <header>
        <div className="header-inner">
          <div className="logo">
            🤖 SMART<span>PET</span> BRASIL <span className="xmas-header-pill">📦 Central de Rastreio</span>
          </div>
          <div className="header-badges">
            <span>🔒 Comprovante Oficial SyncPay</span>
          </div>
        </div>
      </header>

      <main className="tracking-main-container">
        {/* Card Hero do Código de Rastreio */}
        <div className="tracking-hero-card">
          <div className="tracking-check-badge">🎉</div>
          <span className="tracking-status-pill">PAGAMENTO PIX APROVADO • ENVIO EXPRESSO LIBERADO</span>
          <h1>Aqui Está o Seu Código de Rastreio!</h1>
          <p className="tracking-subtitle">
            Olá, <strong>{client.name}</strong>! Seu pagamento de <strong>R$ {Number(amount).toFixed(2).replace('.', ',')}</strong> via PIX foi confirmado. Guarde e acompanhe seu código de rastreio abaixo:
          </p>

          {/* Caixa Destacada do Código de Rastreio */}
          <div className="tracking-code-box">
            <span className="tracking-code-label">CÓDIGO DE RASTREIO OFICIAL (CORREIOS / EXPRESSO):</span>
            <div className="tracking-code-number">{trackingCode}</div>
            <button
              type="button"
              className="btn-copy-tracking"
              onClick={handleCopyTracking}
              style={{ background: copied ? '#059669' : '#0f172a' }}
            >
              {copied ? '✅ CÓDIGO DE RASTREIO COPIADO!' : '📋 COPIAR CÓDIGO DE RASTREIO'}
            </button>
          </div>

          <div className="tracking-alert-info">
            💡 <strong>Importante:</strong> Uma cópia deste código de rastreio e da sua Nota Fiscal também foi enviada para o seu e-mail (<strong>{client.email}</strong>) e WhatsApp (<strong>{client.phone || 'cadastrado'}</strong>).
          </div>
        </div>

        {/* Grid de Detalhes: Linha do Tempo + Endereço de Entrega */}
        <div className="tracking-details-grid">
          {/* Coluna 1: Linha do Tempo de Rastreamento */}
          <div className="tracking-card">
            <h3>🚚 Status da Remessa em Tempo Real</h3>
            <div className="tracking-timeline">
              <div className="timeline-step done">
                <div className="timeline-dot">✓</div>
                <div className="timeline-info">
                  <strong>Pagamento PIX Confirmado (R$ 99,90)</strong>
                  <span>Aprovado via Gateway SyncPay • {formattedDate}</span>
                </div>
              </div>

              <div className="timeline-step done">
                <div className="timeline-dot">✓</div>
                <div className="timeline-info">
                  <strong>Código de Rastreio & Etiqueta Emitidos</strong>
                  <span>Objeto registrado sob código <strong>{trackingCode}</strong></span>
                </div>
              </div>

              <div className="timeline-step current">
                <div className="timeline-dot pulse">📦</div>
                <div className="timeline-info">
                  <strong>Em Separação Prioritária — Lote de Natal</strong>
                  <span>Seu Smart Pet Dogbot na Caixa Original está sendo embalado para despacho expresso.</span>
                </div>
              </div>

              <div className="timeline-step pending">
                <div className="timeline-dot">🚚</div>
                <div className="timeline-info">
                  <strong>Em Trânsito para {address.city} - {address.state}</strong>
                  <span>Previsão de entrega: 7 a 14 dias úteis (Garantido antes do Natal!)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 2: Dados do Destinatário e Endereço */}
          <div className="tracking-card">
            <h3>📍 Endereço de Entrega Confirmado</h3>
            <div className="address-summary-box">
              <div className="address-line">
                <span>Destinatário:</span>
                <strong>{client.name}</strong>
              </div>
              <div className="address-line">
                <span>CPF:</span>
                <strong>{client.cpf}</strong>
              </div>
              <div className="address-line">
                <span>Endereço:</span>
                <strong>
                  {address.street}, Nº {address.number}
                  {address.complement ? ` (${address.complement})` : ''}
                </strong>
              </div>
              <div className="address-line">
                <span>Bairro:</span>
                <strong>{address.neighborhood || 'Centro'}</strong>
              </div>
              <div className="address-line">
                <span>Cidade / UF:</span>
                <strong>{address.city} / {address.state}</strong>
              </div>
              <div className="address-line">
                <span>CEP:</span>
                <strong>{address.cep}</strong>
              </div>
              <div className="address-line">
                <span>ID da Transação:</span>
                <strong style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{identifier}</strong>
              </div>
            </div>

            {/* Resumo do Produto */}
            <div className="modal-product-summary" style={{ marginTop: '18px' }}>
              <img src="/img/foto-real-cliente-dogbot.jpg" alt="Smart Pet Dogbot" />
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>
                  1x Cachorro Robô Smart Pet Dogbot Colorido
                </div>
                <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700 }}>
                  Pago via PIX: R$ 99,90 • Frete Grátis Expresso
                </div>
              </div>
            </div>

            <div className="tracking-actions">
              <button type="button" className="btn-print-receipt" onClick={() => window.print()}>
                🖨️ Imprimir / Salvar Comprovante e Rastreio
              </button>
              <button type="button" className="btn-back-store" onClick={onBackToStore}>
                ← Voltar para a Página do Produto
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

