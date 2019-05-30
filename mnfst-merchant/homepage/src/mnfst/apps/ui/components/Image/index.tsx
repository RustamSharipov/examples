import React from 'react';
import { ImageRelation } from 'apps/ui/types/elementNode';

interface IImageLoadParams {
  imageRelation: ImageRelation;
}

interface IImageProps {
  alt?: string;
  className?: string;
  onClick?: () => void;
  onError?: () => void;
  onLoad?: (params: IImageLoadParams) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  src: string;
  style?: any;
  width?: number | string;
  height?: number | string;
}

class Image extends React.Component<IImageProps> {
  public render() {
    const { alt, className, width, height, src } = this.props;
    return (
      <img
        alt={alt}
        className={className}
        onClick={this.handleClick}
        onError={this.handleError}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onLoad={this.handleLoad}
        src={src}
        width={width}
        height={height} />
    );
  }

  private handleClick = () => {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
  }

  private handleError = () => {
    const { onError } = this.props;
    if (onError) {
      onError();
    }
  }

  private handleLoad = (event) => {
    const { height, width } = event.target;
    const { onLoad } = this.props;

    let imageRelation: ImageRelation = null;

    if (width > height) {
      imageRelation = 'horizontal';
    }

    if (width < height) {
      imageRelation = 'vertical';
    }

    if (onLoad) {
      onLoad({ imageRelation });
    }
  }

  private handleMouseEnter = () => {
    const { onMouseEnter } = this.props;
    if (onMouseEnter) {
      onMouseEnter();
    }
  }

  private handleMouseLeave = () => {
    const { onMouseLeave } = this.props;
    if (onMouseLeave) {
      onMouseLeave();
    }
  }
}

export default Image;
