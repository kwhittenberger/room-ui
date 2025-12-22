export type StatusType = 'success' | 'error' | 'warning' | 'info';

export interface StatusMessage {
  id: string;
  type: StatusType;
  message: string;
  timestamp: Date;
  autoHide?: boolean;
  autoHideDelay?: number;
  persistent?: boolean;
}

export interface StatusManagerOptions {
  autoHide?: boolean;
  autoHideDelay?: number;
  persistent?: boolean;
}

// Global status management
class StatusManagerClass {
  private messages: StatusMessage[] = [];
  private listeners: Set<(messages: StatusMessage[]) => void> = new Set();

  addMessage(
    type: StatusType,
    message: string,
    options: StatusManagerOptions = {}
  ): string {
    const id = `status_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const statusMessage: StatusMessage = {
      id,
      type,
      message,
      timestamp: new Date(),
      autoHide: options.autoHide ?? true,
      autoHideDelay: options.autoHideDelay ?? 5000,
      persistent: options.persistent ?? false,
    };

    this.messages = [statusMessage, ...this.messages];
    this.notifyListeners();

    // Auto-hide logic
    if (statusMessage.autoHide && !statusMessage.persistent) {
      setTimeout(() => {
        this.removeMessage(id);
      }, statusMessage.autoHideDelay);
    }

    return id;
  }

  removeMessage(id: string): void {
    this.messages = this.messages.filter((msg) => msg.id !== id);
    this.notifyListeners();
  }

  clearAll(): void {
    this.messages = [];
    this.notifyListeners();
  }

  clearByType(type: StatusType): void {
    this.messages = this.messages.filter((msg) => msg.type !== type);
    this.notifyListeners();
  }

  subscribe(listener: (messages: StatusMessage[]) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener([...this.messages]));
  }

  getMessages(): StatusMessage[] {
    return [...this.messages];
  }
}

// Global instance
export const statusManager = new StatusManagerClass();

// Convenience functions for adding different types of messages
export const addSuccessMessage = (
  message: string,
  options?: StatusManagerOptions
) => statusManager.addMessage('success', message, options);

export const addErrorMessage = (
  message: string,
  options?: StatusManagerOptions
) => statusManager.addMessage('error', message, options);

export const addWarningMessage = (
  message: string,
  options?: StatusManagerOptions
) => statusManager.addMessage('warning', message, options);

export const addInfoMessage = (
  message: string,
  options?: StatusManagerOptions
) => statusManager.addMessage('info', message, options);
