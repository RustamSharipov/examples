import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import WarningTriangle from 'apps/ui/components/icons/WarningTriangle';
import { routes } from 'merchant/routes';
import styles from './style.css';
import { getLocalString } from 'utils/localization';

interface IAlertPopupBar {
  body: string;
  subject?: string;
  className?: string;
  location: any;
  title: string;
  type: string;
}

const alertsTypes = {
  error: {
    className: styles.errorType,
    icon: <WarningTriangle className={styles.iconImage} />,
  },
};

const actions = {
  billing: {
    caption: getLocalString('ui.alerts.billing.actionCaption'),
    link: routes.billing.getPath(),
  },
};

const AlertPopupBar: React.SFC<IAlertPopupBar> = (props) => {
  const { body, className, location, subject, title, type } = props;
  const alertType = type && alertsTypes[type];
  const action = subject && actions[subject];

  return (
    <div className={styles.alertPopupBar}>
      <div className={classNames(
        styles.container,
        className,
        alertType.className,
      )}>
        <div className={styles.message}>
          <div className={styles.content}>
            {(alertType && alertType.icon) && (
              <div className={styles.icon}>
                {alertType.icon}
              </div>
            )}
            <div className={styles.title}>
              {title}
            </div>
            <div className={styles.caption}>
              {body}
            </div>
          </div>
          {(action && action.link !== location.pathname) && (
            <Link
              className={styles.action}
              to={action.link}>
              {action.caption}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertPopupBar;
