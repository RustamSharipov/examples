import React from 'react';
import classNames from 'classnames';
import {
  PageSection, PageSectionContent, PageSectionDescription, PageSectionTitle,
} from 'apps/ui/components/PageSection';
import { IElementNode } from 'apps/ui/interfaces/elementNode';
import styles from './style.css';

const REVEAL_THRESHOLD_FACTOR = 0.25;

interface IHomePageSectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface IHomePageSectionDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface IHomePageSectionContentProps {
  children: React.ReactNode;
}

interface IHomePageSectionProps {
  children: React.ReactNode;
  className?: string;
  onRef?: (elementNode: IElementNode) => void;
}

interface IHomePageSectionState {
  isRevealed: boolean;
}

export const HomePageSectionTitle: React.SFC<IHomePageSectionTitleProps> = (props) => {
  const { children, className } = props;

  return (
    <PageSectionTitle
      className={classNames(
        styles.homepageSectionTitle,
        className,
      )}>
      {children}
    </PageSectionTitle>
  );
};

export const HomePageSectionDescription: React.SFC<IHomePageSectionDescriptionProps> = (props) => {
  const { children, className } = props;

  return (
    <PageSectionDescription
      className={classNames(
        styles.homepageSectionDescription,
        className,
      )}>
      {children}
    </PageSectionDescription>
  );
};

export const HomePageSectionContent: React.SFC<IHomePageSectionContentProps> = (props) => {
  const { children } = props;

  return (
    <PageSectionContent className={styles.homepageSectionContent}>
      {children}
    </PageSectionContent>
  );
};

export class HomePageSection extends React.Component<IHomePageSectionProps, IHomePageSectionState> {
  public elementNode: IElementNode;

  public state = {
    isRevealed: false,
  };

  public componentDidMount() {
    window.addEventListener('scroll', this.handleWindowScroll);
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll);
  }

  public render() {
    const { children, className } = this.props;
    const { isRevealed } = this.state;

    return (
      <PageSection
        className={classNames(
          styles.homepageSection,
          className,
          isRevealed && styles.isRevealed,
        )}
        onRef={this.handleRef}>
        {children}
      </PageSection>
    );
  }

  private handleRef = (elementNode: IElementNode) => {
    const { onRef } = this.props;
    this.elementNode = elementNode;

    if (onRef) {
      onRef(elementNode);
    }
  }

  private handleWindowScroll = () => {
    const { innerHeight, scrollY } = window;
    const { isRevealed } = this.state;

    if (
      !isRevealed && this.elementNode.top
      && this.elementNode.top + innerHeight * REVEAL_THRESHOLD_FACTOR <= innerHeight + scrollY
    ) {
      this.setState({
        isRevealed: true,
      });
    }
  }
}
