import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { IClassNamesMap } from 'apps/ui/interfaces/elementNode';
import styles from './style.css';

interface INavigationItemClassNames {
  link: string;
}

interface INavigationItemProps {
  children: React.ReactNode;
  className?: string;
  classNamesMap?: IClassNamesMap<INavigationItemClassNames>;
  href?: string;
  isActive?: boolean;
  isHighlighted?: boolean;
  link?: string;
  onClick?: () => void;
}

interface INavigationClassNames {
  items: string;
}

interface INavigationProps {
  children: React.ReactNode;
  className?: string;
  classNamesMap?: IClassNamesMap<INavigationClassNames>;
  theme?: string;
}

export const NavigationItem: React.SFC<INavigationItemProps> = (props) => {
  const { children, className, classNamesMap = {}, href, isActive, isHighlighted, link, onClick } = props;
  const navigationItemProps = {
    className: classNames(
      styles.control,
      styles.link,
      classNamesMap.link,
      isHighlighted && styles.isHighlighted,
    ),
    onClick: onClick && onClick,
  };

  let Component = () => {
    return (
      <span {...navigationItemProps}>
        {children}
      </span>
    );
  };

  if (href) {
    Component = () => {
      return (
        <a
          href={href}
          {...navigationItemProps}>
          {children}
        </a>
      );
    };
  }

  if (link) {
    Component = () => {
      return (
        <Link
          to={link}
          {...navigationItemProps}>
          {children}
        </Link>
      );
    };
  }

  if (isActive) {
    Component = () => {
      return (
        <span className={classNames(
          styles.control,
          styles.isActive,
          isHighlighted && styles.isHighlighted,
        )}>
          {children}
        </span>
      );
    };
  }

  return (
    <li className={classNames(
      styles.navigationItem,
      className,
    )}>
      <Component />
    </li>
  );
};

const navigationThemesClassNames = {
  front: styles.frontTheme,
};

export const Navigation: React.SFC<INavigationProps> = (props) => {
  const { children, className, classNamesMap = {}, theme } = props;
  const navigationThemeClassName = theme && navigationThemesClassNames[theme];

  return (
    <div className={classNames(
      styles.navigation,
      navigationThemeClassName,
      className,
    )}>
      <ul className={classNames(
        styles.navigationItems,
        classNamesMap.items,
      )}>
        {children}
      </ul>
    </div>
  );
};
