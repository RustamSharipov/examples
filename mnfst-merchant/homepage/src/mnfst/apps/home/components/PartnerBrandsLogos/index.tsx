import React from 'react';
import classNames from 'classnames';
import Image from 'apps/ui/components/Image';
import styles from './style.css';
import { ImageRelation } from 'apps/ui/types/elementNode';

interface IPartnerBrandLogoProps {
  className?: string;
  image: string;
  name?: string;
  link?: string;
}

interface IPartnerBrandLogoState {
  imageRelation: ImageRelation;
}

interface IPartnerBrandsLogosProps {
  className?: string;
  children: React.ReactNode;
}

const imageRelationsClassNames = {
  horizontal: styles.horizontalRelation,
  vertical: styles.verticalRelation,
};

export class PartnerBrandLogo extends React.Component<IPartnerBrandLogoProps, IPartnerBrandLogoState> {
  public state = {
    imageRelation: null,
  };

  public render() {
    const { className, image, link } = this.props;
    const { imageRelation } = this.state;
    const imageRelationClassName = imageRelation && imageRelationsClassNames[imageRelation];

    return (
      <div className={styles.partnerBrandLogo}>
        <a href={link} target="_blank">
          <Image
            alt={name}
            className={classNames(
              styles.partnerBrandLogoImage,
              imageRelationClassName,
              className,
            )}
            onLoad={this.handleImageLoad}
            src={image} />
        </a>
      </div>
    );
  }

  private handleImageLoad = (params) => {
    const { imageRelation } = params;
    this.setState({ imageRelation });
  }
}

export const PartnerBrandsLogos: React.SFC<IPartnerBrandsLogosProps> = (props) => {
  const { className, children } = props;

  return (
    <div
      className={classNames(
        styles.partnerBrandsLogos,
        className,
      )}>
      {children}
    </div>
  );
};
