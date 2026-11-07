import React, { useState, useEffect } from 'react';
import PixModal from './PixModal';
import CustomerFeedbacks from './CustomerFeedbacks';
import OrderTrackingPage from './OrderTrackingPage';
import SupportChat from './SupportChat';

const PRODUCT_IMAGES = [
  {
    src: '/img/D_NQ_NP_2X_705712-MLA101785533767_122025-F.webp',
    alt: 'Cachorro Robô Inteligente Smart Pet Dogbot + Controle Remoto',
    badge: null
  },
  {
    src: '/img/foto-real-cliente-dogbot.jpg',
    alt: 'Foto Real do Smart Pet Dogbot na Caixa Original AI Robot 2.4GHz',
    badge: '📸 Foto Real'
  },
  {
    src: '/img/D_NQ_NP_2X_619845-MLA101284980262_122025-F.webp',
    alt: 'Diversão em Família com Smart Pet Dogbot',
    badge: null
  },
  {
    src: '/img/D_NQ_NP_2X_787396-MLA101785702473_122025-F.webp',
    alt: 'Alcance de 25m, Programação de Ação e Comandos de Voz',
    badge: null
  },
  {
    src: '/img/D_NQ_NP_2X_947499-MLA101284980250_122025-F.webp',
    alt: 'Smart Chip e Dimensões 31cm x 16cm x 19.5cm',
    badge: null
  }
];

const CITIES = ['São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG', 'Curitiba, PR', 'Campinas, SP', 'Florianópolis, SC', 'Brasília, DF', 'Porto Alegre, RS'];
const NAMES = ['Rodrigo M.', 'Mariana S.', 'Pedro H.', 'Ana Paula', 'Lucas G.', 'Juliana R.', 'Carlos E.', 'Fernanda L.'];

