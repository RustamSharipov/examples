import Brand from 'apps/campaigns/models/Brand';
import Campaign from 'apps/campaigns/models/Campaign';
import { ERRORS_BASE } from 'constants/base';
import {
  CAMPAIGNS_UPDATE_CAMPAIGN_DETAILS, CAMPAIGNS_URI_CAMPAIGN_STATISTIC, CAMPAIGNS_URI_VIEW_CAMPAIGN,
} from 'constants/campaigns';
import { ICampaignActionUpdateStatistic } from 'apps/campaigns/interfaces/campaign';
import { routes } from 'merchant/routes';
import request from 'utils/request';

export function fetchData(id: string) {
  const url = CAMPAIGNS_URI_VIEW_CAMPAIGN.replace('CAMPAIGN_ID', id);

  return async(dispatch) => {
    dispatch({
      type: CAMPAIGNS_UPDATE_CAMPAIGN_DETAILS,
      payload: {
        redirect: null,
        status: 'receiving',
      },
    });

    await request({
      url,
      method: 'get',
    })

    .then((response) => {
      const { data: { data }, status } = response;
      const brand = new Brand(data.brand);
      const campaign = new Campaign(data.campaign);

      // Campaign data is loaded
      if (status === 200 && data) {
        dispatch({
          type: CAMPAIGNS_UPDATE_CAMPAIGN_DETAILS,
          payload: {
            campaign,
            brand,
            status: null,
          },
        });
      }
    })

    .catch((error = {}) => {
      if (error.response) {
        const { status } = error.response;

        // Campaign not found
        if (status === 404) {
          dispatch({
            type: CAMPAIGNS_UPDATE_CAMPAIGN_DETAILS,
            payload: {
              redirect: routes.campaigns.path,
              status: null,
            },
          });
        }
      }
    });
  };
}

export function updateStatistic(params: ICampaignActionUpdateStatistic) {
  const {
    id,
    dateFrom: from_date,
    dateTo: to_date,
    placement: variant_type,
    type,
  } = params;
  const url = `${CAMPAIGNS_URI_CAMPAIGN_STATISTIC.replace(':id', id)}`
    + `?from_date=${from_date}&to_date=${to_date}&type=${type}&variant_type=${variant_type}`;

  return async(dispatch, getState) => {
    const { campaign } = getState().campaign;

    await request({
      url,
      method: 'get',
    })

    .then((response) => {
      const { data: { data }, status } = response;

      // Campaign is created
      if (status === 200 && data) {
        const { statistic } = data;

        dispatch({
          type: CAMPAIGNS_UPDATE_CAMPAIGN_DETAILS,
          payload: {
            campaign: {
              ...campaign,
              statistic: {
                ...campaign.statistic,
                [`${type}_${variant_type}`]: statistic[type],
              },
            },
            status: 'done',
          },
        });
      }
    })

    .catch((error = {}) => {
      if (error.response) {
        const { status } = error.response;

        // Campaign not found
        if (status === 404 || status === 500) {
          const errors = {
            campaign: [ERRORS_BASE.INTERNAL_SERVER_ERROR],
          };

          dispatch({
            type: CAMPAIGNS_UPDATE_CAMPAIGN_DETAILS,
            payload: {
              errors,
              status: 'error',
            },
          });
        }
      }
    });
  };
}
