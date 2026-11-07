import React from 'react';

export default function Footer({ onOpenTracking }) {
  return (
    <footer style={{ background: '#0f172a', color: '#94a3b8', paddingTop: '48px', paddingBottom: '36px', marginTop: '64px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 16px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '36px',
            marginBottom: '40px'
          }}
        >
          {/* Coluna 1: Sobre & Logo */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <img
                src="/logo-brinkids.png"
                alt="Brinkids Store"
                style={{ height: '40px', filter: 'brightness(0) invert(1)' }}
                onError={(e) => {
                  e.currentTarget.src = 'https://brinkidstore.com/cdn/shop/files/logo_7dcef3ed-b8c5-4e25-b8b3-626bf9942c2a.png?v=1728847918&width=600';
                }}
              />
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#94a3b8', margin: '0 0 16px' }}>
              Brinquedos educativos e sensoriais para desenvolvimento infantil sem telas. Mais de 19 mil famílias satisfeitas em todo o Brasil.
            </p>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ background: '#1e293b', padding: '6px 10px', borderRadius: '6px', fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700 }}>
                🔒 100% Seguro
              </span>
              <span style={{ background: '#1e293b', padding: '6px 10px', borderRadius: '6px', fontSize: '0.75rem', color: '#4ade80', fontWeight: 700 }}>
                ⚡ Rastreio Correios
              </span>
            </div>
          </div>

          {/* Coluna 2: Navegação & Ajuda */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 800, marginBottom: '14px' }}>
              Dúvidas & Ajuda
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a
                  href="#catalogo-completo"
                  style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.target.style.color = '#38bdf8')}
                  onMouseLeave={(e) => (e.target.style.color = '#94a3b8')}
                >
                  Todas as Ofertas
                </a>
              </li>
              <li>
                <span
                  onClick={onOpenTracking}
                  style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: 700 }}
                >
                  🔍 Rastrear Meu Pedido
                </span>
              </li>
              <li>
                <span style={{ color: '#94a3b8' }}>Prazos de Entrega (7 a 14 dias úteis)</span>
              </li>
              <li>
                <span style={{ color: '#94a3b8' }}>Garantia & Troca Fácil (30 dias)</span>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Atendimento Oficial */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 800, marginBottom: '14px' }}>
              Precisa de Ajuda?
            </h4>
            <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>📱</span>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>WhatsApp Oficial:</div>
                  <a
                    href="https://wa.me/5531972327905"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#4ade80', fontWeight: 800, textDecoration: 'none' }}
                  >
                    (31) 9 7232-7905
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>✉️</span>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>E-mail de Suporte:</div>
                  <a
                    href="mailto:atendimento@brinkidstore.com"
                    style={{ color: '#ffffff', fontWeight: 600, textDecoration: 'none' }}
                  >
                    atendimento@brinkidstore.com
                  </a>
                </div>
              </div>

              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
                Atendimento: Segunda a Sexta, das 09:00 às 18:00
              </div>
            </div>
          </div>

          {/* Coluna 4: Formas de Pagamento & Segurança */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 800, marginBottom: '14px' }}>
              Pagamento 100% Seguro
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0 0 12px', lineHeight: 1.5 }}>
              Processamento instantâneo via Pix com aprovação imediata pelo Banco Central e SyncPay.
            </p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ background: '#1e293b', border: '1px solid #334155', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', color: '#38bdf8', fontWeight: 800 }}>
                ❖ PIX
              </span>
              <span style={{ background: '#1e293b', border: '1px solid #334155', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', color: '#ffffff', fontWeight: 600 }}>
                💳 Cartão
              </span>
              <span style={{ background: '#1e293b', border: '1px solid #334155', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', color: '#ffffff', fontWeight: 600 }}>
                📄 Boleto
              </span>
            </div>
          </div>
        </div>

        {/* Linha Divisória e Copyright */}
        <div
          style={{
            borderTop: '1px solid #1e293b',
            paddingTop: '24px',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: '#64748b'
          }}
        >
          <p style={{ margin: '0 0 6px' }}>
            © 2026 Brinkids Store. Todos os direitos reservados. CNPJ sob regime do Código de Defesa do Consumidor.
          </p>
          <p style={{ margin: 0 }}>
            Tecnologia de pagamentos protegida por criptografia SSL 256-bit e SyncPay Gateway.
          </p>
        </div>
      </div>
    </footer>
  );
}

