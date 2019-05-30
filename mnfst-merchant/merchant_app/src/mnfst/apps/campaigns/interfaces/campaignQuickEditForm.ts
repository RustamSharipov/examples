import { IFormTarget, IFormErrors, IFormField } from 'interfaces';
import { ISocialNetworkPlacement } from 'apps/campaigns/interfaces/campaign';
import { ISocialNetworkPlacementTypeFormField, ISocialNetworkPlacementPrice } from './campaignForm';

export interface ICampaignQuickEditFormFields {
  id: IFormField<number>;
  budget: IFormField<string>;
  non_profit: IFormField<boolean>;
  paid_participations_count: IFormField<number>;
  sex: IFormField<string[]>;
  placements: IFormField<ISocialNetworkPlacement>;
}

export interface ICampaignQuickEditForm {
  campaign: ICampaignQuickEditFormFields;
}

export interface ICampaignQuickEditFormReducer {
  campaignQuickEditForm: ICampaignQuickEditForm;
  errors: IFormErrors;
  status: string | null;
}

export interface ICampaignQuickEditFormActions {
  init: () => void;
  submit: () => void;
  updateFormField: (target: IFormTarget) => void;
  updatePlacementFormField: (params: ISocialNetworkPlacementTypeFormField) => void;
  updatePlacementPrice: (params: ISocialNetworkPlacementPrice) => void;
}
