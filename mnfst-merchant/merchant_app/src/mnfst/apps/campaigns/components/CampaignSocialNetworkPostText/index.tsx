import React from 'react';
import classNames from 'classnames';
import BlockDescription from 'apps/ui/components/BlockDescription';
import CampaignTextAreaField from 'apps/campaigns/components/CampaignTextAreaField';
import { ContentFrame } from 'apps/ui/components/ContentFrame';
import ArticleBlockIcon from 'apps/ui/components/icons/ArticleBlock';
import Description from 'apps/ui/components/Description';
import FacebookOLogoIcon from 'apps/ui/components/icons/FacebookOLogoIcon';
import InfoCircleIcon from 'apps/ui/components/icons/InfoCircleIcon';
import InstagramOLogoIcon from 'apps/ui/components/icons/InstagramOLogoIcon';
import TwitterOLogoIcon from 'apps/ui/components/icons/TwitterOLogoIcon';
import { IFormTarget, IClassNames } from 'interfaces';
import styles from './style.css';

const icons = {
  default: (
    <ArticleBlockIcon className={styles.iconImage} />
  ),
  facebook: (
    <FacebookOLogoIcon className={classNames(
      styles.iconImage,
      styles.facebook,
    )} />
  ),
  instagram: (
    <InstagramOLogoIcon className={classNames(
      styles.iconImage,
      styles.instagram,
    )} />
  ),
  twitter: (
    <TwitterOLogoIcon className={classNames(
      styles.iconImage,
      styles.twitter,
    )} />
  ),
};

interface ICampaignSocialNetworkPostTextProps {
  className?: string;
  classNamesList?: IClassNames;
  description: string;
  disabled?: boolean;
  errors?: string[];
  hasErrors?: boolean;
  maxLength?: number;
  name?: string;
  onChange: (formTarget: IFormTarget) => void;
  onRef: (formTarget: IFormTarget) => void;
  sampleSrc?: string;
  socialNetwork?: string;
  title: string;
  value: string;
}

export class CampaignSocialNetworkPostText extends React.Component<ICampaignSocialNetworkPostTextProps> {
  public render() {
    const {
      className, classNamesList, description, disabled, errors, hasErrors, maxLength, name, sampleSrc, socialNetwork,
      title, value,
    } = this.props;
    const icon = (socialNetwork && icons[socialNetwork]) || icons.default;

    return (
      <div className={classNames(
        styles.campaignSocialNetworkPostText,
        className,
        disabled && styles.isDisabled,
      )}>
        <ContentFrame
          className="grid-column grid-columns-12"
          dockTo="bottom"
          hasErrors={hasErrors || !!errors}>
          <div className={styles.content}>
            <div className={styles.icon}>
              {icon}
            </div>
            <div className={styles.text}>
              <div className={styles.title}>
                {title}
              </div>
              <CampaignTextAreaField
                classNamesList={{
                  input: classNamesList && classNamesList.input,
                }}
                disabled={disabled}
                errors={errors}
                maxLength={maxLength}
                name={name}
                onRef={this.handleInputRef}
                onChange={this.handleTextChange}
                value={value} />
            </div>
            {sampleSrc && (
              <div className={styles.sample}>
                <img
                  className={styles.sampleImage}
                  src={sampleSrc}
                  width="140"
                  height="248"
                  alt={title} />
              </div>
            )}
          </div>
        </ContentFrame>
        <BlockDescription
          className={styles.description}
          iconBefore={<InfoCircleIcon />}>
          <Description>
            {description}
          </Description>
        </BlockDescription>
      </div>
    );
  }

  private handleInputRef = (formTarget: IFormTarget) => {
    const { onRef } = this.props;
    if (onRef) {
      onRef(formTarget);
    }
  }

  private handleTextChange = (formTarget: IFormTarget) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(formTarget);
    }
  }
}

export const CampaignSocialNetworkPostTexts = (props) => {
  const { children } = props;

  return (
    <div className={styles.campaignSocialNetworkPostTexts}>
      {children}
    </div>
  );
};
