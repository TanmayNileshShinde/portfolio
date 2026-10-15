import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 my-8 max-w-xl mx-auto glass-panel rounded-2xl border border-rose-500/30 text-center space-y-3">
          <p className="text-rose-400 font-mono text-sm font-bold">COMPONENT_RENDER_RECOVERED</p>
          <p className="text-gray-300 text-xs">A display glitch occurred in this section, but the rest of the application is running smoothly.</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono"
          >
            Retry Section
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
