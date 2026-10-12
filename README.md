# Secure API Validator

**Secure API Validator** is a secure, client-side React application designed to help developers validate API credentials, inspect model catalogs, and test inference across major LLM providers without risking secret exposure.

<img width="1507" height="966" alt="image" src="https://github.com/user-attachments/assets/fcbb76ae-b6bf-465f-ad10-7a0c6dc9ee30" />

## 🔒 Security Guarantee
- **100% Client-Side**: This application runs entirely in your browser.
- **No Backend Storage**: Zero database, zero telemetry servers, and zero credential persistence.
- **Ephemerality**: API keys exist only in transient React memory and are cleared immediately upon page refresh or tab closure.
- **Direct Connections**: Network requests are dispatched directly from your browser to official provider API endpoints.

## 🚀 Features
- **Multi-Provider Support**: Verify credentials for:
  - OpenAI
  - Anthropic (Claude)
  - Google Gemini
  - Groq
  - DeepSeek
  - Perplexity
  - Grok (xAI)
- **Account Catalog Scan**: Enumerate and filter every model accessible by your key.
- **Inference Handshake**: Execute real-time lightweight probe queries to test latency and availability.
- **Telemetry Console**: Monitored timeline of API handshakes with precise millisecond latency stats.
- **Abort & Race Safety**: Seamlessly cancel in-flight requests when switching models or providers.

## 🛠️ Installation & Usage

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd api-validator
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Locally**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Lint**
   ```bash
   npm run lint
   ```

## 📦 Deployment
This project is statically exportable and ready for deployment on **Cloudflare Pages**, **Vercel**, **Netlify**, or **GitHub Pages**.

- **Build Command**: `npm run build`
- **Output Directory**: `dist`

## 📄 License
MIT License
