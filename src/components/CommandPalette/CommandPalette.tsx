import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Search } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface Command {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Optional description */
  description?: string;
  /** Icon element */
  icon?: React.ReactNode;
  /** Group name for categorization */
  group?: string;
  /** Keyboard shortcut display */
  shortcut?: string;
  /** Handler when command is executed */
  onExecute: () => void;
  /** Optional keywords for better search matching */
  keywords?: string[];
}

export interface CommandPaletteProps {
  /** List of available commands */
  commands: Command[];
  /** Open/close state */
  open: boolean;
  /** Callback when state changes */
  onOpenChange: (open: boolean) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Show keyboard shortcut to open (e.g., "Ctrl+K") */
  trigger?: string;
  /** Recent commands to show first */
  recentCommands?: string[];
  /** Callback to update recent commands */
  onRecentCommandsChange?: (commandIds: string[]) => void;
}

export default function CommandPalette({
  commands,
  open,
  onOpenChange,
  placeholder = 'Type a command or search...',
  trigger = 'Ctrl+K',
  recentCommands = [],
  onRecentCommandsChange,
}: CommandPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter and group commands
  const getFilteredCommands = useCallback(() => {
    const query = searchQuery.toLowerCase().trim();

    let filtered = commands;
    if (query) {
      filtered = commands.filter(
        (cmd) =>
          cmd.label.toLowerCase().includes(query) ||
          cmd.description?.toLowerCase().includes(query) ||
          cmd.keywords?.some((kw) => kw.toLowerCase().includes(query))
      );
    }

    // Group commands
    const grouped: Record<string, Command[]> = {};
    const ungrouped: Command[] = [];

    // Add recent commands first if no search
    if (!query && recentCommands.length > 0) {
      const recent = recentCommands
        .map((id) => commands.find((cmd) => cmd.id === id))
        .filter(Boolean) as Command[];
      if (recent.length > 0) {
        grouped['Recent'] = recent;
      }
    }

    filtered.forEach((cmd) => {
      if (cmd.group) {
        if (!grouped[cmd.group]) {
          grouped[cmd.group] = [];
        }
        // Avoid duplicates from recent
        if (!grouped['Recent']?.some((r) => r.id === cmd.id)) {
          grouped[cmd.group].push(cmd);
        }
      } else {
        if (!grouped['Recent']?.some((r) => r.id === cmd.id)) {
          ungrouped.push(cmd);
        }
      }
    });

    return { grouped, ungrouped };
  }, [commands, searchQuery, recentCommands]);

  const { grouped, ungrouped } = getFilteredCommands();

  // Flatten commands for keyboard navigation
  const flatCommands = [...Object.values(grouped).flat(), ...ungrouped];

  // Execute command
  const executeCommand = useCallback(
    (command: Command) => {
      command.onExecute();
      onOpenChange(false);

      // Update recent commands
      if (onRecentCommandsChange) {
        const updated = [command.id, ...recentCommands.filter((id) => id !== command.id)].slice(
          0,
          5
        ); // Keep max 5 recent
        onRecentCommandsChange(updated);
      }
    },
    [onOpenChange, onRecentCommandsChange, recentCommands]
  );

  // Handle keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, flatCommands.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && flatCommands[selectedIndex]) {
        e.preventDefault();
        executeCommand(flatCommands[selectedIndex]);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onOpenChange(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, selectedIndex, flatCommands, executeCommand, onOpenChange]);

  // Reset state when opened
  useEffect(() => {
    if (open) {
      setSearchQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const selectedElement = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
    selectedElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [selectedIndex]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] animate-in fade-in-0">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Command Palette */}
      <div className="relative w-full max-w-2xl mx-4 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 overflow-hidden animate-in zoom-in-95">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={placeholder}
            className="flex-1 text-base text-slate-100 placeholder-slate-500 bg-transparent border-none outline-none"
          />
          {trigger && (
            <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-mono text-slate-400 bg-slate-700 border border-slate-600 rounded">
              {trigger}
            </kbd>
          )}
        </div>

        {/* Commands List */}
        <div ref={listRef} className="max-h-[400px] overflow-y-auto py-2">
          {flatCommands.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-slate-500">No commands found</div>
          ) : (
            <>
              {/* Render grouped commands */}
              {Object.entries(grouped).map(([groupName, groupCommands]) => (
                <div key={groupName}>
                  <div className="px-4 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {groupName}
                  </div>
                  {groupCommands.map((command) => {
                    const globalIndex = flatCommands.indexOf(command);
                    const isSelected = globalIndex === selectedIndex;

                    return (
                      <button
                        key={command.id}
                        data-index={globalIndex}
                        onClick={() => executeCommand(command)}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        className={cn(
                          'w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors',
                          isSelected ? 'bg-cyan-900/30' : 'hover:bg-slate-700/50'
                        )}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {command.icon && (
                            <span className="text-slate-400 flex-shrink-0">{command.icon}</span>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-slate-100 truncate">
                              {command.label}
                            </div>
                            {command.description && (
                              <div className="text-xs text-slate-500 truncate mt-0.5">
                                {command.description}
                              </div>
                            )}
                          </div>
                        </div>
                        {command.shortcut && (
                          <kbd className="ml-3 px-2 py-1 text-xs font-mono text-slate-400 bg-slate-700 border border-slate-600 rounded flex-shrink-0">
                            {command.shortcut}
                          </kbd>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}

              {/* Render ungrouped commands */}
              {ungrouped.length > 0 && (
                <div>
                  {Object.keys(grouped).length > 0 && (
                    <div className="px-4 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Commands
                    </div>
                  )}
                  {ungrouped.map((command) => {
                    const globalIndex = flatCommands.indexOf(command);
                    const isSelected = globalIndex === selectedIndex;

                    return (
                      <button
                        key={command.id}
                        data-index={globalIndex}
                        onClick={() => executeCommand(command)}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        className={cn(
                          'w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors',
                          isSelected ? 'bg-cyan-900/30' : 'hover:bg-slate-700/50'
                        )}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {command.icon && (
                            <span className="text-slate-400 flex-shrink-0">{command.icon}</span>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-slate-100 truncate">
                              {command.label}
                            </div>
                            {command.description && (
                              <div className="text-xs text-slate-500 truncate mt-0.5">
                                {command.description}
                              </div>
                            )}
                          </div>
                        </div>
                        {command.shortcut && (
                          <kbd className="ml-3 px-2 py-1 text-xs font-mono text-slate-400 bg-slate-700 border border-slate-600 rounded flex-shrink-0">
                            {command.shortcut}
                          </kbd>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-between px-4 py-2 text-xs text-slate-500 bg-slate-900/50 border-t border-slate-700">
          <span>Navigate with ↑↓ arrows</span>
          <span>Press Enter to select • Esc to close</span>
        </div>
      </div>
    </div>,
    document.body
  );
}

// Hook to control Command Palette with keyboard shortcut
export function useCommandPalette(defaultTrigger: string = 'k') {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === defaultTrigger) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [defaultTrigger]);

  return { open, setOpen };
}
