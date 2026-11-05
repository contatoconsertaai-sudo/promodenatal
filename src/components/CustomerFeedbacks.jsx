import React, { useState } from 'react';

const CUSTOMER_PHOTOS = [
  {
    src: '/img/foto-real-cliente-dogbot.jpg',
    label: 'Foto Real na Mesa + Caixa Original AI Robot'
  },
  {
    src: '/img/D_NQ_NP_2X_619845-MLA101284980262_122025-F.webp',
    label: 'Diversão em Família'
  },
  {
    src: '/img/D_NQ_NP_2X_705712-MLA101785533767_122025-F.webp',
    label: 'Dogbot + Controle 2.4GHz'
  },
  {
    src: '/img/D_NQ_NP_2X_787396-MLA101785702473_122025-F.webp',
    label: 'Comandos de Voz & App'
  }
];

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: 'Rodrigo Mendonça',
    initials: 'RM',
    avatarBg: '#2563eb',
    city: 'São Paulo, SP',
    rating: 5,
    date: 'há 1 dia',
    tag: 'Com Fotos',
    highlight: '🎄 Melhor presente de Natal por R$ 99,90! Chegou na caixa original!',
    comment:
      'Já garanti o presente de Natal do meu filho antes que esgote! Tirei essa foto assim que abrimos para testar aqui na mesa de casa. Veio na caixa original AI Robot 2.4GHz linda para embrulhar. Os olhos de LED azul são muito fortes, faz kung fu, dança e quando faz xixi de brincadeira é risada garantida!',
    photo: '/img/foto-real-cliente-dogbot.jpg',
    helpfulCount: 64,
    verified: true
  },
  {
    id: 2,
    name: 'Camila Ferreira',
    initials: 'CF',
    avatarBg: '#059669',
    city: 'Curitiba, PR',
    rating: 5,
    date: 'há 2 dias',
    tag: 'Com Fotos',
    highlight: 'Comprei 2 para o Natal (filho e sobrinho)! Por R$ 99,90 vale demais!',
    comment:
      'Em loja de shopping um robô desse tamanho (31cm) custa mais de R$ 350! Aproveitei a promoção de Natal por R$ 99,90 e peguei dois. O material é super resistente e carregar direto no cabo USB-C sem precisar comprar pilha é maravilhoso!',
    photo: '/img/D_NQ_NP_2X_705712-MLA101785533767_122025-F.webp',
    helpfulCount: 38,
    verified: true
  },
  {
    id: 3,
    name: 'Lucas Tavares',
    initials: 'LT',
    avatarBg: '#7c3aed',
    city: 'Belo Horizonte, MG',
    rating: 5,
    date: 'há 3 dias',
    tag: 'Entrega Rápida',
    highlight: 'Aprovação no PIX na hora e entrega super rápida!',
    comment:
      'Fiz o pagamento pelo QR Code do PIX aqui no site, aprovou em menos de 5 segundos e no mesmo dia já recebi o rastreio. O alcance do controle e do Bluetooth passa fácil de 20 metros sem travar nada. Vale cada centavo!',
    photo: '/img/D_NQ_NP_2X_787396-MLA101785702473_122025-F.webp',
    helpfulCount: 29,
    verified: true
  },
  {
    id: 4,
    name: 'Patrícia Albuquerque',
    initials: 'PA',
    avatarBg: '#db2777',
    city: 'Rio de Janeiro, RJ',
    rating: 5,
    date: 'há 5 dias',
    tag: 'Programação & App',
    highlight: 'Presente perfeito para crianças a partir de 3 anos',
    comment:
      'Comprei para minha sobrinha de 4 anos e para meu filho de 8. Os dois brincam juntos o dia inteiro! O modo patrulha e as acrobacias em duas patas são muito bem feitos.',
    photo: '/img/D_NQ_NP_2X_619845-MLA101284980262_122025-F.webp',
    helpfulCount: 19,
    verified: true
  },
  {
    id: 5,
    name: 'Fernando Costa',
    initials: 'FC',
    avatarBg: '#ea580c',
    city: 'Florianópolis, SC',
    rating: 5,
    date: 'há 1 semana',
    tag: 'Entrega Rápida',
    highlight: 'Smart Chip faz toda a diferença nos movimentos',
    comment:
      'Já tinha visto outros robôs que travavam, mas esse Dogbot tem movimentos muito fluidos. As articulações das patas com rodinhas permitem que ele ande liso tanto no piso frio quanto no tapete fino. Recomendo 100%!',
    photo: null,
    helpfulCount: 15,
    verified: true
  },
  {
    id: 6,
    name: 'Juliana Rocha',
    initials: 'JR',
    avatarBg: '#0284c7',
    city: 'Brasília, DF',
    rating: 5,
    date: 'há 1 semana',
    tag: 'Com Fotos',
    highlight: 'Atendimento nota 10 e produto original na caixa',
    comment:
      'Veio muito bem embalado na caixa AI Robot, com cabo USB-C, controle remoto 2.4GHz e manual. Testamos todos os comandos de voz e funcionou perfeitamente!',
    photo: '/img/foto-real-cliente-dogbot.jpg',
    helpfulCount: 27,
    verified: true
  }
];

