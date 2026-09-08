import { Component, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <main className="page grid min-h-[100dvh] content-center py-24">
            <h1 style={{ fontSize: "var(--text-h2)", lineHeight: "var(--leading-heading)" }}>Something went wrong</h1>
            <p className="muted measure mt-4">An unexpected error occurred. Refreshing the page usually clears it.</p>
            <p className="mt-8">
              <button type="button" onClick={() => window.location.reload()} className="link cta">
                Refresh the page
                <ArrowRight className="arrow h-4 w-4" aria-hidden="true" />
              </button>
            </p>
          </main>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