export default function ProductOffer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [selectedImage, setSelectedImage] = useState(PRODUCT_IMAGES[0].src);
  const [timeLeft, setTimeLeft] = useState(899); // 14:59
  const [toast, setToast] = useState(null);
  const [cep, setCep] = useState('');
  const [cepResult, setCepResult] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const product = {
    title: 'Cachorro Robô Inteligente Smart Pet Dogbot Cachorro Colorido',
    subtitle: '🎄 O Presente de Natal #1 de 2026! O pet tecnológico que encanta crianças e adultos com controle por voz, aplicativo Bluetooth e controle remoto.',
    oldPrice: 299.90,
    price: 99.90,
    paymentInfo: 'Pagamento Exclusivo via PIX • Liberação Imediata do Código de Rastreio na Tela',
    imageUrl: PRODUCT_IMAGES[0].src,
    features: [
      '📦 Rastreio Liberado na Hora: Após pagar o PIX, a página com seu Código de Rastreio abre automaticamente!',
      '🎁 Caixa Original Pronta para Presentear: Surpreenda na árvore de Natal com o brinquedo mais desejado do ano!',
      'Acrobacias Realistas: Dança, faz kung fu, patrulha, senta e até "faz xixi" de brincadeira!',
      'Smart Chip + Bluetooth (25m) + Bateria Recarregável USB-C de longa duração.'
    ]
  };

  // Título e SEO dinâmico
  useEffect(() => {
    document.title = '🐶 Smart Pet Dogbot® — Presente de Natal Oficial por R$ 99,90';
  }, []);

  // Timer Regressivo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 899));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Prova Social (Toasts)
  useEffect(() => {
    const triggerToast = () => {
      const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
      const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
      setToast({ name: randomName, city: randomCity });

      setTimeout(() => {
        setToast(null);
      }, 4800);
    };

    const firstTimeout = setTimeout(triggerToast, 3500);
    const interval = setInterval(triggerToast, 14000);
    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, []);

  const handleCheckCep = (e) => {
    e.preventDefault();
    const clean = cep.replace(/\D/g, '');
    if (clean.length < 8) {
      setCepResult({ ok: false, text: 'Digite um CEP válido com 8 dígitos.' });
      return;
    }
    setCepResult({
      ok: true,
      text: `🎄 Frete Grátis Expresso para ${cep}! Código de Rastreio liberado na tela imediatamente após o pagamento PIX.`
    });
  };

  const handleCepInput = (val) => {
    let v = val.replace(/\D/g, '').slice(0, 8);
    if (v.length > 5) v = `${v.slice(0, 5)}-${v.slice(5)}`;
    setCep(v);
  };

  // Se o pagamento foi confirmado, exibe a Página Exclusiva com o Código de Rastreio!
  if (confirmedOrder) {
    return (
      <OrderTrackingPage
        orderData={confirmedOrder}
        onBackToStore={() => setConfirmedOrder(null)}
      />
    );
  }

  return (
    <div className="page-wrapper">
      {/* Barra de Urgência Especial de Natal no Topo */}
      <div className="timer-bar xmas-bar">
        <span>🎄 OFERTA DE NATAL NO PIX POR R$ 99,90 + CÓDIGO DE RASTREIO LIBERADO NA HORA! ENCERRA EM:</span>
        <span className="timer-countdown">{formatTimer(timeLeft)}</span>
      </div>

      {/* Header com Navegação */}
      <header>
        <div className="header-inner">
          <div className="logo">
            🤖 SMART<span>PET</span> BRASIL <span className="xmas-header-pill">🎅 Especial de Natal</span>
          </div>
          <nav className="header-nav">
            <a href="#produto">Oferta de Natal</a>
            <a href="#detalhes">Tecnologia</a>
            <a href="#especificacoes">Ficha Técnica</a>
            <a href="#avaliacoes">Avaliações (348)</a>
          </nav>
          <div className="header-badges">
            <span>📦 Rastreio Imediato</span>
            <span>⚡ Exclusivo via PIX</span>
          </div>
        </div>
      </header>

      {/* Hero Section: Galeria + Detalhes de Compra */}
      <main className="container" id="produto">
        {/* Coluna Esquerda: Galeria Interativa */}
        <div className="gallery-wrapper">
          <div className="badge-floating xmas-badge-float">🎄 #1 Presente de Natal</div>
          <div className="badge-discount-floating">-67% OFF NO PIX</div>

          <div className="main-image-box">
            <img src={selectedImage} alt={product.title} />
          </div>

          <div className="thumbnails-row five-cols">
            {PRODUCT_IMAGES.map((img, idx) => (
              <div
                key={idx}
                className={`thumb-item ${selectedImage === img.src ? 'active' : ''}`}
                onClick={() => setSelectedImage(img.src)}
                style={{ position: 'relative' }}
              >
                <img src={img.src} alt={img.alt} />
                {img.badge && (
                  <span className="thumb-real-badge">{img.badge}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Coluna Direita: Informações e Checkout */}
        <div className="product-details">
          <div className="product-meta-top">
            <span className="tag-category xmas-tag">🎁 O Presente Mais Desejado do Ano</span>
            <a href="#avaliacoes" className="rating-summary" style={{ textDecoration: 'none' }}>
              <span className="stars">★★★★★</span>
              <span>4.9 (348 feedbacks) | +1.200 vendidos</span>
            </a>
          </div>

          <h1>{product.title}</h1>
          <p className="product-subtitle">{product.subtitle}</p>

          {/* Destaque Especial de Natal */}
          <div className="xmas-gift-callout">
            <div className="xmas-gift-icon">🎅</div>
            <div>
              <strong>Liquidação Antecipada de Natal Exclusiva no PIX!</strong> Garanta hoje o presente perfeito na <strong>caixa original colecionável</strong> por apenas <strong>R$ 99,90</strong> com Frete Grátis Expresso!
            </div>
          </div>

          {/* Card de Preço (Apenas PIX) */}
          <div className="price-card">
            <div className="price-row-old">
              <span className="old-price">De R$ {product.oldPrice.toFixed(2).replace('.', ',')}</span>
              <span className="save-pill">ECONOMIZE R$ 200,00 (67% OFF)</span>
            </div>
            <div className="current-price-row">
              <span className="current-price">R$ {product.price.toFixed(2).replace('.', ',')}</span>
              <span className="pix-badge">EXCLUSIVO VIA PIX</span>
            </div>
            <div className="installments" style={{ fontWeight: 700, color: '#0f172a' }}>
              ✓ {product.paymentInfo} + <strong>Frete Grátis Expresso</strong>
            </div>
          </div>

          {/* Aviso em Destaque: Rastreio Abre Automaticamente Após o Pagamento */}
          <div className="tracking-guarantee-banner">
            <div className="tracking-guarantee-icon">📦</div>
            <div>
              <strong>CÓDIGO DE RASTREIO LIBERADO NA HORA!</strong>
              <p>
                Ao clicar em comprar, você informará seu endereço de entrega. <strong>Assim que realizar o pagamento do PIX, uma nova página abrirá automaticamente na sua tela com o seu Código de Rastreio!</strong>
              </p>
            </div>
          </div>

          {/* Barra de Escassez */}
          <div className="stock-box">
            <div className="stock-text">
              <span>🔥 Lote Especial de Natal: 39 pais comprando agora</span>
              <span>Restam apenas 6 unidades!</span>
            </div>
            <div className="stock-bar-bg">
              <div className="stock-bar-fill" style={{ width: '88%' }} />
            </div>
          </div>

          {/* Lista de Benefícios */}
          <ul className="features-list">
            {product.features.map((feat, index) => (
              <li key={index}>{feat}</li>
            ))}
          </ul>

          {/* Simulador de Frete com Feedback Instantâneo */}
          <div className="cep-calculator">
            <form onSubmit={handleCheckCep} className="cep-form">
              <input
                type="text"
                placeholder="Digite seu CEP para entrega de Natal"
                value={cep}
                onChange={(e) => handleCepInput(e.target.value)}
              />
              <button type="submit">Verificar Entrega</button>
            </form>
            {cepResult && (
              <div className={`cep-feedback ${cepResult.ok ? 'ok' : 'err'}`}>
                {cepResult.text}
              </div>
            )}
          </div>

          {/* Botão CTA Principal */}
          <button className="btn-buy" onClick={() => setIsModalOpen(true)}>
            🎄 COMPRAR NO PIX POR R$ 99,90 + RECEBER RASTREIO NA HORA
          </button>

          <div className="trust-badges">
            <div className="trust-item">
              <span>⚡</span>
              <div>Pagamento Único<br /><strong>100% via PIX SyncPay</strong></div>
            </div>
            <div className="trust-item">
              <span>📦</span>
              <div>Página de Rastreio<br /><strong>Abre Após Pagar</strong></div>
            </div>
            <div className="trust-item">
              <span>👶</span>
              <div>Recomendado<br /><strong>a partir de 3 anos</strong></div>
            </div>
          </div>
        </div>
      </main>

      {/* Banner de Natal Emocional */}
      <section className="section-block">
        <div className="xmas-wide-banner">
          <div className="xmas-wide-content">
            <span className="xmas-pill-gold">🎁 O MELHOR PRESENTE DE NATAL DE 2026</span>
            <h2>Pague no PIX e Receba Seu Código de Rastreio Imediatamente na Tela!</h2>
            <p>
              Sem espera e sem burocracia: você preenche seu endereço, realiza o pagamento de <strong>R$ 99,90 via PIX</strong> e nossa plataforma abre automaticamente a página oficial com o seu <strong>Código de Rastreio</strong>!
            </p>
            <button className="btn-buy" onClick={() => setIsModalOpen(true)} style={{ maxWidth: '420px', marginTop: '14px' }}>
              🎅 GARANTIR NO PIX POR R$ 99,90 AGORA
            </button>
          </div>
          <div className="xmas-wide-price-badge">
            <small>VALOR ÚNICO NO PIX</small>
            <strong>R$ 99,90</strong>
            <span>+ Código de Rastreio na Hora</span>
          </div>
        </div>
      </section>

      {/* Seção de Benefícios Visuais */}
      <section className="section-block" id="detalhes">
        <div className="section-header">
          <span className="section-tag">Inovação & Diversão Real</span>
          <h2>Por que o Smart Pet Dogbot é um Presente Inesquecível?</h2>
          <p>Muito mais que um brinquedo: é tecnologia interativa que une diversão, estímulo cognitivo e gargalhadas para toda a família na noite de Natal.</p>
        </div>

        <div className="benefits-cards">
          <div className="benefit-card">
            <div className="benefit-icon">🎮</div>
            <h3>Triplo Modo de Controle</h3>
            <p>Interaja por comandos de voz, controle remoto multifuncional incluso ou diretamente pelo aplicativo no celular via Bluetooth.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🥋</div>
            <h3>Show de Movimentos</h3>
            <p>Com movimentos realistas e expressivos, ele dança, faz kung fu, patrulha e até "faz xixi" de brincadeira!</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💻</div>
            <h3>Programação Inteligente</h3>
            <p>Ideal para estimular o interesse por tecnologia e programação: personalize rotinas e comportamentos exclusivos.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🔌</div>
            <h3>Bateria Recarregável USB-C</h3>
            <p>Equipado com bateria de longa duração e interface moderna USB-C para brincar a noite de Natal inteira!</p>
          </div>
        </div>
      </section>

      {/* Seção Showcase com Imagens Reais */}
      <section className="section-block">
        <div className="showcase-row">
          <div className="showcase-img">
            <img src={PRODUCT_IMAGES[2].src} alt="Família brincando com o Smart Pet Dogbot" />
          </div>
          <div className="showcase-text">
            <span className="section-tag">Presente Para Toda a Família</span>
            <h3>O Pet Tecnológico que Encanta Crianças e Adultos!</h3>
            <p>
              Com controle por voz, aplicativo e controle remoto, este cãozinho interativo responde a comandos, dança, faz kung fu, patrulha e até "faz xixi" de brincadeira – tudo isso com movimentos realistas e expressivos.
            </p>
            <p>
              O presente perfeito para reunir filhos, sobrinhos, netos e adultos em volta da árvore de Natal!
            </p>
            <button className="btn-buy" onClick={() => setIsModalOpen(true)} style={{ maxWidth: '340px' }}>
              🎁 COMPRAR POR R$ 99,90 NO PIX
            </button>
          </div>
        </div>

        <div className="showcase-row reverse">
          <div className="showcase-img">
            <img src={PRODUCT_IMAGES[3].src} alt="25m distância, Programação de Ação e Comandos de Voz" />
          </div>
          <div className="showcase-text">
            <span className="section-tag">Tecnologia de Ponta</span>
            <h3>Comandos de Voz, Programação e Alcance de 25 Metros</h3>
            <p>
              Ideal para estimular o interesse por tecnologia e programação, o robô permite que você personalize rotinas e comportamentos, tornando cada brincadeira única.
            </p>
            <p>
              Equipado com chip inteligente e conexão Bluetooth, oferece respostas rápidas em um alcance de até <strong>25 metros</strong>, sem travamentos.
            </p>
          </div>
        </div>

        <div className="showcase-row">
          <div className="showcase-img">
            <img src={PRODUCT_IMAGES[1].src} alt="Foto Real do Smart Pet Dogbot na Caixa Original" style={{ maxHeight: '420px', objectFit: 'cover' }} />
          </div>
          <div className="showcase-text">
            <span className="section-tag">📸 Foto Real do Produto + Embalagem de Presente</span>
            <h3>Caixa Original AI Robot 2.4GHz Pronta para a Árvore de Natal!</h3>
            <p>
              Receba exatamente o que você vê: o <strong>Smart Pet Dogbot</strong> vem na caixa original ilustrada de fábrica, com estrutura articulada super resistente, olhos em LED de alto brilho e controle remoto exclusivo 2.4GHz!
            </p>
            <p>
              Com <strong>31 cm de comprimento por 19,5 cm de altura</strong>, bateria recarregável e interface USB-C, é um presente imponente que impressiona desde o primeiro olhar.
            </p>
          </div>
        </div>
      </section>

      {/* Ficha Técnica & Aviso Legal */}
      <section className="section-block" id="especificacoes">
        <div className="specs-box">
          <span className="section-tag">Ficha Técnica Oficial</span>
          <h2 style={{ marginBottom: '12px', color: '#0f172a' }}>Especificações do Produto</h2>

          <table className="specs-table">
            <tbody>
              <tr>
                <th>Produto</th>
                <td>Cachorro Robô Inteligente Smart Pet Dogbot Cachorro Colorido</td>
              </tr>
              <tr>
                <th>Embalagem</th>
                <td>Caixa Original AI Robot Colecionável (Ideal para Presente de Natal)</td>
              </tr>
              <tr>
                <th>Forma de Pagamento</th>
                <td>Exclusivo via PIX (R$ 99,90) com Liberação Automática de Rastreio</td>
              </tr>
              <tr>
                <th>Modos de Controle</th>
                <td>Controle por Voz, Aplicativo (Bluetooth) e Controle Remoto 2.4GHz</td>
              </tr>
              <tr>
                <th>Alcance de Resposta</th>
                <td>Até 25 metros sem travamentos (Chip Inteligente)</td>
              </tr>
              <tr>
                <th>Dimensões</th>
                <td>31 cm (Comprimento) × 16 cm (Largura) × 19,5 cm (Altura)</td>
              </tr>
              <tr>
                <th>Alimentação</th>
                <td>Bateria Recarregável com Interface USB-C</td>
              </tr>
            </tbody>
          </table>

          <div className="legal-notice">
            📋 <strong>Aviso legal:</strong> • Recomendado a partir dos 3 anos.
          </div>
        </div>
      </section>

      {/* Seção Profissional de Feedbacks de Clientes */}
      <CustomerFeedbacks />

      {/* Perguntas Frequentes (FAQ) */}
      <section className="section-block">
        <div className="section-header">
          <span className="section-tag">Tire Suas Dúvidas</span>
          <h2>Perguntas Frequentes — Pagamento PIX & Rastreio</h2>
        </div>

        <div className="faq-list">
          {[
            {
              q: 'Como recebo o meu Código de Rastreio após pagar o PIX?',
              a: 'É instantâneo! Ao clicar em Comprar, você preenche seu nome e endereço completo de entrega. Assim que você realizar o pagamento do QR Code PIX de R$ 99,90, a tela reconhece o pagamento automaticamente em poucos segundos e abre a página exclusiva com o seu Código de Rastreio!'
            },
            {
              q: 'Quais são as formas de pagamento aceitas nesta promoção de Natal?',
              a: 'Para garantir o valor promocional de fábrica de R$ 99,90 (67% OFF) e a emissão automática imediata da etiqueta de rastreio, o pagamento é realizado exclusivamente via PIX processado com segurança pela SyncPay.'
            },
            {
              q: 'O Cachorro Robô já vem pronto para brincar na caixa original?',
              a: 'Sim! Acompanha o Cachorro Robô Smart Pet Dogbot na caixa original AI Robot (perfeita para presente de Natal), bateria recarregável com cabo USB-C, controle remoto 2.4GHz e manual com instruções para o aplicativo Bluetooth.'
            },
            {
              q: 'A partir de qual idade é recomendado?',
              a: 'Conforme aviso legal, é recomendado a partir dos 3 anos de idade, encantando tanto crianças pequenas quanto mais velhas e adultos.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`faq-item ${openFaq === idx ? 'open' : ''}`}
              onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
            >
              <button type="button" className="faq-question">
                <span>{item.q}</span>
                <span>{openFaq === idx ? '▲' : '▼'}</span>
              </button>
              <div className="faq-answer">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p style={{ fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
          🎄 SMART PET BRASIL — CAMPANHA OFICIAL DE NATAL
        </p>
        <p>&copy; 2026 Todos os direitos reservados. Pagamento exclusivo via PIX processado pela SyncPay.</p>
      </footer>

      {/* Barra Fixa Inferior (Sticky CTA) */}
      <div className="sticky-cta-bar">
        <div className="sticky-cta-inner">
          <div className="sticky-info">
            <img src={PRODUCT_IMAGES[0].src} alt="Smart Pet Dogbot" />
            <div>
              <div className="sticky-title">🎄 Presente de Natal: Cachorro Robô Smart Pet Dogbot</div>
              <div className="sticky-price">
                R$ 99,90 Exclusivo no PIX <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700 }}>(📦 Rastreio Abre na Hora!)</span>
              </div>
            </div>
          </div>
          <button className="btn-sticky-buy" onClick={() => setIsModalOpen(true)}>
            🎄 COMPRAR NO PIX • R$ 99,90
          </button>
        </div>
      </div>

      {/* Modal PIX SyncPay com Formulário de Endereço */}
      <PixModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        onPaymentConfirmed={(orderInfo) => {
          setIsModalOpen(false);
          setConfirmedOrder(orderInfo);
        }}
      />

      {/* Toast de Prova Social em Tempo Real */}
      {toast && (
        <div className="toast-container">
          <div className="toast">
            <img
              src={PRODUCT_IMAGES[1].src}
              alt="Dogbot"
              style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontWeight: 700, color: '#0f172a' }}>{toast.name} ({toast.city})</div>
              <div style={{ color: '#059669', fontWeight: 600, fontSize: '0.75rem' }}>
                Pagou no PIX e já recebeu o Código de Rastreio!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Interativo de Suporte ao Cliente */}
      <SupportChat onOpenCheckout={() => setIsModalOpen(true)} />
    </div>
  );
}
