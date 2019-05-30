import React from 'react';
import classNames from 'classnames';
import { ContentFrame } from 'apps/ui/components/ContentFrame';
import { FlexLayout } from 'apps/ui/components/FlexLayout';
import styles from './style.css';

const dockVariantsClassNames = {
  bottom: styles.dockBottom,
  left: styles.dockLeft,
  right: styles.dockRight,
  top: styles.dockTop,
  'top-left': styles.dockTopLeft,
  'top-right': styles.dockTopRight,
  'bottom-left': styles.dockBottomLeft,
  'bottom-right': styles.dockBottomRight,
};

interface ILinksGrid {
  children: React.ReactNode;
}

interface ILinksGridItem {
  attach?: string;
  className?: string;
  dockTo?: string;
  href?: string;
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const LinksGrid: React.SFC<ILinksGrid> = (props) => {
  const { children } = props;
  return (
    <ContentFrame>
      <FlexLayout className={styles.linksGrid}>
        {children}
      </FlexLayout>
    </ContentFrame>
  );
};

export const LinksGridItem: React.SFC<ILinksGridItem> = (props) => {
  const { attach, className, dockTo, href, icon, title, subtitle } = props;
  const fileName = attach && attach.split('/')[attach.split('/').length - 1];
  const dockVariantClassName = dockTo && dockVariantsClassNames[dockTo];

  return (
    <div className={classNames(
      styles.linksGridItem,
      className,
      dockVariantClassName,
    )}>
      <a
        className={classNames(
          styles.link,
          !icon && styles.noIcon,
        )}
        href={href || attach}>
        {icon && (
          <div className={styles.icon}>
            {icon}
          </div>
        )}
        <div className={classNames(
          styles.title,
          href && styles.name,
        )}>
          {title}
        </div>
        {subtitle && (
          <div className={classNames(
            styles.title,
            href && styles.name,
          )}>
            {subtitle}
          </div>
        )}
        {attach && (
          <div className={classNames(
            styles.title,
            attach && styles.attach,
          )}>
            {fileName}
          </div>
        )}
      </a>
    </div>
  );
};
