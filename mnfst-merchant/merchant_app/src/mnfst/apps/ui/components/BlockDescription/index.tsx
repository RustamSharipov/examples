import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

const dockVariantsClassNames = {
  bottom: styles.dockBottom,
  top: styles.dockTop,
  'top-bottom': styles.dockTopBottom,
};

interface IBlockDescriptionProps {
  children: React.ReactNode;
  className?: string;
  dockTo?: string;
  iconBefore?: React.ReactElement<any>;
  onRef?: (node: HTMLDivElement) => void;
  title?: string | null;
}

class BlockDescription extends React.Component<IBlockDescriptionProps> {
  public render() {
    const { children, className, dockTo, iconBefore, title } = this.props;
    const dockVariantClassName = dockTo && dockVariantsClassNames[dockTo];
    return (
      <div
        ref={this.handleRef}
        className={classNames(
          styles.blockDescription,
          dockVariantClassName,
          className,
        )}>
        {iconBefore && (
          <div className={styles.icon}>
            {React.cloneElement(iconBefore, {
              className: styles.iconImage,
            })}
          </div>
        )}
        <div className={styles.content}>
          {title && (
            <div className={styles.title}>
              {title}
            </div>
          )}
          <div className={styles.text}>
            {children}
          </div>
        </div>
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

export default BlockDescription;
