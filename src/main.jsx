import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error, info) {
    console.error('App error:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, textAlign: 'center', fontFamily: 'Inter, sans-serif', color: '#EDEDED', background: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div>
            <h1 style={{ fontSize: 24, marginBottom: 12 }}>Something went wrong</h1>
            <p style={{ color: '#A1A1A1', marginBottom: 20 }}>Please refresh the page or try again later.</p>
            <button onClick={() => window.location.reload()} style={{ padding: '10px 24px', background: '#6366F1', color: '#fff', border: 'none', borderRadius: 9999, cursor: 'pointer', fontWeight: 600 }}>Reload Page</button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
