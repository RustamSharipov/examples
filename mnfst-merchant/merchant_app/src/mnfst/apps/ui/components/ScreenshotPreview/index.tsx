import React from 'react';
import classNames from 'classnames';
import { ContentFrame } from 'apps/ui/components/ContentFrame';
import { DialogPreheader } from 'apps/ui/components/Dialog';
import Image from 'apps/ui/components/Image';
import ModalPopup from 'apps/ui/components/ModalPopup';
import styles from './style.css';

interface IScreenshotPreviewProps {
  alt?: string;
  className?: string;
  image?: string;
  preview: string;
  title?: string;
  width?: string;
  height?: string;
  onInit?: (params: any) => void;
}

interface IScreenshotPreviewState {
  isOpen: boolean;
}

class ScreenshotPreview extends React.Component<IScreenshotPreviewProps, IScreenshotPreviewState> {
  public state = {
    isOpen: false,
  };

  public render() {
    const { alt, className, image, preview, title, width, height } = this.props;
    const { isOpen } = this.state;
    const imageStyle = {
      maxWidth: width,
    };

    return (
      <React.Fragment>
        <div
          ref={this.handleInit}
          className={classNames(
            className,
            image && styles.popupControl,
          )}
          onClick={this.openPopup}>
          {title && (
            <div className={styles.title}>
              <div className="title-5">{title}</div>
              {image && (
                <span className={styles.expandControl} />
              )}
            </div>
          )}
          <ContentFrame noPaddings={true}>
            <Image
              className={styles.image}
              style={imageStyle}
              src={preview}
              width={width}
              height={height}
              alt={alt || title} />
          </ContentFrame>
        </div>
        {image && (
          <ModalPopup
            isOpen={isOpen}
            onClose={this.closePopup}>
            <div
              className={styles.imagePopup}
              onClick={this.closePopup}>
              <DialogPreheader>
                {title}
              </DialogPreheader>
              <Image
                className={styles.image}
                style={imageStyle}
                src={image}
                width={width}
                height={height}
                alt={alt || title} />
            </div>
          </ModalPopup>
        )}
      </React.Fragment>
    );
  }

  private handleInit = (element: HTMLDivElement) => {
    const { onInit } = this.props;
    if (onInit) {
      onInit({
        element,
      });
    }
  }

  private openPopup = () => {
    this.setState({ isOpen: true });
  }

  private closePopup = () => {
    this.setState({ isOpen: false });
  }
}

export default ScreenshotPreview;
