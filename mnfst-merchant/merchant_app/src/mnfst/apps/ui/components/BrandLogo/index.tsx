import React from 'react';
import classNames from 'classnames';
import ImagePlaceholderIcon from 'apps/ui/components/icons/ImagePlaceholderIcon';
import styles from './style.css';

interface IBrandLogoProps {
  image?: string;
  color: string;
  className?: string;
  classNamesList?: {
    [name: string]: string,
  };
}

const BrandLogo: React.SFC<IBrandLogoProps> = (props) => {
  const { color, image, className, classNamesList } = props;
  const sampleColorStyle = {
    backgroundColor: color,
  };

  return (
    <div
      className={classNames(
        styles.brandLogo,
        className,
      )}
      style={sampleColorStyle}>
      {image
        ? (
          <img
            src={image}
            width="80"
            height="80"
            className={classNames(
              styles.image,
              classNamesList && classNamesList.image,
            )}
            alt="Brand logo" />
        )
        : (
          <ImagePlaceholderIcon className={classNames(
            styles.imageStub,
            classNamesList && classNamesList.stub,
          )} />
        )
      }
    </div>
  );
};

export default BrandLogo;
