import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface IContent {
  children: React.ReactNode;
}

const Content: React.SFC<IContent> = ({ children }) => {
  return (
    <div className={classNames(
      styles.content,
      'spec-app-content',
    )}>
      {children}
    </div>
  );
};

export default Content;
