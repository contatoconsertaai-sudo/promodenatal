import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from '../data/products';

const QUICK_TOPICS = [
  {
    id: 'sugestao-idade',
    chip: '🎅 Indicar Presente por Idade',
    question: 'Quero uma indicação de presente de Natal por idade!'
  },
  {
    id: 'mais-vendidos',
    chip: '🏆 Top Mais Vendidos de Natal',
    question: 'Quais são os brinquedos mais vendidos de Natal na Brinkids?'
  },
  {
    id: 'montessori',
    chip: '🧠 Brinquedos Montessori',
    question: 'Quais brinquedos educativos Montessori vocês têm?'
  },
  {
    id: 'prazo',
    chip: '🚚 Prazo & Entrega de Natal',
    question: 'Qual é o prazo de entrega? Chega antes do Natal?'
  },
  {
    id: 'pagamento',
    chip: '⚡ Como pagar no Pix?',
    question: 'Como funciona o desconto de Natal no Pix e o código de rastreio?'
  },
  {
    id: 'garantia',
    chip: '🛡️ Garantia Brinkids',
    question: 'Como funciona a garantia de 30 dias da Brinkids?'
  }
];

const AGE_SHORTCUTS = [
  { label: '👶 0 a 12 meses', cat: '0-6m', text: 'Tenho um bebê de até 1 ano, o que indica?' },
  { label: '🧸 1 a 2 anos', cat: '1ano', text: 'Quero sugestões para criança de 1 a 2 anos' },
  { label: '🎨 2 a 3 anos', cat: '2anos', text: 'Quero brinquedos para 2 a 3 anos' },
  { label: '🚀 3 a 4 anos', cat: '3anos', text: 'Quero presentes de Natal para 3 a 4 anos' },
  { label: '🌟 + de 4 anos', cat: '4anos+', text: 'Quero brinquedos para mais de 4 anos' }
];

