import React from 'react';
import { PageSectionTitle } from 'apps/base/components/PageSection';
import { pluralize } from 'apps/base/utils/text';
import styles from './style.css';

interface IRepoDetailHeaderProps {
  name?: string;
  starsCount?: number;
  watchCount?: number;
}

export default (props: IRepoDetailHeaderProps) => {
  const { name, starsCount, watchCount } = props;

  return (
    <PageSectionTitle className={styles.repoDetailHeader}>
      {name && (
        <div className={styles.repoDetailHeaderTitle}>
          {name}
        </div>
      )}
      <div className={styles.repoDetailHeaderInfo}>
        {starsCount && (
          <div className={styles.repoDetailHeaderInfoSection}>
            {`${starsCount} ${pluralize(['Star', 'Stars'], starsCount)}`}
          </div>
        )}
        {watchCount && (
          <div className={styles.repoDetailHeaderInfoSection}>
            {watchCount} Watching
          </div>
        )}
      </div>
    </PageSectionTitle>
  );
};
