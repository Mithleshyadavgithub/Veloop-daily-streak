import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("UI Error caught by boundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, color: '#ff5252', background: '#0a110c', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h2 style={{ color: '#76ff03' }}>⚠️ Render Error Caught:</h2>
          <pre style={{ background: '#1c0d18', padding: 16, borderRadius: 12, border: '1px solid #ff5252', color: '#fff', whiteSpace: 'pre-wrap' }}>
            {this.state.error?.toString()}
          </pre>
          <pre style={{ color: '#aaa', fontSize: '0.8rem', whiteSpace: 'pre-wrap' }}>
            {this.state.errorInfo?.componentStack}
          </pre>
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }}
            style={{ padding: '10px 20px', background: '#58cc02', color: '#051406', fontWeight: 'bold', border: 'none', borderRadius: 8, cursor: 'pointer', marginTop: 12 }}
          >
            Clear Local State &amp; Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
