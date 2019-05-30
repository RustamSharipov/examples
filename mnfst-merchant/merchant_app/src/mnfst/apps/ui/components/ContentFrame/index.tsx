import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

const dockVariantsClassNames = {
  bottom: styles.dockBottom,
  left: styles.dockLeft,
  'left-right': styles.dockLeftRight,
  right: styles.dockRight,
  top: styles.dockTop,
};

interface IContentFrameProps {
  children: React.ReactNode;
  className?: string;
  dockTo?: string;
  hasErrors?: boolean;
  onRef?: (node: HTMLDivElement) => void;
  noPaddings?: boolean;
}

interface IContentFrameSetProps {
  children: React.ReactNode;
  className?: string;
}

interface IContentFrameCTAProps {
  children: React.ReactNode;
  className?: string;
}

export class ContentFrame extends React.Component<IContentFrameProps> {
  public render() {
    const { children, className, dockTo, hasErrors, noPaddings } = this.props;
    const dockVariantClassName = dockTo && dockVariantsClassNames[dockTo];

    return (
      <div
        ref={this.handleRef}
        className={classNames(
          styles.contentFrame,
          noPaddings && styles.noPaddings,
          className,
          hasErrors && styles.hasErrors,
          dockVariantClassName,
        )}>
        {children}
      </div>
    );
  }

  private handleRef = (node: HTMLDivElement) => {
    const { onRef } = this.props;
    if (onRef) {
      onRef(node);
    }
  }
}

export const ContentFrameCTA: React.SFC<IContentFrameCTAProps> = ({ children, className }) => {
  return (
    <div className={classNames(
      styles.contentFrameCTA,
      className,
    )}>
      {children}
    </div>
  );
};

export const ContentFrameSet: React.SFC<IContentFrameSetProps> = ({ children, className }) => {
  return (
    <div className={classNames(
      styles.contentFrameSet,
      className,
    )}>
      {children}
    </div>
  );
};
