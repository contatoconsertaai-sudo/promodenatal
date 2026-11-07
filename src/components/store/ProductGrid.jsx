import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../../data/products';

const QUICK_THEMES = [
  { id: 'all', label: `🎄 Todos os Produtos (${PRODUCTS.length})` },
  { id: 'montessori', label: '🧠 Montessori & Educativos' },
  { id: 'musical', label: '🎵 Musicais & Interativos' },
  { id: 'carrinhos', label: '🚗 Carrinhos, Pistas & Dinossauros' },
  { id: 'criativos', label: '📸 Câmeras, Bonecas & Criativos' },
  { id: 'cuidados', label: '👶 Bebês, Alimentação & Cuidados' },
  { id: 'roupas', label: '👗 Roupas, Pijamas & Fantasias' }
];

function matchQuickTheme(product, themeId) {
  if (themeId === 'all') return true;
  const t = `${product.title} ${product.badge} ${product.subtitle}`.toLowerCase();
  if (themeId === 'montessori') {
    return t.includes('montessori') || t.includes('livro') || t.includes('inglês') || t.includes('madeira') || t.includes('encaixe') || t.includes('blocos') || t.includes('relógio') || t.includes('alinhavo') || t.includes('pescaria') || t.includes('emoções');
  }
  if (themeId === 'musical') {
    return t.includes('patinho') || t.includes('pato') || t.includes('caranguejo') || t.includes('abelha') || t.includes('girafa') || t.includes('karaokê') || t.includes('música') || t.includes('luz') || t.includes('sensorial') || t.includes('ufo');
  }
  if (themeId === 'carrinhos') {
    return t.includes('caminhão') || t.includes('carrinho') || t.includes('carro') || t.includes('pista') || t.includes('garagem') || t.includes('estacionamento') || t.includes('dinossauro') || t.includes('retroescavadeira') || t.includes('bicicleta') || t.includes('patinete') || t.includes('robô');
  }
  if (themeId === 'criativos') {
    return t.includes('câmera') || t.includes('camera') || t.includes('caneta 3d') || t.includes('reborn') || t.includes('barraca') || t.includes('casinha') || t.includes('cozinha') || t.includes('penteadeira') || t.includes('miçangas') || t.includes('diário') || t.includes('lousa') || t.includes('mesa') || t.includes('telescópio') || t.includes('homem-aranha') || t.includes('glitter') || t.includes('lanterna');
  }
  if (themeId === 'cuidados') {
    return t.includes('alimenta') || t.includes('pote') || t.includes('chupeta') || t.includes('copo') || t.includes('unha') || t.includes('escova') || t.includes('lenço') || t.includes('cuidado') || t.includes('troninho') || t.includes('penico') || t.includes('mictorio') || t.includes('soninho') || t.includes('palitinho') || t.includes('luminária') || t.includes('tapete');
  }
  if (themeId === 'roupas') {
    return t.includes('conjunto') || t.includes('pijama') || t.includes('vestido') || t.includes('fantasia');
  }
  return true;
}

