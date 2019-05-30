import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface ISideNavigationProps {
  children: React.ReactNode;
  onInit?: (element: HTMLElement) => void;
  style: any;
}

interface ISideNavigationItemProps {
  anchor?: string;
  children: React.ReactNode;
  href?: string;
  isActive?: boolean;
  level?: number;
  link?: string;
  onClick?: () => void;
}

export class SideNavigation extends React.Component<ISideNavigationProps> {
  public render() {
    const { children, style } = this.props;
    return (
      <nav
        ref={this.handleInit}
        className={styles.sideNavigation}
        style={style}>
        {children}
      </nav>
    );
  }

  private handleInit = (element) => {
    const { onInit } = this.props;
    if (onInit) {
      onInit(element);
    }
  }
}

export const SideNavigationItem: React.SFC<ISideNavigationItemProps> = (props) => {
  const { anchor, children, isActive, level, onClick } = props;
  return (
    <div
      className={classNames(
        styles.sideNavigationItem,
        level && styles[`level${level}`],
        isActive && styles.isActive,
      )}
      onClick={onClick && onClick}>
      {isActive
        ? (
          <span className={styles.control}>
            {children}
          </span>
        )
        : (
          <a
            href={anchor && `#${anchor}`}
            className={classNames(
              styles.control,
              styles.link,
            )}>
            {children}
          </a>
        )
      }
    </div>
  );
};
