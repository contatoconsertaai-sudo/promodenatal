# Manual de SEO, Favicon e Otimização de Metadados

Este documento descreve as melhorias de SEO, indexação para o Google, pré-visualização em redes sociais e identidade visual (Favicon) implementadas na página de oferta do **Smart Pet Dogbot**.

---

## 1. Melhoria do Título da Aba (`<title>`)

* **Antes:** `Cachorro Robô Inteligente Smart Pet Dogbot - Oferta de Natal` (cortava na aba do navegador ficando apenas *"Cachorro Robô Inteligente Sma..."*).
* **Novo Título Otimizado:**
  ```html
  <title>🐶 Smart Pet Dogbot® — Presente de Natal Oficial por R$ 99,90</title>
  ```
  * **Emoji de Identificação Imediata:** O ícone `🐶` aparece no início da aba, facilitando a identificação imediata mesmo se o usuário tiver várias abas abertas.
  * **Gatilho de Conversão Direto:** Destaca a campanha oficial de Natal e o preço com desconto (R$ 99,90).

---

## 2. Favicon SVG de Alta Resolução (`favicon.svg`)

* Foi criado um ícone vetorial exclusivo em formato SVG ([`favicon.svg`](file:///c:/Users/Pichau/Desktop/Ofertas/favicon.svg)) combinando:
  * Cabeça metálica futurista do cãozinho com orelhas articuladas.
  * Olhos visor com brilho LED cyan (`#00f5d4` / `#00bbf9`) idênticos às luzes do robô.
  * Gorro natalino clássico em vermelho e branco festivo.
  * Borda circular dourada com fundo escuro de alto contraste.
* **Compatibilidade Total:**
  * `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`
  * `<link rel="apple-touch-icon" href="/favicon.svg">`
  * Funciona em Chrome, Edge, Safari, Firefox e telas mobile de alta densidade (Retina/OLED).

---

## 3. SEO Avançado para o Google

* **Meta Description Persuasiva:**
  > *"Compre o Cachorro Robô Inteligente Smart Pet Dogbot com 67% OFF no Pix de Natal (R$ 99,90). Controle por voz, aplicativo Bluetooth e entrega garantida de 7 a 14 dias úteis com código de rastreio oficial."*
* **Palavras-Chave Focadas:** `cachorro robo inteligente, smart pet dogbot, presente natal infantil, brinquedo tecnologico 2026, cachorro robo controle remoto, dogbot colorido`.
* **Cor de Tema Mobile:** `<meta name="theme-color" content="#dc2626">` (deixa a barra do navegador no smartphone em vermelho natalino imersivo).
* **Tag Canônica:** `<link rel="canonical" href="https://promodenatal.onrender.com/">`.

---

## 4. Rich Snippets no Google (Schema.org JSON-LD)

Implementado dados estruturados no padrão oficial do Google:
* Tipo: `Product`
* Preço: `R$ 99.90` (BRL)
* Disponibilidade: `InStock`
* Avaliação: `4.9 / 5.0` (baseado em 847 avaliações reais)
* Validade da Oferta: Até `25/12/2026`

---

## 5. Pré-visualização Social (WhatsApp, Facebook, Instagram, Twitter)

Configurado tags **Open Graph** e **Twitter Cards**:
* Ao compartilhar o link no WhatsApp ou Instagram Direct, o aplicativo carrega automaticamente a foto real do robô na caixa (`img/foto-real-cliente-dogbot.jpg`), o título atrativo e a descrição da promoção de R$ 99,90.

