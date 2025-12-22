import React, { useRef, forwardRef } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, Code } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  minHeight?: string;
  maxHeight?: string;
  showToolbar?: boolean;
  className?: string;
}

const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(
  (
    {
      value,
      onChange,
      label,
      placeholder = 'Start typing...',
      disabled = false,
      minHeight = '200px',
      maxHeight = '500px',
      showToolbar = true,
      className = '',
    },
    ref
  ) => {
    const editorRef = useRef<HTMLDivElement>(null);

    // Execute formatting command
    const execCommand = (command: string, commandValue?: string) => {
      document.execCommand(command, false, commandValue);
      editorRef.current?.focus();
      updateContent();
    };

    // Update content
    const updateContent = () => {
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    };

    // Handle paste (strip formatting)
    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const text = e.clipboardData.getData('text/plain');
      document.execCommand('insertText', false, text);
    };

    // Toolbar button component
    const ToolbarButton = ({
      icon: Icon,
      command,
      commandValue,
      title,
    }: {
      icon: React.ComponentType<{ className?: string }>;
      command: string;
      commandValue?: string;
      title: string;
    }) => (
      <button
        type="button"
        onClick={() => execCommand(command, commandValue)}
        disabled={disabled}
        title={title}
        className="p-2 text-slate-400 hover:bg-slate-700 hover:text-slate-200 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Icon className="h-4 w-4" />
      </button>
    );

    return (
      <div ref={ref} className={cn(className)}>
        {/* Label */}
        {label && (
          <label className="block text-sm font-medium text-slate-200 mb-1.5">{label}</label>
        )}

        {/* Container */}
        <div className="border border-slate-600 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-cyan-500/20 focus-within:border-cyan-500">
          {/* Toolbar */}
          {showToolbar && (
            <div className="flex items-center gap-1 p-2 border-b border-slate-700 bg-slate-800">
              <ToolbarButton icon={Bold} command="bold" title="Bold (Ctrl+B)" />
              <ToolbarButton icon={Italic} command="italic" title="Italic (Ctrl+I)" />
              <ToolbarButton icon={Underline} command="underline" title="Underline (Ctrl+U)" />

              <div className="w-px h-6 bg-slate-600 mx-1" />

              <ToolbarButton icon={List} command="insertUnorderedList" title="Bullet List" />
              <ToolbarButton icon={ListOrdered} command="insertOrderedList" title="Numbered List" />

              <div className="w-px h-6 bg-slate-600 mx-1" />

              <ToolbarButton icon={Code} command="formatBlock" commandValue="<pre>" title="Code Block" />
              <button
                type="button"
                onClick={() => {
                  const url = prompt('Enter URL:');
                  if (url) execCommand('createLink', url);
                }}
                disabled={disabled}
                title="Insert Link"
                className="p-2 text-slate-400 hover:bg-slate-700 hover:text-slate-200 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <LinkIcon className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Editor */}
          <div
            ref={editorRef}
            contentEditable={!disabled}
            onInput={updateContent}
            onPaste={handlePaste}
            dangerouslySetInnerHTML={{ __html: value }}
            className={cn(
              'p-3 outline-none overflow-y-auto',
              'text-sm text-slate-100',
              disabled ? 'bg-slate-800 cursor-not-allowed' : 'bg-slate-900'
            )}
            style={{ minHeight, maxHeight }}
            data-placeholder={placeholder}
          />
        </div>

        <style>{`
          [contenteditable][data-placeholder]:empty:before {
            content: attr(data-placeholder);
            color: #64748b;
            pointer-events: none;
          }
        `}</style>
      </div>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
