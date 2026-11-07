import React from 'react';
import { useCart } from '../../context/CartContext';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory
}) {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <header
      className="store-header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: '#ffffff',
        boxShadow: '0 4px 16px rgba(153, 27, 27, 0.08)',
        borderBottom: '2px solid #fecaca'
      }}
    >
      {/* Top Banner Promoção de Natal Brinkids */}
      <div className="store-top-bar">
        <span>🎅 PROMOÇÃO DE NATAL BRINKIDS:</span>
        <span
          style={{
            background: '#fde047',
            color: '#991b1b',
            padding: '2px 8px',
            borderRadius: '6px',
            fontSize: '0.73rem',
            fontWeight: 900,
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}
        >
          ATÉ 52% OFF NO PIX IMEDIATO
        </span>
        <span className="store-top-bar-extra">• 🎄 Frete Grátis para Todo o Brasil</span>
      </div>

      {/* Barra Principal Responsiva */}
      <div className="store-navbar-inner">
        {/* Logo Brinkids + Selo Natal */}
        <div
          className="store-logo-box"
          onClick={() => {
            setSelectedCategory('all');
            setSearchTerm('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img
            src="/logo-brinkids.png"
            alt="Brinkids Store"
            className="store-logo-img"
            onError={(e) => {
              e.currentTarget.src = 'https://brinkidstore.com/cdn/shop/files/logo_7dcef3ed-b8c5-4e25-b8b3-626bf9942c2a.png?v=1728847918&width=600';
            }}
          />
          <span
            className="store-xmas-pill"
            style={{
              background: 'linear-gradient(135deg, #dc2626, #991b1b)',
              color: '#fde047',
              fontSize: '0.68rem',
              fontWeight: 900,
              padding: '4px 8px',
              borderRadius: '20px',
              letterSpacing: '0.4px',
              border: '1px solid #fde047',
              whiteSpace: 'nowrap'
            }}
          >
            🎄 NATAL 2026
          </span>
        </div>

        {/* Campo de Busca nos 102 Produtos */}
        <div className="store-search-box">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar brinquedo, idade, Montessori..."
            style={{
              width: '100%',
              padding: '10px 42px 10px 14px',
              borderRadius: '24px',
              border: '1.5px solid #fca5a5',
              fontSize: '0.85rem',
              outline: 'none',
              transition: 'all 0.2s',
              background: '#fffafa'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#dc2626';
              e.target.style.background = '#ffffff';
              e.target.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.12)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#fca5a5';
              e.target.style.background = '#fffafa';
              e.target.style.boxShadow = 'none';
            }}
          />
          <button
            type="button"
            style={{
              position: 'absolute',
              right: '5px',
              background: 'linear-gradient(135deg, #dc2626, #991b1b)',
              color: '#ffffff',
              border: 'none',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.82rem'
            }}
            aria-label="Buscar"
          >
            🔍
          </button>
        </div>

        {/* Ações (Sacola Natalina) */}
        <div className="store-actions-box">
          {/* Sacola */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="store-cart-btn"
            style={{
              position: 'relative',
              background: 'linear-gradient(135deg, #dc2626, #991b1b)',
              border: '1.5px solid #fde047',
              borderRadius: '24px',
              padding: '9px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontWeight: 800,
              color: '#ffffff',
              fontSize: '0.85rem',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ fontSize: '1.05rem' }}>🎁</span>
            <span>Sacola</span>
            {totalItems > 0 && (
              <span
                style={{
                  background: '#fde047',
                  color: '#991b1b',
                  fontSize: '0.72rem',
                  fontWeight: 900,
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '2px'
                }}
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
