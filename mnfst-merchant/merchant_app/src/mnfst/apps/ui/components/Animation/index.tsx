import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

const animationTypesClassNames = {
  expand: styles.expandAnimation,
  fade: styles.fadeAnimation,
  show: styles.showAnimation,
};

interface IAnimationProps {
  children: React.ReactNode;
  isActivated: boolean;
  type: string;
}

interface IAnimationState {
  animationDuration: number | null;
  containerHeight: number;
  isAnimationComplete: boolean;
}

class Animation extends React.Component<IAnimationProps, IAnimationState> {
  public animationActivationTimer?: any | null;
  public innerNode: HTMLDivElement;

  public state = {
    animationDuration: null,
    containerHeight: 0,
    isAnimationComplete: false,
  };

  public componentDidMount() {
    this.setState({ containerHeight: this.innerNode.clientHeight });
  }

  public componentDidUpdate(prevProps) {
    const { isActivated } = this.props;
    const { animationDuration } = this.state;

    if (isActivated && !prevProps.isActivated) {
      if (!this.animationActivationTimer) {
        this.animationActivationTimer = setTimeout(
          () => {
            this.setState({ isAnimationComplete: true });
            this.animationActivationTimer = null;
          },
          animationDuration || 0,
        );
      }
    }

    if (!isActivated && prevProps.isActivated) {
      this.setState({ isAnimationComplete: false });
    }
  }

  public render() {
    const { children, type, isActivated } = this.props;
    const { containerHeight, isAnimationComplete } = this.state;
    let containerStyles;

    if (type === 'expand') {
      containerStyles = {
        height: containerHeight,
      };
    }

    return (
      <div
        ref={this.handleContainerRef}
        className={classNames(
          styles.animation,
          animationTypesClassNames[type],
          isActivated && styles.isActivated,
          isAnimationComplete && styles.isAnimationComplete,
        )}
        style={containerStyles}>
        <div ref={this.handleInnerRef}>
          {children}
        </div>
      </div>
    );
  }

  private handleContainerRef = (node: HTMLDivElement) => {
    if (node) {
      const multipliers = {
        d: 24 * 60 * 60 * 1000,
        h: 60 * 60 * 1000,
        m: 60 * 1000,
        s: 1000,
        ms: 1,
      };
      const durationString = getComputedStyle(node).getPropertyValue('--duration');
      const animationDuration = parseFloat(durationString)
        * Object.entries(multipliers).filter(([key]) => durationString.endsWith(key))[0][1];
      this.setState({ animationDuration });
    }
  }

  private handleInnerRef = (node: HTMLDivElement) => {
    this.innerNode = node;
  }
}

export default Animation;
