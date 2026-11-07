import React, { useState, useEffect, useRef } from 'react';

const FAQ_LIST = [
  {
    id: 'prazo',
    chip: '🚚 Prazo de Entrega',
    question: 'Qual é o prazo de entrega dos brinquedos?',
    answer: 'Nosso prazo de envio expresso é de **7 a 14 dias úteis** com Frete Grátis para todo o Brasil. Assim que o Pix é compensado, o pedido entra em separação e você recebe o código de rastreio oficial dos Correios na mesma hora!',
    cta: '🎁 Ver Todas as Ofertas'
  },
  {
    id: 'pagamento',
    chip: '⚡ Desconto no Pix',
    question: 'Como funciona o pagamento com desconto no Pix?',
    answer: 'O pagamento é 100% seguro processado via Banco Central / SyncPay. Na Black Friday da Brinkids, todos os brinquedos possuem desconto exclusivo no Pix e liberação imediata do código de rastreio!',
    cta: '⚡ Comprar no Pix'
  },
  {
    id: 'idade',
    chip: '👶 Indicação por Idade',
    question: 'Quais brinquedos são indicados para cada idade?',
    answer: 'Temos opções selecionadas por pedagogos:\n• **0 a 1 ano:** Patinho Dançante, Caranguejo Fujão\n• **1 a 3 anos:** Livro Falante Bilíngue, Girafas Divertidas\n• **3 anos ou mais:** Câmera Digital Infantil, Blocos Magnéticos Montessori 3D',
    cta: '🧸 Ver por Idade'
  },
  {
    id: 'rastreio',
    chip: '📦 Código de Rastreio',
    question: 'Como recebo meu código de rastreio?',
    answer: 'Você não precisa esperar dias por e-mail! Assim que o Pix é pago, o próprio site atualiza automaticamente e abre a **Página Oficial de Rastreio** com o código dos Correios (ex: `XP849201745BR`) e status em tempo real.',
    cta: '🔍 Ver Central de Rastreio'
  },
  {
    id: 'garantia',
    chip: '🛡️ Garantia de 30 Dias',
    question: 'Os brinquedos têm garantia?',
    answer: 'Com certeza! Você tem **30 dias de garantia incondicional**. Se você ou seu filho(a) não amarem o produto, devolvemos 100% do valor pago sem nenhuma burocracia.',
    cta: '🛒 Comprar com Garantia Total'
  }
];

