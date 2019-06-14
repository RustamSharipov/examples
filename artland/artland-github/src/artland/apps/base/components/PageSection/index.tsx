import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface IPageSectionProps {
  children: React.ReactNode;
}

export const PageSection: React.FC<IPageSectionProps> = (props) => {
  const { children } = props;

  return (
    <div className={styles.pageSection}>
      {children}
    </div>
  );
};

interface IPageSectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const PageSectionTitle: React.FC<IPageSectionTitleProps> = (props) => {
  const { children, className } = props;

  return (
    <div className={classNames(
      styles.pageSectionTitle,
      className,
    )}>
      {children}
    </div>
  );
};

interface IPageSectionContentProps {
  children: React.ReactNode;
}

export const PageSectionContent: React.FC<IPageSectionContentProps> = (props) => {
  const { children } = props;

  return (
    <div className={styles.pageSectionContent}>
      {children}
    </div>
  );
};
