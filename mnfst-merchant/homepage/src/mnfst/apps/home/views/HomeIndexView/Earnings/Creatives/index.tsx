import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import TagManager from 'react-gtm-module';
import Image from 'apps/ui/components/Image';
import SliderCarousel from 'apps/ui/components/SliderCarousel';
import { GTM_EVENTS } from 'constants/tracking';
import { HOME_CREATIVES_CAROUSEL_PLAY_SPEED, HOME_CREATIVES_CAROUSEL_CHANGE_SPEED } from 'constants/home';
import { ICreative, IMediaSrcSet } from 'apps/home/interfaces/home';
import { getLocalData } from 'apps/ui/utils/localization';
import { formatMoney } from 'apps/ui/utils/text';
import styles from './style.css';

interface ICreativeProps {
  id: number;
  brand?: string;
  isMobileFormat: boolean;
  name?: string;
  onClick?: (id: number) => void;
  price?: string;
  srcSet: IMediaSrcSet;
  type: string;
}

interface ICreativesProps {
  creativesList: ICreative[];
  onCreativeChange?: ({ creativeIndex: number }) => void;
}

interface ICreativeState {
  activeCreative: ICreative;
  isActiveCreativeHidden: boolean;
  isMobileFormat: boolean;
}

const Creative: React.SFC<ICreativeProps> = (props) => {
  const {
    id,
    isMobileFormat,
    name,
    onClick,
    srcSet = {},
    type,
  } = props;
  const srcList = isMobileFormat
    ? srcSet.mobile
    : srcSet.desktop;

  const videoRef: any = useRef(null);

  useEffect(
    () => {
      if (!videoRef.current) {
        return;
      }
      videoRef.current.play();
    },
    [videoRef.current],
  );

  return (
    <div
      className={styles.creative}
      onClick={() => onClick && onClick(id)}>
      <div className={styles.creativePicture}>
        {(type === 'video' && srcList) && (
          <video
            key={id}
            ref={videoRef}
            autoPlay={true}
            className={styles.creativeMedia}
            loop={true}
            muted={true}
            playsInline={true}
            width="240"
            height="426">
            {srcList.map(src => (
              <source
                key={src}
                src={src}
                type={`video/${src.split('.')[src.split('.').length - 1]}`} />
            ))}
          </video>
        )}
        {(type === 'image' && srcList) && (
          <Image
            key={id}
            alt={name}
            className={styles.creativeMedia}
            src={srcList && srcList[0]}
            width="240"
            height="426" />
        )}
      </div>
    </div>
  );
};

class Creatives extends React.Component<ICreativesProps, ICreativeState> {
  public static sliderOptions = {
    autoplay: {
      delay: HOME_CREATIVES_CAROUSEL_PLAY_SPEED.VIDEO,
      disableOnInteraction: false,
    },
    speed: HOME_CREATIVES_CAROUSEL_CHANGE_SPEED,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    breakpoints: {
      // when window width is <= 1150px
      1150: { slidesPerView: 3 },
      // when window width is <= 1600px
      1600: { slidesPerView: 5 },
      // when window width is <= 1800px
      1900: { slidesPerView: 7 },
    },
  };

  public sliderInstance;
  public state = {
    activeCreative: this.props.creativesList[0],
    isActiveCreativeHidden: false,
    isMobileFormat: window.innerWidth < 768,
  };

  private isInitialTransition = true;
  private startTouchPos;
  private eventHandlers = {
    slideChangeTransitionStart: () => {
      if (this.isInitialTransition) {
        this.isInitialTransition = false;
        return;
      }
      this.setState({
        isActiveCreativeHidden: true,
      });
    },
    slideChangeTransitionEnd: () => {
      if (!this.sliderInstance) {
        return;
      }
      const { realIndex: creativeIndex } = this.sliderInstance;
      const activeCreative = this.props.creativesList[creativeIndex];
      activeCreative.getName = () => activeCreative.name;

      this.setState({
        activeCreative,
        isActiveCreativeHidden: false,
      });

      const { onCreativeChange } = this.props;
      if (onCreativeChange) {
        onCreativeChange({ creativeIndex });
      }
    },
    sliderMove: (event) => {
      this.startTouchPos = event.clientX;
      this.setState({
        isActiveCreativeHidden: true,
      });
    },
    touchEnd: (event) => {
      if (this.startTouchPos !== undefined) {
        const direction = event.clientX - this.startTouchPos > 0 ? 'right' : 'left';
        this.handleSwipe(direction);
      }
      this.setState({
        isActiveCreativeHidden: false,
      });
      this.startTouchPos = undefined;
    },
  };

