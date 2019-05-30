import React from 'react';

interface IImageProps {
  alt?: string;
  className?: string;
  onClick?: () => void;
  onError?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  src: string;
  style?: any;
  width?: number | string;
  height?: number | string;
}

class Image extends React.Component<IImageProps> {
  public render() {
    const { alt, className, width, height, src, onClick, onMouseEnter, onMouseLeave } = this.props;
    return (
      <img
        alt={alt}
        className={className}
        onClick={onClick && onClick}
        onError={this.handleError}
        onMouseEnter={onMouseEnter && onMouseEnter}
        onMouseLeave={onMouseLeave && onMouseLeave}
        src={src}
        width={width}
        height={height} />
    );
  }

  private handleError = () => {
    const { onError } = this.props;
    if (onError) {
      onError();
    }
  }
}

export default Image;
