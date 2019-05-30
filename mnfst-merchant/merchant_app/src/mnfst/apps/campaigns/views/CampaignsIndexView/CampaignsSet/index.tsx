import React from 'react';
import BrandUpdateDialog from 'apps/campaigns/components/BrandUpdateDialog';
import { CampaignPlatformsStub } from 'apps/ui/components/CampaignPlatforms';
import { CampaignStatusStub } from 'apps/campaigns/components/CampaignStatus';
import CampaignThumbnail, { CampaignThumbnailStub } from 'apps/campaigns/components/CampaignThumbnail';
import { TableRow, TableBodyCell, TableGroupCaption } from 'apps/ui/components/Table';
import TextLink from 'apps/ui/components/TextLink';
import { TextStub } from 'apps/ui/components/Text';
import Title, { TitleStub } from 'apps/ui/components/Title';
import { IBrand } from 'apps/brands/interfaces';
import { localizeString } from 'utils/localization';
import CampaignItem from './CampaignItem';

interface ICampaignsSetProps {
  brand: IBrand;
  items: any[];
  onActionChange: (target: any) => void;
}

interface ICampaignsSetState {
  isBrandUpdateDialogOpen: boolean;
}

class CampaignsSet extends React.Component<ICampaignsSetProps, ICampaignsSetState> {
  public state = {
    isBrandUpdateDialogOpen: false,
  };

  public render() {
    const { brand, items } = this.props;
    const { isBrandUpdateDialogOpen } = this.state;

    return (
      <React.Fragment>
        <TableRow className={`spec-campaigns-list-item-brand-${brand.id}`}>
          <TableGroupCaption>
            <CampaignThumbnail
              classNamesList={{
                image: `spec-campaigns-list-item-brand-${brand.id}-logo-image`,
              }}
              name={brand.name}
              src={brand.image} />
          </TableGroupCaption>
          <TableGroupCaption colSpan={8}>
            <Title level={2}>
              {brand.name}
            </Title>
          </TableGroupCaption>
          <TableGroupCaption>
            <TextLink
              className={`spec-campaigns-list-item-brand-${brand.id}-edit-button`}
              onClick={this.handleBrandUpdateDialogOpen}
              theme="violet">
              {localizeString('Edit brand')}
            </TextLink>
            <BrandUpdateDialog
              id={brand.id}
              isOpen={isBrandUpdateDialogOpen}
              onClose={this.handleBrandUpdateDialogClose} />
          </TableGroupCaption>
        </TableRow>
        {items.map(item => (
          <CampaignItem
            key={item.id}
            onActionChange={({ value }) => this.handleActionChange(item.id, value)}
            {...item} />
        ))}
      </React.Fragment>
    );
  }

  private handleActionChange = (id, value) => {
    const { onActionChange } = this.props;
    if (onActionChange) {
      onActionChange({ id, value });
    }
  }

  private handleBrandUpdateDialogOpen = () => {
    this.setState({ isBrandUpdateDialogOpen: true });
  }

  private handleBrandUpdateDialogClose = () => {
    this.setState({ isBrandUpdateDialogOpen: false });
  }
}

export default CampaignsSet;

export const CampaignsSetStub = () => {
  return (
    <React.Fragment>
      <TableRow>
        <TableGroupCaption>
          <CampaignThumbnailStub />
        </TableGroupCaption>
        <TableGroupCaption colSpan={9}>
          <TitleStub level="2" />
        </TableGroupCaption>
      </TableRow>
      {Array(4).fill(1).map((_, index) => (
        <TableRow key={index}>
          <TableBodyCell>
            <CampaignThumbnailStub />
          </TableBodyCell>
          <TableBodyCell>
            <TextStub />
          </TableBodyCell>
          <TableBodyCell>
            <TextStub />
          </TableBodyCell>
          <TableBodyCell>
            <TextStub />
          </TableBodyCell>
          <TableBodyCell>
            <CampaignPlatformsStub />
          </TableBodyCell>
          <TableBodyCell>
            <TextStub />
          </TableBodyCell>
          <TableBodyCell>
            <TextStub />
          </TableBodyCell>
          <TableBodyCell>
            <TextStub />
          </TableBodyCell>
          <TableBodyCell>
            <CampaignStatusStub />
          </TableBodyCell>
          <TableBodyCell>
            <TextStub />
          </TableBodyCell>
        </TableRow>
      ))}
    </React.Fragment>
  );
};
