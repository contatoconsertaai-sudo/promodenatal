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
- **Banner Black Friday:** `⚡ BLACK FRIDAY: CUPOM BLACK10 = 10% OFF • 🚚 Frete Grátis para todo o Brasil`
- **Logo Brinkids:** Carregado localmente via `/logo-brinkids.png` com fallback de alta disponibilidade.
- **Barra de Busca Dinâmica:** Pesquisa instantânea por nome do produto, descrição ou benefício pedagógico.
- **Botão de Atendimento WhatsApp:** Conexão direta com o número oficial `(31) 9 7232-7905`.
- **Botão do Carrinho:** Badge dinâmico com contagem de itens em tempo real e abertura da gaveta lateral.

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
- Caixa de captura de e-mail com entrega imediata do cupom `BLACK10`.

### 2.8 Rodapé Oficial (`Footer.jsx`)
- Informações de contato: WhatsApp `(31) 9 7232-7905`, e-mail `atendimento@brinkidstore.com`.
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

## 4. Política de Deploy
- ⚠️ **REGRA MANDATÓRIA:** Nenhum deploy ou `git push` é realizado sem autorização prévia e expressa do usuário.

