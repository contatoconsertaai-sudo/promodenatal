# Guia Passo a Passo: Deploy na Render (Web Service Node.js + React)

Este manual descreve o passo a passo completo para colocar a aplicação **Cachorro Robô Inteligente Smart Pet Dogbot** no ar na plataforma [Render](https://render.com) de forma gratuita, com SSL (HTTPS) automático e integração com o gateway SyncPay.

---

## 1. Pré-Requisitos

1. Repositório no GitHub: [`https://github.com/contatoconsertaai-sudo/ofersoffshore`](https://github.com/contatoconsertaai-sudo/ofersoffshore)
2. Conta criada no [Render.com](https://dashboard.render.com/) (pode entrar usando sua conta do GitHub).
3. Suas credenciais da API SyncPay (`client_id` e `client_secret`).

---

## 2. Passo a Passo do Deploy na Render

### Método Rápido (Recomendado via Dashboard do Render)

1. Acesse o **Dashboard da Render**: [dashboard.render.com](https://dashboard.render.com)
2. No canto superior direito, clique em **`New +`** e selecione **`Web Service`**.
3. Em **"Connect a repository"**, selecione o repositório **`contatoconsertaai-sudo/ofersoffshore`** (se não aparecer, clique em *Configure account* para autorizar o acesso da Render ao repositório).
4. Preencha os campos básicos:
   * **Name:** `ofersoffshore` (ou o nome que preferir para sua URL, ex: `smartpet-natal`)
   * **Region:** `Oregon (US West)` ou `Ohio (US East)`
   * **Branch:** `main`
   * **Runtime:** `Node`
   * **Build Command:**
     ```bash
     npm install && npm run build
     ```
   * **Start Command:**
     ```bash
     npm start
     ```
   * **Instance Type:** `Free` (gratuito)

---

## 3. Configurar Variáveis de Ambiente (Environment Variables)

Ainda na tela de criação (ou na aba **Environment** após criar o serviço), clique em **`Add Environment Variable`** e adicione as seguintes chaves:

| Chave (Key) | Valor (Value) | Descrição |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Ativa o modo otimizado de produção do Express |
| `SYNCPAY_BASE_URL` | `https://api.syncpayments.com.br` | Endpoint oficial da API SyncPay |
| `SYNCPAY_CLIENT_ID` | `ee4b3ab9-e6e0-4524-b374-4271524daa88` | Seu Client ID da SyncPay |
| `SYNCPAY_CLIENT_SECRET` | `cfb79448-48e9-42da-8070-e4eb19e762a6` | Seu Client Secret da SyncPay |
| `SYNCPAY_WEBHOOK_URL` | `https://SEU-APP.onrender.com/api/webhook/syncpay` | URL pública gerada pela Render |

> ⚠️ **Nota:** A Render fornecerá a URL pública do seu serviço (ex: `https://ofersoffshore.onrender.com`). Assim que o serviço for criado, atualize a variável `SYNCPAY_WEBHOOK_URL` com a sua URL real da Render.

---

## 4. Clique em "Deploy Web Service"

1. Clique no botão **`Create Web Service`** (ou **`Deploy Latest Commit`**).
2. O Render executará o `npm install && npm run build` e em cerca de 1 a 2 minutos o status mudará para **`Live`** (Verde).
3. Clique no link do topo (ex: `https://ofersoffshore.onrender.com`) para acessar sua loja no ar com HTTPS ativo!

---

## 5. Configurar o Webhook no Painel da SyncPay

Para que os pagamentos via Pix sejam confirmados automaticamente em tempo real e a Página de Código de Rastreio seja liberada:

1. Acesse o [Painel da SyncPay](https://app.syncpayments.com.br) ou a aba de configurações de Webhook/API.
2. Cadastre a URL do Webhook do seu serviço da Render:
   ```text
   https://SEU-APP.onrender.com/api/webhook/syncpay
   ```
3. Salve as alterações.

---

## 6. Testando em Produção

1. Abra a URL da sua loja gerada na Render no celular ou no computador.
2. Clique em **"COMPRAR NO PIX POR R$ 99,90"**.
3. Preencha seus dados de entrega (o CEP preenche a rua automaticamente).
4. O QR Code Pix oficial de R$ 99,90 será gerado.
5. Ao efetuar o pagamento pelo aplicativo do banco, o Webhook da SyncPay notificará seu servidor Render e, em menos de 3 segundos, a tela de **Código de Rastreio Oficial dos Correios** abrirá confirmando o pedido!
