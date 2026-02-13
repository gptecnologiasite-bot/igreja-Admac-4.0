import React from 'react';
import { LuAlertTriangle, LuRefreshCw, LuHome } from 'react-icons/lu';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.reload();
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
                    <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center space-y-6 border border-slate-100 dark:border-slate-700">
                        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <LuAlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
                        </div>

                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                            Algo deu errado
                        </h2>

                        <p className="text-slate-600 dark:text-slate-300">
                            Ocorreu um erro inesperado na aplicação. Não se preocupe, seus dados estão seguros.
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="text-left bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-auto max-h-40 text-xs font-mono text-red-600 dark:text-red-400">
                                {this.state.error.toString()}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <button
                                onClick={this.handleGoHome}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl transition-colors font-semibold"
                            >
                                <LuHome size={18} />
                                Início
                            </button>

                            <button
                                onClick={this.handleReset}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-bold shadow-lg shadow-blue-600/20"
                            >
                                <LuRefreshCw size={18} />
                                Recarregar
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
