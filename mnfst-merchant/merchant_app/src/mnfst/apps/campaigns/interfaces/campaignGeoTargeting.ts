import { OperationStatus } from 'apps/ui/types/base';
import { GeoTargetKind } from 'apps/ui/types/geoTargeting';

export interface IGeoTarget {
  id?: string;
  country_code?: string;
  kind: GeoTargetKind;
  lat?: number;
  lng?: number;
  name?: string;
  radius?: number;
}

export interface ICampaignsGeoTargetingReducer {
  suggestedGeoTargetsList: IGeoTarget[];
  status: OperationStatus;
}

export interface ICampaignGeoTargetingActionFetchGeoTargetsSuggestions {
  query: string;
}

export interface ICampaignGeoTargetingActions {
  fetchGeoTargetsSuggestions: (params: ICampaignGeoTargetingActionFetchGeoTargetsSuggestions) => void;
  selectGeoTargetSuggestion: (geoTarget: IGeoTarget) => void;
}
