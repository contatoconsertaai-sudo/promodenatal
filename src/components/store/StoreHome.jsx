import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import HeroBanner from './HeroBanner';
import AgeCategories from './AgeCategories';
import ProductGrid from './ProductGrid';
import Testimonials from './Testimonials';
import WhyBuyWithUs from './WhyBuyWithUs';
import AboutUs from './AboutUs';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import ProductDetailModal from './ProductDetailModal';
import PixModal from '../PixModal';
import OrderTrackingPage from '../OrderTrackingPage';
import SupportChat from '../SupportChat';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

export default function StoreHome() {
  const {
    cart,
    subtotal,
    clearCart,
    selectedProductForModal,
    setSelectedProductForModal,
    checkoutTarget,
    setCheckoutTarget
  } = useCart();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [toast, setToast] = useState(null);

  // Prova Social em Tempo Real (Toasts automáticos Brinkids)
  useEffect(() => {
    const buyerNames = [
      'Mariana S.', 'Carlos E.', 'Fernanda L.', 'Juliana R.',
      'Rafael S.', 'Camila M.', 'Patricia B.', 'Rodrigo A.'
    ];
    const buyerCities = [
      'São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG',
      'Curitiba, PR', 'Brasília, DF', 'Campinas, SP', 'Porto Alegre, RS'
    ];

    const triggerToast = () => {
      const name = buyerNames[Math.floor(Math.random() * buyerNames.length)];
      const city = buyerCities[Math.floor(Math.random() * buyerCities.length)];
      const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];

      setToast({ name, city, product });
      setTimeout(() => setToast(null), 4500);
    };

    const firstTimer = setTimeout(triggerToast, 3500);
    const interval = setInterval(triggerToast, 16000);
    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, []);

  // Handler para compra direta ("COMPRAR AGORA")
  const handleOpenDirectCheckout = (product) => {
    setCheckoutTarget(product);
    setIsCheckoutOpen(true);
  };

  // Handler para compra do carrinho com múltiplos itens
  const handleOpenCartCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutTarget(null);
    setIsCheckoutOpen(true);
  };

  // Se o pedido foi confirmado ou se o cliente abriu o rastreio
  if (confirmedOrder) {
    return (
      <OrderTrackingPage
        orderInfo={confirmedOrder}
        onBackToStore={() => {
          setConfirmedOrder(null);
          clearCart();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="store-home-page" style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a' }}>
      {/* Barra de Navegação */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Banner Principal & Destaques de Confiança */}
      <HeroBanner />

      {/* Categorias por Idade (Escolha o presente ideal) */}
      <AgeCategories
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          const el = document.getElementById('catalogo-completo');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Catálogo de Produtos e Grade */}
      <ProductGrid
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenCheckout={handleOpenDirectCheckout}
        onOpenDetails={(product) => setSelectedProductForModal(product)}
      />

      {/* Quem comprou, aprovou (Depoimentos Verificados) */}
      <Testimonials />

      {/* Por Que Comprar Conosco? (Diferenciais) */}
      <WhyBuyWithUs />

      {/* Um Pouco Sobre Nós & Newsletter */}
      <AboutUs />

      {/* Rodapé Oficial da Brinkids */}
      <Footer
        onOpenTracking={() => {
          setConfirmedOrder({
            trackingCode: 'XP849201948BR',
            clientName: 'Cliente Brinkids',
            address: { street: 'Av. Paulista', number: '1000', city: 'São Paulo', state: 'SP' },
            items: [{ title: 'Livro Falante Bilíngue™', price: 149.90, quantity: 1 }]
          });
        }}
      />

      {/* Modal de Detalhes Rápidos do Produto */}
      {selectedProductForModal && (
        <ProductDetailModal
          product={selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
          onBuyNow={handleOpenDirectCheckout}
        />
      )}

      {/* Gaveta Lateral do Carrinho */}
      <CartDrawer onCheckoutCart={handleOpenCartCheckout} />

      {/* Modal de Checkout Pix SyncPay (Unificado) */}
      <PixModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={checkoutTarget}
        cartItems={checkoutTarget ? [] : cart}
        cartTotal={checkoutTarget ? checkoutTarget.price : subtotal}
        onPaymentConfirmed={(orderInfo) => {
          setIsCheckoutOpen(false);
          clearCart();
          setConfirmedOrder(orderInfo);
        }}
      />

      {/* Chat Interativo de Suporte Brinkids */}
      <SupportChat onOpenCheckout={() => handleOpenDirectCheckout(PRODUCTS[0])} />

      {/* Toast de Prova Social em Tempo Real */}
      {toast && (
        <div
          className="toast-container"
          style={{
            position: 'fixed',
            bottom: '84px',
            left: '20px',
            zIndex: 999,
            animation: 'fadeInUp 0.3s ease-out'
          }}
        >
          <div
            className="toast"
            style={{
              background: '#ffffff',
              padding: '12px 16px',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              borderLeft: '4px solid #0284c7',
              maxWidth: '340px'
            }}
          >
            <img
              src={toast.product.primaryImage}
              alt={toast.product.title}
              style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.82rem' }}>
                {toast.name} ({toast.city})
              </div>
              <div style={{ color: '#0284c7', fontWeight: 700, fontSize: '0.74rem' }}>
                Garantiu {toast.product.title.slice(0, 26)}... no Pix!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
