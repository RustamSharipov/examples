import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface IDialogProps {
  children: React.ReactNode;
  className?: string;
}

export const Dialog: React.FC<IDialogProps> = (props) => {
  const { children, className } = props;
  return (
    <div className={classNames(
      styles.dialog,
      className,
    )}>
      {children}
    </div>
  );
};

interface IDialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogHeader: React.FC<IDialogHeaderProps> = (props) => {
  const { children, className } = props;
  return (
    <div className={classNames(
      styles.dialogHeader,
      className,
    )}>
      {children}
    </div>
  );
};

interface IDialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogContent: React.FC<IDialogContentProps> = (props) => {
  const { children, className } = props;
  return (
    <div className={classNames(
      styles.dialogContent,
      className,
    )}>
      {children}
    </div>
  );
};

interface IDialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogFooter: React.FC<IDialogFooterProps> = (props) => {
  const { children, className } = props;
  return (
    <div className={classNames(
      styles.dialogFooter,
      className,
    )}>
      {children}
    </div>
  );
};
