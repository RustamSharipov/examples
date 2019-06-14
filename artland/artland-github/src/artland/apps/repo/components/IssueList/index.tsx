import React from 'react';
import styles from './style.css';
import { daysFromNow } from 'apps/base/utils/dateTime';
import { pluralize } from 'apps/base/utils/text';
import Button from 'apps/base/components/Button';

interface IIssueListProps {
  children: React.ReactNode;
  onIssueCreateButtonClick: () => void;
}

interface IIssueListItemProps {
  author: string;
  publishedAt: string;
  orderNumber: number;
  title: string;
}

export const IssueListItem: React.FC<IIssueListItemProps> = (props) => {
  const { author, publishedAt, orderNumber, title } = props;
  const daysFromOpenedDateTime = daysFromNow(publishedAt);
  let issueOpenedTime = `${daysFromOpenedDateTime} ${pluralize(['day', 'days'], daysFromOpenedDateTime)} ago`;
  
  if (daysFromOpenedDateTime === 0) {
    issueOpenedTime = 'today';
  }
  
  if (daysFromOpenedDateTime === 1) {
    issueOpenedTime = 'yesterday';
  }

  return (
    <li className={styles.issueListItem}>
      <div className={styles.issueListItemName}>
        {title}
      </div>
      <div className={styles.issueListItemInfo}>
        #{orderNumber} opened {issueOpenedTime} by {author}
      </div>
    </li>
  );
};

export const IssueList: React.FC<IIssueListProps> = (props) => {
  const { children, onIssueCreateButtonClick } = props;

  return (
    <div className={styles.issueList}>
      <div className={styles.issueListHeader}>
        <div className={styles.issueListHeaderTitle}>
          Open Issues
        </div>
        <div className={styles.issueListHeaderTools}>
          <Button
            onClick={onIssueCreateButtonClick && onIssueCreateButtonClick}
            theme="green">
            Create Issue
          </Button>
        </div>
      </div>
      <ul className={styles.issueListItems}>
        {children}
      </ul>
    </div>
  );
};
