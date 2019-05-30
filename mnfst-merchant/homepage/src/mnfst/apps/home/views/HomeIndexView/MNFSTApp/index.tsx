import React from 'react';
import TagManager from 'react-gtm-module';
import Button from 'apps/home/components/Button';
import UserJoinForm from 'apps/ui/components/UserJoinForm';
import { GTM_EVENTS } from 'constants/tracking';
import { MNFST_EXTERNAL_LINKS } from 'apps/ui/constants/base';
import { getLocalData } from 'apps/ui/utils/localization';
import styles from './style.css';

class MNFSTApp extends React.Component {
  public render() {
    return (
      <div className={styles.mnfstApp}>
        <div className={styles.mnfstAppInner}>
          <div className={styles.appSection}>
            <div
              className={styles.title}
              dangerouslySetInnerHTML={{
                __html: getLocalData('pages.userLanding.mnfstApp.app.title'),
              }} />
            <div className={styles.content}>
              <div className={styles.userJoinForm}>
                <UserJoinForm
                  classNamesMap={{
                    button: styles.userJoinFormButton,
                    textInputContainer: styles.userJoinFormTextInputContainer,
                  }}
                  onSuccess={this.handleUserJoinFormSuccess}
                  onPhoneChange={this.handleUserJoinPhoneChange} />
              </div>
            </div>
          </div>
          <div className={styles.businessSection}>
            <div
              className={styles.title}
              dangerouslySetInnerHTML={{
                __html: getLocalData('pages.userLanding.mnfstApp.business.title'),
              }} />
            <div className={styles.content}>
              <div className={styles.links}>
                <Button
                  className={styles.button}
                  href={MNFST_EXTERNAL_LINKS.BUSINESS_LANDING}
                  onClick={this.handleLearnButtonClick}>
                  {getLocalData('pages.userLanding.mnfstApp.business.businessLinkLabel')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private handleUserJoinFormSuccess = () => {
    const dataLayer = GTM_EVENTS.LANDING.FOOTER.JOIN_USER_FORM.BUTTON;

    if (dataLayer) {
      TagManager.dataLayer({ dataLayer });
    }
  }

  private handleUserJoinPhoneChange = () => {
    const dataLayer = GTM_EVENTS.LANDING.FOOTER.JOIN_USER_FORM.INPUT;

    if (dataLayer) {
      TagManager.dataLayer({ dataLayer });
    }
  }

  private handleLearnButtonClick = () => {
    const dataLayer = GTM_EVENTS.LANDING.FOOTER.LEARN_BUTTON;

    if (dataLayer) {
      TagManager.dataLayer({ dataLayer });
    }
  }
}

export default MNFSTApp;
