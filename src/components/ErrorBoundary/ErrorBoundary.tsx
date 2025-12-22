import { Component, ReactNode, ErrorInfo } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../Button';

// @ts-ignore - process is a Node.js global that may not be available in all environments
const isDevelopment = typeof process !== 'undefined' && process.env?.NODE_ENV === 'development';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, errorInfo: ErrorInfo, reset: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: Array<string | number>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    this.props.onError?.(error, errorInfo);

    if (isDevelopment) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys } = this.props;
    const { hasError } = this.state;

    if (hasError && resetKeys && prevProps.resetKeys) {
      const hasResetKeyChanged = resetKeys.some(
        (key, index) => key !== prevProps.resetKeys?.[index]
      );

      if (hasResetKeyChanged) {
        this.reset();
      }
    }
  }

  reset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    if (hasError && error) {
      if (fallback) {
        if (typeof fallback === 'function') {
          return fallback(error, errorInfo!, this.reset);
        }
        return fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="max-w-md w-full bg-slate-800 rounded-lg shadow-lg border-2 border-red-500/50 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-900/50 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-slate-100 mb-2">
                  Something went wrong
                </h2>
                <p className="text-sm text-slate-400 mb-4">
                  An unexpected error occurred. Please try reloading the page or contact support if the problem persists.
                </p>

                {isDevelopment && (
                  <details className="mb-4">
                    <summary className="text-xs font-medium text-slate-300 cursor-pointer hover:text-slate-100">
                      Error details
                    </summary>
                    <div className="mt-2 p-3 bg-slate-900 rounded border border-slate-700 text-xs font-mono overflow-auto max-h-48">
                      <div className="text-red-400 font-semibold mb-1">
                        {error.name}: {error.message}
                      </div>
                      {error.stack && (
                        <pre className="text-slate-400 whitespace-pre-wrap text-[10px] leading-tight">
                          {error.stack}
                        </pre>
                      )}
                      {errorInfo?.componentStack && (
                        <div className="mt-2 pt-2 border-t border-slate-700">
                          <div className="text-slate-300 font-semibold mb-1">Component Stack:</div>
                          <pre className="text-slate-400 whitespace-pre-wrap text-[10px] leading-tight">
                            {errorInfo.componentStack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </details>
                )}

                <div className="flex gap-2">
                  <Button variant="primary" onClick={this.reset} size="sm">
                    Try again
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => window.location.reload()}
                    size="sm"
                  >
                    Reload page
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
