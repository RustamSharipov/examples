import React from 'react';
import classNames from 'classnames';
import MNFSTLogo from 'apps/ui/components/MNFSTLogo';
import styles from './style.css';

const HIDE_PRELOADER_DELAY = 1000;

interface IPopupPreloaderProps {
  isDisplay: boolean;
}

interface IPopupPreloaderState {
  isDisplay: boolean;
  isHidePreloader: boolean;
}

class PopupPreloader extends React.Component<IPopupPreloaderProps, IPopupPreloaderState> {
  public static defaultProps = {
    isDisplay: false,
  };

  public state = {
    isDisplay: this.props.isDisplay,
    isHidePreloader: false,
  };

  public componentDidUpdate(prevProps) {
    if (prevProps.isDisplay && !this.props.isDisplay) {
      this.setState({ isHidePreloader: true });
      setTimeout(() => {
        this.setState({ isDisplay: false });
      },         HIDE_PRELOADER_DELAY);
    }
  }

  public render() {
    const { isDisplay, isHidePreloader } = this.state;

    if (isDisplay) {
      return (
        <div className={classNames(
          styles.popupPreloader,
          isHidePreloader && styles.isHidePreloader,
        )}>
          <MNFSTLogo className={styles.logo} />
        </div>
      );
    }

    return null;
  }
}

export default PopupPreloader;
