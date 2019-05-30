import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface ITextStubProps {
  className?: string;
}

export const TextStub: React.SFC<ITextStubProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(
      styles.textStub,
      className,
    )} />
  );
};
