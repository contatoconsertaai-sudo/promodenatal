# 🧸 Documentação Oficial: Transformação Brinkids Store

Este documento detalha toda a arquitetura, identidade visual e catálogo implementados na loja, recriando com máxima fidelidade a experiência da **Brinkids Store** (`https://brinkidstore.com`), mantendo a integração nativa com o gateway **SyncPay** (Pix imediato + rastreio automático) e a esteira de deploy no **Render via Git**.

---

## 1. Identidade Visual e Solução Definitiva do Favicon

### Problema Identificado no Navegador (Ícone de Globo)
- **Causa Raiz:** Anteriormente, o favicon estava configurado unicamente como `favicon.svg` ou sem o cabeçalho correto `image/png` e `image/x-icon`. Navegadores baseados em Chromium (como Google Chrome) descartam favicons em formato SVG quando requisitam a aba padrão do desktop, revertendo para o ícone cinza de globo genérico (conforme evidenciado na primeira imagem enviada pelo usuário).
- **Solução Implementada:**
  1. Foram gerados e disponibilizados arquivos binários dedicados: `favicon.png` (PNG de alta resolução) e `favicon.ico` (ícone padrão de desktop).
  2. A tag `<head>` no `index.html` agora declara explicitamente os tipos compatíveis com 100% dos navegadores:
     ```html
     <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png">
     <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png">
     <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png">
     <link rel="shortcut icon" href="/favicon.ico">
     <link rel="apple-touch-icon" href="/favicon.png">
     ```
  3. No servidor Express (`server/server.js`), as rotas `/favicon.png`, `/favicon.ico` e `/favicon.svg` agora respondem com `Content-Type: image/png` e `image/x-icon` explícitos.
  4. O título da aba foi padronizado para:
     `Brinkids — Brinquedos Educativos e Pedagógicos Infantis`

---

## 2. Estrutura e Seções da Loja (Brinkids Store)

### 2.1 Barra Superior & Navbar (`Navbar.jsx`)
- **Banner Promoção de Natal:** `🎅 PROMOÇÃO DE NATAL BRINKIDS: ATÉ 52% OFF NO PIX IMEDIATO • 🎄 Frete Grátis para Todo o Brasil`
- **Logo Brinkids:** Carregado localmente via `/logo-brinkids.png` com fallback de alta disponibilidade.
- **Barra de Busca Dinâmica:** Pesquisa instantânea por nome do produto, descrição ou benefício pedagógico.
- **Botão da Sacola:** Badge dinâmico com contagem de itens em tempo real e abertura da gaveta lateral (sem links externos de WhatsApp ou cupons manuais, focando 100% na conversão direta via Pix e no Chatbot IA).

### 2.2 Hero Banner & Selos de Confiança (`HeroBanner.jsx`)
- Banner responsivo Desktop (1920x720) e Mobile (1080x640) com a arte oficial da Black Friday da Brinkids.
- Barra com 4 selos de confiança:
  - 🚚 **Frete Grátis Brasil** (Para todos os brinquedos)
  - ⚡ **Rastreio Imediato** (Código liberado na hora pós-Pix)
  - 🔒 **Compra 100% Segura** (Processada via SyncPay)
  - 🛡️ **Garantia de 30 Dias** (Devolução sem burocracia)

### 2.3 Coleções por Faixa Etária (`AgeCategories.jsx`)
- "Escolha o presente ideal" com ícones circulares extraídos da Brinkids:
  - `0-6 meses`
  - `6-12 meses`
  - `1 ano`
  - `2 anos`
  - `3 anos`
  - `+ 4 anos`
- Ao clicar em uma categoria, o catálogo filtra automaticamente os produtos recomendados.

### 2.4 Catálogo de Produtos (`ProductGrid.jsx` & `ProductCard.jsx`)
Produtos cadastrados com fotos reais, especificações completas, badges promocionais e preços sincronizados:
1. **Livro Falante Bilíngue™ - Português e Inglês** (De R$ 249,90 por **R$ 149,90**) - *#1 Mais Vendido*
2. **Patinho Infantil 3 em 1 - Canta, Dança e Acende Luzes** (De R$ 219,90 por **R$ 129,90**) - *Sucesso no TikTok*
3. **Girafas Divertidas – Gira e Estica | Pague 2 Leve 4** (De R$ 189,90 por **R$ 109,99**) - *Pague 2 Leve 4*
4. **Abelha Dançante Premium Infantil com Música e Luzes** (De R$ 219,90 por **R$ 129,99**) - *Mais Procurado*
5. **Caranguejo Fujão Interativo com Música, Luz e Movimento** (De R$ 249,90 por **R$ 149,90**) - *Sensor Anti-Obstáculo*
6. **Câmera Digital Infantil com Vídeo Full HD e Jogos** (De R$ 199,90 por **R$ 109,90**) - *Fotos Reais*
7. **Fale Inglês Brinkids – Cartões Interativos Falantes** (De R$ 219,90 por **R$ 129,99**) - *Alfabetização Bilíngue*
8. **Blocos Magnéticos Educativos Montessori 3D** (De R$ 329,90 por **R$ 199,99**) - *Método Montessori*
9. **Cachorro Robô Inteligente Smart Pet Dogbot** (De R$ 299,90 por **R$ 99,90**) - *Robô Interativo*

### 2.5 Quem Comprou, Aprovou (`Testimonials.jsx`)
Seção de prova social com avaliações reais de clientes da Brinkids e fotos dos produtos recebidos:
- **Rafael Silva (São Paulo, SP):** Livro Falante Bilíngue
- **Eliseu Bittencourt (Curitiba, PR):** Câmera Digital Infantil
- **Marta L. (Belo Horizonte, MG):** Livro Falante Bilíngue
- **Helena Godinho (Rio de Janeiro, RJ):** Caranguejo Fujão
- **Fernanda Oliveira (Campinas, SP):** Livro Falante Bilíngue
- **Rafa Gouveia (Porto Alegre, RS):** Patinho Dançante