export default function ProductGrid({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  onOpenCheckout,
  onOpenDetails
}) {
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Filtragem combinada (Busca + Faixa Etária + Tema)
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;

    const matchesTheme = matchQuickTheme(p, selectedTheme);

    return matchesSearch && matchesCategory && matchesTheme;
  });

  // Ordenação
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'discount') {
      const dA = (a.oldPrice - a.price) / a.oldPrice;
      const dB = (b.oldPrice - b.price) / b.oldPrice;
      return dB - dA;
    }
    return 0;
  });

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 8);

  return (
    <div style={{ maxWidth: '1260px', margin: '0 auto', padding: '0 16px' }}>
      {/* Seção 1:Catálogo Único Completo (Sem repetição de cards na mesma página) */}
      <section id="catalogo-completo" style={{ marginBottom: '52px' }}>
        {/* Banner de Destaque da Promoção de Natal Brinkids */}
        <div
          className="bestsellers-banner-header"
          style={{
            background: 'linear-gradient(135deg, #991b1b 0%, #dc2626 55%, #7f1d1d 100%)',
            borderRadius: '20px',
            padding: '22px 24px',
            marginBottom: '24px',
            color: '#ffffff',
            border: '2px solid #fde047',
            boxShadow: '0 10px 25px rgba(185, 28, 28, 0.2)'
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 900, color: '#fde047', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              🎅 Os Queridinhos das Famílias Brasileiras
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', margin: '4px 0 0' }}>
              Catálogo Oficial de Natal Brinkids ({PRODUCTS.length} Brinquedos Exclusivos)
            </h2>
          </div>
          <div
            style={{
              background: '#fde047',
              color: '#991b1b',
              fontWeight: 900,
              fontSize: '0.8rem',
              padding: '7px 14px',
              borderRadius: '30px'
            }}
          >
            ⚡ Desconto Especial no Pix + Frete Grátis
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            marginBottom: '18px'
          }}
        >
          <div>
            <span style={{ fontSize: '0.76rem', fontWeight: 900, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              🎄 Catálogo Oficial Brinkids Store
            </span>
            <h2 className="section-heading-responsive" style={{ fontSize: '1.55rem', fontWeight: 900, color: '#7f1d1d', margin: '4px 0 0' }}>
              {selectedCategory === 'all' && selectedTheme === 'all' && searchTerm === ''
                ? `Todas as Ofertas de Natal (${PRODUCTS.length} Produtos)`
                : `Produtos Encontrados (${sortedProducts.length} de ${PRODUCTS.length})`}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '9px 14px',
                borderRadius: '12px',
                border: '1.5px solid #fca5a5',
                background: '#ffffff',
                color: '#0f172a',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="featured">✨ Ordenar: Destaques de Natal</option>
              <option value="price-asc">💰 Menor Preço no Pix</option>
              <option value="price-desc">💎 Maior Preço</option>
              <option value="discount">🔥 Maior Desconto (% OFF)</option>
            </select>

            {(selectedCategory !== 'all' || selectedTheme !== 'all' || searchTerm !== '') && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedTheme('all');
                  setSearchTerm('');
                }}
                style={{
                  background: '#fef2f2',
                  border: '1px solid #fca5a5',
                  padding: '9px 14px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  color: '#dc2626',
                  cursor: 'pointer'
                }}
              >
                ✕ Limpar Filtros
              </button>
            )}
          </div>
        </div>

        {/* Barra de Filtros Rápidos por Categoria / Tema */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '12px',
            marginBottom: '22px'
          }}
        >
          {QUICK_THEMES.map((th) => {
            const active = selectedTheme === th.id;
            return (
              <button
                key={th.id}
                type="button"
                onClick={() => setSelectedTheme(th.id)}
                style={{
                  background: active ? 'linear-gradient(135deg, #dc2626, #991b1b)' : '#ffffff',
                  color: active ? '#ffffff' : '#7f1d1d',
                  border: active ? '1.5px solid #fde047' : '1px solid #fecaca',
                  padding: '8px 15px',
                  borderRadius: '24px',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: active ? '0 4px 12px rgba(220, 38, 38, 0.25)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {th.label}
              </button>
            );
          })}
        </div>

        {sortedProducts.length === 0 ? (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '18px',
              padding: '60px 20px',
              textAlign: 'center',
              border: '1.5px solid #fecaca'
            }}
          >
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '12px' }}>🎅</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#7f1d1d', marginBottom: '6px' }}>
              Nenhum produto encontrado para este filtro
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>
              Experimente limpar os filtros para visualizar todos os {PRODUCTS.length} presentes da Brinkids.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedTheme('all');
                setSearchTerm('');
              }}
              style={{
                background: 'linear-gradient(135deg, #dc2626, #991b1b)',
                color: '#ffffff',
                border: 'none',
                padding: '11px 22px',
                borderRadius: '10px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              Ver Todos os {PRODUCTS.length} Produtos
            </button>
          </div>
        ) : (
          <div className="store-products-grid">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={onOpenDetails}
                onBuyNow={onOpenCheckout}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
