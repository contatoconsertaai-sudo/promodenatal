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
      onClick={() => onOpenDetails(product)}
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Imagem do Produto e Selos */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '100%', background: '#f8fafc', overflow: 'hidden' }}>
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

        {/* Badge de Desconto */}
        {product.discountBadge && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              background: '#ef4444',
              color: '#ffffff',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '4px 8px',
              borderRadius: '6px',
              boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)'
            }}
          >
            {product.discountBadge}
          </div>
        )}

        {/* Badge Especial (ex: #1 Mais Vendido) */}
        {product.badge && (
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(4px)',
              color: '#fef08a',
              fontSize: '0.68rem',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '4px'
            }}
          >
            {product.badge}
          </div>
        )}
      </div>

      {/* Conteúdo do Card */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
        <div>
          {/* Estrelas e Avaliações */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
            <span style={{ color: '#eab308', fontSize: '0.82rem' }}>★★★★★</span>
            <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600 }}>
              ({product.reviewsCount})
            </span>
          </div>

          {/* Título do Produto */}
          <h3
            style={{
              fontSize: '0.92rem',
              fontWeight: 700,
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

          {/* Tag de Frete Grátis */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
            <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.7rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
              ✓ FRETE GRÁTIS
            </span>
          </div>

          {/* Preços */}
          <div style={{ marginBottom: '14px' }}>
            {product.oldPrice && (
              <span style={{ fontSize: '0.78rem', color: '#94a3b8', textDecoration: 'line-through', marginRight: '6px' }}>
                De R$ {product.oldPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0284c7' }}>
              R$ {product.price.toFixed(2).replace('.', ',')}
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#16a34a', marginLeft: '4px' }}>
                no Pix
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
              ou 12x de R$ {(product.price / 10).toFixed(2).replace('.', ',')}
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            type="button"
            onClick={handleBuyNow}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #0284c7, #0369a1)',
              color: '#ffffff',
              border: 'none',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 2px 6px rgba(2, 132, 199, 0.3)'
            }}
          >
            <span>⚡ COMPRAR AGORA</span>
          </button>

          <button
            type="button"
            onClick={handleAddToCart}
            style={{
              width: '100%',
              background: '#f1f5f9',
              color: '#0f172a',
              border: '1px solid #cbd5e1',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <span>🛒 Adicionar ao Carrinho</span>
          </button>
        </div>
      </div>
    </div>
  );
}
