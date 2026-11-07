import React from 'react';
import { AGE_CATEGORIES } from '../../data/products';

export default function AgeCategories({ selectedCategory, onSelectCategory }) {
  return (
    <section style={{ maxWidth: '1260px', margin: '28px auto 20px', padding: '0 14px' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div
          style={{
            display: 'inline-block',
            background: '#fef2f2',
            color: '#dc2626',
            fontWeight: 900,
            fontSize: '0.73rem',
            padding: '4px 12px',
            borderRadius: '20px',
            border: '1px solid #fecaca',
            marginBottom: '6px'
          }}
        >
          🎄 GUIA DE PRESENTES DE NATAL
        </div>
        <h2 className="section-heading-responsive" style={{ fontSize: '1.55rem', fontWeight: 900, color: '#7f1d1d', margin: '0 0 6px' }}>
          Escolha o presente de Natal ideal por idade:
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
          Deslize ou toque na idade para filtrar os presentes recomendados
        </p>
      </div>

      <div className="age-categories-grid">
        {/* Opção Todos os 102 Produtos */}
        <div
          className="age-cat-card"
          onClick={() => onSelectCategory('all')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '14px 8px',
            borderRadius: '18px',
            background: selectedCategory === 'all' ? 'linear-gradient(135deg, #fff1f2, #ffe4e6)' : '#ffffff',
            border: selectedCategory === 'all' ? '2px solid #dc2626' : '1px solid #fecaca',
            transition: 'all 0.2s',
            boxShadow: selectedCategory === 'all' ? '0 8px 20px rgba(220, 38, 38, 0.15)' : '0 2px 6px rgba(0,0,0,0.04)'
          }}
        >
          <div
            className="age-cat-circle"
            style={{
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #dc2626, #991b1b)',
              color: '#fde047',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.9rem',
              marginBottom: '8px',
              border: '3px solid #fde047'
            }}
          >
            🎅
          </div>
          <span className="age-cat-label" style={{ fontSize: '0.84rem', fontWeight: 900, color: '#991b1b', textAlign: 'center' }}>
            Todos (102)
          </span>
        </div>

        {AGE_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <div
              key={cat.id}
              className="age-cat-card"
              onClick={() => onSelectCategory(cat.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '14px 8px',
                borderRadius: '18px',
                background: isSelected ? 'linear-gradient(135deg, #fff1f2, #ffe4e6)' : '#ffffff',
                border: isSelected ? '2px solid #dc2626' : '1px solid #fecaca',
                transition: 'all 0.2s',
                boxShadow: isSelected ? '0 8px 20px rgba(220, 38, 38, 0.15)' : '0 2px 6px rgba(0,0,0,0.04)'
              }}
            >
              <div
                className="age-cat-circle"
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: '#fff1f2',
                  border: isSelected ? '3px solid #dc2626' : '2px solid #fca5a5',
                  marginBottom: '8px'
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
              <span
                className="age-cat-label"
                style={{
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  color: isSelected ? '#dc2626' : '#0f172a',
                  textAlign: 'center'
                }}
              >
                {cat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
