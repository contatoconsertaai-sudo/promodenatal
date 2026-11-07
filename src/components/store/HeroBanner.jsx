import React from 'react';

export default function HeroBanner() {
  return (
    <section className="hero-banner-section" style={{ width: '100%', background: '#fffafa' }}>
      {/* Imagem do Banner Oficial Brinkids */}
      <div style={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="https://brinkidstore.com/cdn/shop/files/black-friday-tipografia-celular-compacta-1080x640.jpg?v=1793405305&width=1080"
          />
          <img
            src="https://brinkidstore.com/cdn/shop/files/banner-desktop-composto-1920x720.jpg?v=1793406821&width=1920"
            alt="Brinkids Store - Promoção Especial de Natal"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '480px',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </picture>

        {/* Faixa de Destaque Campanha de Natal Brinkids */}
        <div className="hero-xmas-strip">
          <span>🎄 ESPECIAL DE NATAL BRINKIDS:</span>
          <span style={{ color: '#fde047' }}>PRESENTES EDUCATIVOS COM ATÉ 52% OFF NO PIX</span>
          <span className="store-top-bar-extra">• 🎁 Envio Imediato com Rastreio Correios!</span>
        </div>
      </div>

      {/* Selos de Confiança Natalinos Responsivos (4 cols Desktop / 2x2 Mobile) */}
      <div
        className="trust-badges-wrapper"
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #fecaca',
          padding: '16px 16px'
        }}
      >
        <div className="trust-badges-grid">
          <div className="trust-badge-card" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff1f2', padding: '12px 14px', borderRadius: '12px', border: '1px solid #fecdd3' }}>
            <span className="trust-badge-icon" style={{ fontSize: '1.6rem', flexShrink: 0 }}>🎅</span>
            <div>
              <div className="trust-badge-title" style={{ fontWeight: 900, fontSize: '0.84rem', color: '#991b1b' }}>Frete Grátis Natal</div>
              <div className="trust-badge-sub" style={{ fontSize: '0.73rem', color: '#64748b' }}>Para todo o Brasil</div>
            </div>
          </div>

          <div className="trust-badge-card" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f0fdf4', padding: '12px 14px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
            <span className="trust-badge-icon" style={{ fontSize: '1.6rem', flexShrink: 0 }}>⚡</span>
            <div>
              <div className="trust-badge-title" style={{ fontWeight: 900, fontSize: '0.84rem', color: '#166534' }}>Rastreio na Hora</div>
              <div className="trust-badge-sub" style={{ fontSize: '0.73rem', color: '#64748b' }}>Liberado pós-Pix</div>
            </div>
          </div>

          <div className="trust-badge-card" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fefce8', padding: '12px 14px', borderRadius: '12px', border: '1px solid #fef08a' }}>
            <span className="trust-badge-icon" style={{ fontSize: '1.6rem', flexShrink: 0 }}>🔒</span>
            <div>
              <div className="trust-badge-title" style={{ fontWeight: 900, fontSize: '0.84rem', color: '#854d0e' }}>Compra 100% Segura</div>
              <div className="trust-badge-sub" style={{ fontSize: '0.73rem', color: '#64748b' }}>Via SyncPay Oficial</div>
            </div>
          </div>

          <div className="trust-badge-card" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff1f2', padding: '12px 14px', borderRadius: '12px', border: '1px solid #fecdd3' }}>
            <span className="trust-badge-icon" style={{ fontSize: '1.6rem', flexShrink: 0 }}>🛡️</span>
            <div>
              <div className="trust-badge-title" style={{ fontWeight: 900, fontSize: '0.84rem', color: '#991b1b' }}>Garantia 30 Dias</div>
              <div className="trust-badge-sub" style={{ fontSize: '0.73rem', color: '#64748b' }}>+19 mil famílias</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
