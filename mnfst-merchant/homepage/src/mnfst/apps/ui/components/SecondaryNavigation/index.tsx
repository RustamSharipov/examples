import React from 'react';
import classNames from 'classnames';
import TextLink from 'apps/ui/components/TextLink';
import { IClassNamesMap } from 'apps/ui/interfaces/elementNode';
import styles from './style.css';

interface ISecondaryNavigationItemClassNames {
  link: string;
}

interface ISecondaryNavigationItemProps {
  children: React.ReactNode;
  className?: string;
  classNamesMap?: IClassNamesMap<ISecondaryNavigationItemClassNames>;
  href?: string;
  isActive?: boolean;
  link?: string;
  onClick?: () => void;
  target?: string;
  theme?: string;
}

interface ISecondaryNavigation {
  children: React.ReactNode;
}

export const SecondaryNavigation: React.SFC<ISecondaryNavigation> = (props) => {
  const { children } = props;
  return (
    <nav className={styles.secondaryNavigation}>
      {children}
    </nav>
  );
};

export const SecondaryNavigationItem: React.SFC<ISecondaryNavigationItemProps> = (props) => {
  const { className, classNamesMap = {}, children, href, isActive, link, onClick, target, theme } = props;

  return (
    <div className={classNames(
      styles.secondaryNavigationItem,
      className,
    )}>
      <TextLink
        className={classNames(
          styles.control,
          classNamesMap.link,
        )}
        hasUnderline={true}
        href={!isActive ? href : undefined}
        link={!isActive ? link : undefined}
        onClick={onClick && onClick}
        target={target}
        theme={theme}>
        {children}
      </TextLink>
    </div>
  );
};