export default function SupportChat({ onOpenCheckout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Olá! 👋 Sou a **Ana**, especialista da Brinkids Store. Como posso te ajudar a escolher o brinquedo educativo ideal hoje?',
      time: 'Agora'
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [messages, isOpen, isTyping]);

  const handleSendFaq = (faq) => {
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: faq.question,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: faq.answer,
        cta: faq.cta,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleCustomSend = (e) => {
    e.preventDefault();
    const text = inputText.trim();
    if (!text) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    const lower = text.toLowerCase();

    setTimeout(() => {
      setIsTyping(false);
      let replyText = '';
      let replyCta = '🛒 Comprar no Pix por R$ 99,90';

      if (lower.includes('prazo') || lower.includes('tempo') || lower.includes('entrega') || lower.includes('chega') || lower.includes('natal') || lower.includes('dia')) {
        replyText = 'O prazo de entrega é de **7 a 14 dias úteis** para todo o Brasil, com entrega garantida antes do Natal! O código de rastreio dos Correios é liberado imediatamente após o pagamento.';
        replyCta = '🎁 Garantir Meu Dogbot de Natal';
      } else if (lower.includes('pix') || lower.includes('valor') || lower.includes('preco') || lower.includes('preço') || lower.includes('pagar') || lower.includes('cartao') || lower.includes('cartão')) {
        replyText = 'A promoção de Natal é exclusiva no **Pix por R$ 99,90** (67% de desconto). O QR Code é gerado na hora com total segurança via SyncPay!';
        replyCta = '⚡ Gerar Pix de R$ 99,90';
      } else if (lower.includes('rastreio') || lower.includes('codigo') || lower.includes('código') || lower.includes('rastrear')) {
        replyText = 'Assim que o seu Pix for pago, a **Página Oficial com o Código de Rastreio** abre automaticamente na sua tela na mesma hora!';
        replyCta = '📦 Ir para o Checkout';
      } else if (lower.includes('bateria') || lower.includes('carreg') || lower.includes('usb') || lower.includes('pilha')) {
        replyText = 'O robô possui **bateria recarregável de lítio** e acompanha cabo USB-C rápido. O controle utiliza 2 pilhas AAA comuns.';
      } else if (lower.includes('idade') || lower.includes('ano') || lower.includes('crianca') || lower.includes('criança')) {
        replyText = 'O Smart Pet Dogbot é recomendado para crianças **a partir de 3 anos**, com material ABS atóxico ultra resistente e cantos arredondados.';
      } else if (lower.includes('garantia') || lower.includes('troca') || lower.includes('devolv')) {
        replyText = 'Você tem **30 dias de garantia incondicional**. Se não gostar por qualquer motivo, devolvemos 100% do seu pagamento!';
      } else {
        replyText = 'Entendi perfeitamente! O Smart Pet Dogbot está em **promoção especial de Natal por apenas R$ 99,90** com frete prioritário de 7 a 14 dias úteis e código de rastreio imediato.';
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: replyText,
        cta: replyCta,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 700);
  };

  const formatText = (txt) => {
    // Transforma negrito **texto** em <strong>
    const parts = txt.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      {/* Botão Flutuante do Chat */}
      <div
        className="support-chat-float-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Tire suas dúvidas no Chat ao Vivo"
        style={{
          position: 'fixed',
          bottom: '82px',
          right: '20px',
          zIndex: 998,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'linear-gradient(135deg, #0077ff, #0056b3)',
          color: '#ffffff',
          padding: '12px 18px',
          borderRadius: '35px',
          boxShadow: '0 8px 24px rgba(0, 119, 255, 0.35)',
          transition: 'all 0.3s ease',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '1.4rem' }}>💬</span>
          <span
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-4px',
              width: '10px',
              height: '10px',
              backgroundColor: '#10b981',
              borderRadius: '50%',
              border: '2px solid #ffffff'
            }}
          />
        </div>

        <div style={{ textAlign: 'left', lineHeight: '1.2' }}>
          <div style={{ fontWeight: 800, fontSize: '0.85rem' }}>Dúvidas? Fale Conosco</div>
          <div style={{ fontSize: '0.70rem', color: '#bfdbfe' }}>🟢 Online agora</div>
        </div>

        {hasUnread && !isOpen && (
          <span
            style={{
              background: '#ef4444',
              color: '#fff',
              fontSize: '0.70rem',
              fontWeight: 800,
              padding: '2px 7px',
              borderRadius: '12px',
              marginLeft: '4px',
              animation: 'pulse 1.5s infinite'
            }}
          >
            1
          </span>
        )}
      </div>

      {/* Janela de Conversa do Chat */}
      {isOpen && (
        <div
          className="support-chat-window"
          style={{
            position: 'fixed',
            bottom: '150px',
            right: '20px',
            width: '360px',
            maxWidth: 'calc(100vw - 30px)',
            height: '520px',
            maxHeight: 'calc(100vh - 180px)',
            background: '#ffffff',
            borderRadius: '18px',
            boxShadow: '0 20px 45px rgba(15, 23, 42, 0.22)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
            fontFamily: 'Inter, sans-serif',
            animation: 'fadeInUp 0.25s ease-out'
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0f172a, #1e293b)',
              color: '#ffffff',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '2px solid #0077ff'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0077ff, #00c6ff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
              >
                🎄
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.90rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Ana — Suporte Smart Pet
                  <span style={{ fontSize: '0.72rem', background: '#059669', padding: '1px 6px', borderRadius: '4px' }}>Oficial</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>🟢 Resposta instantânea</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#cbd5e1',
                width: '28px',
                height: '28px',
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

          {/* Área de Mensagens */}
          <div
            style={{
              flex: 1,
              padding: '14px',
              overflowY: 'auto',
              background: '#f8fafc',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {/* Aviso de Natal */}
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '10px',
                padding: '8px 12px',
                fontSize: '0.75rem',
                color: '#991b1b',
                textAlign: 'center',
                fontWeight: 600
              }}
            >
              🎅 Lote de Natal Prioritário com Envio em 7 a 14 dias úteis!
            </div>

            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '10px 14px',
                    borderRadius: m.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                    background: m.sender === 'user' ? '#0077ff' : '#ffffff',
                    color: m.sender === 'user' ? '#ffffff' : '#1e293b',
                    fontSize: '0.84rem',
                    lineHeight: '1.45',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    border: m.sender === 'user' ? 'none' : '1px solid #e2e8f0',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {formatText(m.text)}

                  {/* Botão de Ação CTA dentro da resposta do bot */}
                  {m.cta && onOpenCheckout && (
                    <div style={{ marginTop: '10px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          onOpenCheckout();
                        }}
                        style={{
                          background: 'linear-gradient(135deg, #10b981, #059669)',
                          color: '#ffffff',
                          border: 'none',
                          padding: '7px 12px',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          width: '100%',
                          boxShadow: '0 2px 6px rgba(16, 185, 129, 0.3)'
                        }}
                      >
                        {m.cta}
                      </button>
                    </div>
                  )}
                </div>
                <span style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '3px', marginInline: '4px' }}>
                  {m.time}
                </span>
              </div>
            ))}

            {/* Indicador de Digitando */}
            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: '#e2e8f0', borderRadius: '12px', width: 'fit-content' }}>
                <span style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 600 }}>Ana está digitando</span>
                <span style={{ display: 'inline-flex', gap: '3px' }}>
                  <span style={{ width: '4px', height: '4px', background: '#64748b', borderRadius: '50%' }} />
                  <span style={{ width: '4px', height: '4px', background: '#64748b', borderRadius: '50%' }} />
                  <span style={{ width: '4px', height: '4px', background: '#64748b', borderRadius: '50%' }} />
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Pílulas de Dúvidas Rápidas (Chips) */}
          <div
            style={{
              padding: '8px 12px',
              background: '#ffffff',
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              whiteSpace: 'nowrap'
            }}
          >
            {FAQ_LIST.map((faq) => (
              <button
                key={faq.id}
                onClick={() => handleSendFaq(faq)}
                style={{
                  background: '#eff6ff',
                  color: '#0077ff',
                  border: '1px solid #bfdbfe',
                  padding: '5px 10px',
                  borderRadius: '16px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = '#dbeafe')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#eff6ff')}
              >
                {faq.chip}
              </button>
            ))}
          </div>

          {/* Campo de Entrada de Mensagem */}
          <form
            onSubmit={handleCustomSend}
            style={{
              padding: '10px 12px',
              background: '#ffffff',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <input
              type="text"
              placeholder="Digite sua dúvida aqui..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                flex: 1,
                padding: '9px 12px',
                border: '1px solid #cbd5e1',
                borderRadius: '20px',
                fontSize: '0.82rem',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              style={{
                background: inputText.trim() ? '#0077ff' : '#cbd5e1',
                color: '#ffffff',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: inputText.trim() ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                flexShrink: 0
              }}
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}