// Motor Inteligente de Respostas da Assistente Brinkids
function generateSmartReply(userText) {
  const q = userText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // 1. Pergunta sobre indicação por idade (abre seletor de idades)
  if (q.includes('indicar presente por idade') || (q.includes('idade') && !q.match(/\d/))) {
    return {
      text: 'Com certeza! 🎅 Na **Brinkids**, nossos brinquedos são divididos por fase de desenvolvimento infantil.\n\nSelecione abaixo a **idade da criança** ou digite o que você procura (ex: *"livro falante"*, *"câmera"*, *"bebê reborn"*, *"carrinho"*):',
      showAgeButtons: true
    };
  }

  // 2. Filtro por faixa etária específica
  if (q.includes('ate 1 ano') || q.includes('0 a 6') || q.includes('6 meses') || q.includes('recem nascido') || q.includes('bebe')) {
    const items = PRODUCTS.filter(p => p.category === '0-6m' || p.category === '6-12m').slice(0, 3);
    return {
      text: '👶 Para bebês de **0 a 12 meses**, os brinquedos sensoriais, musicais e de estímulo para engatinhar são os favoritos de Natal! Veja nossas 3 melhores escolhas com desconto no Pix:',
      products: items
    };
  }

  if (q.includes('1 a 2 anos') || q.includes('1 ano')) {
    const items = PRODUCTS.filter(p => p.category === '1ano').slice(0, 3);
    return {
      text: '🧸 Para **1 a 2 anos**, recomendamos brinquedos que estimulam a coordenação motora, fala e equilíbrio! Olha esses sucessos da Brinkids:',
      products: items
    };
  }

  if (q.includes('2 a 3 anos') || q.includes('2 anos')) {
    const items = PRODUCTS.filter(p => p.category === '2anos').slice(0, 3);
    return {
      text: '🎨 Na fase de **2 a 3 anos**, os brinquedos **Montessori e Bilíngues** fazem um sucesso incrível longe das telas! Veja os mais pedidos:',
      products: items
    };
  }

  if (q.includes('3 a 4 anos') || q.includes('3 anos')) {
    const items = PRODUCTS.filter(p => p.category === '3anos').slice(0, 3);
    return {
      text: '🚀 Para **3 a 4 anos**, brinquedos criativos, câmeras infantis, pistas e barracas são os presentes de Natal mais amados:',
      products: items
    };
  }

  if (q.includes('mais de 4 anos') || q.includes('4 anos') || q.includes('5 anos') || q.includes('6 anos') || q.includes('7 anos') || q.includes('8 anos')) {
    const items = PRODUCTS.filter(p => p.category === '4anos+').slice(0, 3);
    return {
      text: '🌟 Para crianças de **4 anos ou mais**, kits de construção magnética, caneta 3D, carrinhos de controle remoto e conjuntos estilosos são imbatíveis:',
      products: items
    };
  }

  // 3. Mais vendidos de Natal
  if (q.includes('mais vendidos') || q.includes('campeoes') || q.includes('melhores presentes') || q.includes('destaque')) {
    const items = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);
    return {
      text: '🏆 Estes são os **Campeões de Vendas do Natal Brinkids**! Todos têm Frete Grátis e liberação imediata de rastreio ao pagar no Pix:',
      products: items
    };
  }

  // 4. Montessori / Educativos
  if (q.includes('montessori') || q.includes('educativo') || q.includes('pedagogico') || q.includes('madeira')) {
    const items = PRODUCTS.filter(p =>
      p.title.toLowerCase().includes('montessori') ||
      p.title.toLowerCase().includes('educativo') ||
      p.title.toLowerCase().includes('livro')
    ).slice(0, 4);
    return {
      text: '🧠 A linha **Montessori & Educativos da Brinkids** foi selecionada para tirar as crianças do celular e desenvolver lógica, foco e fala:',
      products: items
    };
  }

  // 5. Prazo de entrega e Rastreio
  if (q.includes('prazo') || q.includes('entrega') || q.includes('frete') || q.includes('chega') || q.includes('rastreio') || q.includes('correios')) {
    return {
      text: '🚚 **Frete Grátis & Entrega Garantida de Natal:**\n\n• **Prazo Expresso:** De **7 a 14 dias úteis** para qualquer CEP do Brasil.\n• **Código de Rastreio Imediato:** Assim que o pagamento Pix é aprovado pela SyncPay, nossa página libera na mesma hora o seu código dos Correios (ex: `XP849201745BR`)!',
      cta: '🎁 Escolher Presente com Frete Grátis'
    };
  }

  // 6. Pagamento Pix / Cupom / Desconto
  if (q.includes('pix') || q.includes('pagamento') || q.includes('desconto') || q.includes('cupom') || q.includes('pagar') || q.includes('syncpay')) {
    return {
      text: '⚡ **Pagamento Instantâneo via SyncPay Pix:**\n\n1. Escolha qualquer um dos **93 produtos exclusivos da Brinkids** ou adicione vários ao carrinho.\n2. Clique em **Comprar Agora no Pix** e preencha seu endereço de entrega.\n3. O QR Code e o código Pix Copia e Cola são gerados na hora com **até 52% de desconto de Natal**!\n4. Pagou, aprovou em 3 segundos!',
      cta: '⚡ Ver Ofertas com Desconto no Pix'
    };
  }

  // 7. Garantia / Segurança / Troca
  if (q.includes('garantia') || q.includes('seguro') || q.includes('confiavel') || q.includes('troca') || q.includes('devolucao')) {
    return {
      text: '🛡️ **Compra 100% Protegida na Brinkids Store:**\n\n• **+19 mil famílias** atendidas em todo o Brasil.\n• **Garantia de 30 Dias:** Se não amar o produto, devolvemos 100% do seu dinheiro.\n• **Materiais Seguros:** Todos os brinquedos são atóxicos, livres de BPA e certificados.',
      cta: '🛒 Comprar com Garantia Total'
    };
  }

  // 8. Busca inteligente por nome de produto no catálogo de 102 itens!
  const stopWords = ['quero', 'tem', 'qual', 'quais', 'para', 'com', 'uma', 'uns', 'dos', 'das', 'que', 'preco', 'valor', 'quanto', 'custa', 'sobre', 'ver', 'mostrar', 'procuro', 'busco', 'brinquedo', 'infantil', 'crianca', 'natal', 'presente'];
  const keywords = q
    .split(/\s+/)
    .map(w => w.replace(/[^a-z0-9]/g, ''))
    .filter(w => w.length >= 3 && !stopWords.includes(w));

  if (keywords.length > 0) {
    const matched = PRODUCTS.filter(p => {
      const target = `${p.title} ${p.subtitle} ${p.categoryLabel}`.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return keywords.some(kw => target.includes(kw));
    }).slice(0, 4);

    if (matched.length > 0) {
      return {
        text: `🎁 Encontrei **${matched.length} ${matched.length === 1 ? 'opção perfeita' : 'opções incríveis'}** na Brinkids para o que você procura! Você pode clicar em **Comprar no Pix** para garantir com desconto de Natal:`,
        products: matched
      };
    }
  }

  // 9. Produtos baratos / até R$ 100
  if (q.includes('barato') || q.includes('economico') || q.includes('100')) {
    const cheap = PRODUCTS.filter(p => p.price <= 99.99).slice(0, 4);
    return {
      text: '💰 Separamos ofertas especiais de Natal na Brinkids por **menos de R$ 100,00 no Pix** com Frete Grátis:',
      products: cheap
    };
  }

  // 10. Resposta padrão inteligente com sugestões
  const top3 = PRODUCTS.filter(p => p.isBestSeller).slice(0, 3);
  return {
    text: '😊 Sou a **Bia, Inteligência Artificial da Brinkids Store**! Temos **93 brinquedos e produtos exclusivos** na Promoção de Natal com Frete Grátis e pagamento seguro via Pix.\n\nVocê pode me perguntar por qualquer brinquedo (ex: *"Livro Falante"*, *"Câmera"*, *"Patinho"*, *"Bebê Reborn"*, *"Pijama"*) ou conferir nossos campeões abaixo:',
    products: top3,
    showAgeButtons: true
  };
}

