import React from 'react';
import classNames from 'classnames';
import { ContentFrame } from 'apps/ui/components/ContentFrame';
import styles from './style.css';

interface IGuidesNotesProps {
  children: React.ReactNode;
  className?: string;
}

interface IGuidesNotesItemProps {
  children: React.ReactNode;
  className?: string;
  order?: number;
}

interface IGuidesNotesCode {
  caption?: string;
  children: React.ReactNode;
  className?: string;
  onCopy?: (params: any) => void;
}

export const GuidesNotes: React.SFC<IGuidesNotesProps> = (props) => {
  const { children, className } = props;
  return (
    <div className={classNames(
      styles.guidesNotes,
      className,
    )}>
      <ContentFrame noPaddings={true}>
        <div className={styles.content}>
          {children}
        </div>
      </ContentFrame>
    </div>
  );
};

export const GuidesNotesItem: React.SFC<IGuidesNotesItemProps> = (props) => {
  const { children, className, order } = props;
  return (
    <div className={classNames(
      styles.guidesNotesItem,
      className,
    )}>
      {order && (
        <div className={styles.order}>
          {order}.
        </div>
      )}
      <div>
        {children}
      </div>
    </div>
  );
};

export class GuidesNotesCode extends React.Component<IGuidesNotesCode> {
  public state = {
    isCopied: false,
  };

  public render() {
    const { caption, children, className } = this.props;

    return (
      <div className={styles.guidesNotesCode}>
        <div className={styles.guidesNotesCodeContent}>
          <span>
            <span className={className} onClick={event => this.handleClick(event)}>
              {children}
            </span>
          </span>
        </div>
        {caption && (
          <div className={styles.caption}>
            {caption}
          </div>
        )}
      </div>
    );
  }

  private handleClick = (event) => {
    const { onCopy } = this.props;
    const copyToClipboardIsSupported = document.queryCommandSupported('copy');
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(event.target.parentNode);
    selection.removeAllRanges();
    selection.addRange(range);
    const content = selection.toString();

    if (copyToClipboardIsSupported) {
      document.execCommand('copy');
      selection.removeAllRanges();
      if (onCopy) {
        onCopy(content);
      }
    }
  }
}
