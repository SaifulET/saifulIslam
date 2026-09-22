"use client";

import React, { useState } from "react";
import AgentPromptInput from "./AgentPromptInput";
import { 
  Sparkles, 
  Bot, 
  User, 
  Paperclip, 
  CheckCircle2, 
  Terminal, 
  RotateCcw,
  Zap
} from "lucide-react";

interface SubmittedMessage {
  id: string;
  text: string;
  files: { name: string; size: number }[];
  timestamp: string;
  aiResponse?: string;
}

export default function AgentPromptShowcase() {
  const [submissions, setSubmissions] = useState<SubmittedMessage[]>([
    {
      id: "demo-initial",
      text: "Analyze this dataset and generate a clean Next.js 15 dashboard component with Lucide React icons.",
      files: [{ name: "analytics.json", size: 48000 }],
      timestamp: "Just now",
      aiResponse: "Generated full TypeScript dashboard component with interactive charts and responsive cards."
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const samplePrompts = [
    "Build an AI agent prompt input with auto-resize and file upload..",
    "Optimize Next.js server actions with optimistic UI updates..",
    "Generate Tailwind CSS dark-mode glassmorphic cards.."
  ];

  const handlePromptSubmit = async (message: string, files: File[]) => {
    setIsLoading(true);

    const fileMeta = files.map((f) => ({ name: f.name, size: f.size }));
    const newEntry: SubmittedMessage = {
      id: `msg-${Date.now()}`,
      text: message,
      files: fileMeta,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setSubmissions((prev) => [newEntry, ...prev]);

    setTimeout(() => {
      setSubmissions((prev) =>
        prev.map((item) =>
          item.id === newEntry.id
            ? {
                ...item,
                aiResponse: `Processed prompt (${message.length} chars, ${files.length} attached files). Ready for dispatch.`
              }
            : item
        )
      );
      setIsLoading(false);
    }, 1200);
  };

  return (
    <section id="ai-input" className="py-20 bg-slate-50 dark:bg-[#090a12] text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-500/40 text-indigo-600 dark:text-indigo-300 text-xs font-mono font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
            <span>PRODUCTION COMPONENT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            AI Agent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Prompt Input
            </span>
          </h2>

          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
            Live interactive AI agent prompt composer with auto-resizing textarea, multi-file attachments, inline link popover, and character limit indicators.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-[#12141f] rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-xl p-6 sm:p-8 space-y-6">
          <AgentPromptInput
            placeholder="Ask anything or attach code/documents..."
            maxLength={1000}
            loading={isLoading}
            onSubmit={handlePromptSubmit}
          />

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-mono text-slate-500 dark:text-zinc-500 flex items-center gap-1">
              <Zap className="w-3 h-3 text-indigo-500" /> Test sample:
            </span>
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePromptSubmit(prompt, [])}
                className="text-xs font-mono bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800 px-3 py-1.5 rounded-xl transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Submissions Log */}
        {submissions.length > 0 && (
          <div className="bg-white dark:bg-[#0f111a] rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-zinc-400 font-bold uppercase tracking-wider">
                <Terminal className="w-4 h-4 text-indigo-500" />
                <span>Live Execution Output ({submissions.length})</span>
              </div>

              <button
                type="button"
                onClick={() => setSubmissions([])}
                className="text-xs font-mono text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Clear
              </button>
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {submissions.map((item) => (
                <div key={item.id} className="space-y-3 bg-slate-50 dark:bg-[#151724] p-4 rounded-xl border border-slate-200 dark:border-zinc-800/70 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1 space-y-1.5 min-w-0">
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
                        <span className="font-semibold text-slate-800 dark:text-zinc-200">You</span>
                        <span className="font-mono text-[11px]">{item.timestamp}</span>
                      </div>
                      <p className="text-slate-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed">{item.text}</p>
                      {item.files.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {item.files.map((file, fIdx) => (
                            <span
                              key={fIdx}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-xs font-mono text-indigo-600 dark:text-indigo-300"
                            >
                              <Paperclip className="w-3 h-3" />
                              {file.name} ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {item.aiResponse && (
                    <div className="flex items-start gap-3 pl-4 border-l-2 border-indigo-500/60 pt-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-600/30 border border-indigo-300 dark:border-indigo-500/40 text-indigo-600 dark:text-indigo-300 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-300">AI Assistant</span>
                        <p className="text-slate-700 dark:text-zinc-300 text-xs leading-relaxed">{item.aiResponse}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
