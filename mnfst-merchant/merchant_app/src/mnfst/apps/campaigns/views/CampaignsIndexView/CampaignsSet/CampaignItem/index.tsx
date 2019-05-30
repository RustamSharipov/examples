import React from 'react';
import classNames from 'classnames';
import CampaignActionsList from 'apps/campaigns/components/CampaignActionsList';
import CampaignEventDate from 'apps/campaigns/components/CampaignEventDate';
import CampaignMoneyRange from 'apps/campaigns/components/CampaignMoneyRange';
import CampaignName from 'apps/campaigns/components/CampaignName';
import { CampaignPlatform, CampaignPlatforms } from 'apps/ui/components/CampaignPlatforms';
import CampaignStatus from 'apps/campaigns/components/CampaignStatus';
import CampaignThumbnail from 'apps/campaigns/components/CampaignThumbnail';
import { TableRow, TableBodyCell } from 'apps/ui/components/Table';
import { IMoney, ICreativeTemplate } from 'apps/campaigns/interfaces/campaign';
import { routes } from 'merchant/routes';
import { ALLOWED_SOCIAL_NETWORKS } from 'constants/campaigns';
import { IFormTarget } from 'interfaces';
import styles from './style.css';

interface ICampaignItemProps {
  id: string;
  actions: string[];
  budget: IMoney;
  creative_templates: ICreativeTemplate[];
  creative_type: string;
  start_at: string;
  end_at: string;
  name: string;
  onActionChange: (target: IFormTarget) => void;
  participants_count: number;
  preview: string;
  placements: any[];
  spent: IMoney;
  status: string;
}

interface ICampaignItemState {
  isHover: boolean;
}

class CampaignItem extends React.Component<ICampaignItemProps, ICampaignItemState> {
  public state = {
    isHover: false,
  };

  public render() {
    const {
      actions,
      budget,
      creative_templates,
      creative_type,
      id,
      name,
      participants_count,
      placements,
      preview,
      spent,
      start_at,
      end_at,
      status,
      onActionChange,
    } = this.props;
    const { isHover } = this.state;
    const socialNetworks: string[] = [...placements]
      .map(placement => placement.social_network)
      .filter(socialNetwork => ALLOWED_SOCIAL_NETWORKS.includes(socialNetwork))
      .sort()
      .filter((socialNetwork, index, socialNetworks) => index === 0 || socialNetwork !== socialNetworks[index - 1]);
    const link = routes['campaigns.details'].getPath(id);
    const hasFeed = creative_templates.filter(template => template.placement === 'feed').length > 0;
    const hasStory = creative_templates.filter(template => template.placement === 'story').length > 0;

    return (
      <TableRow
        className={classNames(
          styles.campaignItem,
          isHover && styles.isHover,
          `spec-campaigns-list-item-campaign-${id}`,
        )}
        onMouseEnter={this.handleCampaignItemHover}
        onMouseLeave={this.handleCampaignItemUnhover}>
        <TableBodyCell
          className={
            classNames(
              styles.campaignItemCell,
              status === 'finished' && styles.campaignIsFinished,
            )
          }>
          <CampaignThumbnail
            name={name}
            src={preview}
            type={creative_type} />
        </TableBodyCell>
        <TableBodyCell
          className={
            classNames(
              styles.campaignItemCell,
              status === 'finished' && styles.campaignIsFinished,
            )
          }>
          <CampaignName
            className={`spec-campaigns-list-item-campaign-name-${id}`}
            link={link}>
            {name}
          </CampaignName>
        </TableBodyCell>
        <TableBodyCell
          className={
            classNames(
              styles.campaignItemCell,
              status === 'finished' && styles.campaignIsFinished,
            )
          }>
          <CampaignEventDate date={start_at} />
        </TableBodyCell>
        <TableBodyCell
          className={
            classNames(
              styles.campaignItemCell,
              status === 'finished' && styles.campaignIsFinished,
            )
          }>
          <CampaignEventDate date={end_at} />
        </TableBodyCell>
        <TableBodyCell>
          {socialNetworks && (
            <CampaignPlatforms>
              {socialNetworks.map(socialNetwork => (
                <CampaignPlatform
                  key={socialNetwork}
                  className={classNames(
                    `spec-campaign-${id}-platform`,
                    `spec-campaign-platform-${socialNetwork}`,
                  )}
                  type={socialNetwork} />
              ))}
            </CampaignPlatforms>
          )}
        </TableBodyCell>
        <TableBodyCell
          className={
            classNames(
              styles.campaignItemCell,
              status === 'finished' && styles.campaignIsFinished,
            )
          }>
          <div className={styles.creativeFormats}>
            {hasStory && (
              <span
                className={classNames(
                  styles.creativeFormat,
                  styles.story,
                )} />
            )}
            {hasFeed && <span className={styles.creativeFormat} />}
          </div>
        </TableBodyCell>
        <TableBodyCell
          className={
            classNames(
              styles.campaignItemCell,
              status === 'finished' && styles.campaignIsFinished,
            )
          }>
          <CampaignMoneyRange
            currencyCode={budget.currency_code}
            maxValue={budget.value}
            value={spent.value} />
        </TableBodyCell>
        <TableBodyCell
          className={
            classNames(
              styles.campaignItemCell,
              status === 'finished' && styles.campaignIsFinished,
            )
          }>
          {participants_count}
        </TableBodyCell>
        <TableBodyCell className={styles.campaignItemCell}>
          <CampaignStatus status={status} />
        </TableBodyCell>
        <TableBodyCell className={styles.campaignItemCell}>
          <CampaignActionsList
            allowedActions={actions}
            classNamesList={{
              item: `spec-campaign-${id}-action`,
            }}
            isHover={isHover}
            onSelect={onActionChange && onActionChange} />
        </TableBodyCell>
      </TableRow>
    );
  }

  public handleCampaignItemHover = () => {
    this.setState({ isHover: true });
  }

  public handleCampaignItemUnhover = () => {
    this.setState({ isHover: false });
  }
}

export default CampaignItem;
