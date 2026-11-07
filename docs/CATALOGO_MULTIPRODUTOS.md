# 🎄 Catálogo Oficial Multiprodutos — Brinkids Store (102 Produtos)

Este documento registra a importação integral de **todos os 102 produtos** da coleção oficial `https://brinkidstore.com/collections/all`, todos conectados de ponta a ponta ao gateway de pagamento **SyncPay** (`POST /api/payment/pix`).

---

## 1. Resumo da Importação (`/collections/all`)
- **Fonte Oficial:** `https://brinkidstore.com/collections/all` (Páginas 1 a 7 completas).
- **Total de Produtos Ativos:** **102 produtos únicos** em estoque (`src/data/products.js`).
- **Preços e Descontos Reais:** Extraídos diretamente das tags de preço promocional e preço original da Brinkids Store, com cálculo automático da porcentagem de desconto (`% OFF`).
- **Imagens Oficiais:** URLs da CDN da Brinkids em alta resolução (`width=600`), incluindo imagem principal e galeria secundária.

---

## 2. Filtros Inteligentes e Categorização
Todos os 102 produtos podem ser filtrados instantaneamente na vitrine (`src/components/store/ProductGrid.jsx`) por:

### 2.1 Faixa Etária (`AgeCategories.jsx`)
- `0-6 meses` (Linha Baby, mordedores, tapetes sensoriais, cuidados)
- `6-12 meses` (Brinquedos musicais, engatinhar, alimentação em silicone)
- `1 ano` (Coordenação motora, equilíbrio, encaixe, troninhos)
- `2 anos` (Método Montessori, Livro Falante Bilíngue, Fale Inglês, Árvore de Natal Montessori)
- `3 anos` (Câmeras infantis, pistas de carrinhos, barracas, cozinhas, Bebê Reborn)
- `+ 4 anos` (Blocos magnéticos, Caneta 3D, carros de controle remoto, conjuntos e pijamas)

### 2.2 Temas Rápidos (`QUICK_THEMES`)
- 🎄 **Todos os Produtos (102)**
- 🧠 **Montessori & Educativos**
- 🎵 **Musicais & Interativos**
- 🚗 **Carrinhos, Pistas & Dinossauros**
- 📸 **Câmeras, Bonecas & Criativos**
- 👶 **Bebês, Alimentação & Cuidados**
- 👗 **Roupas, Pijamas & Fantasias**

---

## 3. Integração Total com SyncPay
- Cada um dos 102 produtos possui botão **⚡ COMPRAR AGORA NO PIX** (que abre o checkout direto daquele produto) e botão **🎁 Adicionar à Sacola** (permitindo comprar múltiplos produtos em uma única cobrança Pix consolidada).
- O valor dinâmico (`amount`), título e lista de itens são enviados para `POST /api/payment/pix`, gerando o QR Code oficial e liberando o código de rastreio assim que pago.
