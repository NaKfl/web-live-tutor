import React from 'react';
import { SomethingWrongPage } from 'app/components/SomethingWrongPage';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <SomethingWrongPage />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
