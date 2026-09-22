"use client";

import React, { useState, useRef } from "react";
import { 
  Paperclip, 
  Link2, 
  Plus, 
  ArrowUp, 
  X, 
  FileText, 
  Image as ImageIcon, 
  File as FileIcon, 
  Loader2
} from "lucide-react";

export interface AgentPromptInputProps {
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  loading?: boolean;
  onSubmit: (message: string, files: File[]) => void | Promise<void>;
  className?: string;
  onAttachLink?: (url: string) => void;
}

export const AgentPromptInput: React.FC<AgentPromptInputProps> = ({
  placeholder = "Ask anything...",
  maxLength = 1000,
  disabled = false,
  loading = false,
  onSubmit,
  className = "",
  onAttachLink
}) => {
  const [value, setValue] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [linkInput, setLinkInput] = useState("");
  const [attachedLinks, setAttachedLinks] = useState<string[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize logic based on scrollHeight (min ~100px, max 220px)
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    if (textarea.value.length <= maxLength) {
      setValue(textarea.value);
    }

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(Math.max(textarea.scrollHeight, 100), 220)}px`;
  };

  // Keyboard Enter to submit, Shift+Enter for new line
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if ((value.trim() || files.length > 0 || attachedLinks.length > 0) && !disabled && !loading) {
        handleSubmit();
      }
    }
  };

  // Form submission handler
  const handleSubmit = async () => {
    if ((!value.trim() && files.length === 0 && attachedLinks.length === 0) || disabled || loading) {
      return;
    }

    let finalMessage = value;
    if (attachedLinks.length > 0) {
      const linksSuffix = attachedLinks.map((l) => `\n[Reference]: ${l}`).join("");
      finalMessage = `${finalMessage}${linksSuffix}`.trim();
    }

    const filesToSubmit = [...files];

    // Reset input state and height
    setValue("");
    setFiles([]);
    setAttachedLinks([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = "100px";
    }

    await onSubmit(finalMessage, filesToSubmit);
  };

  // Trigger hidden file input
  const handleAttachmentClick = () => {
    if (disabled || loading) return;
    fileInputRef.current?.click();
  };

  // File selection handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
      // Reset input value so same file can be re-selected if removed
      e.target.value = "";
    }
  };

  // Remove attached file
  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Link attachment helpers
  const handleAddLink = () => {
    if (!linkInput.trim()) return;
    let url = linkInput.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }
    setAttachedLinks((prev) => [...prev, url]);
    onAttachLink?.(url);
    setLinkInput("");
    setIsLinkOpen(false);
  };

  const handleRemoveLink = (idxToRemove: number) => {
    setAttachedLinks((prev) => prev.filter((_, idx) => idx !== idxToRemove));
  };

  // Helper for file type icons
  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="w-3.5 h-3.5 text-indigo-500" />;
    }
    if (file.type.includes("pdf") || file.type.includes("text") || file.type.includes("document")) {
      return <FileText className="w-3.5 h-3.5 text-blue-500" />;
    }
    return <FileIcon className="w-3.5 h-3.5 text-gray-500" />;
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isCharLimitReached = value.length >= maxLength;
  const isSendDisabled = (!value.trim() && files.length === 0 && attachedLinks.length === 0) || disabled || loading;

  return (
    <div className={`w-full max-w-3xl mx-auto space-y-2 ${className}`}>
      
      {/* Main Rounded Input Container */}
      <div
        className={`relative w-full rounded-2xl md:rounded-3xl bg-white border border-gray-200 shadow-sm transition-all duration-200 overflow-hidden flex flex-col justify-between hover:border-gray-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/15 focus-within:shadow-md ${
          disabled ? "opacity-60 pointer-events-none bg-gray-50" : ""
        }`}
      >
        
        {/* Selected Attachments & Links Chips */}
        {(files.length > 0 || attachedLinks.length > 0) && (
          <div className="px-4 pt-3 pb-1 flex flex-wrap gap-2 border-b border-gray-100 bg-gray-50/70">
            {/* File Pills */}
            {files.map((file, index) => (
              <div
                key={`file-${index}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-xs text-gray-700 shadow-xs animate-in fade-in"
              >
                {getFileIcon(file)}
                <span className="font-medium max-w-[140px] truncate" title={file.name}>
                  {file.name}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">
                  ({formatFileSize(file.size)})
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  aria-label={`Remove file ${file.name}`}
                  className="ml-0.5 p-0.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            {/* Link Pills */}
            {attachedLinks.map((link, index) => (
              <div
                key={`link-${index}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50/80 border border-indigo-200/80 text-xs text-indigo-700 shadow-xs animate-in fade-in"
              >
                <Link2 className="w-3.5 h-3.5 text-indigo-500" />
                <span className="font-medium max-w-[160px] truncate" title={link}>
                  {link.replace(/^https?:\/\//, "")}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveLink(index)}
                  aria-label={`Remove link ${link}`}
                  className="ml-0.5 p-0.5 text-indigo-400 hover:text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Auto-Resizing Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || loading}
          maxLength={maxLength}
          rows={3}
          style={{ height: "100px" }}
          className="w-full min-h-[100px] max-h-[220px] bg-transparent text-gray-900 placeholder:text-gray-400 font-sans text-sm md:text-base leading-relaxed px-5 pt-4 pb-2 resize-none outline-none focus:outline-none focus:ring-0 border-none transition-all scrollbar-thin"
          aria-label="AI prompt message input"
        />

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          tabIndex={-1}
          aria-hidden="true"
        />

        {/* Inline Link Input Box */}
        {isLinkOpen && (
          <div className="mx-4 mb-2 p-2 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-2 animate-in fade-in zoom-in-95">
            <Link2 className="w-4 h-4 text-gray-400 ml-1 shrink-0" />
            <input
              type="url"
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddLink();
                } else if (e.key === "Escape") {
                  setIsLinkOpen(false);
                }
              }}
              placeholder="Paste URL (e.g. https://example.com)..."
              className="flex-1 bg-transparent text-xs text-gray-800 placeholder:text-gray-400 outline-none"
              autoFocus
            />
            <button
              type="button"
              onClick={handleAddLink}
              disabled={!linkInput.trim()}
              className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsLinkOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
              aria-label="Close link input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Bottom Toolbar Inside Container */}
        <div className="flex items-center justify-between px-4 pb-3 pt-1 select-none">
          
          {/* Left Action Buttons: Plus (+), Attachment (📎), Link (🔗) */}
          <div className="flex items-center gap-1">
            {/* Plus / Tool Button */}
            <button
              type="button"
              onClick={handleAttachmentClick}
              aria-label="Add attachment or action"
              disabled={disabled || loading}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 active:scale-95 transition-all"
              title="Add attachment"
            >
              <Plus className="w-4 h-4" />
            </button>

            {/* Attachment Button */}
            <button
              type="button"
              onClick={handleAttachmentClick}
              aria-label="Attach documents or images"
              disabled={disabled || loading}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 active:scale-95 transition-all"
              title="Attach files"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Link Button */}
            <button
              type="button"
              onClick={() => setIsLinkOpen(!isLinkOpen)}
              aria-label="Attach web URL link"
              disabled={disabled || loading}
              className={`p-2 rounded-xl transition-all ${
                isLinkOpen || attachedLinks.length > 0
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              }`}
              title="Attach Link"
            >
              <Link2 className="w-4 h-4" />
            </button>
          </div>

          {/* Right Tools: Character Counter & Send Button */}
          <div className="flex items-center gap-3">
            {/* Character Counter */}
            <span
              className={`text-xs font-mono transition-colors ${
                isCharLimitReached
                  ? "text-red-500 font-bold"
                  : value.length > maxLength * 0.85
                  ? "text-amber-500"
                  : "text-gray-400"
              }`}
              aria-label={`Character count: ${value.length} of ${maxLength}`}
            >
              {value.length}/{maxLength}
            </span>

            {/* Send / Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSendDisabled}
              aria-label="Send prompt message"
              className={`p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center ${
                isSendDisabled
                  ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-indigo-500/25 active:scale-95"
              }`}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              )}
            </button>
          </div>

        </div>

      </div>

      {/* Helper keyboard shortcut indicator */}
      <div className="flex items-center justify-between px-2 text-[11px] text-gray-400 font-mono">
        <span>Press <kbd className="px-1 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] border border-gray-200">Enter ↵</kbd> to submit</span>
        <span><kbd className="px-1 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] border border-gray-200">Shift + Enter</kbd> for new line</span>
      </div>

    </div>
  );
};

export default AgentPromptInput;
