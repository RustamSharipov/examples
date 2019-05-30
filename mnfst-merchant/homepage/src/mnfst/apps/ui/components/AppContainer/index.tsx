import React from 'react';
import { withRouter } from 'react-router-dom';
import MNFSTPopupPreloader from 'apps/ui/components/MNFSTPopupPreloader';
import styles from './style.css';

interface IScrollToTopProps {
  children: React.ReactNode;
  isPreloaderDisplay?: boolean;
  location: any;
}

class ScrollToTop extends React.PureComponent<IScrollToTopProps> {
  public componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  public render() {
    const { children, isPreloaderDisplay } = this.props;
    return (
      <div className={styles.appContainer}>
        <MNFSTPopupPreloader isDisplay={isPreloaderDisplay} />
        {children}
      </div>
    );
  }
}

export default withRouter(ScrollToTop);
