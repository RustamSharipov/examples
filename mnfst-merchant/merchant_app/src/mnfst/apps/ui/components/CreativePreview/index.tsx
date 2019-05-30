import React from 'react';
import classNames from 'classnames';
import Image from 'apps/ui/components/Image';
import ImagePlaceholderIcon from 'apps/ui/components/icons/ImagePlaceholderIcon';
import VideoPlaceholderIcon from 'apps/ui/components/icons/VideoPlaceholderIcon';
import { IClassNames } from 'interfaces';
import { parseFileExtension } from 'utils/text';
import styles from './style.css';

interface ICreativePreviewProps {
  className?: string;
  classNamesList?: IClassNames;
  faceResource?: string | null | undefined;
  primaryResource?: string | null | undefined;
  secondaryResource?: string | null | undefined;
  type: string;
  width?: number;
  height?: number;
}

interface ICreativePreviewCanvasProps {
  className?: string;
  isFace?: boolean;
  isFront?: boolean;
  onError: () => void;
  src: string;
  type: string;
  width?: number;
  height?: number;
}

const CreativePreviewCanvas: React.SFC<ICreativePreviewCanvasProps> = (props) => {
  const { className, isFace, isFront, src, type, width, height, onError } = props;
  let displayType: string | null = null;

  if (src && (parseFileExtension(src) === 'jpg' || parseFileExtension(src) === 'png'
    || parseFileExtension(src) === 'gif')) {
    displayType = 'image';
  }

  if (src && parseFileExtension(src) === 'mp4') {
    displayType = 'video';
  }

  if (displayType === 'image') {
    return (
      <Image
        className={classNames(
          styles.image,
          isFront && styles.isFront,
          isFace && styles.isFace,
          className,
        )}
        // onError={onError && onError}
        src={src}
        width={width}
        height={height}
        alt="Preview" />
    );
  }

  if (displayType === 'video') {
    return (
      <video
        autoPlay={true}
        className={classNames(
          styles.image,
          isFront && styles.isFront,
          className,
        )}
        loop={true}
        onError={onError && onError}
        src={src}
        width={width}
        height={height} />
    );
  }

  if (!displayType) {
    return (
      <div className={styles.stub}>
        {type === 'video'
          ? (
            <VideoPlaceholderIcon className={styles.stubImage} />
          )
          : (
            <ImagePlaceholderIcon className={styles.stubImage} />
          )
        }
      </div>
    );
  }

  return null;
};

class CreativePreview extends React.PureComponent<ICreativePreviewProps> {
  public static defaultProps = {
    width: 114,
    height: 114,
  };

  public state = {
    isInvalidResource: false,
  };

  public render() {
    const {
      className, classNamesList, faceResource, primaryResource, secondaryResource, type, width, height,
    } = this.props;
    const isDisplayStub = this.state.isInvalidResource || !(primaryResource || secondaryResource || faceResource);

    return (
      <div className={classNames(
        styles.creativePreview,
        className,
      )}>
        {(!isDisplayStub && primaryResource) && (
          <CreativePreviewCanvas
            className={classNamesList && classNamesList.back}
            onError={this.handleInvalidResourceError}
            src={primaryResource}
            type={type}
            width={width}
            height={height} />
        )}
        {(!isDisplayStub && faceResource) && (
          <CreativePreviewCanvas
            className={classNamesList && classNamesList.face}
            isFace={!!faceResource}
            onError={this.handleInvalidResourceError}
            src={faceResource}
            type="image"
            width={width}
            height={height} />
        )}
        {(!isDisplayStub && secondaryResource) && (
          <CreativePreviewCanvas
            className={classNamesList && classNamesList.front}
            isFront={!!secondaryResource}
            onError={this.handleInvalidResourceError}
            src={secondaryResource}
            type={type}
            width={width}
            height={height} />
        )}
        {isDisplayStub && (
          <div className={styles.stub}>
            {type === 'video'
              ? (
                <VideoPlaceholderIcon className={styles.stubImage} />
              )
              : (
                <ImagePlaceholderIcon className={styles.stubImage} />
              )
            }
          </div>
        )}
      </div>
    );
  }

  private handleInvalidResourceError = () => {
    this.setState({ isInvalidResource: true });
  }
}

export default CreativePreview;
