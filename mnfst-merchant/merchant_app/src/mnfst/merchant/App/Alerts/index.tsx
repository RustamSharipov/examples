import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AlertPopupBar from 'apps/ui/components/AlertPopupBar';
import { IAlertMessage } from 'apps/users/interfaces/user';

interface IAlertsProps {
  alert: IAlertMessage;
  location: any;
}

const Alerts: React.SFC<IAlertsProps> = (props) => {
  const { alert } = props;

  if (alert) {
    return (
      <AlertPopupBar
        body={alert.body}
        location={location}
        subject={alert.subject}
        title={alert.title}
        type={alert.type} />
    );
  }

  return null;
};

function mapStateToProps(state) {
  return {
    alerts: state.alerts,
  };
}

export default withRouter(connect(mapStateToProps)(Alerts));
