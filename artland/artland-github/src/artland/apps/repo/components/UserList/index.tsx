import React from 'react';
import classNames from 'classnames';
import styles from './style.css';
import { pluralize } from 'apps/base/utils/text';

interface IUserListProps {
  children: React.ReactNode;
}

interface IUserListItemProps {
  avatarUrl: string;
  isActive: boolean;
  onClick: () => void;
  reposCount: number;
  starsCount: number;
  userName: string;
}

export const UserListItem: React.FC<IUserListItemProps> = (props) => {
  const { avatarUrl, isActive, onClick, reposCount, starsCount, userName } = props;

  return (
    <li className={classNames(
      styles.userListItem,
      { [styles.isActive]: isActive },
    )}>
      <button
        className={styles.userListItemControl}
        onClick={onClick && onClick}
        type="button">
        <div className={styles.userListItemCover}>
          <img
            className={styles.userListItemCoverImage}
            src={avatarUrl}
            width="256"
            height="256"
            alt={userName} />
        </div>
        <div className={styles.userListItemInfo}>
          <div className={styles.userListItemUserName}>
            {userName}
          </div>
          <div className={styles.userListItemUserStatistic}>
            <div className={styles.userListItemUserStatisticSection}>
              {`${reposCount} ${pluralize(['Repository', 'Repositories'], reposCount)}`}
            </div>
            <div className={styles.userListItemUserStatisticSection}>
              {`${starsCount} ${pluralize(['Star', 'Stars'], starsCount)}`}
            </div>
          </div>
        </div>
      </button>
    </li>
  );
};

export const UserList: React.FC<IUserListProps> = (props) => {
  const { children } = props;

  return (
    <div className={styles.userList}>
      <ul className={styles.userListItems}>
        {children}
      </ul>
    </div>
  );
};
