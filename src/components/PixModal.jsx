import React, { useState, useEffect } from 'react';
import { createPixOrder, checkPaymentStatus } from '../services/api';

function maskCpfValue(val) {
  let v = val.replace(/\D/g, '');
  if (v.length > 11) v = v.slice(0, 11);
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return v;
}

function maskPhoneValue(val) {
  let v = val.replace(/\D/g, '');
  if (v.length > 11) v = v.slice(0, 11);
  v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
  v = v.replace(/(\d)(\d{4})$/, '$1-$2');
  return v;
}

function maskCepValue(val) {
  let v = val.replace(/\D/g, '').slice(0, 8);
  if (v.length > 5) v = `${v.slice(0, 5)}-${v.slice(5)}`;
  return v;
}

export default function PixModal({ isOpen, onClose, product, onPaymentConfirmed }) {
  const [step, setStep] = useState('form'); // 'form' | 'loading' | 'pix'
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: ''
  });
  const [addressData, setAddressData] = useState({
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  });
  const [cepLoading, setCepLoading] = useState(false);
  const [pixData, setPixData] = useState({
    identifier: '',
    pixCode: '',
    qrCodeImage: '',
    trackingCode: ''
  });
  const [copySuccess, setCopySuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setStep('form');
      setCopySuccess(false);
      setErrorMessage('');
    }
  }, [isOpen]);

  // Polling em tempo real para verificar confirmação do Webhook SyncPay e abrir a Página de Rastreio
  useEffect(() => {
    let intervalId = null;

    if (isOpen && step === 'pix' && pixData.identifier) {
      intervalId = setInterval(async () => {
        try {
          const result = await checkPaymentStatus(pixData.identifier);
          if (result.status === 'paid') {
            clearInterval(intervalId);
            if (onPaymentConfirmed) {
              onPaymentConfirmed({
                identifier: pixData.identifier,
                trackingCode: result.trackingCode || pixData.trackingCode,
                client: result.client || formData,
                address: result.address || addressData,
                amount: product.price,
                paidAt: result.paidAt || new Date().toISOString()
              });
            }
          }
        } catch (err) {
          console.warn('Verificando status do pagamento...', err.message);
        }
      }, 3000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isOpen, step, pixData, formData, addressData, product.price, onPaymentConfirmed]);

  if (!isOpen) return null;

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cpf') {
      setFormData({ ...formData, cpf: maskCpfValue(value) });
    } else if (name === 'phone') {
      setFormData({ ...formData, phone: maskPhoneValue(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddressChange = async (e) => {
    const { name, value } = e.target;
    if (name === 'cep') {
      const masked = maskCepValue(value);
      setAddressData((prev) => ({ ...prev, cep: masked }));

      const cleanCep = masked.replace(/\D/g, '');
      if (cleanCep.length === 8) {
        setCepLoading(true);
        try {
          const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
          const data = await res.json();
          if (!data.erro) {
            setAddressData((prev) => ({
              ...prev,
              cep: masked,
              street: data.logradouro || prev.street,
              neighborhood: data.bairro || prev.neighborhood,
              city: data.localidade || prev.city,
              state: data.uf || prev.state
            }));
          }
        } catch (err) {
          console.warn('Erro ao buscar CEP:', err);
        } finally {
          setCepLoading(false);
        }
      }
    } else {
      setAddressData({ ...addressData, [name]: value });
    }
  };

  const handleGeneratePix = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setStep('loading');

    try {
      const response = await createPixOrder({
        amount: product.price,
        description: product.title,
        client: formData,
        address: addressData
      });

      setPixData({
        identifier: response.identifier,
        pixCode: response.pixCode,
        qrCodeImage: response.qrCodeImage,
        trackingCode: response.trackingCode
      });
      setStep('pix');
    } catch (err) {
      setErrorMessage(err.message || 'Erro ao gerar o código Pix.');
      setStep('form');
    }
  };

  const handleCopyPix = () => {
    if (!pixData.pixCode) return;
    navigator.clipboard.writeText(pixData.pixCode).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-content-wide" onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>&times;</span>

        {/* Indicador de Etapas */}
        <div className="checkout-steps-bar">
          <span className={step === 'form' ? 'active' : 'done'}>1. Dados & Endereço</span>
          <span>→</span>
          <span className={step === 'pix' || step === 'loading' ? 'active' : ''}>2. Pagamento PIX</span>
          <span>→</span>
          <span>3. Abrir Página de Rastreio</span>
        </div>

        {step === 'form' && (
          <div>
            <h2 style={{ color: '#0f172a', fontSize: '1.3rem' }}>Onde Devemos Entregar Seu Dogbot?</h2>

            {/* Aviso Claro de que o Código de Rastreio abre após o pagamento */}
            <div className="tracking-pre-notice">
              <span>📦</span>
              <div>
                <strong>LIBERAÇÃO IMEDIATA DO RASTREIO:</strong> Preencha seu endereço abaixo. Assim que você pagar o PIX de <strong>R$ 99,90</strong>, uma página abrirá <strong>automaticamente na sua tela com o seu CÓDIGO DE RASTREIO</strong>!
              </div>
            </div>

            {/* Resumo do Produto */}
            <div className="modal-product-summary">
              <img src={product.imageUrl} alt={product.title} />
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f172a' }}>
                  Cachorro Robô Smart Pet Dogbot (Caixa Original)
                </div>
                <div style={{ fontSize: '0.82rem', color: '#059669', fontWeight: 800 }}>
                  Valor Único no PIX: R$ {product.price.toFixed(2).replace('.', ',')} • Frete Grátis Expresso
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="modal-error-alert">
                ⚠️ {errorMessage}
              </div>
            )}

            <form onSubmit={handleGeneratePix} className="modal-form">
              <div className="form-section-subtitle">👤 1. Dados do Destinatário</div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Nome Completo *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    required
                    placeholder="Ex: Maria da Silva"
                    value={formData.name}
                    onChange={handleClientChange}
                  />
                </div>

                <div className="form-group">
                  <label>CPF (para Nota Fiscal e Rastreio) *</label>
                  <input
                    type="text"
                    name="cpf"
                    className="form-input"
                    required
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={handleClientChange}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    required
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleClientChange}
                  />
                </div>

                <div className="form-group">
                  <label>WhatsApp / Celular *</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    required
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={handleClientChange}
                  />
                </div>
              </div>

              <div className="form-section-subtitle" style={{ marginTop: '8px' }}>
                📍 2. Endereço de Entrega {cepLoading && <small style={{ color: '#0077ff' }}>(Buscando CEP...)</small>}
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label>CEP *</label>
                  <input
                    type="text"
                    name="cep"
                    className="form-input"
                    required
                    placeholder="00000-000"
                    value={addressData.cep}
                    onChange={handleAddressChange}
                  />
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label>Rua / Avenida *</label>
                  <input
                    type="text"
                    name="street"
                    className="form-input"
                    required
                    placeholder="Nome da rua ou avenida"
                    value={addressData.street}
                    onChange={handleAddressChange}
                  />
                </div>
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label>Número *</label>
                  <input
                    type="text"
                    name="number"
                    className="form-input"
                    required
                    placeholder="Nº"
                    value={addressData.number}
                    onChange={handleAddressChange}
                  />
                </div>

                <div className="form-group">
                  <label>Complemento</label>
                  <input
                    type="text"
                    name="complement"
                    className="form-input"
                    placeholder="Apto, Bloco, Casa"
                    value={addressData.complement}
                    onChange={handleAddressChange}
                  />
                </div>

                <div className="form-group">
                  <label>Bairro *</label>
                  <input
                    type="text"
                    name="neighborhood"
                    className="form-input"
                    required
                    placeholder="Seu bairro"
                    value={addressData.neighborhood}
                    onChange={handleAddressChange}
                  />
                </div>
              </div>

              <div className="form-row-3">
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label>Cidade *</label>
                  <input
                    type="text"
                    name="city"
                    className="form-input"
                    required
                    placeholder="Sua cidade"
                    value={addressData.city}
                    onChange={handleAddressChange}
                  />
                </div>

                <div className="form-group">
                  <label>Estado (UF) *</label>
                  <input
                    type="text"
                    name="state"
                    className="form-input"
                    required
                    maxLength={2}
                    placeholder="SP"
                    value={addressData.state}
                    onChange={(e) => setAddressData({ ...addressData, state: e.target.value.toUpperCase() })}
                  />
                </div>
              </div>

              <button type="submit" className="btn-buy" style={{ marginTop: '12px' }}>
                ⚡ GERAR PIX DE R$ {product.price.toFixed(2).replace('.', ',')} E LIBERAR RASTREIO
              </button>
            </form>
          </div>
        )}

        {step === 'loading' && (
          <div style={{ padding: '40px 10px' }}>
            <div className="spinner-pro"></div>
            <h3 style={{ marginTop: '16px', color: '#0f172a' }}>Registrando Endereço & Gerando PIX...</h3>
            <p style={{ fontSize: '0.86rem', color: '#64748b', marginTop: '4px' }}>
              Reservando sua unidade e preparando seu código de rastreio...
            </p>
          </div>
        )}

        {step === 'pix' && (
          <div>
            <span className="reserved-pill">✅ ENDEREÇO REGISTRADO • RASTREIO PRONTO PARA LIBERAÇÃO</span>
            <h2 style={{ marginTop: '10px', color: '#0f172a' }}>Pagamento Exclusivo via PIX</h2>
            <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
              Escaneie o QR Code no aplicativo do seu banco ou copie o código abaixo:
            </p>

            {/* Aviso importante na tela do PIX sobre abertura automática da página de rastreio */}
            <div className="tracking-pix-warning">
              🚨 <strong>NÃO FECHE ESTA TELA!</strong> Assim que você confirmar o pagamento de <strong>R$ 99,90</strong> no seu banco, esta janela abrirá <strong>AUTOMATICAMENTE</strong> a página com o seu <strong>CÓDIGO DE RASTREIO</strong> para entrega em <em>{addressData.street}, {addressData.number} ({addressData.city}/{addressData.state})</em>!
            </div>

            <div className="qr-placeholder">
              {pixData.qrCodeImage ? (
                <img src={pixData.qrCodeImage} alt="QR Code Pix SyncPay" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                <span>Carregando QR Code...</span>
              )}
            </div>

            <div className="pix-code-box">
              {pixData.pixCode}
            </div>

            <button
              type="button"
              className="btn-copy"
              onClick={handleCopyPix}
              style={{
                backgroundColor: copySuccess ? '#059669' : '#0f172a'
              }}
            >
              {copySuccess ? '✅ CÓDIGO PIX COPIADO COM SUCESSO!' : '📋 COPIAR CÓDIGO PIX (COPIA E COLA)'}
            </button>

            <div className="realtime-status-box">
              <span className="pulse-dot"></span>
              <span>Aguardando pagamento para abrir sua Página de Rastreio...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
