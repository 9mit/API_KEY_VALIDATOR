import React from 'react';
import {
  CheckCircle,
  XCircle,
  Loader2,
  ListFilter,
  ShieldCheck,
  Globe,
  Fingerprint,
  Command,
  FlaskConical,
  PlayCircle,
  Search,
  Box,
} from 'lucide-react';
import { PROVIDERS } from './providers';
import { useApiValidator } from './useApiValidator';

export default function App() {
  const {
    providerId,
    apiKey,
    status,
    errorDetails,
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
  } = useApiValidator();

  const showModelSelection =
    status === 'model_ready' ||
    status === 'testing_inference' ||
    status === 'success';

  return (
    <div className="min-h-screen bg-[#08080a] text-slate-400 font-sans selection:bg-indigo-500/30 overflow-x-hidden selection:text-white">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">

        {/* Header */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-20">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Client-Side &amp; Secure
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-none">
              Secure <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">API Validator</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium max-w-xl leading-relaxed">
              Fetch every available model identifier from your account.
              <span className="text-slate-300 block mt-2 font-bold">
                Your API keys are never stored or sent to our servers. All operations happen directly in your browser.
              </span>
            </p>
          </div>
          <div className="flex gap-12 border-l border-white/5 pl-10 h-fit py-2">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Protocol</span>
              <p className="text-white text-sm font-mono flex items-center gap-2"><Globe className="w-4 h-4 text-emerald-500" /> Local Execution</p>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-[#0e0e11] rounded-[3rem] border border-white/5 shadow-3xl overflow-hidden">
              <div className="p-8 md:p-12 space-y-10">

                {/* Provider Grid */}
                <fieldset className="space-y-4">
                  <legend className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 px-1">Infrastructure Layer</legend>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {Object.keys(PROVIDERS).map((id) => (
                      <button
                        key={id}
                        onClick={() => switchProvider(id)}
                        className={`relative py-4 rounded-2xl text-[11px] font-bold transition-all border ${providerId === id
                          ? 'bg-white/5 border-white/10 text-white shadow-xl'
                          : 'bg-transparent border-transparent text-slate-600 hover:text-slate-400 hover:bg-white/[0.02]'
                          }`}
                      >
                        {PROVIDERS[id].name}
                        {providerId === id && (
                          <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                            style={{ backgroundColor: PROVIDERS[id].color }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Secure Input Area */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <label htmlFor="api-key-input" className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 flex items-center gap-2">
                      <Fingerprint className="w-3.5 h-3.5" /> Identity Token
                    </label>
                  </div>
                  <div className="relative group/input">
                    <input
                      id="api-key-input"
                      type="password"
                      autoComplete="off"
                      value={apiKey}
                      onChange={(e) => updateApiKey(e.target.value)}
                      placeholder={provider.placeholder}
                      className="w-full px-7 py-6 bg-black/40 border border-white/5 rounded-3xl font-mono text-sm text-white focus:border-indigo-500/40 focus:bg-black/60 outline-none transition-all"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
                      <div className="w-px h-6 bg-white/5" />
                      <Command className="w-4 h-4 text-slate-700" />
                    </div>
                  </div>
                </div>

                {/* Step 1: Fetch Catalog */}
                <button
                  onClick={fetchModelCatalog}
                  disabled={status === 'fetching_models' || !apiKey.trim()}
                  className="relative w-full py-6 rounded-3xl font-black text-[12px] uppercase tracking-[0.25em] text-white overflow-hidden transition-all active:scale-[0.98] group/btn shadow-2xl disabled:opacity-30"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 group-hover/btn:brightness-110 transition-all ${status !== 'idle' && status !== 'error' ? 'opacity-50' : 'opacity-100'}`} />
                  <div className="relative flex items-center justify-center gap-3">
                    {status === 'fetching_models' ? <Loader2 className="animate-spin w-5 h-5" /> : <ListFilter className="w-5 h-5" />}
                    <span>{status === 'idle' || status === 'error' ? 'Scan Account Catalog' : 'Catalog Synchronized'}</span>
                  </div>
                </button>

                {/* Step 2: Select Model (Conditional) */}
                {showModelSelection && (
                  <div className="space-y-6 pt-6 border-t border-white/5 animate-in slide-in-from-top-4 duration-500">
                    <div className="space-y-4">
                      <label htmlFor="model-search" className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-400 px-1">Active Node Selection</label>

                      <div className="relative group/search">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within/search:text-indigo-400 transition-colors" />
                        <input
                          id="model-search"
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Filter models (e.g. gpt-4)..."
                          className="w-full pl-12 pr-6 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-xs text-white focus:border-indigo-500/30 outline-none"
                        />
                      </div>

                      <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar grid grid-cols-1 gap-1" role="listbox" aria-label="Available models">
                        {filteredModels.length > 0 ? (
                          filteredModels.map((m) => (
                            <button
                              key={m}
                              role="option"
                              aria-selected={selectedModel === m}
                              onClick={() => setSelectedModel(m)}
                              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${selectedModel === m
                                ? 'bg-indigo-500/10 border border-indigo-500/30 text-white'
                                : 'bg-transparent border border-transparent text-slate-500 hover:bg-white/[0.03] hover:text-slate-300'
                                }`}
                            >
                              <div className="flex items-center gap-3">
                                <Box className={`w-3.5 h-3.5 ${selectedModel === m ? 'text-indigo-400' : 'text-slate-700'}`} />
                                <span className="text-xs font-mono">{m}</span>
                              </div>
                              {selectedModel === m && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,1)]" />}
                            </button>
                          ))
                        ) : (
                          <p className="text-slate-700 text-xs italic px-4 py-3">No models match your filter.</p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={runInference}
                      disabled={status === 'testing_inference' || !selectedModel}
                      className="relative w-full py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] text-white overflow-hidden transition-all active:scale-[0.98] group/test"
                    >
                      <div className="absolute inset-0 bg-white/5 group-hover/test:bg-white/10 border border-white/10" />
                      <div className="relative flex items-center justify-center gap-3">
                        {status === 'testing_inference' ? <Loader2 className="animate-spin w-4 h-4" /> : <PlayCircle className="w-4 h-4 text-indigo-400" />}
                        <span>Inference Handshake: {selectedModel}</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Error UI */}
            {status === 'error' && (
              <div className="bg-rose-500/5 border border-rose-500/20 rounded-[2.5rem] p-8 flex gap-5 animate-in slide-in-from-bottom-4 duration-500" role="alert">
                <div className="p-3 bg-rose-500/10 rounded-2xl h-fit">
                  <XCircle className="w-6 h-6 text-rose-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-rose-500 uppercase text-[10px] tracking-widest">Access Violation / Error</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed">{errorDetails}</p>
                </div>
              </div>
            )}
          </div>

          {/* Results Column */}
          <aside className="lg:col-span-5 space-y-8">

            {/* Terminal View */}
            <div className="bg-[#0e0e11] border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col h-full min-h-[550px]">
              <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <div className="flex gap-1.5" aria-hidden="true">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/20 border border-rose-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">Handshake Monitor</span>
              </div>

              <div className="p-8 space-y-10 flex-1">
                {currentProbe && (
                  <div className="space-y-3">
                    <div className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">Outgoing Probe</div>
                    <div className="p-4 bg-white/5 rounded-2xl text-[13px] italic text-slate-300 border border-white/5">
                      &ldquo;{currentProbe}&rdquo;
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">Incoming Data</div>
                  <div className="font-mono text-[13px] leading-relaxed text-slate-400 break-words whitespace-pre-wrap">
                    {status === 'testing_inference' ? (
                      <div className="flex flex-col gap-2 opacity-30">
                        <div className="h-4 w-full bg-white/10 rounded animate-pulse" />
                        <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse" />
                      </div>
                    ) : llmResponse ? (
                      <span className="text-white animate-in fade-in duration-700">{llmResponse}</span>
                    ) : (
                      <span className="text-slate-800 italic">No packet received. Use a valid token and select a node.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Discovery Stats */}
              {status === 'success' && (
                <div className="p-6 border-t border-white/5 bg-white/[0.01] grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-700 uppercase">Verification</p>
                    <p className="text-emerald-500 text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-2">
                      <CheckCircle className="w-3 h-3" /> Integrity Confirmed
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-700 uppercase">Selected Node</p>
                    <p className="text-white text-[10px] font-mono font-bold truncate uppercase">{selectedModel}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Handshake History Log */}
            <div className="bg-black/40 border border-white/5 rounded-3xl p-6 font-mono text-[10px] space-y-3 shadow-xl">
              <div className="text-slate-600 font-black uppercase tracking-[0.2em] flex items-center gap-2 mb-2">
                <FlaskConical className="w-3.5 h-3.5" /> Telemetry Log
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 pr-2">
                {logs.length > 0 ? logs.map((l) => (
                  <div key={l.id} className="flex gap-4 animate-in slide-in-from-left-2 duration-300">
                    <span className="text-slate-700 w-16 shrink-0">[{l.time}]</span>
                    <span className={l.type === 'success' ? 'text-emerald-500' : l.type === 'error' ? 'text-rose-500' : 'text-indigo-400'}>
                      {l.msg}
                    </span>
                  </div>
                )) : (
                  <p className="text-slate-800 italic">Awaiting system ignition...</p>
                )}
              </div>
            </div>
          </aside>
        </main>

        <footer className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-center opacity-30 hover:opacity-100 transition-opacity">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
            Node Discovery Protocol v7.0.0
          </p>
          <div className="flex items-center gap-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">No Key Storage Enabled</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Direct Client Handshake</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
