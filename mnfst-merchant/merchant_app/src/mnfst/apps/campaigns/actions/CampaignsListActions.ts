import queryString from 'query-string';
import { CAMPAIGNS_UPDATE_CAMPAIGNSLIST, CAMPAIGNS_URI_CAMPAIGNS } from 'constants/campaigns';
import {
  ICampaignsListActionFetchDataParams, ICampaignsListActionChangeCampaignStatusParams, ICampaignsListReducer,
} from 'apps/campaigns/interfaces/campaignsList';
import request from 'utils/request';

export function changeCampaignStatus(params: ICampaignsListActionChangeCampaignStatusParams) {
  const { action, id } = params;
  const url = `${CAMPAIGNS_URI_CAMPAIGNS}/${id}/${action}`;

  return async(dispatch, getState) => {
    const { campaignsList }: ICampaignsListReducer = getState().campaignsList;

    await request({
      url,
      method: 'PATCH',
    })
      .then(({ data: { data }, status }) => {
        if (status === 200 && data) {
          const { campaign } = data;
          const updatedCampaigns = campaignsList.map(item => item.id === campaign.id ? campaign : item);

          dispatch({
            type: CAMPAIGNS_UPDATE_CAMPAIGNSLIST,
            payload: {
              campaignsList: updatedCampaigns,
            },
          });
        }
      });
  };
}

export function fetchData(params?: ICampaignsListActionFetchDataParams) {
  const pageNumber = params && params.pageNumber;
  const locationSearch = queryString.parse(location.search);
  const currentPage = (locationSearch && locationSearch.page) && +locationSearch.page;
  const page = pageNumber || currentPage || 1;

  let url = CAMPAIGNS_URI_CAMPAIGNS;
  if (page > 1) {
    url = `${url}?page[number]=${page}`;
  }

  return async(dispatch) => {
    dispatch({
      type: CAMPAIGNS_UPDATE_CAMPAIGNSLIST,
      payload: {
        status: 'loading',
      },
    });

    await request({
      url,
      method: 'get',
    })
      .then(({ data: { data, meta }, status }) => {
        if (status === 200 && data) {
          if (page > meta.total_pages) {
            dispatch({
              type: CAMPAIGNS_UPDATE_CAMPAIGNSLIST,
              payload: {
                status: 'empty',
              },
            });
          }

          else {
            const { brands, campaigns: campaignsList } = data;
            dispatch({
              type: CAMPAIGNS_UPDATE_CAMPAIGNSLIST,
              payload: {
                brands,
                campaignsList,
                meta,
                status: null,
              },
            });
          }
        }
      });
  };
}
