import React from 'react';
import classNames from 'classnames';
import { localizeString } from 'utils/localization';
import styles from './style.css';

const statuses = {
  accepted: {
    name: localizeString('Accepted'),
    className: styles.accepted,
  },
  active: {
    name: localizeString('Active'),
    className: styles.active,
  },
  created: {
    name: localizeString('Created'),
    className: styles.created,
  },
  declined: {
    name: localizeString('Declined'),
    className: styles.declined,
  },
  deleted: {
    name: localizeString('Deleted'),
    className: styles.deleted,
  },
  draft: {
    name: localizeString('Draft'),
    className: styles.draft,
  },
  finished: {
    name: localizeString('Finished'),
    className: styles.finished,
  },
  in_action: {
    name: localizeString('In action'),
    className: null,
  },
  submitted: {
    name: localizeString('Submitted'),
    className: styles.submitted,
  },
  suspended: {
    name: localizeString('Suspended'),
    className: styles.suspended,
  },
};

interface ICampaignStatus {
  status?: string;
}

const CampaignStatus: React.SFC<ICampaignStatus> = ({ status }) => {
  const statusData = (status && statuses[status]) ? statuses[status] : {};

  return (
    <div className={classNames(
      styles.campaignStatus,
      statusData.className,
    )}>
      {statusData.name}
    </div>
  );
};

export default CampaignStatus;

export const CampaignStatusStub = () => {
  return (
    <div className={classNames(
      styles.campaignStatus,
      styles.campaignStatusStub,
    )} />
  );
};
