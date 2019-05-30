import React from 'react';
import classNames from 'classnames';
import InfoCircleIcon from 'apps/ui/components/icons/InfoCircleIcon';
import styles from './style.css';

interface ITooltipProps {
  className?: string;
  children?: React.ReactNode;
  content?: string | number;
  theme?: string;
  style?: any;
}

interface ITooltipState {
  position: string;
}

const positionsClassNames = {
  after: styles.afterPosition,
  before: styles.beforePosition,
};

const themesClassNames = {
  grey: styles.greyTheme,
  violet: styles.violetTheme,
};

class Tooltip extends React.PureComponent<ITooltipProps, ITooltipState> {
  public contentNode?: HTMLDivElement;

  public state = {
    position: 'after',
  };

  public componentDidMount() {
    this.updateTooltipContentPosition();
    window.addEventListener('resize', this.updateTooltipContentPosition);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.updateTooltipContentPosition);
  }

  public render() {
    const { children, className, content, style, theme } = this.props;
    const { position } = this.state;
    const positionClassName = positionsClassNames[position];
    const themeClassName = theme && themesClassNames[theme];

    return (
      <div
        className={classNames(
          styles.tooltip,
          themeClassName,
          className,
        )}
        style={style}>
        <span className={styles.icon}>
          <InfoCircleIcon className={styles.iconImage} />
        </span>
        <div
          ref={this.handleContentRef}
          className={classNames(
            styles.content,
            positionClassName,
          )}>
          {content}
          {children}
        </div>
      </div>
    );
  }

  private handleContentRef = (node: HTMLDivElement) => {
    this.contentNode = node;
  }

  private updateTooltipContentPosition = () => {
    if (this.contentNode) {
      const { left, width } = this.contentNode.getBoundingClientRect();
      this.setState({
        position: left + width > window.innerWidth + window.scrollX ? 'before' : 'after',
      });
    }
  }
}

export default Tooltip;
