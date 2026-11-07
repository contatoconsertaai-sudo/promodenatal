import React from 'react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer({ onCheckoutCart }) {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotal,
    totalSavings
  } = useCart();

  if (!isCartOpen) return null;

  // Meta de brinde: R$ 180,00
  const giftThreshold = 180;
  const progressPercent = Math.min(100, Math.round((subtotal / giftThreshold) * 100));
  const diffToGift = (giftThreshold - subtotal).toFixed(2).replace('.', ',');

  return (
    <div
      className="cart-drawer-backdrop"
      onClick={() => setIsCartOpen(false)}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div
        className="cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '420px',
          maxWidth: '100vw',
          height: '100vh',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 35px rgba(0, 0, 0, 0.25)',
          animation: 'slideInRight 0.25s ease-out'
        }}
      >
        {/* Header do Carrinho */}
        <div
          style={{
            padding: '18px 20px',
            borderBottom: '2px solid #fde047',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #991b1b, #dc2626)',
            color: '#ffffff'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.4rem' }}>🎁</span>
            <div>
              <div style={{ fontWeight: 900, fontSize: '1rem' }}>Sacola de Natal Brinkids</div>
              <div style={{ fontSize: '0.72rem', color: '#fef2f2' }}>
                {totalItems} {totalItems === 1 ? 'presente selecionado' : 'presentes selecionados'}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#ffffff',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>
        </div>

        {/* Barra de Progresso de Brinde / Benefício */}
        <div style={{ background: '#f8fafc', padding: '12px 18px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, marginBottom: '6px' }}>
            <span>🎁 Brinde Exclusivo de Natal:</span>
            {subtotal >= giftThreshold ? (
              <span style={{ color: '#059669', fontWeight: 900 }}>🎉 PARABÉNS! BRINDE GARANTIDO!</span>
            ) : (
              <span style={{ color: '#0077ff' }}>Faltam R$ {diffToGift}</span>
            )}
          </div>
          <div style={{ height: '7px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: subtotal >= giftThreshold ? 'linear-gradient(90deg, #10b981, #059669)' : 'linear-gradient(90deg, #0077ff, #00c6ff)',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Lista de Itens do Carrinho */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.product.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '12px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  alignItems: 'center'
                }}
              >
                <img
                  src={item.product.primaryImage}
                  alt={item.product.title}
                  style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0, border: '1px solid #cbd5e1' }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: '0.86rem', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.product.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 800, marginTop: '2px' }}>
                    R$ {item.product.price.toFixed(2).replace('.', ',')}
                    <span style={{ fontSize: '0.70rem', color: '#94a3b8', textDecoration: 'line-through', marginLeft: '6px' }}>
                      R$ {item.product.oldPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  {/* Controles de Quantidade */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#ffffff' }}>
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        style={{ border: 'none', background: 'none', padding: '3px 8px', cursor: 'pointer', fontWeight: 800, color: '#475569' }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '0.80rem', fontWeight: 800, minWidth: '20px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        style={{ border: 'none', background: 'none', padding: '3px 8px', cursor: 'pointer', fontWeight: 800, color: '#475569' }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      style={{ border: 'none', background: 'none', color: '#ef4444', fontSize: '0.74rem', cursor: 'pointer', fontWeight: 700 }}
                    >
                      Remover
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'right', fontWeight: 900, fontSize: '0.90rem', color: '#0f172a' }}>
                  R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🛒</div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a', marginBottom: '6px' }}>
                Seu carrinho está vazio
              </div>
              <div style={{ fontSize: '0.82rem', marginBottom: '18px' }}>
                Aproveite as ofertas da Black Friday na Brinkids para garantir brinquedos educativos com desconto no Pix!
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Continuar Comprando
              </button>
            </div>
          )}
        </div>

        {/* Rodapé do Carrinho com Resumo e Botão de Checkout */}
        {cart.length > 0 && (
          <div style={{ padding: '18px 20px', borderTop: '1px solid #fecaca', background: '#fffafa' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#64748b', marginBottom: '4px' }}>
              <span>Economia de Natal Brinkids:</span>
              <span style={{ color: '#dc2626', fontWeight: 800 }}>- R$ {totalSavings.toFixed(2).replace('.', ',')}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#64748b', marginBottom: '8px' }}>
              <span>Frete Expresso de Natal:</span>
              <span style={{ color: '#16a34a', fontWeight: 800 }}>GRÁTIS HOJE</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', marginBottom: '14px', paddingTop: '8px', borderTop: '1px dashed #fca5a5' }}>
              <span>Total no PIX:</span>
              <span style={{ color: '#15803d' }}>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                onCheckoutCart();
              }}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #16a34a, #15803d)',
                color: '#ffffff',
                border: 'none',
                padding: '14px',
                borderRadius: '12px',
                fontWeight: 900,
                fontSize: '0.98rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(22,163,74,0.35)',
                transition: 'filter 0.2s'
              }}
              onMouseOver={(e) => (e.currentTarget.style.filter = 'brightness(1.06)')}
              onMouseOut={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
            >
              <span>⚡</span> FINALIZAR PEDIDO NO PIX • R$ {subtotal.toFixed(2).replace('.', ',')}
            </button>

            <div style={{ textAlign: 'center', fontSize: '0.70rem', color: '#64748b', marginTop: '10px' }}>
              🔒 Pagamento seguro via SyncPay • Liberação de Rastreio na tela na hora
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

