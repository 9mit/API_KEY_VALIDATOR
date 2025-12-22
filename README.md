# Secure API Validator

**Secure API Validator** is a secure, client-side React application designed to help developers explore API capabilities for major LLM providers (OpenAI, Anthropic, Gemini, Groq) without risking key exposure.

<img width="1507" height="966" alt="image" src="https://github.com/user-attachments/assets/fcbb76ae-b6bf-465f-ad10-7a0c6dc9ee30" />


## 🔒 Security Guarantee
- **100% Client-Side**: This application runs entirely in your browser.
- **No Backend Storage**: We do not have a server database. No data is saved to our servers.
- **Ephemerality**: Your API keys are stored in transient memory (React State) and are cleared immediately upon page refresh or tab closure.
- **Direct Connections**: Network requests are made directly from your browser to the official provider APIs (e.g., `api.openai.com`).

## 🚀 Features
- **Multi-Provider Support**: Verify keys for:
  - OpenAI
  - Anthropic (Claude)
  - Google Gemini
  - Groq
  - DeepSeek
  - Perplexity
  - Grok (xAI)
- **Account Catalog**: Fetch and verify all available models on your account.
- **Inference Testing**: Run a real-time "handshake" test to verify model responsiveness.
- **Premium UI**: Using Tailwind CSS and Lucide Icons.

## 🛠️ Installation & Usage

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd api-validator
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Locally**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.

4.  **Build for Production**
    ```bash
    npm run build
    ```
    The output will be in the `dist` folder.

## 📦 Deployment
This project is deployment-ready for static hosts like **Netlify**, **Vercel**, or **GitHub Pages**.
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

## 📄 License
MIT License