export default function SupportChat({ onOpenCheckout, onOpenDetails }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Olá! 🎅✨ Sou a **Bia**, Assistente Inteligente da **Brinkids Store**!\n\nEstou aqui para te ajudar a encontrar o presente de Natal perfeito em nosso catálogo de **93 produtos exclusivos**, tirar dúvidas ou gerar seu Pix com desconto. Como posso ajudar hoje?',
      time: 'Agora',
      showAgeButtons: true
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

  const processUserQuery = (questionText) => {
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: questionText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateSmartReply(questionText);
      setIsTyping(false);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: reply.text,
        products: reply.products || null,
        cta: reply.cta || null,
        showAgeButtons: reply.showAgeButtons || false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 550);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const text = inputText.trim();
    setInputText('');
    processUserQuery(text);
  };

  const formatMessageText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="support-chat-wrapper" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9998, fontFamily: 'inherit' }}>
      {/* Janela do Chat */}
      {isOpen && (
        <div
          className="support-chat-window"
          style={{
            width: '380px',
            maxWidth: 'calc(100vw - 32px)',
            height: '560px',
            maxHeight: 'calc(100vh - 100px)',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 20px 45px rgba(153, 27, 27, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '2px solid #fecaca',
            marginBottom: '12px',
            animation: 'fadeInUp 0.25s ease-out'
          }}
        >
          {/* Cabeçalho Natalino Brinkids */}
          <div
            style={{
              background: 'linear-gradient(135deg, #991b1b 0%, #dc2626 60%, #b91c1c 100%)',
              color: '#ffffff',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '2px solid #fde047'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.35rem',
                    border: '2px solid #fde047',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                >
                  🎅
                </div>
                <span
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    right: '0',
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#22c55e',
                    borderRadius: '50%',
                    border: '2px solid #ffffff'
                  }}
                />
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: '0.96rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Bia • Brinkids IA</span>
                  <span style={{ fontSize: '0.66rem', backgroundColor: '#fde047', color: '#991b1b', padding: '2px 6px', borderRadius: '6px', fontWeight: 900 }}>
                    NATAL 🎄
                  </span>
                </div>
                <div style={{ fontSize: '0.73rem', color: '#fef2f2', opacity: 0.95 }}>
                  Consultora de Presentes & Suporte Online
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.18)',
                border: 'none',
                color: '#ffffff',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.95rem',
                fontWeight: 800
              }}
              aria-label="Fechar chat"
            >
              ✕
            </button>
          </div>

          {/* Lista de Mensagens */}
          <div
            style={{
              flex: 1,
              padding: '14px',
              overflowY: 'auto',
              backgroundColor: '#fffafa',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: '90%',
                    padding: '11px 14px',
                    borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                    background: msg.sender === 'user'
                      ? 'linear-gradient(135deg, #dc2626, #991b1b)'
                      : '#ffffff',
                    color: msg.sender === 'user' ? '#ffffff' : '#1e293b',
                    fontSize: '0.83rem',
                    lineHeight: '1.48',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    border: msg.sender === 'user' ? 'none' : '1px solid #fecaca',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {formatMessageText(msg.text)}

                  {/* Botões rápidos de Idade dentro da mensagem */}
                  {msg.showAgeButtons && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                      {AGE_SHORTCUTS.map((ag, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => processUserQuery(ag.text)}
                          style={{
                            background: '#fef2f2',
                            color: '#991b1b',
                            border: '1px solid #fca5a5',
                            borderRadius: '14px',
                            padding: '5px 10px',
                            fontSize: '0.73rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {ag.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Cards Interativos de Produtos Recomendados pela IA */}
                  {msg.products && msg.products.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                      {msg.products.map((prod) => (
                        <div
                          key={prod.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            padding: '8px'
                          }}
                        >
                          <img
                            src={prod.primaryImage}
                            alt={prod.title}
                            style={{
                              width: '50px',
                              height: '50px',
                              borderRadius: '8px',
                              objectFit: 'cover',
                              flexShrink: 0,
                              cursor: 'pointer'
                            }}
                            onClick={() => {
                              if (onOpenDetails) onOpenDetails(prod);
                            }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                fontSize: '0.76rem',
                                fontWeight: 800,
                                color: '#0f172a',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {prod.title}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                              <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#15803d' }}>
                                R$ {prod.price.toFixed(2).replace('.', ',')}
                              </span>
                              <span style={{ fontSize: '0.66rem', background: '#dcfce7', color: '#166534', padding: '1px 5px', borderRadius: '4px', fontWeight: 800 }}>
                                {prod.discountBadge}
                              </span>
                            </div>
                            <div style={{ display: 'flex', gap: '6px', marginTop: '5px' }}>
                              <button
                                type="button"
                                onClick={() => {
                                  setIsOpen(false);
                                  if (onOpenCheckout) onOpenCheckout(prod);
                                }}
                                style={{
                                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                                  color: '#ffffff',
                                  border: 'none',
                                  borderRadius: '6px',
                                  padding: '4px 8px',
                                  fontSize: '0.7rem',
                                  fontWeight: 800,
                                  cursor: 'pointer'
                                }}
                              >
                                ⚡ Comprar no Pix
                              </button>
                              {onOpenDetails && (
                                <button
                                  type="button"
                                  onClick={() => onOpenDetails(prod)}
                                  style={{
                                    background: '#ffffff',
                                    color: '#334155',
                                    border: '1px solid #cbd5e1',
                                    borderRadius: '6px',
                                    padding: '4px 8px',
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                  }}
                                >
                                  Ver +
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Geral */}
                  {msg.cta && (
                    <div style={{ marginTop: '10px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          const el = document.getElementById('catalogo-completo');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{
                          background: 'linear-gradient(135deg, #16a34a, #15803d)',
                          color: '#ffffff',
                          border: 'none',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          width: '100%',
                          boxShadow: '0 2px 6px rgba(22, 163, 74, 0.3)'
                        }}
                      >
                        {msg.cta}
                      </button>
                    </div>
                  )}
                </div>
                <span style={{ fontSize: '0.64rem', color: '#94a3b8', marginTop: '3px', marginInline: '4px' }}>
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  backgroundColor: '#fee2e2',
                  borderRadius: '12px',
                  width: 'fit-content',
                  fontSize: '0.74rem',
                  color: '#991b1b',
                  fontWeight: 700
                }}
              >
                <span>🎅 Bia (Brinkids) está digitando...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Atalhos Rápidos */}
          <div
            style={{
              padding: '8px 10px',
              backgroundColor: '#fff1f2',
              borderTop: '1px solid #fecdd3',
              display: 'flex',
               gap: '6px',
              overflowX: 'auto',
              whiteSpace: 'nowrap'
            }}
          >
            {QUICK_TOPICS.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => processUserQuery(topic.question)}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#991b1b',
                  border: '1px solid #fca5a5',
                  borderRadius: '16px',
                  padding: '5px 10px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                {topic.chip}
              </button>
            ))}
          </div>

          {/* Campo de Digitação */}
          <form
            onSubmit={handleCustomSubmit}
            style={{
              display: 'flex',
              padding: '10px',
              backgroundColor: '#ffffff',
              borderTop: '1px solid #fecaca',
              gap: '8px'
            }}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Busque um brinquedo ou tire sua dúvida..."
              style={{
                flex: 1,
                border: '1.5px solid #fca5a5',
                borderRadius: '20px',
                padding: '9px 14px',
                fontSize: '0.82rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #dc2626, #991b1b)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.95rem',
                flexShrink: 0
              }}
              aria-label="Enviar mensagem"
            >
              ➤
            </button>
          </form>
        </div>
      )}

      {/* Botão Flutuante Natalino Brinkids */}
      <button
        type="button"
        className="support-chat-fab"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
          color: '#ffffff',
          border: '2px solid #fde047',
          borderRadius: '50px',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          boxShadow: '0 8px 25px rgba(220, 38, 38, 0.45)',
          fontWeight: 800,
          fontSize: '0.88rem',
          position: 'relative',
          marginLeft: 'auto'
        }}
      >
        <span style={{ fontSize: '1.3rem' }}>{isOpen ? '✕' : '🎅'}</span>
        <span>{isOpen ? 'Fechar Ajuda' : 'Ajuda Brinkids • Natal'}</span>

        {hasUnread && !isOpen && (
          <span
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              backgroundColor: '#16a34a',
              color: '#ffffff',
              fontSize: '0.68rem',
              fontWeight: 900,
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #ffffff'
            }}
          >
            1
          </span>
        )}
      </button>
    </div>
  );
}
