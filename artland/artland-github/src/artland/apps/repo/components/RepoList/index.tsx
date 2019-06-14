import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.css';
import { pluralize } from 'apps/base/utils/text';

interface IRepoListProps {
  children: React.ReactNode;
}

interface IRepoListItemProps {
  link: string;
  name: string;
  starsCount: number;
  watchCount: number;
}

export const RepoListItem: React.FC<IRepoListItemProps> = (props) => {
  const { link, name, starsCount, watchCount } = props;

  return (
    <li className={styles.repoListItem}>
      <Link
        className={styles.repoListItemLink}
        to={link}>
        <div className={styles.repoListItemName}>
          {name}
        </div>
        <div className={styles.repoListItemInfo}>
          <div className={styles.repoListItemInfoSection}>
            {`${starsCount} ${pluralize(['Star', 'Stars'], starsCount)}`}
          </div>
          <div className={styles.repoListItemInfoSection}>
            {watchCount} Watching
          </div>
        </div>
      </Link>
    </li>
  );
};

export const RepoList: React.FC<IRepoListProps> = (props) => {
  const { children } = props;

  return (
    <div className={styles.repoList}>
      <ul className={styles.repoListItems}>
        {children}
      </ul>
    </div>
  );
};
