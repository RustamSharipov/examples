import React from 'react';
import CheckIcon from 'apps/ui/components/icons/CheckIcon';
import { localizeString } from 'utils/localization';
import styles from './style.css';

const VideoUploadedStatus = () => {
  return (
    <div className={styles.videoUploadedStatus}>
      <div>
        <CheckIcon className={styles.icon} />
      </div>
      <div className={styles.content}>
        {localizeString('Video successfully uploaded')}
      </div>
    </div>
  );
};

export default VideoUploadedStatus;
