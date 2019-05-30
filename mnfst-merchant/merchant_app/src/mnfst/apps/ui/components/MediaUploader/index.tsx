import React from 'react';
import { ContentFrame } from 'apps/ui/components/ContentFrame';
import Title from 'apps/ui/components/Title';
import Description from 'apps/ui/components/Description';
import Button from 'apps/ui/components/Button';
import FileUpload from 'apps/ui/components/FileUpload';
import styles from './style.css';

interface IMediaUploaderProps {
  className?: string;
  title?: any;
  description?: any;
  buttonLabel: any;
}

class MediaUploader extends React.Component<IMediaUploaderProps> {
  public render() {
    const { className, title, description, buttonLabel } = this.props;
    return (
      <ContentFrame className={className}>
        <Title level="3">
          {title}
        </Title>
        <Description>
          {description}
        </Description>
        <div className={styles.controls}>
          <Button className={styles.button}>
            <FileUpload />
            <span>{buttonLabel}</span>
          </Button>
        </div>
      </ContentFrame>
    );
  }
}

export default MediaUploader;