### 2.6 Por Que Comprar Conosco? (`WhyBuyWithUs.jsx`)
4 pilares institucionais:
- **Qualidade Impecável:** Materiais atóxicos sem BPA e super resistentes.
- **Melhor Custo-Benefício:** Descontos reais de Black Friday no Pix e promoções Pague 2 Leve 4.
- **Atendimento Humanizado:** Suporte no WhatsApp do início ao fim.
- **Garantia Incondicional:** 30 dias para testar com tranquilidade.

### 2.7 Um Pouco Sobre Nós & Newsletter (`AboutUs.jsx`)
- Apresentação da missão de conectar pais e filhos longe das telas de celulares e tablets.
- Caixa de captura de e-mail para ofertas relâmpago com até 52% OFF direto no Pix.

### 2.8 Rodapé Oficial (`Footer.jsx`)
- Informações de atendimento: Assistente Virtual 24h (`Bia • Brinkids IA`) e e-mail `atendimento@brinkidstore.com`.
- Links rápidos, políticas de devolução e prazos.
- Selos de pagamento seguro SyncPay e criptografia SSL 256-bit.

---

## 3. Integração com SyncPay & TikTok Events API

- **Checkout PIX (`PixModal.jsx`):**
  - Funciona tanto para compra direta de 1 produto quanto para checkout consolidado do carrinho com múltiplos itens.
  - Envia os dados completos do cliente (Nome, CPF, E-mail, Telefone) e endereço validado via ViaCEP para `POST /api/payment/pix`.
  - Polling a cada 3 segundos via `GET /api/payment/status/:orderId`.
  - Assim que pago, dispara o evento `CompletePayment` no TikTok Pixel e abre a **Página Oficial de Rastreio** com código XP (ex: `XP948271645BR`).

---

## 4. Responsividade Total, Promoção de Natal e Catálogo de 93 Produtos Exclusivos (Sem Repetições)

### 4.1 Catálogo Completo Desduplicado (`src/data/products.js`)
- Foram extraídos todos os itens de `https://brinkidstore.com/collections/all` e realizada a **desduplicação completa** dos brinquedos que possuíam anúncios repetidos (como 4 variações do Patinho Dançante, 3 variações do Livro Falante Bilíngue, 2 do Caranguejo Fujão, 2 da Girafa Gira-Estica, 2 da Câmera Infantil e 2 dos Blocos Magnéticos), resultando em **93 produtos 100% únicos**.
- Além disso, o `ProductGrid.jsx` foi unificado em uma única grade principal (com os Campeões de Vendas no topo da lista), evitando que os mesmos brinquedos aparecessem duplicados em duas seções da mesma página.
- Todos os 93 produtos estão 100% integrados ao checkout Pix da **SyncPay** (`POST /api/payment/pix`).

### 4.2 Chatbot Inteligente "Bia • Brinkids IA" (`src/components/SupportChat.jsx`)
- **Identidade Brinkids Natal:** Cabeçalho festivo com avatar `🎅`, badge `NATAL 🎄` e atendimento assinado pela **Bia • Brinkids IA**.
- **Busca Inteligente no Catálogo:** Reconhece termos digitados pelo cliente (ex: "livro", "patinho", "caranguejo", "câmera", "montessori", "dinossauro") ou faixas etárias ("bebê", "1 ano", "2 anos", "3 anos", "4 anos") e exibe **cards interativos de produtos** dentro do próprio chat com botão direto `⚡ Comprar no Pix` e `Ver +`.

### 4.3 Coloração Especial Promoção de Natal & Responsividade Total (`src/App.css`)
- **Paleta de Natal Brinkids:** Vermelho Natalino (`#991b1b`, `#dc2626`), Dourado Festivo (`#fde047`, `#fef08a`), Verde Pinheiro (`#15803d`, `#16a34a`) e fundo creme suave (`#fffafa`).
- **Responsividade Total (Mobile, Tablet e Desktop):**
  - **Header & Navbar (`<= 768px`):** Linha 1 com Logo Brinkids + botões WhatsApp e Carrinho; Linha 2 com barra de pesquisa em largura total (100%).
  - **Selos de Confiança:** 4 colunas no Desktop → Grade 2x2 compacta no Mobile.
  - **Categorias por Idade:** Grade de 7 colunas no Desktop → Carrossel horizontal deslizável por toque (`scroll-snap-type: x mandatory`) no Mobile.
  - **Grade de Produtos (`store-products-grid`):** 4 colunas no Desktop → 3 colunas em Tablets → **2 colunas lado a lado no Mobile (`<= 680px`)** idêntico ao padrão Shopify Dawn da Brinkids Store, com tipografia e botões otimizados para telas a partir de `320px`.
  - **Modais e Chat:** Janela do Chatbot, Modal de Detalhes do Produto e Gaveta do Carrinho adaptados automaticamente para 100% da área útil em smartphones.

### 4.4 Cache-Busting Definitivo do Favicon e Título da Aba
- Adicionado parâmetro `?v=brinkids2026` nas tags `<link rel="icon">` do `index.html`, substituído o antigo `favicon.svg` do robô pelo SVG oficial `BK` da Brinkids, e adicionado reforço dinâmico via `document.title` no `StoreHome.jsx` para garantir que nenhum navegador exiba o título/ícone legado do Smart Pet Dogbot.

---

## 5. Política de Deploy
- ⚠️ **REGRA MANDATÓRIA:** Nenhum deploy ou `git push` é realizado sem autorização prévia e expressa do usuário.


