import React from 'react';

export default function HeroBanner() {
  return (
    <section className="hero-banner-section" style={{ width: '100%', background: '#f8fafc' }}>
      {/* Imagem do Banner - Desktop e Mobile Responsivos */}
      <div style={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="https://brinkidstore.com/cdn/shop/files/black-friday-tipografia-celular-compacta-1080x640.jpg?v=1793405305&width=1080"
          />
          <img
            src="https://brinkidstore.com/cdn/shop/files/banner-desktop-composto-1920x720.jpg?v=1793406821&width=1920"
            alt="Brinkids Store - Ofertas Especiais Black Friday"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '480px',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </picture>
      </div>

      {/* Selos de Confiança (Barra de Destaques) */}
      <div
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '16px 20px'
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.6rem' }}>🚚</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>Frete Grátis Brasil</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Em todos os brinquedos</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.6rem' }}>⚡</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>Rastreio Imediato</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Código liberado na hora</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.6rem' }}>🔒</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>Compra 100% Segura</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Processada via SyncPay</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.6rem' }}>🛡️</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>Garantia de 30 Dias</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Devolução sem burocracia</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

