import React from 'react';
import classNames from 'classnames';
import Description, { DescriptionStub } from 'apps/ui/components/Description';
import Title, { TitleStub } from 'apps/ui/components/Title';
import styles from './style.css';

interface IPageProps {
  children: React.ReactNode;
  className?: string;
}

interface IPageHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface IPageContentProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

interface IPageSectionProps {
  children: React.ReactNode;
  description?: any;
  descriptionStub?: boolean;
  level?: string | number;
  onRef?: (node: HTMLDivElement) => void;
  title?: any;
  titleStub?: boolean;
  type?: string;
}

export const Page: React.SFC<IPageProps> = (props) => {
  const { children, className } = props;
  return (
    <div className={classNames(
      styles.page,
      className,
    )}>
      {children}
    </div>
  );
};

export const PageHeader: React.SFC<IPageHeaderProps> = (props) => {
  const { children, className } = props;
  return (
    <div className={classNames(
      styles.header,
      className,
    )}>
      {children}
    </div>
  );
};

export const PageContent: React.SFC<IPageContentProps> = (props) => {
  const { children, className, noPadding } = props;
  return (
    <div className={classNames(
      styles.content,
      noPadding && styles.noPadding,
      className,
    )}>
      {children}
    </div>
  );
};

export class PageSection extends React.Component<IPageSectionProps> {
  public static defaultProps = {
    level: 1,
  };

  public render() {
    const { children, description, level, descriptionStub, titleStub, title, type } = this.props;
    const sectionTypesClasses = {
      footer: styles.footerType,
    };

    const titleLevel = level ? +level + 2 : 3;

    return (
      <div
        ref={this.handleRef}
        className={classNames(
          styles.section,
          type && sectionTypesClasses[type],
          level && styles[`level${level}`],
        )}>
        {title && (
          <Title level={titleLevel}>
            {title}
          </Title>
        )}
        {titleStub && (
          <TitleStub level={titleLevel} />
        )}
        {description && (
          <Description>
            {description}
          </Description>
        )}
        {descriptionStub && (
          <DescriptionStub />
        )}
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
