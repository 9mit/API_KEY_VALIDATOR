import { useState, useRef, useCallback } from 'react';
import { PROVIDERS, RANDOM_PROBES } from './providers';

/**
 * Safely parse a fetch Response as JSON.
 * Returns the parsed body, or throws with a readable message on failure.
 */
async function safeParseJSON(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      `Expected JSON but received ${res.status} ${res.statusText}`
    );
  }
}

/**
 * Extract a human-readable error message from a provider error response.
 */
function extractErrorMessage(data, fallback) {
  return (
    data?.error?.message ?? data?.message ?? fallback
  );
}

let logCounter = 0;

/**
 * Custom hook encapsulating all API validation logic.
 *
 * Keeps the App component focused on presentation.
 */
export function useApiValidator() {
  const [providerId, setProviderId] = useState('OPENAI');
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorDetails, setErrorDetails] = useState('');

  const [availableModels, setAvailableModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [llmResponse, setLlmResponse] = useState('');
  const [currentProbe, setCurrentProbe] = useState('');
  const [logs, setLogs] = useState([]);

  // AbortController ref to cancel in-flight requests on new actions
  const abortRef = useRef(null);

  const provider = PROVIDERS[providerId];

  const addLog = useCallback((msg, type = 'info') => {
    logCounter += 1;
    setLogs((prev) =>
      [{ id: logCounter, msg, type, time: new Date().toLocaleTimeString() }, ...prev].slice(0, 6)
    );
  }, []);

  const switchProvider = useCallback((id) => {
    // Cancel any in-flight request
    abortRef.current?.abort();
    abortRef.current = null;

    setProviderId(id);
    setStatus('idle');
    setErrorDetails('');
    setLlmResponse('');
    setAvailableModels([]);
    setSelectedModel('');
    setSearchQuery('');
    setCurrentProbe('');
  }, []);

  const updateApiKey = useCallback((value) => {
    setApiKey(value);
    setStatus('idle');
  }, []);

  const fetchModelCatalog = useCallback(async () => {
    if (!apiKey.trim()) return;

    // Cancel previous in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus('fetching_models');
    setErrorDetails('');
    setAvailableModels([]);
    setSelectedModel('');
    addLog(`Accessing ${provider.name} catalog...`, 'process');

    try {
      const headers =
        provider.listModelsHeaders?.(apiKey) ?? provider.getHeaders(apiKey);

      const res = await fetch(provider.listModelsUrl, {
        method: 'GET',
        headers,
        signal: controller.signal,
      });

      const data = await safeParseJSON(res);

      if (!res.ok) {
        throw new Error(extractErrorMessage(data, `HTTP ${res.status}`));
      }

      const models = provider.parseModels(data);
      if (models.length === 0) {
        throw new Error('No models found in this account.');
      }

      setAvailableModels(models);
      setSelectedModel(models[0]);
      setStatus('model_ready');
      addLog(`Retrieved ${models.length} model identifiers.`, 'success');
    } catch (err) {
      if (err.name === 'AbortError') return;
      setStatus('error');
      setErrorDetails(err.message);
      addLog('Catalog fetch failed.', 'error');
    }
  }, [apiKey, provider, addLog]);

  const runInference = useCallback(async () => {
    if (!selectedModel) return;

    // Cancel previous in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus('testing_inference');
    setLlmResponse('');

    const probe =
      RANDOM_PROBES[Math.floor(Math.random() * RANDOM_PROBES.length)];
    setCurrentProbe(probe);

    addLog(`Testing inference on ${selectedModel}...`, 'process');

    try {
      const url = provider.urlBuilder
        ? provider.urlBuilder(provider.baseUrl, selectedModel)
        : provider.baseUrl;

      const startTime = performance.now();
      const res = await fetch(url, {
        method: 'POST',
        headers: provider.getHeaders(apiKey),
        body: JSON.stringify(provider.getPayload(selectedModel, probe)),
        signal: controller.signal,
      });

      const endTime = performance.now();
      const data = await safeParseJSON(res);

      if (!res.ok) {
        throw new Error(
          extractErrorMessage(data, 'Inference Failed')
        );
      }

      const parsed = provider.parseResponse(data);
      setLlmResponse(parsed || 'Model responded with empty payload.');
      setStatus('success');
      const duration = (endTime - startTime).toFixed(0);
      addLog(`Inference successful (${duration}ms).`, 'success');
    } catch (err) {
      if (err.name === 'AbortError') return;
      setStatus('error');
      setErrorDetails(err.message);
      addLog('Inference execution error.', 'error');
    }
  }, [selectedModel, apiKey, provider, addLog]);

  const filteredModels = availableModels.filter((m) =>
    m.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    providerId,
    apiKey,
    status,
    errorDetails,
    availableModels,
    selectedModel,
    searchQuery,
    llmResponse,
    currentProbe,
    logs,
    provider,
    filteredModels,

    switchProvider,
    updateApiKey,
    setSelectedModel,
    setSearchQuery,
    fetchModelCatalog,
    runInference,
  };
}
