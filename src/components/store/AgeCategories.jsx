import React from 'react';
import { AGE_CATEGORIES } from '../../data/products';

export default function AgeCategories({ selectedCategory, onSelectCategory }) {
  return (
    <section style={{ maxWidth: '1240px', margin: '36px auto 20px', padding: '0 16px' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: '0 0 6px' }}>
          Escolha o presente ideal:
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.88rem', margin: 0 }}>
          Brinquedos educativos e sensoriais pensados para cada etapa do desenvolvimento
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '16px',
          justifyContent: 'center'
        }}
      >
        {/* Opção Todos */}
        <div
          onClick={() => onSelectCategory('all')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '12px 8px',
            borderRadius: '16px',
            background: selectedCategory === 'all' ? '#e0f2fe' : '#ffffff',
            border: selectedCategory === 'all' ? '2px solid #0284c7' : '1px solid #e2e8f0',
            transition: 'all 0.2s',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
          }}
        >
          <div
            style={{
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              background: '#0ea5e9',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              marginBottom: '10px'
            }}
          >
            🧸
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', textAlign: 'center' }}>
            Todas as Idades
          </span>
        </div>

        {AGE_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '12px 8px',
                borderRadius: '16px',
                background: isSelected ? '#e0f2fe' : '#ffffff',
                border: isSelected ? '2px solid #0284c7' : '1px solid #e2e8f0',
                transition: 'all 0.2s',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: '#f1f5f9',
                  border: isSelected ? '3px solid #0284c7' : '2px solid #e2e8f0',
                  marginBottom: '10px'
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
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: isSelected ? '#0284c7' : '#0f172a',
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

