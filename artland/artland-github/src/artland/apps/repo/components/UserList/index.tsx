import React from 'react';
import classNames from 'classnames';
import { pluralize } from 'apps/base/utils/text';
import styles from './style.css';

interface IUserListProps {
  children: React.ReactNode;
  onScroll?: ({ position, width }) => void;
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

export class UserList extends React.PureComponent<IUserListProps> {
  public userListItemsNode: HTMLElement | null = null;

  public componentDidMount() {
    if (this.userListItemsNode) {
      this.userListItemsNode.addEventListener('scroll', this.handleUserListScroll);
    }
  }

  public componentWillUnmount() {
    if (this.userListItemsNode) {
      this.userListItemsNode.removeEventListener('scroll', this.handleUserListScroll);
    }
  }

  public render() {
    const { children } = this.props;

    return (
      <div className={styles.userList}>
        <ul
          ref={this.handleListItemsNodeRef}
          className={styles.userListItems}>
          {children}
        </ul>
      </div>
    );
  }

  private handleListItemsNodeRef = (node) => {
    this.userListItemsNode = node;
  }

  private handleUserListScroll = (event) => {
    const { onScroll } = this.props;

    if (onScroll) {
      onScroll({
        position: event.target.scrollLeft,
        width: event.target.scrollWidth - event.target.getBoundingClientRect().width,
      });
    }
  }
};
