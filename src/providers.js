/**
 * Provider configuration registry.
 *
 * Each provider defines its name, colour, API endpoints, header builder,
 * payload builder, and response parser so the rest of the app stays
 * provider-agnostic.
 */

export const PROVIDERS = {
  OPENAI: {
    name: 'OpenAI',
    color: '#10a37f',
    baseUrl: 'https://api.openai.com/v1/chat/completions',
    listModelsUrl: 'https://api.openai.com/v1/models',
    docs: 'https://platform.openai.com/api-keys',
    placeholder: 'sk-proj-••••••••••••••••••••••••••••••••',
    getHeaders: (key) => ({
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    }),
    parseModels: (data) => data.data.map((m) => m.id).sort(),
    getPayload: (model, prompt) => ({
      model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 50,
    }),
    parseResponse: (data) => data.choices?.[0]?.message?.content,
  },

  ANTHROPIC: {
    name: 'Anthropic',
    color: '#d97757',
    baseUrl: 'https://api.anthropic.com/v1/messages',
    listModelsUrl: 'https://api.anthropic.com/v1/models',
    docs: 'https://console.anthropic.com/settings/keys',
    placeholder: 'sk-ant-api03-••••••••••••••••••••••••••',
    getHeaders: (key) => ({
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
      'anthropic-dangerous-direct-browser-access': 'true',
    }),
    parseModels: (data) => data.data.map((m) => m.id).sort(),
    getPayload: (model, prompt) => ({
      model,
      max_tokens: 50,
      messages: [{ role: 'user', content: prompt }],
    }),
    parseResponse: (data) => data.content?.[0]?.text,
  },

  GEMINI: {
    name: 'Google Gemini',
    color: '#4285f4',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/',
    listModelsUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
    docs: 'https://aistudio.google.com/app/apikey',
    placeholder: 'AIzaSy•••••••••••••••••••••••••••••••••',
    getHeaders: (key) => ({
      'Content-Type': 'application/json',
      'x-goog-api-key': key,
    }),
    listModelsHeaders: (key) => ({
      'x-goog-api-key': key,
    }),
    urlBuilder: (url, model) => `${url}${model}:generateContent`,
    parseModels: (data) =>
      data.models.map((m) => m.name.split('/').pop()).sort(),
    getPayload: (_model, prompt) => ({
      contents: [{ parts: [{ text: prompt }] }],
    }),
    parseResponse: (data) =>
      data.candidates?.[0]?.content?.parts?.[0]?.text,
  },

  GROQ: {
    name: 'Groq',
    color: '#f55036',
    baseUrl: 'https://api.groq.com/openai/v1/chat/completions',
    listModelsUrl: 'https://api.groq.com/openai/v1/models',
    docs: 'https://console.groq.com/keys',
    placeholder: 'gsk_•••••••••••••••••••••••••••••••••••',
    getHeaders: (key) => ({
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    }),
    parseModels: (data) => data.data.map((m) => m.id).sort(),
    getPayload: (model, prompt) => ({
      model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 50,
    }),
    parseResponse: (data) => data.choices?.[0]?.message?.content,
  },

  DEEPSEEK: {
    name: 'DeepSeek',
    color: '#4e8cff',
    baseUrl: 'https://api.deepseek.com/chat/completions',
    listModelsUrl: 'https://api.deepseek.com/models',
    docs: 'https://platform.deepseek.com/api_keys',
    placeholder: 'sk-••••••••••••••••••••••••••••••••',
    getHeaders: (key) => ({
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    }),
    parseModels: (data) => data.data.map((m) => m.id).sort(),
    getPayload: (model, prompt) => ({
      model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 50,
    }),
    parseResponse: (data) => data.choices?.[0]?.message?.content,
  },

  PERPLEXITY: {
    name: 'Perplexity',
    color: '#22b3a6',
    baseUrl: 'https://api.perplexity.ai/chat/completions',
    listModelsUrl: 'https://api.perplexity.ai/models',
    docs: 'https://www.perplexity.ai/settings/api',
    placeholder: 'pplx-••••••••••••••••••••••••••••••••',
    getHeaders: (key) => ({
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    }),
    parseModels: (data) => data.data.map((m) => m.id).sort(),
    getPayload: (model, prompt) => ({
      model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 50,
    }),
    parseResponse: (data) => data.choices?.[0]?.message?.content,
  },

  GROK: {
    name: 'Grok (xAI)',
    color: '#1d9bf0',
    baseUrl: 'https://api.x.ai/v1/chat/completions',
    listModelsUrl: 'https://api.x.ai/v1/models',
    docs: 'https://console.x.ai/',
    placeholder: 'xai-••••••••••••••••••••••••••••••••',
    getHeaders: (key) => ({
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    }),
    parseModels: (data) => data.data.map((m) => m.id).sort(),
    getPayload: (model, prompt) => ({
      model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 50,
    }),
    parseResponse: (data) => data.choices?.[0]?.message?.content,
  },
};

export const RANDOM_PROBES = [
  'What is the hexadecimal color code for a sunset?',
  'Tell me a 5-word story about a robot.',
  'What is the square root of 144?',
  'What is the capital of Mars?',
  "Give me a synonym for 'Intelligence'.",
];
