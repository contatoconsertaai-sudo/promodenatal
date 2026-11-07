# Manual da Loja Multi-Produtos: Smart Pet Store

Este documento descreve a estrutura de catálogo, carrinho inteligente e checkout dinâmico via **Sync Payments (Pix)** da loja multi-produtos **Smart Pet Brasil**.

---

## 1. Catálogo Oficial de Brinquedos Robóticos

O catálogo está centralizado no arquivo [`src/data/products.js`](file:///c:/Users/Pichau/Desktop/Ofertas/src/data/products.js):

| ID | Nome do Produto | Categoria | Preço De | Preço Pix | Destaques |
| :--- | :--- | :--- | :---: | :---: | :--- |
| `dogbot` | **Cachorro Robô Smart Pet Dogbot** | `pets` | R$ 299,90 | **R$ 99,90** | Voz em PT-BR, app Bluetooth, dança, kung fu, late |
| `trex` | **Dinossauro Robô Cyber T-Rex** | `dinossauros` | R$ 349,90 | **R$ 139,90** | Solta vapor com LED azul, rugido, controle 2.4GHz |
| `kitty` | **Gatinha Robô Smart Kitty Miau** | `pets` | R$ 269,90 | **R$ 89,90** | Segue a mão via infravermelho, ronrona, olhos LED |
| `owl` | **Coruja Robótica Smart Owl** | `aves` | R$ 229,90 | **R$ 79,90** | Repete vozes moduladas, bate asas, olhos luminosos |
| `drone` | **Mini Drone UFO Pet Anticolisão** | `voadores` | R$ 249,90 | **R$ 89,90** | Voo por indução manual, acrobacias 360°, LEDs |

---

## 2. Arquitetura do Carrinho Inteligente (`CartContext`)

O estado global do carrinho é gerenciado pelo componente [`src/context/CartContext.jsx`](file:///c:/Users/Pichau/Desktop/Ofertas/src/context/CartContext.jsx):

* **Persistência Automática:** Salvo no `localStorage` do navegador para o cliente não perder os itens se recarregar a página.
* **Barra de Progresso de Brinde:** Incentiva o aumento do ticket médio (ao atingir R$ 180,00 ativa o selo de *"Brinde Exclusivo de Natal"*).
* **Dois Fluxos de Compra:**
  1. **Compra Direta (1 Clique):** Ao clicar em *"⚡ COMPRAR AGORA"*, o checkout abre imediatamente para aquele item com frete expresso.
  2. **Compra via Carrinho:** Ao clicar em *"🛒 + Carrinho"*, o cliente pode somar múltiplos produtos e pagar todos em um único Pix!

---

## 3. Checkout Dinâmico SyncPay Multi-Itens

O backend Express ([`server/server.js`](file:///c:/Users/Pichau/Desktop/Ofertas/server/server.js)) recebe a requisição `POST /api/payment/pix` com:
```json
{
  "amount": 239.80,
  "description": "Smart Pet Store: Dogbot (x1), Cyber T-Rex (x1)",
  "items": [
    { "id": "dogbot", "name": "Cachorro Robô Smart Pet Dogbot", "price": 99.90, "quantity": 1 },
    { "id": "trex", "name": "Dinossauro Robô Cyber T-Rex", "price": 139.90, "quantity": 1 }
  ],
  "client": { "name": "...", "cpf": "...", "email": "...", "phone": "..." },
  "address": { "cep": "...", "street": "...", "number": "...", "city": "...", "state": "..." }
}
```

* **Geração de Rastreio Unificado:** O servidor gera **1 Código de Rastreio Oficial dos Correios** (ex: `XP849201745BR`) que abrange toda a remessa do pedido.
* **Página de Rastreio Pós-Pagamento:** Exibe todos os itens do pedido com foto, quantidade, valor individual e endereço de entrega confirmado.

---

## 4. Rastreamento Avançado de Conversão (TikTok Events API)

Ao iniciar o checkout ou concluir o pagamento Pix, a lista completa de produtos é enviada ao TikTok Ads:
```json
"contents": [
  { "content_id": "dogbot", "content_type": "product", "quantity": 1, "price": 99.90 },
  { "content_id": "trex", "content_type": "product", "quantity": 1, "price": 139.90 }
]
```
Isso permite calcular o **ROAS real** de campanhas de tráfego pago no TikTok Ads.

---

## 5. Como Adicionar Novos Produtos no Futuro

Para cadastrar um 6º ou 7º produto:
1. Abra [`src/data/products.js`](file:///c:/Users/Pichau/Desktop/Ofertas/src/data/products.js).
2. Adicione um novo objeto no array `PRODUCTS` com `id`, `title`, `price`, `images`, `features` e `specs`.
3. A vitrine, filtros de categoria, busca e carrinho atualizarão automaticamente!

