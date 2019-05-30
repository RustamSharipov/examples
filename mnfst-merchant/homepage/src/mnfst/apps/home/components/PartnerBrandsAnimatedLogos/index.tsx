import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface IPartnerBrandsAnimatedLogosProps {
  className?: string;
  children: React.ReactNode;
  itemShiftDuration: number;
  directionRight?: boolean;
  itemOffset?: number;
}

interface IPartnerBrandsAnimatedLogosState {
  items: object[];
  first: any;
  shiftSize: number;
  itemShiftDuration: number;
}

export default class PartnerBrandsAnimatedLogos
  extends React.Component<IPartnerBrandsAnimatedLogosProps, IPartnerBrandsAnimatedLogosState> {

  private container;
  private item;
  private resizeTimeoutId;
  private containerWidth;

  public constructor(props) {
    super(props);

    this.state = {
      first: props.children[0],
      items: props.children.slice(1),
      shiftSize: 0,
      itemShiftDuration: props.itemShiftDuration,
    };
  }

  public componentDidMount() {
    this.setInitialParams();
    this.item.addEventListener('transitionend', this.updateItemsStack);
    window.addEventListener('resize', this.handleResize);
  }

  public componentDidUpdate() {
    if (this.state.itemShiftDuration !== this.props.itemShiftDuration) {
      const { width: itemWidth } = this.item.getBoundingClientRect();
      this.setState({
        itemShiftDuration: this.props.itemShiftDuration,
        shiftSize: itemWidth,
      });
    }
  }

  public componentWillUnmount() {
    this.item.removeEventListener('transitionend', this.updateItemsStack);
    window.removeEventListener('resize', this.handleResize);
  }

  public render() {
    const { shiftSize, itemShiftDuration } = this.state;
    const { itemOffset, directionRight } = this.props;
    const marginDirection = directionRight ? 'marginRight' : 'marginLeft';

    const offsetValue = itemOffset
      ? shiftSize + shiftSize * itemOffset / 100
      : shiftSize;
    const containerStyle = {
      [marginDirection]: `-${offsetValue}px`,
      width: `calc(100% + ${offsetValue}px)`,
    };

    return (
      <div className={styles.partnerBrandsAnimatedLogosWrapper}>
        <div
          ref={(c) => { this.container = c; }}
          style={containerStyle}
          className={classNames(
            styles.partnerBrandsAnimatedLogos,
            {
              [styles.partnerBrandsAnimatedLogosInversed]: directionRight,
            },
          )}>
          <div
            ref={(i) => { this.item = i; }}
            className={styles.partnerFirstElement}
            style={{
              [marginDirection]: `-${shiftSize}px`,
              transition: `margin ${itemShiftDuration}s linear`,
            }}>
            {this.state.first}
          </div>
          {this.state.items}
        </div>
      </div>
    );
  }

  private buildItems(items, containerWidth, itemWidth) {
    if (!items.length) { return items; }

    const placeCount = Math.ceil(containerWidth / (itemWidth || 1));
    if (items.length + 1 > placeCount) {
      return items.slice(1);
    }

    const result = items.slice(1);
    let key = 0;
    while (result.length + 1 <= placeCount) {
      result.push(...items.map(c => ({
        ...c,
        key: `${c.key}-${key}`,
      })));
      key += 1;
    }

    return result;
  }

  private updateItemsStack = () => {
    this.setState(
      (state) => {
        const first = state.items[0];
        const items = [...state.items.slice(1), state.first];
        return {
          first,
          items,
          itemShiftDuration: 0,
          shiftSize: 0,
        };
      },
    );
  }

  private handleResize = () => {
    if (this.containerWidth !== this.container.clientWidth) {
      clearTimeout(this.resizeTimeoutId);
      this.resizeTimeoutId = setTimeout(
        this.setInitialParams,
        300,
      );
      this.containerWidth = this.container.clientWidth;
    }
  }

  private setInitialParams = () => {
    if (!this.item || !this.container) { return; }

    const { width: itemWidth } = this.item.getBoundingClientRect();
    const { width: containerWidth } = this.container.getBoundingClientRect();
    const items = this.buildItems(this.props.children, containerWidth, itemWidth);
    this.setState({
      items,
      first: (this.props.children || [])[0],
      itemShiftDuration: 0,
      shiftSize: 0,
    });
  }
}
