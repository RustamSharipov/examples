import React from 'react';
import { connect } from 'react-redux';
import TagManager from 'react-gtm-module';
import AppFooter from 'apps/ui/components/AppFooter';
import { GTM_EVENTS } from 'constants/tracking';
import { MNFST_SUPPORT_EMAIL } from 'apps/ui/constants/base';
import { IUserLocationReducer } from 'apps/ui/interfaces/userLocation';
import styles from './style.css';

interface IFooterProps {
  userLocation: IUserLocationReducer;
}

class Footer extends React.Component<IFooterProps> {
  public render() {
    const { companyAddress } = this.props.userLocation.userLocation;

    return (
      <footer className={styles.footer}>
        <AppFooter
          classNamesMap={{
            app: styles.app,
            link: styles.link,
            socialNetwork: styles.socialNetwork,
          }}
          companyAddress={companyAddress}
          email={MNFST_SUPPORT_EMAIL}
          onAppClick={this.handleAppClick} />
      </footer>
    );
  }

  private handleAppClick = (params) => {
    const { store } = params;
    const dataLayer = GTM_EVENTS.FOOTER.APPS[store];

    if (dataLayer) {
      TagManager.dataLayer({ dataLayer });
    }
  }
}

function mapStateToProps(state) {
  return {
    userLocation: state.userLocation,
  };
}

export default connect(mapStateToProps)(Footer);
