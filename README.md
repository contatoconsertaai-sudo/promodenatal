# 🎄 Smart Pet Dogbot — Campanha Oficial de Natal

Landing page de alta conversão para o **Cachorro Robô Inteligente Smart Pet Dogbot Cachorro Colorido** com integração completa de pagamento via **Pix (SyncPay)**, geração em tempo real de **Código de Rastreio dos Correios** pós-pagamento e painel de **Feedbacks Verificados**.

---

## 🚀 Tecnologias Utilizadas

- **Frontend:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) + CSS Moderno Responsivo
- **Backend:** [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **Gateway de Pagamento:** [Sync Payments API](https://api.syncpayments.com.br) (Cash-in Pix Instantâneo + Webhooks)
- **Consultas de Endereço:** API ViaCEP (Autocompletar automático por CEP)

---

## 📦 Funcionalidades Principais

- 🎁 **Oferta Especial de Natal:** Preço promocional exclusivo de **R$ 99,90** (67% OFF) com escassez e contagem regressiva.
- ⚡ **Pagamento 100% Pix:** QR Code dinâmico gerado instantaneamente via API SyncPay com botão "Copia e Cola" e verificação automática em tempo real.
- 🚚 **Endereço Completo & Prazo Real:** Formulário com validação de CEP e cálculo de entrega para **7 a 14 dias úteis** (Garantido antes do Natal!).
- 📦 **Página de Rastreamento Imediata:** Assim que o Pix é compensado, o cliente é redirecionado para a tela com o **Código de Rastreio Oficial** e resumo da remessa.
- ⭐ **Feedbacks Verificados:** Painel interativo com avaliações reais, galeria com fotos de clientes, filtros dinâmicos e sistema de votação útil.

---

## 🛠️ Como Executar Localmente

### 1. Clonar o Repositório
```bash
git clone https://github.com/contatoconsertaai-sudo/promodenatal.git
cd promodenatal
```

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```
Preencha suas credenciais da SyncPay no arquivo `.env`:
```env
PORT=3000
NODE_ENV=development
SYNCPAY_BASE_URL=https://api.syncpayments.com.br
SYNCPAY_CLIENT_ID=seu_client_id
SYNCPAY_CLIENT_SECRET=seu_client_secret
SYNCPAY_WEBHOOK_URL=https://seu-dominio.com/api/webhook/syncpay
```

### 4. Iniciar a Aplicação
```bash
npm run dev
```
Acesse a aplicação no seu navegador: `http://localhost:3000`

---

## 📚 Documentação Técnica

Para detalhes aprofundados sobre a arquitetura da API, fluxo do webhook e regras de negócio, consulte o diretório [`/docs`](./docs):
- [`docs/INTEGRACAO_SYNCPAY.md`](./docs/INTEGRACAO_SYNCPAY.md) — Manual completo de integração da API Sync Payments, simulação de webhook e arquitetura.

---

## 🔒 Segurança

- O arquivo `.env` com chaves secretas e credenciais sensíveis está listado no `.gitignore` e **nunca** deve ser commitado no repositório público.
