import { ISocialNetworkPlacement, ICreativeTemplate } from 'apps/campaigns/interfaces/campaign';
import { IBrandFields } from 'apps/campaigns/interfaces/brandForm';
import { IFormField, IFormErrors, IFormTarget } from 'interfaces';
import { IGeoTarget } from './campaignGeoTargeting';

interface ICampaignPlacementTypes {
  feed?: boolean;
  story?: boolean;
}

interface ICampaignPlacementSocialNetworks {
  instagram: ICampaignPlacementTypes;
  facebook: ICampaignPlacementTypes;
  twitter: ICampaignPlacementTypes;
}

export interface ISocialNetworkSupoortedFeatures {
  feed: boolean;
  story: boolean;
}

export interface ISocialNetworkPlacementPrice {
  socialNetwork: string;
  type: string;
  value: number;
}

export interface ISocialNetworkPlacementText {
  socialNetwork: string;
  type: string;
  value: string;
}

export interface ISocialNetworkPlacementTypeFormField {
  socialNetwork: string;
  type: string;
  value: boolean;
}

export interface ICampaignFields {
  id: IFormField<number>;
  brand_id: IFormField<number>;
  budget: IFormField<string>;
  non_profit: IFormField<boolean>;
  geo_targets: IFormField<IGeoTarget[]>;
  creative_templates: IFormField<ICreativeTemplate[]>;
  creative_type: IFormField<string>;
  start_at: IFormField<string>;
  end_at: IFormField<string>;
  face_required: IFormField<boolean>;
  max_age: IFormField<number>;
  min_age: IFormField<number>;
  name: IFormField<string>;
  paid_participations_count: IFormField<number>;
  placements: IFormField<ISocialNetworkPlacement>;
  description: IFormField<string>;
  sex: IFormField<string[]>;
  time_zone: IFormField<string>;
}

export interface ICampaignForm {
  brand: IBrandFields;
  campaign: ICampaignFields;
}

export interface ICreativesPreviews {
  [name: string]: string;
}

export interface ICampaignFormReducer {
  brands: any;
  campaignForm: ICampaignForm;
  currentGeoTarget: IGeoTarget | null;
  lastGeoTarget: IGeoTarget | null;
  isCurrentGeoTargetNeedUpdate: boolean;
  dialogType: string | null;
  errors: IFormErrors;
  placements: ICampaignPlacementSocialNetworks | null;
  redirect: string | null;
  status: string | null;
  isNew: boolean;
}

export interface ICampaignFormActionFetchDataParams {
  id: string;
  isCopy?: boolean;
}

export interface ICampaignFormActionSubmitParams {
  isCopy?: boolean;
  isDraft?: boolean;
  method?: string;
}

export interface ICampaignFormActionUploadCreativeTemplate {
  formTarget: IFormTarget;
  layout: string;
  placement: string;
}

export interface ICampaignFormActionRemoveCreativeTemplate {
  id: string;
  placement: string;
}

export interface ICampaignFormActionAddGeoTarget {
  geoTarget: IGeoTarget;
}

export interface ICampaignFormActionRemoveGeoTargets {
  ids: string[];
}

export interface ICampaignFormActionUpdateGeoTarget {
  id: string;
  country_code?: string;
  lat?: number;
  lng?: number;
  name?: string;
  radius?: number;
}

export interface ICampaignFormActionDisplayDialog {
  type: string;
}

export interface ICampaignFormActions {
  init: () => void;
  fetchBrands: () => void;
  fetchData: (params: ICampaignFormActionFetchDataParams) => void;
  fetchPlacements: () => void;
  removeCreativeTemplateAsset: (params: ICampaignFormActionRemoveCreativeTemplate) => void;
  addGeoTarget: (params: ICampaignFormActionAddGeoTarget) => void;
  removeGeoTargets: (params: ICampaignFormActionRemoveGeoTargets) => void;
  updateGeoTarget: (params: ICampaignFormActionUpdateGeoTarget) => void;
  submit: (params: ICampaignFormActionSubmitParams) => void;
  updatePlacementFormField: (params: ISocialNetworkPlacementTypeFormField) => void;
  updatePlacementPrice: (params: ISocialNetworkPlacementPrice) => void;
  updatePlacementText: (params: ISocialNetworkPlacementText) => void;
  updateFormField: (formTarget: IFormTarget) => void;
  addCreativeTemplateAsset: (params: ICampaignFormActionUploadCreativeTemplate) => void;
  displayDialog: (params: ICampaignFormActionDisplayDialog) => void;
  closeDialog: () => void;
}
