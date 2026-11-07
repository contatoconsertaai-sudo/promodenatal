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
    <section style={{ maxWidth: '1240px', margin: '48px auto', padding: '0 16px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'center',
          background: '#ffffff',
          borderRadius: '24px',
          padding: '40px 32px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
        }}
      >
        {/* Texto Sobre Nós */}
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Menos tela, mais mundo para brincar
          </span>
          <h2 style={{ fontSize: '1.7rem', fontWeight: 900, color: '#0f172a', margin: '8px 0 16px' }}>
            Um Pouco Sobre Nós
          </h2>
          <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '16px' }}>
            Na <strong>Brinkids Store</strong>, acreditamos no poder do brincar verdadeiro. Oferecemos brinquedos que despertam a imaginação, incentivam a criatividade e proporcionam momentos de conexão genuína sem precisar de telas digitais.
          </p>
          <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>
            Cada produto é testado e selecionado por pedagogos e especialistas em infância para garantir segurança absoluta, desenvolvimento sensorial e muita diversão em família!
          </p>
        </div>

        {/* Caixa de Newsletter / Cupom */}
        <div
          style={{
            background: '#f8fafc',
            border: '2px dashed #0284c7',
            borderRadius: '20px',
            padding: '30px 24px',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '2.4rem', marginBottom: '8px' }}>🎁</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
            Receba Nossas Promoções
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 16px' }}>
            Cadastre seu e-mail e receba o cupom exclusivo de <strong>10% OFF</strong> para sua primeira compra!
          </p>

          {subscribed ? (
            <div style={{ background: '#dcfce7', color: '#15803d', padding: '12px', borderRadius: '10px', fontWeight: 700, fontSize: '0.88rem' }}>
              🎉 Parabéns! Use o cupom <strong>BLACK10</strong> no checkout!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px', maxWidth: '380px', margin: '0 auto' }}>
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
                  border: '1px solid #cbd5e1',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Quero!
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

