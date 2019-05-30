import { IBrand } from 'apps/brands/interfaces';
import { IGeoTarget } from 'apps/campaigns/interfaces/campaignGeoTargeting';

export interface ISocialNetworkPlacement {
  post_text: string | null;
  price: IMoney;
  social_network: string;
  type: string;
}

export interface ISocialNetworks {
  facebook?: ISocialNetwork;
  instagram?: ISocialNetwork;
  twitter?: ISocialNetwork;
}

export interface ICampaign {
  id?: number;
  actions: string[];
  brand_id: number;
  budget: IMoney;
  countries: string[];
  editable_fields: string[];
  non_profit: boolean;
  geo_targets: IGeoTarget[];
  creative_templates: ICreativeTemplate[];
  creative_type: string;
  start_at: string;
  end_at: string;
  face_required: boolean;
  max_age?: number;
  min_age?: number;
  name: string;
  paid_participations_count?: number;
  participants_count?: number;
  placements: ISocialNetworkPlacement[] | [];
  description: string;
  preview: string;
  sex: string[];
  social_networks: ISocialNetworks;
  spent: IMoney;
  statistic: ICampaignStatistic;
  status: string;
  supporters: number;
  time_zone: string;
}

export interface ICampaignQuickEdit {
  id: string;
  budget: IMoney;
  non_profit: boolean;
  exclude_big_influences: boolean;
  paid_participations_count: number;
  placements: ISocialNetworkPlacement[] | [];
  sex: string[];
}

export interface ICampaignReducer {
  brand: IBrand;
  campaign: ICampaign;
  redirect: string | null;
  status: string | null;
}

export interface IAsset {
  id?: string;
  layout: string;
  type: string;
  url?: string;
}

export interface ICreative {
  creative_type: string;
  assets: IAsset[];
}

export interface ICreativeTemplate {
  assets: IAsset[];
  placement: string;
  preview_url?: string | null;
}

export interface IMoney {
  currency_code: string;
  value: number;
}

export interface ISocialNetwork {
  price: number;
  post_text: string;
}

export interface ICampaignStatisticItem {
  facebook: number;
  instagram: number;
  label: string;
  overall: number;
  twitter: number;
}

export interface ICampaignStatistic {
  [name: string]: ICampaignStatisticItem[];
}

export interface ICampaignStatisticData {
  engagements_feed?: any;
  impressions_feed?: any;
  impressions_story?: any;
  supporters_feed?: any;
  supporters_story?: any;
}

export interface ICampaignStatisticGroupData {
  facebook?: number[];
  instagram?: number[];
  overall?: number[];
  twitter?: number[];
}

export interface ICampaignActionUpdateStatistic {
  id: string;
  dateFrom: string;
  dateTo: string;
  placement: string;
  type: string;
}

export interface ICampaignActions {
  fetchData: (id: string) => void;
  updateStatistic: (params: ICampaignActionUpdateStatistic) => void;
}
