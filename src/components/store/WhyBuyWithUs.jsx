import React from 'react';

export default function WhyBuyWithUs() {
  const pillars = [
    {
      icon: '🛡️',
      title: 'Qualidade Impecável',
      desc: 'Materiais 100% atóxicos, livres de BPA e resistentes a quedas. Presentes de Natal feitos para durar.'
    },
    {
      icon: '🎄',
      title: 'Especial de Natal no Pix',
      desc: 'Promoções reais com até 52% OFF no Pix via SyncPay e kits especiais como Pague 2 Leve 4.'
    },
    {
      icon: '🤖',
      title: 'Consultoria IA Brinkids',
      desc: 'Assistente Inteligente Bia disponível 24h no site para indicar o presente ideal para cada idade.'
    },
    {
      icon: '⭐',
      title: 'Garantia Incondicional',
      desc: 'Satisfação garantida ou seu dinheiro de volta em até 30 dias após o recebimento.'
    }
  ];

  return (
    <section style={{ maxWidth: '1260px', margin: '48px auto', padding: '0 16px' }}>
      <div
        className="why-buy-container"
        style={{
          background: 'linear-gradient(135deg, #7f1d1d 0%, #dc2626 50%, #991b1b 100%)',
          borderRadius: '24px',
          padding: '42px 24px',
          color: '#ffffff',
          textAlign: 'center',
          border: '2px solid #fde047',
          boxShadow: '0 15px 35px rgba(153, 27, 27, 0.2)'
        }}
      >
        <span style={{ background: '#fde047', color: '#991b1b', fontSize: '0.75rem', fontWeight: 900, padding: '4px 12px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px' }}>
          🎅 NATAL BRINKIDS 2026
        </span>
        <h2 className="section-heading-responsive" style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 12px' }}>
          Por Que Comprar na Brinkids Neste Natal?
        </h2>
        <p style={{ maxWidth: '720px', margin: '0 auto 36px', fontSize: '0.95rem', opacity: 0.95, lineHeight: 1.6 }}>
          Porque aqui a magia do Natal é de verdade! Nossos brinquedos despertam a imaginação, promovem a união da família e criam memórias inesquecíveis longe das telas.
        </p>

        <div className="why-pillars-grid">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.13)',
                backdropFilter: 'blur(8px)',
                borderRadius: '16px',
                padding: '24px 20px',
                border: '1px solid rgba(253, 224, 71, 0.35)'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 8px', color: '#fde047' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.85rem', margin: 0, opacity: 0.95, lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