export default function CustomerFeedbacks() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [votedIds, setVotedIds] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [formSubmittedToast, setFormSubmittedToast] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  const [newReview, setNewReview] = useState({
    name: '',
    city: '',
    rating: 5,
    highlight: '',
    comment: ''
  });

  const filters = ['Todos', 'Com Fotos', 'Programação & App', 'Entrega Rápida'];

  const filteredReviews = reviews.filter((rev) => {
    if (activeFilter === 'Todos') return true;
    if (activeFilter === 'Com Fotos') return Boolean(rev.photo);
    return rev.tag === activeFilter;
  });

  const handleHelpful = (id) => {
    if (votedIds[id]) return;
    setVotedIds({ ...votedIds, [id]: true });
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const parts = newReview.name.trim().split(' ');
    const initials =
      parts.length > 1
        ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
        : newReview.name.slice(0, 2).toUpperCase();

    const created = {
      id: Date.now(),
      name: newReview.name,
      initials,
      avatarBg: '#059669',
      city: newReview.city || 'Brasil',
      rating: Number(newReview.rating),
      date: 'Agora mesmo',
      tag: 'Programação & App',
      highlight: newReview.highlight || 'Excelente produto, superou as expectativas!',
      comment: newReview.comment,
      photo: null,
      helpfulCount: 1,
      verified: true
    };

    setReviews([created, ...reviews]);
    setNewReview({ name: '', city: '', rating: 5, highlight: '', comment: '' });
    setShowForm(false);
    setFormSubmittedToast(true);
    setTimeout(() => setFormSubmittedToast(false), 5000);
  };

  return (
    <section className="feedbacks-section" id="avaliacoes">
      <div className="section-header">
        <span className="section-tag">Avaliações Reais & Feedbacks Verificados</span>
        <h2>O Que Nossos Clientes Dizem Sobre o Smart Pet Dogbot</h2>
        <p>Mais de 1.200 famílias já transformaram a diversão em casa com nosso Cachorro Robô Inteligente.</p>
      </div>

      {/* Painel Superior de Estatísticas de Feedback */}
      <div className="feedback-dashboard">
        {/* Coluna 1: Nota Geral */}
        <div className="feedback-score-box">
          <div className="score-big">4.9</div>
          <div className="score-stars">★★★★★</div>
          <div className="score-count">Baseado em {342 + reviews.length} avaliações</div>
          <div className="recommend-pill">✅ 99% dos clientes recomendam</div>
        </div>

        {/* Coluna 2: Barras de Estrelas */}
        <div className="feedback-bars-box">
          {[
            { stars: '5 estrelas', pct: 94, count: 327 },
            { stars: '4 estrelas', pct: 5, count: 18 },
            { stars: '3 estrelas', pct: 1, count: 3 },
            { stars: '2 estrelas', pct: 0, count: 0 },
            { stars: '1 estrela', pct: 0, count: 0 }
          ].map((row, i) => (
            <div className="star-bar-row" key={i}>
              <span className="star-label">{row.stars}</span>
              <div className="star-bar-track">
                <div className="star-bar-fill" style={{ width: `${row.pct}%` }} />
              </div>
              <span className="star-pct">{row.pct}%</span>
            </div>
          ))}
        </div>

        {/* Coluna 3: Métricas do Produto */}
        <div className="feedback-metrics-box">
          <h4>Avaliação por Característica</h4>
          <div className="metric-item">
            <span>Qualidade e Resistência</span>
            <strong>★ 4.9</strong>
          </div>
          <div className="metric-item">
            <span>Comandos de Voz & App</span>
            <strong>★ 5.0</strong>
          </div>
          <div className="metric-item">
            <span>Duração da Bateria USB-C</span>
            <strong>★ 4.8</strong>
          </div>
          <div className="metric-item">
            <span>Diversão para Crianças</span>
            <strong>★ 5.0</strong>
          </div>
        </div>
      </div>

      {/* Galeria de Fotos Reais Enviadas por Clientes */}
      <div className="customer-photos-strip">
        <div className="customer-photos-title">
          <span>📸 Fotos Reais Recebidas Pelos Clientes</span>
          <small>Clique em qualquer foto para ampliar</small>
        </div>
        <div className="customer-photos-grid">
          {CUSTOMER_PHOTOS.map((item, idx) => (
            <div
              key={idx}
              className="customer-photo-card"
              onClick={() => setLightboxImg(item.src)}
            >
              <img src={item.src} alt={item.label} />
              <div className="customer-photo-caption">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Barra de Filtros + Botão Deixar Feedback */}
      <div className="feedback-controls">
        <div className="filter-pills">
          {filters.map((f) => (
            <button
              key={f}
              className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <button className="btn-write-review" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Fechar Formulário' : '✍️ Deixar Meu Feedback'}
        </button>
      </div>

      {/* Notificação de Sucesso ao Enviar Feedback */}
      {formSubmittedToast && (
        <div className="feedback-alert-success">
          🎉 <strong>Feedback publicado com sucesso!</strong> Obrigado por compartilhar sua experiência com o Smart Pet Dogbot.
        </div>
      )}

      {/* Formulário Interativo para Novo Feedback */}
      {showForm && (
        <form className="new-feedback-form" onSubmit={handleSubmitReview}>
          <h3>Compartilhe sua avaliação sobre o Smart Pet Dogbot</h3>
          <div className="form-grid-2">
            <div>
              <label>Seu Nome *</label>
              <input
                type="text"
                required
                placeholder="Ex: Marcos Oliveira"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              />
            </div>
            <div>
              <label>Sua Cidade / Estado</label>
              <input
                type="text"
                placeholder="Ex: Campinas, SP"
                value={newReview.city}
                onChange={(e) => setNewReview({ ...newReview, city: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid-2" style={{ marginTop: '12px' }}>
            <div>
              <label>Título do seu Feedback</label>
              <input
                type="text"
                placeholder="Ex: Meu filho amou, super tecnológico!"
                value={newReview.highlight}
                onChange={(e) => setNewReview({ ...newReview, highlight: e.target.value })}
              />
            </div>
            <div>
              <label>Sua Nota</label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
              >
                <option value={5}>★★★★★ (5/5 - Excelente)</option>
                <option value={4}>★★★★☆ (4/5 - Muito Bom)</option>
                <option value={3}>★★★☆☆ (3/5 - Bom)</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '12px' }}>
            <label>Seu Comentário *</label>
            <textarea
              rows={3}
              required
              placeholder="Conte o que achou dos movimentos, controle por voz, bateria USB-C e entrega..."
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            />
          </div>

          <button type="submit" className="btn-submit-review">
            PUBLICAR AVALIAÇÃO VERIFICADA
          </button>
        </form>
      )}

      {/* Grid de Cards de Feedback */}
      <div className="reviews-grid">
        {filteredReviews.map((rev) => (
          <div className="review-card-pro" key={rev.id}>
            <div>
              <div className="review-pro-top">
                <div className="reviewer-profile">
                  <div className="reviewer-avatar" style={{ background: rev.avatarBg }}>
                    {rev.initials}
                  </div>
                  <div>
                    <div className="reviewer-name">{rev.name}</div>
                    <div className="reviewer-location">{rev.city} • {rev.date}</div>
                  </div>
                </div>
                {rev.verified && (
                  <span className="verified-badge">✓ Compra Verificada</span>
                )}
              </div>

              <div className="review-stars-line">
                <span className="stars">{'★'.repeat(rev.rating)}</span>
                <span className="review-tag-pill">{rev.tag}</span>
              </div>

              <h4 className="review-highlight-title">"{rev.highlight}"</h4>
              <p className="review-body-text">{rev.comment}</p>

              {rev.photo && (
                <div className="review-photo-wrap" onClick={() => setLightboxImg(rev.photo)}>
                  <img src={rev.photo} alt="Foto enviada pelo cliente" />
                  <span>🔍 Ampliar foto real</span>
                </div>
              )}
            </div>

            <div className="review-pro-footer">
              <span>Esta avaliação foi útil?</span>
              <button
                type="button"
                className={`btn-helpful ${votedIds[rev.id] ? 'voted' : ''}`}
                onClick={() => handleHelpful(rev.id)}
              >
                {votedIds[rev.id] ? `✓ Útil (${rev.helpfulCount})` : `👍 Sim (${rev.helpfulCount})`}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox de Foto de Cliente */}
      {lightboxImg && (
        <div className="modal-overlay" onClick={() => setLightboxImg(null)}>
          <div className="lightbox-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-lightbox" onClick={() => setLightboxImg(null)}>✕</button>
            <img src={lightboxImg} alt="Foto real do produto" />
          </div>
        </div>
      )}
    </section>
  );
}
