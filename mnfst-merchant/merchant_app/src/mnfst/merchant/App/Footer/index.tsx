import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Animation from 'apps/ui/components/Animation';
import TextLink from 'apps/ui/components/TextLink';
import { BUSINESS_MNFST_SUPPORT_EMAIL, MNFST_EXTERNAL_LINKS } from 'constants/base';
import { IUserLocationReducer } from 'apps/ui/interfaces/userLocation';
import { getLocalString } from 'utils/localization';
import styles from './style.css';

interface IFooterProps {
  user: any;
  userLocation: IUserLocationReducer;
}

class Footer extends React.Component<IFooterProps> {
  public render() {
    const {
      user: { merchant_user },
      userLocation: { status, userLocation: { companyAddress } },
    } = this.props;

    return (
      <div className={classNames(
        styles.footer,
        !merchant_user && styles.darkTheme,
      )}>
        <div className={styles.section}>
          <Animation
            isActivated={!!companyAddress && status !== 'receiving'}
            type="fade">
            © 2019, {companyAddress}
          </Animation>
        </div>
        <div className={styles.section}>
          <div className={styles.navItems}>
            <div className={styles.navItem}>
              <TextLink
                href={MNFST_EXTERNAL_LINKS.LICENSE}
                target="_blank"
                theme="grey">
                {getLocalString('externalLinks.license')}
              </TextLink>
            </div>
            <div className={styles.navItem}>
              <TextLink
                href={MNFST_EXTERNAL_LINKS.PRIVACY_POLICY}
                target="_blank"
                theme="grey">
                {getLocalString('externalLinks.privacyPolicy')}
              </TextLink>
            </div>
            <div className={styles.navItem}>
              <TextLink
                href={MNFST_EXTERNAL_LINKS.COOKIE_POLICY}
                target="_blank"
                theme="grey">
                {getLocalString('externalLinks.cookiePolicy')}
              </TextLink>
            </div>
          </div>
        </div>
        <div className={styles.support}>
          {getLocalString('ui.footer.supportEmail.label')}{' '}
          <TextLink
            href={`mailto:${BUSINESS_MNFST_SUPPORT_EMAIL}`}
            target="_blank"
            theme="grey">
            {BUSINESS_MNFST_SUPPORT_EMAIL}
          </TextLink>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    userLocation: state.userLocation,
  };
}

export default connect(mapStateToProps)(Footer);
