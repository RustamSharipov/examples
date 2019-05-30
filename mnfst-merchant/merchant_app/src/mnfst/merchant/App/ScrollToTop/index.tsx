import React from 'react';
import { withRouter } from 'react-router-dom';

interface IScrollToTopProps {
  location: any;
}

class ScrollToTop extends React.PureComponent<IScrollToTopProps> {
  public componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  public render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
