import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };
  static getDe() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.log(err, info);
  }
  render() {
    if (hasError) {
      return (
        <h1>
          Something is wrong. <Link to="/" />
        </h1>
      );
    }
  }
}
