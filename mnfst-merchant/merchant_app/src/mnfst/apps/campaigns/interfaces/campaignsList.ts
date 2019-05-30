export interface ICampaignsListReducer {
  brands: any[];
  campaignsList: any[];
  meta: any;
  status: string | null;
}

export interface ICampaignsListActionFetchDataParams {
  pageNumber: number;
}

export interface ICampaignsListActionChangeCampaignStatusParams {
  action: string;
  id: string;
}

export interface ICampaignsListActions {
  changeCampaignStatus: (params: ICampaignsListActionChangeCampaignStatusParams) => void;
  fetchData: (params?: ICampaignsListActionFetchDataParams) => void;
}
