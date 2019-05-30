import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

const heartData = [
  {
    id: 1,
    top: 8,
    delay: 0,
  },
  {
    id: 2,
    top: 30,
    delay: 3,
  },
  {
    id: 3,
    top: 2,
    delay: 5,
  },
  {
    id: 4,
    top: 24,
    delay: 7,
  },
  {
    id: 5,
    top: 30,
    delay: 8.5,
  },
];

const likeData = [
  {
    id: 1,
    top: 2,
    delay: 2.5,
  },
  {
    id: 2,
    top: 25,
    delay: 13.5,
  },
  {
    id: 3,
    top: 13,
    delay: 5.5,
  },
  {
    id: 4,
    top: 18,
    delay: 9.5,
  },
];

const moneyData = [
  {
    id: 1,
    top: 20,
    delay: 0,
    value: '$2',
  },
  {
    id: 3,
    top: 30,
    delay: 3,
    value: '$7',
  },
  {
    id: 5,
    top: 8,
    delay: 5,
    value: '$14',
  },
  {
    id: 6,
    top: 24,
    delay: 1,
    value: '$28',
  },
];

function makeAnimationDelayRule(value) {
  return {
    WebkitAnimationDelay: `${value}s`,
    MozAnimationDelay: `${value}s`,
    OAnimationDelay: `${value}s`,
    animationDelay: `${value}s`,
  };
}

class MiddleLayer extends React.PureComponent<{}> {
  public state = {
    bound: 0,
  };

  private videoElement: HTMLVideoElement;

  public componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  public render() {
    return (
      <div className={styles.middleLayer}>
        <div
          style={{
            width: this.state.bound,
          }}
          className={styles.marks}>
          {heartData.map(({ id, top, delay }) => (
            <div
              key={id}
              style={{
                top: `${top}rem`,
                ...makeAnimationDelayRule(delay),
              }}
              className={classNames(
                styles.step,
                styles.heart,
              )} />
          ))}
          {likeData.map(({ id, top, delay }) => (
            <div
              key={id}
              style={{
                top: `${top}rem`,
                ...makeAnimationDelayRule(delay),
              }}
              className={classNames(
                styles.step,
                styles.like,
              )} />
          ))}
        </div>
        <div
          style={{
            left: this.state.bound,
          }}
          className={styles.earned}>
          {moneyData.map(({ id, top, delay, value }, index) => (
              <div
                key={id}
                style={{
                  top: `${top}rem`,
                  ...makeAnimationDelayRule(delay + 7),
                }}
                className={classNames(
                  styles.step2,
                  styles.money,
                  {
                    [styles.bigNumber]: index % 2 !== 0,
                  },
                )}>
                {value}
              </div>
          ))}
        </div>
      </div>
    );
  }

  public handleResize = () => {
    this.videoElement = this.videoElement || document.getElementById('teaser-video');
    if (!this.videoElement) { return; }

    const rectData = this.videoElement.getBoundingClientRect();
    const newBound = rectData.left + rectData.width / 2;
    this.setState({ bound: newBound });
  }
}

export default MiddleLayer;
