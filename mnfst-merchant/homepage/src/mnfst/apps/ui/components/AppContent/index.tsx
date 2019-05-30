import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface IAppContentProps {
  children: React.ReactNode;
  className?: string;
}

const AppContent: React.SFC<IAppContentProps> = (props) => {
  const { children, className } = props;

  return (
    <div className={classNames(
      styles.appContent,
      className,
    )}>
      {children}
    </div>
  );
};

export default AppContent;
