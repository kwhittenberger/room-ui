export type StatusType = 'success' | 'error' | 'warning' | 'info';

export interface StatusMessage {
  /** Unique message ID */
  id: string;
  /** Message type */
  type: StatusType;
  /** Message text */
  message: string;
  /** Message timestamp */
  timestamp: Date;
  /** Auto-dismiss duration in ms */
  duration?: number;
}

type Subscriber = (messages: StatusMessage[]) => void;

let messageId = 0;
let messages: StatusMessage[] = [];
const subscribers: Set<Subscriber> = new Set();

function generateId(): string {
  return `status-${++messageId}-${Date.now()}`;
}

function notifySubscribers(): void {
  subscribers.forEach((callback) => callback([...messages]));
}

export const statusManager = {
  addMessage: (message: Omit<StatusMessage, 'id' | 'timestamp'>): string => {
    const id = generateId();
    const newMessage: StatusMessage = {
      ...message,
      id,
      timestamp: new Date(),
    };
    messages = [...messages, newMessage];
    notifySubscribers();

    // Auto-dismiss if duration is set
    if (message.duration && message.duration > 0) {
      setTimeout(() => {
        statusManager.removeMessage(id);
      }, message.duration);
    }

    return id;
  },

  removeMessage: (id: string): void => {
    messages = messages.filter((m) => m.id !== id);
    notifySubscribers();
  },

  clearAll: (): void => {
    messages = [];
    notifySubscribers();
  },

  subscribe: (callback: Subscriber): (() => void) => {
    subscribers.add(callback);
    // Immediately call with current messages
    callback([...messages]);
    // Return unsubscribe function
    return () => {
      subscribers.delete(callback);
    };
  },

  getMessages: (): StatusMessage[] => [...messages],
};

// Helper functions
export function addSuccessMessage(message: string, duration = 5000): string {
  return statusManager.addMessage({ type: 'success', message, duration });
}

export function addErrorMessage(message: string, duration?: number): string {
  return statusManager.addMessage({ type: 'error', message, duration });
}

export function addWarningMessage(message: string, duration = 8000): string {
  return statusManager.addMessage({ type: 'warning', message, duration });
}

export function addInfoMessage(message: string, duration = 5000): string {
  return statusManager.addMessage({ type: 'info', message, duration });
}
