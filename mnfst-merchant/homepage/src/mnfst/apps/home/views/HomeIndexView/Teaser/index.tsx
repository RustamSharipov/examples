import React from 'react';
import { isAndroid, isIOS, isMobile } from 'react-device-detect';
import TagManager from 'react-gtm-module';
import { AppsLinks, AppLink } from 'apps/ui/components/AppLinks';
import { GTM_EVENTS } from 'constants/tracking';
import { getLocalData } from 'apps/ui/utils/localization';
import BackgroundLayer from './BackgroundLayer';
import MiddleLayer from './MiddleLayer';
import styles from './style.css';

interface ITeaserState {
  isMobileFormat: boolean;
}

class Teaser extends React.Component<any, ITeaserState> {
  public state = {
    isMobileFormat: window.innerWidth < 768,
  };

  private videoRef;

  public componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
    if (this.videoRef) {
      return;
    }
    this.videoRef.play();
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  public render() {
    const { isMobileFormat } = this.state;
    const srcList = isMobileFormat
      ? [
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-screencasts/mnfst-1-mobile.webm',
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-screencasts/mnfst-1-mobile.mp4',
      ]
      : [
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-screencasts/mnfst-1-desktop.webm',
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-screencasts/mnfst-1-desktop.mp4',
      ];

    return (
      <div className={styles.teaser}>
        <BackgroundLayer />
        <MiddleLayer />
        <div className={styles.teaserInner}>
          <div className={styles.sample}>
            <div className={styles.sampleCanvas}>
              <video
                autoPlay={true}
                ref={this.handleRef}
                className={styles.sampleContent}
                id="teaser-video"
                loop={true}
                muted={true}
                playsInline={true}
                preload="auto"
                width="288"
                height="624">
                <source
                  src={srcList[0]}
                  type="video/webm" />
                <source
                  src={srcList[1]}
                  type="video/mp4" />
              </video>
            </div>
          </div>
          <div className={styles.content}>
            <div
              className={styles.title}
              dangerouslySetInnerHTML={{
                __html: getLocalData('pages.userLanding.teaser.title'),
              }} />
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html: getLocalData('pages.userLanding.teaser.description'),
              }} />
            <AppsLinks
              className={styles.apps}
              noLabel={true}>
              {(isIOS || !isMobile) && (
                <AppLink
                  className={styles.app}
                  classNamesMap={{ caption: styles.appCaption }}
                  onClick={this.handleAppClick}
                  size="large"
                  store="app-store"
                  withCaption={true} />
              )}
              {(isAndroid || !isMobile) && (
                <AppLink
                  className={styles.app}
                  classNamesMap={{ caption: styles.appCaption }}
                  onClick={this.handleAppClick}
                  size="large"
                  store="google-play"
                  withCaption={true} />
              )}
            </AppsLinks>
          </div>
        </div>
      </div>
    );
  }

  private handleAppClick = (params) => {
    const { store } = params;
    const dataLayer = GTM_EVENTS.LANDING.TEASER.APPS[store];

    if (dataLayer) {
      TagManager.dataLayer({ dataLayer });
    }
  }

  private handleWindowResize = () => {
    this.setState({
      isMobileFormat: window.innerWidth < 768,
    });
  }

  private handleRef = (ref) => {
    this.videoRef = ref;
  }
}

export default Teaser;
