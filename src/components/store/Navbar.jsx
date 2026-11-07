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
    <header className="store-header" style={{ position: 'sticky', top: 0, zIndex: 100, background: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      {/* Top Banner Brinkids Black Friday */}
      <div
        style={{
          background: '#0ea5e9',
          color: '#ffffff',
          padding: '8px 16px',
          fontSize: '0.8rem',
          fontWeight: 700,
          textAlign: 'center',
          letterSpacing: '0.3px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap'
        }}
      >
        <span>⚡ BLACK FRIDAY:</span>
        <span style={{ background: '#fef08a', color: '#0f172a', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>
          CUPOM BLACK10 = 10% OFF
        </span>
        <span>•</span>
        <span>🚚 Frete Grátis para todo o Brasil</span>
      </div>

      {/* Barra Principal */}
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        {/* Logo Brinkids */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            userSelect: 'none'
          }}
          onClick={() => {
            setSelectedCategory('all');
            setSearchTerm('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img
            src="/logo-brinkids.png"
            alt="Brinkids Store"
            style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
            onError={(e) => {
              e.currentTarget.src = 'https://brinkidstore.com/cdn/shop/files/logo_7dcef3ed-b8c5-4e25-b8b3-626bf9942c2a.png?v=1728847918&width=600';
            }}
          />
        </div>

        {/* Campo de Busca */}
        <div
          style={{
            flex: '1',
            maxWidth: '520px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar brinquedos pedagógicos, idade, livros..."
            style={{
              width: '100%',
              padding: '10px 42px 10px 16px',
              borderRadius: '24px',
              border: '1.5px solid #cbd5e1',
              fontSize: '0.88rem',
              outline: 'none',
              transition: 'border-color 0.2s',
              background: '#f8fafc'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#0ea5e9';
              e.target.style.background = '#ffffff';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#cbd5e1';
              e.target.style.background = '#f8fafc';
            }}
          />
          <button
            type="button"
            style={{
              position: 'absolute',
              right: '8px',
              background: '#0ea5e9',
              color: '#ffffff',
              border: 'none',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem'
            }}
            aria-label="Buscar"
          >
            🔍
          </button>
        </div>

        {/* Ações (WhatsApp & Carrinho) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Suporte WhatsApp */}
          <a
            href="https://wa.me/5531972327905?text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20os%20brinquedos%20da%20Brinkids"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              color: '#059669',
              fontWeight: 700,
              fontSize: '0.84rem',
              padding: '8px 12px',
              borderRadius: '20px',
              background: '#ecfdf5',
              border: '1px solid #a7f3d0'
            }}
          >
            <span>💬</span>
            <span className="nav-help-text" style={{ display: 'inline-block' }}>Atendimento</span>
          </a>

          {/* Carrinho */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '24px',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontWeight: 700,
              color: '#0f172a',
              fontSize: '0.88rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e2e8f0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f1f5f9';
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>🛒</span>
            <span>Carrinho</span>
            {totalItems > 0 && (
              <span
                style={{
                  background: '#ef4444',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 800,
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
