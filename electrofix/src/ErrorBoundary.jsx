import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', color: 'red', backgroundColor: '#fee' }}>
                    <h2>Something went wrong.</h2>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error.toString()}</pre>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error.stack}</pre>
                    <hr />
                    <h3>Component Stack:</h3>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.errorInfo ? this.state.errorInfo.componentStack : 'Loading component stack...'}</pre>
                </div>
            );
        }
        return this.props.children;
    }
}
