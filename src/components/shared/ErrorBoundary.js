import React, { Component } from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  color: red;
  background: #d036364a;
  border: 1px solid #ea4949;
  padding: 11px 26px;
  width: fit-content;
  border-radius: 12px;
  font-size: 12px;
`;

const ErrorTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 2px;
`;

class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
    
    componentDidCatch(error, errorInfo) {
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
    }
    render() {
      const { name } = this.props;

      if (this.state.errorInfo) {
        return (
          <ErrorContainer>
            <ErrorTitle>{`Something went wrong in ${name || 'component'}`}</ErrorTitle>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {/* {this.state.error && this.state.error.toString()} */}
              <br />
              {/* {this.state.errorInfo.componentStack} */}
            </details>
          </ErrorContainer>
        );
      }
      return this.props.children;
    }  
  }

  export default ErrorBoundary;
