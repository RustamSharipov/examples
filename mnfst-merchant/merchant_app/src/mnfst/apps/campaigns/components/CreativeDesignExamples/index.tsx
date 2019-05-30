import React from 'react';
import classNames from 'classnames';
import styles from './style.css';
import { getLocalString } from 'utils/localization';

interface ICreativeDesignExampleCallbackParams {
  name: string;
}

interface ICreativeDesignExampleProps {
  children: React.ReactNode;
  name: string;
  notAvailable?: boolean;
  onClick?: (params: ICreativeDesignExampleCallbackParams) => void;
  onMouseEnter?: (params: ICreativeDesignExampleCallbackParams) => void;
  onMouseLeave?: (params: ICreativeDesignExampleCallbackParams) => void;
  onRef?: (node: HTMLDivElement) => void;
}

interface ICreativeDesignExamplesProps {
  children: React.ReactNode;
}

export class CreativeDesignExample extends React.Component<ICreativeDesignExampleProps> {
  public render() {
    const { children, notAvailable } = this.props;
    return (
      <div
        ref={this.handleRef}
        className={styles.creativeDesignExample}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        <div className={classNames(
          styles.creativeDesignExampleText,
          notAvailable && styles.notAvailable,
        )}>
          <span className={styles.creativeDesignExampleTextInner}>
            {children}
          </span>
          {notAvailable && (
            <span className={styles.creativeDesignExampleTextNotAvailableLabel}>
              {getLocalString('ui.labels.soon')}
            </span>
          )}
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

  private handleClick = () => {
    const { name, notAvailable, onClick } = this.props;
    if (onClick && !notAvailable) {
      onClick({ name });
    }
  }

  private handleMouseEnter = () => {
    const { name, notAvailable, onMouseEnter } = this.props;
    if (onMouseEnter && !notAvailable) {
      onMouseEnter({ name });
    }
  }

  private handleMouseLeave = () => {
    const { name, notAvailable, onMouseLeave } = this.props;
    if (onMouseLeave && !notAvailable) {
      onMouseLeave({ name });
    }
  }
}

export const CreativeDesignExamples: React.SFC<ICreativeDesignExamplesProps> = (props) => {
  const { children } = props;
  return (
    <div className={styles.creativeDesignExamples}>
      {children}
    </div>
  );
};
