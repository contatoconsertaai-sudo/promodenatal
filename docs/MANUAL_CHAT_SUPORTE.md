# 🎅 Manual do Assistente Inteligente: Bia • Brinkids IA (Especial de Natal)

Este documento descreve o funcionamento do novo Chatbot Inteligente da **Brinkids Store** (`src/components/SupportChat.jsx`).

---

## 1. Identidade e Visual Natalino
- **Nome da Assistente:** **Bia • Brinkids IA** (Consultora de Presentes & Suporte Online).
- **Design de Natal:** Cabeçalho com gradiente vermelho natalino (`#991b1b` -> `#dc2626`), borda dourada (`#fde047`), indicador online verde em tempo real e botão flutuante temático `🎅 Ajuda Brinkids • Natal`.

---

## 2. Inteligência de Recomendação e Busca nos 102 Produtos
Diferente de um chat estático comum, a **Bia** está conectada diretamente ao banco de dados de **102 produtos** (`src/data/products.js`):

1. **Consultor de Presentes por Idade:**
   - Botões interativos dentro da conversa (`👶 0 a 12 meses`, `🧸 1 a 2 anos`, `🎨 2 a 3 anos`, `🚀 3 a 4 anos`, `🌟 + de 4 anos`) que exibem imediatamente os brinquedos ideais para aquela faixa etária.
2. **Busca Natural por Palavra-Chave:**
   - Se o cliente digitar qualquer termo livre (ex: *"quero uma câmera que imprime foto"*, *"tem bebê reborn?"*, *"livro de inglês"*, *"presente até 100 reais"*, *"pista de dinossauro"*), a IA analisa o catálogo de 102 produtos e retorna **Cards Interativos de Produtos** dentro do balão de mensagem.
3. **Compra Direta no Pix dentro do Chat:**
   - Cada produto recomendado pela IA no chat possui foto, preço promocional no Pix, selo de desconto e o botão **`⚡ Comprar no Pix`**, que abre imediatamente o modal da **SyncPay** já configurado com aquele produto.
   - Também possui o botão **`Ver +`** para abrir a galeria de fotos e especificações completas sem sair da página.
4. **Respostas Automáticas de Suporte:**
   - Responde dúvidas sobre Prazo de Entrega (7 a 14 dias úteis), Frete Grátis, Código de Rastreio dos Correios, pagamento Pix via SyncPay e Garantia de 30 dias.
