import {
  ICampaign, ICampaignStatistic, ISocialNetworkPlacement, ICreativeTemplate, IMoney, ISocialNetworks,
} from 'apps/campaigns/interfaces/campaign';
import { IGeoTarget } from 'apps/campaigns/interfaces/campaignGeoTargeting';

export default class Campaign {
  public id?: number;
  public actions: string[];
  public brand_id: number;
  public budget: IMoney;
  public non_profit: boolean;
  public geo_targets: IGeoTarget[];
  public creative_templates: ICreativeTemplate[];
  public creative_type: string;
  public countries: string[];
  public editable_fields: string[];
  public start_at: string;
  public end_at: string;
  public face_required: boolean;
  public max_age?: number;
  public min_age?: number;
  public name: string;
  public paid_participations_count?: number;
  public participants_count?: number;
  public placements: ISocialNetworkPlacement[];
  public description: string;
  public preview: string;
  public sex: string[];
  public social_networks: ISocialNetworks;
  public spent: IMoney;
  public statistic: ICampaignStatistic;
  public status: string;
  public supporters: number;
  public time_zone: string;

  constructor(props?: ICampaign) {
    this.actions = props && props.actions || [];
    this.brand_id = props && props.brand_id || 0;
    this.budget = {
      currency_code: props && props.budget && props.budget.currency_code || '',
      value: props && props.budget && props.budget.value || 0,
    };
    this.non_profit = props && props.non_profit || false;
    this.geo_targets = props && props.geo_targets || [];
    this.creative_templates = props && props.creative_templates || [];
    this.creative_type = props && props.creative_type || '';
    this.editable_fields = props && props.editable_fields || [];
    this.id = props && props.id;
    this.start_at = props && props.start_at || '';
    this.end_at = props && props.end_at || '';
    this.max_age = props && props.max_age;
    this.min_age = props && props.min_age;
    this.name = props && props.name || '';
    this.description = props && props.description || '';
    this.paid_participations_count = props && props.paid_participations_count || 0;
    this.participants_count = props && props.participants_count || 0;
    this.placements = props && props.placements || [];
    this.preview = props && props.preview || '';
    this.sex = props && props.sex || ['male', 'female'];
    this.social_networks = props && props.social_networks || {};
    this.spent = {
      currency_code: props && props.spent && props.spent.currency_code || '',
      value: props && props.spent && props.spent.value || 0,
    };
    this.statistic = props && props.statistic || {},
    this.status = props && props.status || 'active';
    this.supporters = props && props.supporters || 0;
    this.time_zone = props && props.time_zone || '';
    this.face_required = props && props.face_required || true;
    this.countries = props && props.countries || [];
  }
}
