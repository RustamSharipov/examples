import React from 'react';
import classNames from 'classnames';
import ComponentContainer from 'apps/ui/components/ComponentContainer';
import { IElementNode } from 'apps/ui/interfaces/elementNode';
import styles from './style.css';

interface IPageSectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface IPageSectionDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface IPageSectionContentProps {
  children: React.ReactNode;
  className?: string;
}

interface IPageSectionProps {
  children: React.ReactNode;
  className?: string;
  dockTo?: string | null | undefined;
  isRevealable?: boolean;
  isRevealed?: boolean;
  onRef?: (elementNode: IElementNode) => void;
  title?: React.ReactNode | string;
}

export const PageSectionTitle: React.SFC<IPageSectionTitleProps> = (props) => {
  const { children, className } = props;

  return (
    <div className={classNames(
      styles.pageSectionTitle,
      className,
    )}>
      {children}
    </div>
  );
};

export const PageSectionDescription: React.SFC<IPageSectionDescriptionProps> = (props) => {
  const { children, className } = props;

  return (
    <div className={classNames(
      styles.pageSectionDescription,
      className,
    )}>
      {children}
    </div>
  );
};

export const PageSectionContent: React.SFC<IPageSectionContentProps> = (props) => {
  const { children, className } = props;

  return (
    <div className={classNames(
      styles.pageSectionContent,
      className,
    )}>
      {children}
    </div>
  );
};

const dockVariantsClassNames = {
  bottom: styles.dockBottom,
  top: styles.dockTop,
  'top-bottom': styles.dockTopBottom,
};

export class PageSection extends React.Component<IPageSectionProps> {
  public render() {
    const { children, className, isRevealable, isRevealed, dockTo } = this.props;
    const dockVariantClassName = dockTo && dockVariantsClassNames[dockTo];

    return (
      <ComponentContainer
        className={classNames(
          styles.pageSection,
          dockVariantClassName,
          isRevealable && styles.isRevealable,
          isRevealed && styles.isRevealed,
          className,
        )}
        onRef={this.handleRef}>
        {children}
      </ComponentContainer>
    );
  }

  private handleRef = (elementNode: IElementNode) => {
    const { onRef } = this.props;

    if (onRef) {
      onRef(elementNode);
    }
  }
}
