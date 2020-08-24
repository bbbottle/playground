import React from 'react';
import { isMobile } from '@zhoujiahao/utils';

import BlogTopDown from './layout/blog_top_down';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {

    if (this.state.hasError) {
      return null
      // return isMobile()
      //   ? ':('
      //   : <BlogTopDown top={null} down={''} />
    }
    return this.props.children;
  }
}

export default ErrorBoundary
