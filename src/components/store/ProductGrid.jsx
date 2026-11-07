import React from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../../data/products';

export default function ProductGrid({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  onOpenCheckout,
  onOpenDetails
}) {
  // Filtragem
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 16px' }}>
      {/* Seção 1: Mais Vendidos da Black Friday (somente quando não estiver buscando ou filtrando) */}
      {selectedCategory === 'all' && searchTerm.trim() === '' && (
        <section style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                🔥 Destaques da Semana
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 0' }}>
                Mais vendidos da Black Friday
              </h2>
            </div>
            <span style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: 700 }}>
              Até 45% OFF
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '20px'
            }}
          >
            {bestSellers.map((product) => (
              <ProductCard
                key={`bestseller-${product.id}`}
                product={product}
                onOpenDetails={onOpenDetails}
                onBuyNow={onOpenCheckout}
              />
            ))}
          </div>
        </section>
      )}

      {/* Seção 2: Todas as Ofertas / Catálogo Completo */}
      <section id="catalogo-completo" style={{ marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
              {selectedCategory === 'all' && searchTerm === ''
                ? 'Todas as ofertas da Black Friday'
                : `Resultados (${filteredProducts.length})`}
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '4px 0 0' }}>
              Brinquedos educativos para desenvolvimento motor, sensorial e cognitivo
            </p>
          </div>

          {(selectedCategory !== 'all' || searchTerm !== '') && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              style={{
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#475569',
                cursor: 'pointer'
              }}
            >
              ✕ Limpar Filtros
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '60px 20px',
              textAlign: 'center',
              border: '1px solid #e2e8f0'
            }}
          >
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '12px' }}>🔍</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
              Nenhum brinquedo encontrado
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>
              Tente buscar por termos mais genéricos ou limpe os filtros.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              style={{
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Ver Todos os Brinquedos
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '20px'
            }}
          >
            {filteredProducts.map((product) => (
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
