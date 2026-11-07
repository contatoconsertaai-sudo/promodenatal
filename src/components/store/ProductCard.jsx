import React from 'react';
import { useCart } from '../../context/CartContext';

export default function ProductCard({
  product,
  onOpenDetails,
  onBuyNow
}) {
  const { addToCart, setIsCartOpen } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    onBuyNow(product);
  };

  return (
    <div
      className="store-product-card"
      onClick={() => onOpenDetails(product)}
      style={{
        background: '#ffffff',
        borderRadius: '18px',
        overflow: 'hidden',
        border: '1.5px solid #fecaca',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 14px 28px rgba(185, 28, 28, 0.12)';
        e.currentTarget.style.borderColor = '#dc2626';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = '#fecaca';
      }}
    >
      {/* Imagem do Produto e Selos de Natal */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '100%', background: '#fffafa', overflow: 'hidden' }}>
        <img
          src={product.primaryImage}
          alt={product.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s'
          }}
          loading="lazy"
        />

        {/* Badge de Desconto de Natal */}
        {product.discountBadge && (
          <div
            className="store-card-badge-discount"
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              background: 'linear-gradient(135deg, #dc2626, #991b1b)',
              color: '#fde047',
              fontSize: '0.72rem',
              fontWeight: 900,
              padding: '4px 8px',
              borderRadius: '8px',
              border: '1px solid rgba(253, 224, 71, 0.6)',
              boxShadow: '0 2px 8px rgba(220, 38, 38, 0.4)'
            }}
          >
            🎄 {product.discountBadge}
          </div>
        )}

        {/* Badge Especial (ex: Campeão de Natal / Método Montessori) */}
        {product.badge && (
          <div
            className="store-card-badge-bottom"
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              background: 'rgba(127, 29, 29, 0.9)',
              backdropFilter: 'blur(4px)',
              color: '#fef08a',
              fontSize: '0.66rem',
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: '6px'
            }}
          >
            {product.badge}
          </div>
        )}
      </div>

      {/* Conteúdo do Card */}
      <div className="store-card-body" style={{ padding: '14px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
        <div>
          {/* Estrelas e Avaliações */}
          <div className="store-card-rating-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span className="store-card-stars" style={{ color: '#eab308', fontSize: '0.8rem' }}>★★★★★</span>
              <span className="store-card-reviews" style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>
                ({product.reviewsCount})
              </span>
            </div>
            <span className="store-card-age-tag" style={{ fontSize: '0.66rem', color: '#991b1b', background: '#fff1f2', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
              {product.categoryLabel}
            </span>
          </div>

          {/* Título do Produto */}
          <h3
            className="store-card-title"
            style={{
              fontSize: '0.9rem',
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1.35,
              margin: '0 0 8px',
              minHeight: '2.7em',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {product.title}
          </h3>

          {/* Tag de Frete Grátis Natal */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <span className="store-card-frete-tag" style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.68rem', fontWeight: 800, padding: '2px 7px', borderRadius: '4px' }}>
              ✓ FRETE GRÁTIS
            </span>
          </div>

          {/* Preços */}
          <div className="store-card-price-box" style={{ marginBottom: '12px', background: '#fffafa', padding: '8px 10px', borderRadius: '10px', border: '1px dashed #fecaca' }}>
            {product.oldPrice && (
              <div className="store-card-old-price" style={{ fontSize: '0.74rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                De R$ {product.oldPrice.toFixed(2).replace('.', ',')}
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', flexWrap: 'wrap' }}>
              <span className="store-card-price" style={{ fontSize: '1.22rem', fontWeight: 900, color: '#15803d' }}>
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              <span className="store-card-pix-pill" style={{ fontSize: '0.66rem', fontWeight: 800, color: '#dc2626', background: '#fef2f2', padding: '1px 5px', borderRadius: '4px' }}>
                PIX
              </span>
            </div>
            <div className="store-card-installments" style={{ fontSize: '0.69rem', color: '#64748b', fontWeight: 600 }}>
              3x de R$ {(product.price / 3).toFixed(2).replace('.', ',')} s/ juros
            </div>
          </div>
        </div>

        {/* Botões de Ação Conectados à SyncPay */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button
            type="button"
            className="store-card-btn-buy"
            onClick={handleBuyNow}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              color: '#ffffff',
              border: 'none',
              padding: '10px 10px',
              borderRadius: '10px',
              fontSize: '0.82rem',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              boxShadow: '0 4px 10px rgba(22, 163, 74, 0.28)'
            }}
          >
            <span>⚡ COMPRAR NO PIX</span>
          </button>

          <button
            type="button"
            className="store-card-btn-cart"
            onClick={handleAddToCart}
            style={{
              width: '100%',
              background: '#fff1f2',
              color: '#991b1b',
              border: '1px solid #fca5a5',
              padding: '7px 10px',
              borderRadius: '10px',
              fontSize: '0.76rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}
          >
            <span>🎁 + Sacola</span>
          </button>
        </div>
      </div>
    </div>
  );
}
