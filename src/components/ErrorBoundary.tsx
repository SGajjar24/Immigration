import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, MessageSquare } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Application Error:', error, errorInfo);
        // In production, you would send this to an error reporting service
    }

    private handleRefresh = () => {
        window.location.reload();
    };

    private handleHome = () => {
        window.location.href = '/';
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-background-dark flex items-center justify-center p-6">
                    <div className="glass-panel rounded-2xl p-8 md:p-12 max-w-lg w-full text-center relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-maple-red/20 blur-[100px] rounded-full pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-maple-red/10 border border-maple-red/30 flex items-center justify-center">
                                <AlertTriangle className="w-10 h-10 text-maple-red" />
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Something Went Wrong
                            </h1>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                We apologize for the inconvenience. Our team has been notified and is working on a fix.
                            </p>

                            {/* Error details (only in development) */}
                            {import.meta.env.DEV && this.state.error && (
                                <div className="mb-8 p-4 bg-black/30 rounded-lg text-left">
                                    <p className="text-sm text-maple-red font-mono break-all">
                                        {this.state.error.message}
                                    </p>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={this.handleRefresh}
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary-light text-white font-bold transition-all shadow-lg shadow-primary/20"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Try Again
                                </button>
                                <button
                                    onClick={this.handleHome}
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all"
                                >
                                    <Home className="w-4 h-4" />
                                    Go Home
                                </button>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10">
                                <p className="text-sm text-gray-500 mb-2">Need immediate assistance?</p>
                                <button className="inline-flex items-center gap-2 text-sm text-accent-gold hover:text-yellow-400 transition-colors">
                                    <MessageSquare className="w-4 h-4" />
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
