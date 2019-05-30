import React from 'react';
import classNames from 'classnames';
import ACrossIcon from 'apps/ui/components/icons/ACrossIcon';
import BlockDescription from 'apps/ui/components/BlockDescription';
import Button from 'apps/ui/components/Button';
import Description from 'apps/ui/components/Description';
import FileUpload from 'apps/ui/components/FileUpload';
import Spinner from 'apps/ui/components/Spinner';
import { getLocalString } from 'utils/localization';
import { VIDEO_OVERLAY_MAX_FILE_SIZE, STATIC_OVERLAY_MAX_FILE_SIZE } from 'constants/campaigns';
import { IAsset } from 'apps/campaigns/interfaces/campaign';
import { IFormTarget } from 'interfaces';
import BackdropButtonIcon from './icons/BackdropButtonIcon';
import OverlayButtonIcon from './icons/OverlayButtonIcon';
import styles from './style.css';
import ValidationStatus from 'apps/ui/components/ValidationStatus';

const postsClassNames = {
  feed: styles.feed,
  story: styles.story,
};

const uploadButtonIcons = {
  backdrop: (
    <BackdropButtonIcon
      className={styles.uploadFileButtonIcon}
      classNamesList={{
        back: styles.backdropIconBack,
      }} />
  ),
  overlay: (
    <OverlayButtonIcon
      className={styles.uploadFileButtonIcon}
      classNamesList={{
        front: styles.overlayIconFront,
      }} />
  ),
  remove: <ACrossIcon className={styles.uploadFileButtonIcon} />,
};

const maxFileSizes = {
  'image/png': STATIC_OVERLAY_MAX_FILE_SIZE,
  'image/mov': VIDEO_OVERLAY_MAX_FILE_SIZE,
};

interface ICreativeAssetUploadParams {
  formTarget: IFormTarget;
  layout: string;
  placement: string;
}

interface ICreativeAssetRemoveParams {
  id?: string;
  placement: string;
}

interface IUploadFileProps {
  accept?: string;
  disabled?: boolean;
  icon: React.ReactNode;
  isHover?: boolean;
  label: string;
  onAttach: (formTarget: IFormTarget) => void;
}

interface IUploadedStatusProps {
  label: string;
  onClick: (formTarget: IFormTarget) => void;
}

interface IUploadingStatusProps {
  label: string;
}

interface IBackdropProps {
  placement?: string;
  src?: string;
  type?: string;
}

interface IOverlayProps {
  placement?: string;
  src?: string;
  type?: string;
}

interface ICreativePostProps {
  assets: IAsset[];
  creativeType: string;
  description?: string;
  disabled?: boolean;
  errors: string[];
  hasControls: boolean;
  hasErrors?: boolean;
  onAssetRemoveClick: (params: ICreativeAssetRemoveParams) => void;
  onBackdropChange: (params: ICreativeAssetUploadParams) => void;
  onOverlayChange: (params: ICreativeAssetUploadParams) => void;
  onRef?: (node: HTMLDivElement) => void;
  title?: string;
  placement: string;
}

interface ICreativePostsProps {
  children: React.ReactNode;
  description?: React.ReactNode;
}

const UploadFile: React.SFC<IUploadFileProps> = (props) => {
  const { accept, disabled, icon, isHover, label, onAttach } = props;
  const maxFileSize = accept && maxFileSizes[accept];

  return (
    <Button
      className={classNames(
        styles.uploadFile,
        isHover && styles.isHover,
      )}
      disabled={disabled}
      elementType="label"
      iconBefore={icon}
      size="small"
      theme="white">
      <FileUpload
        accept={accept}
        disabled={disabled}
        maxFileSize={maxFileSize}
        name="campaign.creative_templates"
        onAttach={onAttach} />
      <span>{label}</span>
    </Button>
  );
};

const UploadedStatus: React.SFC<IUploadedStatusProps> = (props) => {
  const { label, onClick } = props;
  return (
    <Button
      elementType="div"
      iconBefore={uploadButtonIcons.remove}
      onClick={onClick}
      size="small"
      theme="white">
      <span>
        {label}
      </span>
    </Button>
  );
};

const UploadingStatus: React.SFC<IUploadingStatusProps> = (props) => {
  const { label } = props;
  return (
    <Button
      className={styles.uploadingStatus}
      iconBefore={<Spinner className={styles.uploadingStatusSpinner} />}
      elementType="div"
      size="small"
      theme="white">
      <span>
        {label}
      </span>
    </Button>
  );
};

const Overlay: React.SFC<IOverlayProps> = (props) => {
  const { src, type } = props;
  if (src) {
    if (type === 'image') {
      return (
        <div className={styles.creativeOverlay}>
          <img
            className={styles.creativeMedia}
            src={src}
            width="224"
            alt="image" />
        </div>
      );
    }

    if (type === 'video') {
      return (
        <div className={styles.creativeOverlay}>
          <video
            autoPlay={true}
            className={styles.creativeMedia}
            loop={true}
            src={src}
            width="224" />
        </div>
      );
    }
  }

  return null;
};

const Backdrop: React.SFC<IBackdropProps> = (props) => {
  const { src } = props;

  if (src) {
    return (
      <div className={styles.creativeBackdrop}>
        <img
          className={styles.creativeMedia}
          src={src}
          width="224"
          alt="image" />
      </div>
    );
  }

  return null;
};

