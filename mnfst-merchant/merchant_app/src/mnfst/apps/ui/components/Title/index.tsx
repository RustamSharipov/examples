import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface ITitle {
  className?: string;
  children?: React.ReactNode;
  level?: string | number;
  onInit?: (params: any) => void;
  text?: string | null;
  textAlign?: string;
}

interface ITitleStub {
  level?: string | number;
}

class Title extends React.Component<ITitle> {
  public static defaultProps = {
    level: 1,
  };

  public render() {
    const { className, children, level, text, textAlign } = this.props;
    return (
      <div
        ref={this.handleInit}
        className={classNames(
          styles.title,
          className,
          level && `title-${level}`,
          textAlign && styles[`${textAlign}Alignment`],
        )}>
        {text || children}
      </div>
    );
  }

  private handleInit = (element: React.ReactNode) => {
    const { text, onInit } = this.props;
    if (onInit) {
      onInit({
        element,
        text,
      });
    }
  }
}

export default Title;

export const TitleStub: React.SFC<ITitleStub> = ({ level }) => {
  return (
    <div className={classNames(
      styles.title,
      styles.titleStub,
      level && styles[`level${level}`],
    )} />
  );
};
