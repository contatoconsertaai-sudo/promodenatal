import React from 'react';
import { CartProvider } from './context/CartContext';
import StoreHome from './components/store/StoreHome';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <StoreHome />
      </div>
    </CartProvider>
  );
}

export default App;

