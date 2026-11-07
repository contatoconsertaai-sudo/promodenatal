import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

export default function ProductDetailModal({ product, onClose, onBuyNow }) {
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(product ? product.images[0].src : '');
  const [cep, setCep] = useState('');
  const [cepResult, setCepResult] = useState(null);
  const [cepLoading, setCepLoading] = useState(false);

  if (!product) return null;

  const handleCepSearch = async (e) => {
    e.preventDefault();
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;

    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setCepResult({
          city: data.localidade,
          uf: data.uf,
          time: '7 a 14 dias úteis',
          price: 'GRÁTIS (Campanha de Natal)'
        });
      } else {
        setCepResult({ error: 'CEP não encontrado.' });
      }
    } catch {
      setCepResult({ error: 'Erro ao consultar CEP.' });
    } finally {
      setCepLoading(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(5px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto'
      }}
    >
      <div
        className="modal-content product-detail-modal-box"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          maxWidth: '860px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
          position: 'relative',
          padding: '24px'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: '#f1f5f9',
            border: 'none',
            color: '#475569',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            zIndex: 10
          }}
        >
          ✕
        </button>

        <div className="product-detail-grid">
          {/* Coluna 1: Galeria de Imagens */}
          <div>
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                paddingTop: '80%',
                position: 'relative',
                marginBottom: '12px'
              }}
            >
              <img
                src={activeImage || product.primaryImage}
                alt={product.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'linear-gradient(135deg, #dc2626, #991b1b)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  padding: '4px 12px',
                  borderRadius: '12px'
                }}
              >
                {product.discountBadge}
              </span>
            </div>

            {/* Miniaturas */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  onClick={() => setActiveImage(img.src)}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: (activeImage || product.primaryImage) === img.src ? '2px solid #0077ff' : '1px solid #cbd5e1',
                    opacity: (activeImage || product.primaryImage) === img.src ? 1 : 0.65,
                    transition: 'all 0.15s'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Coluna 2: Informações, Preço e Compra */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.74rem', background: '#eff6ff', color: '#0077ff', padding: '3px 8px', borderRadius: '6px', fontWeight: 800 }}>
                  {product.categoryLabel}
                </span>
                <span style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 800 }}>
                  ★ {product.rating} ({product.reviewsCount} avaliações)
                </span>
              </div>

              <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f172a', lineHeight: '1.25', marginBottom: '8px' }}>
                {product.title}
              </h2>

              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.45', marginBottom: '14px' }}>
                {product.subtitle}
              </p>

              {/* Caixa de Preço */}
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.80rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                  De R$ {product.oldPrice.toFixed(2).replace('.', ',')}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '2px 0' }}>
                  <span style={{ fontSize: '1.85rem', fontWeight: 900, color: '#059669' }}>
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  <span style={{ fontSize: '0.76rem', background: '#dcfce7', color: '#166534', padding: '3px 8px', borderRadius: '6px', fontWeight: 800 }}>
                    EXCLUSIVO NO PIX
                  </span>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#059669', fontWeight: 700 }}>
                  ⚡ Código de Rastreio dos Correios gerado automaticamente na tela pós-pagamento
                </div>
              </div>

              {/* Recursos em Destaque */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  Destaques e Funções:
                </div>
                <ul style={{ paddingLeft: '18px', fontSize: '0.80rem', color: '#334155', lineHeight: '1.5' }}>
                  {product.features.map((feat, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>{feat}</li>
                  ))}
                </ul>
              </div>

              {/* Especificações Técnicas */}
              {product.specs && (
                <div style={{ background: '#f1f5f9', padding: '10px 14px', borderRadius: '10px', fontSize: '0.74rem', color: '#475569', marginBottom: '16px' }}>
                  {product.specs.dimensions && <div><strong>📏 Dimensões:</strong> {product.specs.dimensions}</div>}
                  {product.specs.battery && <div><strong>🔋 Bateria:</strong> {product.specs.battery}</div>}
                  {product.specs.age && <div><strong>👶 Faixa Etária:</strong> {product.specs.age}</div>}
                  {product.specs.packageIncludes && <div><strong>📦 Na Caixa:</strong> {product.specs.packageIncludes}</div>}
                </div>
              )}
            </div>

            {/* Botões de Ação */}
            <div className="product-detail-actions" style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <button
                onClick={() => {
                  onClose();
                  onBuyNow(product);
                }}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '12px',
                  fontWeight: 900,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(22,163,74,0.35)'
                }}
              >
                ⚡ COMPRAR AGORA NO PIX
              </button>

              <button
                onClick={() => {
                  addToCart(product, 1);
                  onClose();
                }}
                style={{
                  background: '#0f172a',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px 20px',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '0.90rem',
                  cursor: 'pointer'
                }}
              >
                🛒 + Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

