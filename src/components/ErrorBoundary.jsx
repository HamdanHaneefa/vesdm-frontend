import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // You can log to error reporting service here
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6"
              >
                <AlertTriangle size={40} className="text-red-600" />
              </motion.div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Oops! Something went wrong
              </h1>
              
              <p className="text-lg text-slate-600 mb-8">
                We're sorry for the inconvenience. An unexpected error occurred while loading this page.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-8 p-4 bg-slate-50 rounded-xl text-left overflow-auto">
                  <p className="text-sm font-mono text-red-600 mb-2">
                    {this.state.error.toString()}
                  </p>
                  <pre className="text-xs text-slate-600 whitespace-pre-wrap">
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={this.handleReset}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#007ACC] text-white rounded-xl font-semibold hover:bg-[#005a9e] transition-colors"
                >
                  <RefreshCw size={20} />
                  Try Again
                </button>
                
                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:border-[#007ACC] hover:text-[#007ACC] transition-colors"
                >
                  <Home size={20} />
                  Go Home
                </a>
              </div>

              <p className="mt-8 text-sm text-slate-500">
                If this problem persists, please{' '}
                <a href="/contact" className="text-[#007ACC] hover:underline">
                  contact support
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
