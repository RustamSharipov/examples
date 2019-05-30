import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface IDialogProps {
  children: React.ReactNode;
  className?: string;
}

interface IDialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface IDialogContentProps {
  children: React.ReactNode;
  className?: string;
}

interface IDialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

interface IDialogPreheaderProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

interface IDialogPostFooterProps {
  children: React.ReactNode;
  className?: string;
}

interface IDialogCloseProps {
  className?: string;
  onClick?: () => void;
}

interface IDialogControlsProps {
  children: React.ReactNode;
  className?: string;
}

export const Dialog: React.SFC<IDialogProps> = (props) => {
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

export const DialogHeader: React.SFC<IDialogHeaderProps> = (props) => {
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

export const DialogContent: React.SFC<IDialogContentProps> = (props) => {
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

export const DialogFooter: React.SFC<IDialogFooterProps> = (props) => {
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

export const DialogPreheader: React.SFC<IDialogPreheaderProps> = (props) => {
  const { className, icon, children } = props;
  return (
    <div className={classNames(
      styles.dialogPreheader,
      className,
    )}>
      {icon && (
        <div className={styles.dialogPreheaderIcon}>
          {icon}
        </div>
      )}
      <div className={styles.dialogPreheaderTitle}>
        {children}
      </div>
    </div>
  );
};

export const DialogPostFooter: React.SFC<IDialogPostFooterProps> = (props) => {
  const { children, className } = props;
  return (
    <div className={classNames(
      styles.dialogPostFooter,
      className,
    )}>
      {children}
    </div>
  );
};

export const DialogClose: React.SFC<IDialogCloseProps> = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={classNames(
        styles.dialogClose,
        className,
      )}
      onClick={onClick && onClick} />
  );
};

export const DialogControls: React.SFC<IDialogControlsProps> = (props) => {
  const { children, className } = props;

  return (
    <div className={classNames(
      styles.dialogControls,
      className,
    )}>
      {children}
    </div>
  );
};
