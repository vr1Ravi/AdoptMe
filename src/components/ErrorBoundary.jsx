import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.log("ErrorBoundary Component Caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <h1>
          Something is wrong. <Link to="/">Click to go back to home page</Link>
        </h1>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
