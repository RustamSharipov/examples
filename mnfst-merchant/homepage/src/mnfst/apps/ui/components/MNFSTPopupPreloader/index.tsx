import React from 'react';
import classNames from 'classnames';
import MNFSTLogo from 'apps/ui/components/MNFSTLogo';
import { MNFST_POPUP_PRELOADER_HIDE_DELAY } from 'apps/ui/constants/base';
import styles from './style.css';

interface IMNFSTPopupPreloaderProps {
  isDisplay: boolean;
  theme?: string;
}

interface IMNFSTPopupPreloaderState {
  isDisplay: boolean;
  isHidePreloader: boolean;
}

const themesClassNames = {
  dark: styles.darkTheme,
};

class MNFSTPopupPreloader extends React.Component<IMNFSTPopupPreloaderProps, IMNFSTPopupPreloaderState> {
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
      setTimeout(
        () => {
          this.setState({ isDisplay: false });
        },
        MNFST_POPUP_PRELOADER_HIDE_DELAY,
      );
    }
  }

  public render() {
    const { theme } = this.props;
    const { isDisplay, isHidePreloader } = this.state;
    const themeClassName = theme && themesClassNames[theme];

    if (isDisplay) {
      return (
        <div className={classNames(
          styles.mnfstPopupPreloader,
          themeClassName,
          isHidePreloader && styles.isHidden,
        )}>
          <MNFSTLogo className={styles.logo} />
        </div>
      );
    }

    return null;
  }
}

export default MNFSTPopupPreloader;
