import React, { useState } from 'react';

export default function AboutUs() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section style={{ maxWidth: '1260px', margin: '48px auto', padding: '0 16px' }}>
      <div
        className="about-us-card"
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '40px 32px',
          border: '1.5px solid #fecaca',
          boxShadow: '0 6px 20px rgba(185, 28, 28, 0.05)'
        }}
      >
        {/* Texto Sobre Nós */}
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '1px' }}>
            🎄 Menos tela, mais magia neste Natal
          </span>
          <h2 className="section-heading-responsive" style={{ fontSize: '1.7rem', fontWeight: 900, color: '#7f1d1d', margin: '8px 0 16px' }}>
            Um Pouco Sobre a Brinkids
          </h2>
          <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '16px' }}>
            Na <strong>Brinkids Store</strong>, acreditamos no poder do brincar verdadeiro. Oferecemos <strong>brinquedos educativos e produtos infantis</strong> que despertam a imaginação, incentivam a criatividade e proporcionam momentos de conexão genuína sem precisar de telas digitais.
          </p>
          <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>
            Cada item da nossa Campanha de Natal foi selecionado com amor para garantir segurança absoluta, desenvolvimento sensorial e muita alegria em família!
          </p>
        </div>

        {/* Caixa de Newsletter / Ofertas Exclusivas de Natal */}
        <div
          style={{
            background: '#fff1f2',
            border: '2px dashed #dc2626',
            borderRadius: '20px',
            padding: '30px 24px',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🎅🎁</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#7f1d1d', margin: '0 0 6px' }}>
            Ofertas Exclusivas de Natal
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 16px' }}>
            Cadastre seu e-mail para receber novidades e ofertas relâmpago da Brinkids com até <strong>52% OFF no Pix</strong>!
          </p>

          {subscribed ? (
            <div style={{ background: '#dcfce7', color: '#15803d', padding: '12px', borderRadius: '10px', fontWeight: 800, fontSize: '0.88rem' }}>
              🎉 Cadastro confirmado! Aproveite todas as ofertas de Natal com desconto imediato no Pix!
            </div>
          ) : (
            <form className="newsletter-form-responsive" onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px', maxWidth: '380px', margin: '0 auto' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu melhor e-mail"
                required
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #fca5a5',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #dc2626, #991b1b)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Cadastrar
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
