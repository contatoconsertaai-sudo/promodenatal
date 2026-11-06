# Manual do Chat Interativo de Suporte (FAQ Inteligente & Respostas Prontas)

Este documento descreve o funcionamento, a personalização de perguntas e respostas e a integração com o checkout Pix do **Chat de Suporte ao Cliente** implementado na loja do **Smart Pet Dogbot**.

---

## 1. Visão Geral do Chat

O chat de suporte foi desenvolvido para atender aos visitantes da loja em tempo real, eliminando qualquer dúvida ou insegurança antes de finalizar a compra natalina.

### Principais Características:
* **Posição Flutuante:** Fixo no canto inferior direito (`bottom: 82px; right: 20px`), acima da barra CTA fixa, visível em desktops, tablets e smartphones.
* **Badge de Notificação:** Ponto pulsante verde indicando atendente online e badge vermelho com contador de mensagem não lida.
* **Pílulas de Perguntas Frequentes (FAQ Chips):** O cliente clica em 1 botão e recebe a resposta imediata com simulação humanizada de digitação.
* **Respostas Inteligentes com Gatilho de Venda (CTA):** Cada resposta do chat traz um botão de conversão (ex: `[🎁 Garantir Meu Dogbot de Natal]`) que abre o formulário e gera o Pix direto na tela.
* **Reconhecimento de Palavras-Chave:** Se o cliente preferir digitar, o sistema identifica palavras-chave (*prazo*, *entrega*, *natal*, *pix*, *rastreio*, *garantia*, *bateria*, *idade*) e responde instantaneamente.

---

## 2. Catálogo de Perguntas Rápidas (FAQ)

| Chip / Botão | Pergunta do Cliente | Resposta Automatizada | Botão de Ação (CTA) |
| :--- | :--- | :--- | :--- |
| **🚚 Prazo de Entrega** | *Qual é o prazo de entrega? Chega antes do Natal?* | Envio prioritário de **7 a 14 dias úteis** com entrega garantida antes do Natal para todo o Brasil. Código de rastreio oficial emitido na hora pós-pagamento. | `🎁 Garantir Meu Presente de Natal` |
| **💳 Pix R$ 99,90** | *Como funciona o pagamento de R$ 99,90 no Pix?* | Pagamento 100% seguro via Pix processado pela SyncPay com **67% de desconto** (de R$ 299,90 por R$ 99,90). QR Code gerado em tempo real e aprovado em até 3 segundos. | `⚡ Comprar no Pix por R$ 99,90` |
| **📦 Código de Rastreio** | *Como recebo meu código de rastreio?* | A própria página atualiza e abre a **Página Oficial de Rastreio** com o código dos Correios (ex: `XP849201745BR`) e o endereço de entrega na mesma hora que o Pix é pago. | `🔍 Ir para o Checkout` |
| **🤖 O que ele faz?** | *O que o Smart Pet Dogbot faz?* | Comandos de voz, kung fu, dança, imita fazer xixi, late, toca músicas, olhos de LED expressivos. Opera por controle 2.4GHz (25m de alcance) e aplicativo Bluetooth. | `🐾 Quero o Meu Dogbot` |
| **🎁 O que vem na caixa?** | *O que vem dentro da embalagem original?* | Caixa original reforçada para presente com: Robô Smart Pet (31x16x19,5cm), Controle 2.4GHz, Bateria de lítio, Cabo USB-C e Manual em Português. | `📦 Pedir com Caixa Original` |
| **🛡️ Garantia** | *O produto tem garantia?* | **Garantia incondicional de 30 dias**. Se não gostar por qualquer motivo, devolução de 100% do dinheiro sem burocracia. | `🛡️ Comprar com Garantia Total` |

---

## 3. Estrutura dos Arquivos no Código

* **[`src/components/SupportChat.jsx`](file:///c:/Users/Pichau/Desktop/Ofertas/src/components/SupportChat.jsx):**  
  Componente React moderno com estado dinâmico de conversa, rolagem automática e integração direta com o modal de pagamento do Pix (`onOpenCheckout`).
* **[`src/components/ProductOffer.jsx`](file:///c:/Users/Pichau/Desktop/Ofertas/src/components/ProductOffer.jsx):**  
  Renderiza o componente do chat integrado à página principal React.
* **[`index.html`](file:///c:/Users/Pichau/Desktop/Ofertas/index.html) e [`Page exemplo oferta .html`](file:///c:/Users/Pichau/Desktop/Ofertas/Page%20exemplo%20oferta%20.html):**  
  Implementação em HTML5 e Vanilla JS nativo para compatibilidade imediata com execuções estáticas e servidores web.

---

## 4. Como Adicionar Novas Perguntas ou Alterar Respostas

Para adicionar ou alterar uma resposta pronta no componente React ([`SupportChat.jsx`](file:///c:/Users/Pichau/Desktop/Ofertas/src/components/SupportChat.jsx)), edite o array `FAQ_LIST`:

```javascript
{
  id: 'minha_duvida',
  chip: '❓ Minha Pergunta',
  question: 'Texto da pergunta que o cliente envia?',
  answer: 'Texto da resposta que a atendente virtual responderá...',
  cta: '👉 Botão de Ação Rápida'
}
```
No arquivo HTML (`index.html`), basta adicionar a mesma chave no objeto `chatFaqs` dentro da tag `<script>`.

