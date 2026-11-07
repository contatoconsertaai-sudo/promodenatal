import React from 'react';

export default function WhyBuyWithUs() {
  const pillars = [
    {
      icon: '🛡️',
      title: 'Qualidade Impecável',
      desc: 'Materiais 100% atóxicos, livres de BPA e resistentes a quedas. Brinquedos feitos para durar.'
    },
    {
      icon: '💰',
      title: 'Melhor Custo-Benefício',
      desc: 'Promoções reais de Black Friday com descontos no Pix e kits especiais como Pague 2 Leve 4.'
    },
    {
      icon: '💬',
      title: 'Atendimento Humanizado',
      desc: 'Suporte ágil via WhatsApp antes, durante e após a compra com rastreamento oficial.'
    },
    {
      icon: '⭐',
      title: 'Garantia Incondicional',
      desc: 'Satisfação garantida ou seu dinheiro de volta em até 30 dias após o recebimento.'
    }
  ];

  return (
    <section style={{ maxWidth: '1240px', margin: '48px auto', padding: '0 16px' }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #0284c7, #0369a1)',
          borderRadius: '24px',
          padding: '40px 24px',
          color: '#ffffff',
          textAlign: 'center'
        }}
      >
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 12px' }}>
          Por Que Comprar Conosco?
        </h2>
        <p style={{ maxWidth: '720px', margin: '0 auto 36px', fontSize: '0.95rem', opacity: 0.95, lineHeight: 1.6 }}>
          Porque aqui, a diversão é de verdade! Nossos brinquedos despertam a imaginação, promovem a interação e criam memórias inesquecíveis sem depender de telas de celular e tablet.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '20px',
            textAlign: 'left'
          }}
        >
          {pillars.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
                borderRadius: '16px',
                padding: '24px 20px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 8px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.85rem', margin: 0, opacity: 0.9, lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

