import React from 'react';
import classNames from 'classnames';
import styles from './style.css';
import Image from 'apps/ui/components/Image';
import { parseFileExtension, base64MimeType, parseMimeTypeFileExtension } from 'utils/text';
import VideoPlaceholderIcon from 'apps/ui/components/icons/VideoPlaceholderIcon';
import ImagePlaceholderIcon from 'apps/ui/components/icons/ImagePlaceholderIcon';

const SUPPORTED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png'];

interface ICampaignThumbnailProps {
  className?: string;
  classNamesList?: {
    [name: string]: string,
  };
  name?: string;
  src?: string;
  type?: string;
  width: number;
  height: number;
}

interface ICampaignThumbnailStubProps {
  className?: string;
  type?: string;
}

interface ICampaignThumbnailState {
  isInvalidResource: boolean;
}

interface ICampaignThumbnailCanvasProps {
  name?: string;
  className?: string;
  onError: () => void;
  src: string;
  type?: string;
  width: number;
  height: number;
}

const CampaignThumbnailCanvas: React.SFC<ICampaignThumbnailCanvasProps> = (props) => {
  const { name, className, src, type, width, height, onError } = props;
  if (type === 'image') {
    return (
      <Image
        alt={name}
        className={classNames(
          styles.image,
          className,
        )}
        onError={onError && onError}
        src={src}
        width={width}
        height={height} />
    );
  }

  if (type === 'video') {
    return (
      <video
        autoPlay={true}
        className={classNames(
          styles.image,
          className,
        )}
        onError={onError && onError}
        loop={true}
        src={src}
        width={width}
        height={height} />
    );
  }

  return <CampaignThumbnailStub />;
};

CampaignThumbnailCanvas.defaultProps = {
  type: 'image',
};

class CampaignThumbnail extends React.PureComponent<ICampaignThumbnailProps, ICampaignThumbnailState> {
  public static defaultProps = {
    width: 24,
    height: 24,
  };

  public state = {
    isInvalidResource: false,
  };

  public render() {
    const { className, classNamesList, name, src, type, width, height } = this.props;
    const { isInvalidResource } = this.state;
    let displayType: string | null = null;

    if (src && (SUPPORTED_IMAGE_EXTENSIONS.includes(parseFileExtension(src) || '')
      || SUPPORTED_IMAGE_EXTENSIONS.includes(parseMimeTypeFileExtension(base64MimeType(src) || '') || ''))) {
      displayType = 'image';
    }

    if (src && parseFileExtension(src) === 'mp4') {
      displayType = 'video';
    }

    return (
      <div className={classNames(
        styles.campaignThumbnail,
        className,
      )}>
        {(isInvalidResource || !displayType || !src)
          ? (
            <CampaignThumbnailStub
              className={classNamesList && classNamesList.stubIcon}
              type={type} />
          )
          : (
            <CampaignThumbnailCanvas
              name={name}
              className={classNamesList && classNamesList.image}
              onError={this.handleInvalidResourceError}
              src={src}
              type={displayType}
              width={width}
              height={height} />
          )
        }
      </div>
    );
  }

  private handleInvalidResourceError = () => {
    this.setState({ isInvalidResource: true });
  }
}

export default CampaignThumbnail;

export const CampaignThumbnailStub = (props: ICampaignThumbnailStubProps) => {
  const { className, type } = props;
  return (
    <div className={styles.campaignThumbnail}>
      {(type === 'image' || type === 'segmentation') && (
        <ImagePlaceholderIcon className={classNames(
          styles.image,
          styles.stubIcon,
          className,
        )} />
      )}
      {type === 'video' && (
        <VideoPlaceholderIcon className={classNames(
          styles.image,
          styles.stubIcon,
          className,
        )} />
      )}
      {!type && (
        <span className={classNames(
          styles.image,
          styles.stubImage,
          className,
        )} />
      )}
    </div>
  );
};