  public componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  public render() {
    const { creativesList } = this.props;
    const { activeCreative, isMobileFormat, isActiveCreativeHidden } = this.state;

    return (
      <div className={styles.creatives}>
        <div className={styles.activeCreativeOverlay} />
        <div
          className={classNames(styles.creativesWrapper, {
            [styles.isBellow]: isActiveCreativeHidden,
            [styles.isAbove]: !isActiveCreativeHidden,
          })}>
          <SliderCarousel
            options={{
              ...Creatives.sliderOptions,
              on: this.eventHandlers,
            }}
            assignSliderInstance={this.assignSliderInstance}
            paginationClassName={styles.sliderPagination}
            className={styles.slider}>
            {creativesList.map(creative => (
              <Creative
                key={creative.id}
                id={creative.id}
                isMobileFormat={isMobileFormat}
                onClick={this.handleCreativeClick}
                srcSet={creative.srcSet}
                type={creative.type}
                name={creative.name} />
            ))}
          </SliderCarousel>
        </div>
        <div
          className={classNames(styles.activeCreativeOverlay, styles.activeCreativeOverlayTop, {
            [styles.isHidden]: isActiveCreativeHidden,
          })} />
        <div className={styles.activeCreative} />
        <div className={styles.activeCreativeDetails}>
          <div>
            {getLocalData(
              getInfluencerDetailsString(!!activeCreative.price),
              {
                placeholders: {
                  brand: activeCreative.brand || '',
                  influencer: activeCreative.getName(),
                },
              },
            )}
          </div>
          {activeCreative.price && (
             <div className={styles.activeCreativeDetailsPrice}>
              {getLocalData('pages.userLanding.creatives.creativePriceDetails', {
                placeholders: {
                  price: formatMoney(activeCreative.price.value, activeCreative.price.currency_code),
                },
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  private assignSliderInstance = (slider) => {
    this.sliderInstance = slider;
  }

  private handleCreativeClick = (id: number) => {
    const { creativesList } = this.props;
    const { activeCreative } = this.state;
    const maxCreativeId = creativesList.reduce((prev, current) => {
      if (current.id > prev.id) {
        return current;
      }
      return prev;
    }).id;

    if (id > 0) {
      let dataLayer;

      if (
        id > activeCreative.id && !(activeCreative.id === 1 && id === maxCreativeId)
        || (activeCreative.id === maxCreativeId && id === 1)
      ) {
        dataLayer = GTM_EVENTS.LANDING.EARNINGS.CREATIVES.right;
      }

      if (
        id < activeCreative.id && !(activeCreative.id === maxCreativeId && id === 1)
        || (activeCreative.id === 1 && id === maxCreativeId)
      ) {
        dataLayer = GTM_EVENTS.LANDING.EARNINGS.CREATIVES.left;
      }

      if (dataLayer) {
        TagManager.dataLayer({ dataLayer });
      }
    }
  }

  private handleSwipe = (direction: string) => {
    const dataLayer = GTM_EVENTS.LANDING.EARNINGS.CREATIVES[direction];
    if (!dataLayer) {
      return;
    }
    TagManager.dataLayer({ dataLayer });
  }

  private handleWindowResize = () => {
    this.setState({
      isMobileFormat: window.innerWidth < 768,
    });
  }
}

function getInfluencerDetailsString(isNonProfit?: boolean): string {
  return 'pages.userLanding.creatives.creative'
    + `${isNonProfit ? '' : 'NonProfit'}InfluencerDetails`;
}

export default Creatives;
