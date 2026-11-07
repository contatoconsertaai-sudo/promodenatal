import React from 'react';

const TESTIMONIALS = [
  {
    productTag: 'Livro Falante Bilíngue',
    image: 'https://brinkidstore.com/cdn/shop/files/WhatsApp_Image_2026-09-10_at_23.02.39_600x600_crop_center.jpg?v=8184200173312627158',
    stars: 5,
    quote: 'Minha filha simplesmente amou! Ela fica horas brincando e aprendendo os nomes dos animais em português e inglês. Foi uma ótima compra.',
    author: 'Rafael Silva',
    city: 'São Paulo, SP'
  },
  {
    productTag: 'Câmera Infantil',
    image: 'https://brinkidstore.com/cdn/shop/files/avaliacao-camera_5_600x600_crop_center.jpg?v=8583358264578830406',
    stars: 5,
    quote: 'Chegou antes do esperado! A máquina é ótima, bem levinha, é brinquedo mesmo, mas funciona maravilhosamente bem!',
    author: 'Eliseu Bittencourt',
    city: 'Curitiba, PR'
  },
  {
    productTag: 'Livro Falante',
    image: 'https://brinkidstore.com/cdn/shop/files/WhatsApp_Image_2026-09-10_at_23.25.53_600x600_crop_center.jpg?v=9343295395140412995',
    stars: 5,
    quote: 'Meu sobrinho larga o tablet pra brincar com o livro. Melhor presente que já dei.',
    author: 'Marta L.',
    city: 'Belo Horizonte, MG'
  },
  {
    productTag: 'Caranguejo Fujão',
    image: 'https://brinkidstore.com/cdn/shop/files/avaliacao-caranguejo_3_600x600_crop_center.jpg?v=14025838753093456664',
    stars: 5,
    quote: 'Esse é o verdadeiro caranguejo fujão, produto maravilhoso. E tem o modo silencioso.',
    author: 'Helena Godinho',
    city: 'Rio de Janeiro, RJ'
  },
  {
    productTag: 'Livro Falante',
    image: 'https://brinkidstore.com/cdn/shop/files/WhatsApp_Image_2026-09-10_at_23.25.54_600x600_crop_center.jpg?v=4168492157905129859',
    stars: 5,
    quote: 'Entrega rápida e o material é bem resistente, já caiu no chão várias vezes e nada quebrou.',
    author: 'Fernanda Oliveira',
    city: 'Campinas, SP'
  },
  {
    productTag: 'Patinho Dançante',
    image: 'https://brinkidstore.com/cdn/shop/files/avaliacao-patinho_600x600_crop_center.jpg?v=4525517242453164036',
    stars: 5,
    quote: 'Produto fiel ao anúncio. Chegou antes do prazo. Aqui em casa foi um sucesso! Super recomendo.',
    author: 'Rafa Gouveia',
    city: 'Porto Alegre, RS'
  }
];

export default function Testimonials() {
  return (
    <section style={{ maxWidth: '1240px', margin: '40px auto', padding: '0 16px' }}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>
          Quem comprou, aprovou
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ color: '#eab308', fontSize: '1.1rem', letterSpacing: '2px' }}>★★★★★</span>
          <span style={{ fontSize: '0.9rem', color: '#475569' }}>
            <strong style={{ color: '#0f172a' }}>+19 mil famílias</strong> já compraram na Brinkids
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px'
        }}
      >
        {TESTIMONIALS.map((t, idx) => (
          <div
            key={idx}
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', gap: '16px' }}>
              <img
                src={t.image}
                alt={t.author}
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  flexShrink: 0,
                  border: '1px solid #e2e8f0'
                }}
                loading="lazy"
              />
              <div style={{ flexGrow: 1 }}>
                <span
                  style={{
                    background: '#e0f2fe',
                    color: '#0369a1',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    display: 'inline-block',
                    marginBottom: '6px'
                  }}
                >
                  {t.productTag}
                </span>
                <div style={{ color: '#eab308', fontSize: '0.82rem', letterSpacing: '1px' }}>
                  ★★★★★
                </div>
                <div style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 700, marginTop: '2px' }}>
                  ✓ Compra Verificada
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>
              “{t.quote}”
            </p>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>
                {t.author}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                {t.city}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

