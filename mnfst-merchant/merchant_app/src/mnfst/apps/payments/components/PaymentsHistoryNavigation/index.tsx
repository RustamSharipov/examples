import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface IPaymentsHistoryNavigationItemProps {
  children: React.ReactNode;
  icon?: React.ReactElement<any>;
  isActive: boolean;
  onClick?: () => void;
}

interface IPaymentsHistoryNavigationProps {
  children: React.ReactNode;
}

export const PaymentsHistoryNavigationItem: React.SFC<IPaymentsHistoryNavigationItemProps> = (props) => {
  const { children, icon, isActive, onClick } = props;
  return (
    <div
      className={classNames(
        styles.paymentsHistoryNavigationItem,
        isActive && styles.isActive,
      )}
      onClick={onClick && onClick}>
      {icon && (
        <div className={styles.paymentsHistoryNavigationItemIcon}>
          {React.cloneElement(icon, { className: styles.paymentsHistoryNavigationItemIconImage })}
        </div>
      )}
      <div>
        {children}
      </div>
    </div>
  );
};

export const PaymentsHistoryNavigation: React.SFC<IPaymentsHistoryNavigationProps> = (props) => {
  const { children } = props;
  return (
    <div className={styles.paymentsHistoryNavigation}>
      {children}
    </div>
  );
};