export class CreativePost extends React.Component<ICreativePostProps> {
  public static defaultProps = {
    assets: [],
  };

  public state = {
    isBackdropHover: false,
    isOverlayHover: false,
  };

  public render() {
    const {
      assets, creativeType, description, disabled, errors, hasControls, hasErrors, title, placement,
    } = this.props;
    const { isBackdropHover, isOverlayHover } = this.state;
    const postClassName = placement && postsClassNames[placement];
    const backdrop = assets.filter(asset => asset.layout === 'back')[0];
    const overlay = assets.filter(asset => asset.layout === 'front')[0];

    return (
      <div
        ref={this.handleRef}
        className={classNames(
          styles.creativePost,
          disabled && styles.isDisabled,
        )}>
        {title && (
          <div className={styles.creativePostTitle}>
            {title}
          </div>
        )}
        {description && (
          <div className={classNames(
            styles.creativePostDescription,
            hasErrors && styles.hasErrors,
          )}>
            {description}
          </div>
        )}
        <div className={classNames(
          styles.creativePostContent,
          postClassName,
        )}>
          <div className={classNames(
            styles.creativePostControls,
            hasControls && styles.hasControls,
            styles.backdrop,
          )}>
            {backdrop
              ? (
                <React.Fragment>
                  {backdrop.url
                    ? (
                      <UploadedStatus
                        label={
                          getLocalString('pages.campaigns.create.design.specifications.ui.deleteBackdropButton')
                        }
                        onClick={() => this.handleAssetRemoveClick(backdrop)} />
                    )
                    : (
                      <UploadingStatus label={
                        getLocalString('pages.campaigns.create.design.specifications.ui.uploadingBackdropButton')
                      } />
                    )
                  }
                </React.Fragment>
              )
              : (
                <UploadFile
                  accept="image/png"
                  disabled={disabled || (overlay && overlay.type === 'video' || creativeType !== 'segmentation')}
                  icon={uploadButtonIcons.backdrop}
                  isHover={isBackdropHover}
                  label={getLocalString('pages.campaigns.create.design.specifications.ui.uploadBackdropButton')}
                  onAttach={formTarget => this.handleBackdropAttach(formTarget, 'back')} />
              )
            }
          </div>
          <div className={classNames(
            styles.creativePostControls,
            hasControls && styles.hasControls,
            styles.overlay,
          )}>
            {overlay
              ? (
                <React.Fragment>
                  {overlay.url
                    ? (
                      <UploadedStatus
                        label={
                          getLocalString('pages.campaigns.create.design.specifications.ui.deleteOverlayButton')
                        }
                        onClick={() => this.handleAssetRemoveClick(overlay)} />
                    )
                    : (
                      <UploadingStatus label={
                        getLocalString('pages.campaigns.create.design.specifications.ui.uploadingOverlayButton')
                      } />
                    )
                  }
                </React.Fragment>
              )
              : (
                <UploadFile
                  accept={creativeType === 'video' ? 'video/quicktime' : 'image/png'}
                  disabled={disabled}
                  icon={uploadButtonIcons.overlay}
                  isHover={isOverlayHover}
                  label={getLocalString('pages.campaigns.create.design.specifications.ui.uploadOverlayButton')}
                  onAttach={formTarget => this.handleOverlayAttach(formTarget, 'front')} />
              )
            }
          </div>
          <div className={styles.creativePostBackdrop}>
            <div className={styles.creativePostSelfie} />
            {(backdrop && backdrop.url)
              ? (
                <Backdrop
                  src={backdrop.url}
                  type={backdrop.type} />
              )
              : (
                <div className={classNames(
                  styles.creativePostBackdropStub,
                  styles.creativeMedia,
                )} />
              )
            }
          </div>
          <div className={styles.creativePostOverlay}>
            {overlay && (
              <Overlay
                src={overlay.url}
                type={overlay.type} />
            )}
          </div>
        </div>
        {!!errors && (
          <div className={styles.errors}>
            <ValidationStatus
              message={errors}
              type="error" />
          </div>
        )}
      </div>
    );
  }

  private handleRef = (node: HTMLDivElement) => {
    const { onRef } = this.props;
    if (onRef) {
      onRef(node);
    }
  }

  private handleAssetRemoveClick = (asset: IAsset) => {
    const { placement, onAssetRemoveClick } = this.props;
    const { id } = asset;

    if (onAssetRemoveClick) {
      onAssetRemoveClick({ id, placement });
    }
  }

  private handleBackdropAttach = (formTarget: IFormTarget, layout: string) => {
    const { placement, onBackdropChange } = this.props;
    if (onBackdropChange) {
      onBackdropChange({ formTarget, placement, layout });
    }
  }

  private handleOverlayAttach = (formTarget: IFormTarget, layout: string) => {
    const { placement, onOverlayChange } = this.props;
    if (onOverlayChange) {
      onOverlayChange({ formTarget, placement, layout });
    }
  }
}

export const CreativePosts: React.SFC<ICreativePostsProps> = (props) => {
  const { children, description } = props;
  return (
    <div className={styles.creativePosts}>
      {children}
      {description && (
        <div className={styles.creativePostsDescritpion}>
          <BlockDescription className={styles.creativePostsDescritpionBlock}>
            <Description>
              {description}
            </Description>
          </BlockDescription>
        </div>
      )}
    </div>
  );
};
