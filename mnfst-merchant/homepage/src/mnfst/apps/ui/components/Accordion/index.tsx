import React from 'react';
import classNames from 'classnames';
import { ID } from 'apps/ui/types/base';
import { IClassNamesMap } from 'apps/ui/interfaces/elementNode';
import styles from './style.css';

interface IAccordionItemClassNames {
  content: string;
  title: string;
}

interface IAccordionItemEventParams {
  id: ID;
}

interface IAccordionItemProps {
  className?: string;
  classNamesMap?: IClassNamesMap<IAccordionItemClassNames>;
  content: string | React.ReactNode;
  id: ID;
  isExpanded: boolean;
  onClick?: (params: IAccordionItemEventParams) => void;
  onTitleClick?: (params: IAccordionItemEventParams) => void;
  title: string | React.ReactNode;
}

interface IAccordionItemState {
  contentHeight?: number;
}

interface IAccordionProps {
  className?: string;
  children: React.ReactNode;
}

export class AccordionItem extends React.Component<IAccordionItemProps, IAccordionItemState> {
  public contentInnerNode: HTMLDivElement;

  public state = {
    contentHeight: undefined,
  };

  public componentDidMount() {
    this.updateContentHeight();
    window.addEventListener('resize', this.updateContentHeight);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.updateContentHeight);
  }

  public render() {
    const { className, classNamesMap = {}, content, isExpanded, title } = this.props;
    const { contentHeight } = this.state;
    const contentInnerStyle = {
      height: contentHeight,
    };

    return (
      <div
        className={classNames(
          styles.accordionItem,
          isExpanded && styles.isExpanded,
          className,
        )}
        onClick={this.handleClick}>
        <div
          className={styles.accordionItemTitle}
          onClick={this.handleTitleClick}>
          {title}
        </div>
        <div
          className={classNames(
            styles.accordionItemContent,
            classNamesMap.content,
          )}
          style={contentInnerStyle}>
          <div ref={this.handleContentItemInnerRef}>
          {content}
          </div>
        </div>
      </div>
    );
  }

  private handleContentItemInnerRef = (node: HTMLDivElement) => {
    this.contentInnerNode = node;
  }

  private handleClick = () => {
    const { id, onClick } = this.props;

    if (onClick) {
      onClick({ id });
    }
  }

  private handleTitleClick = () => {
    const { id, onTitleClick } = this.props;

    if (onTitleClick) {
      onTitleClick({ id });
    }
  }

  private updateContentHeight = () => {
    if (this.contentInnerNode) {
      const { height: contentHeight } = this.contentInnerNode.getBoundingClientRect();
      this.setState({ contentHeight });
    }
  }
}

export const Accordion: React.SFC<IAccordionProps> = (props) => {
  const { children, className } = props;

  return (
    <div className={className}>
      {children}
    </div>
  );
};
