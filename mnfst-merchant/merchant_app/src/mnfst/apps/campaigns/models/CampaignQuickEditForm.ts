import { ICampaignQuickEdit, ISocialNetworkPlacement } from 'apps/campaigns/interfaces/campaign';
import { ICampaignQuickEditFormFields } from 'apps/campaigns/interfaces/campaignQuickEditForm';
import { ERRORS_STRINGS } from 'constants/campaigns';
import { Currency } from 'utils/number';

interface ICampaignQuickEditFormProps {
  campaign: ICampaignQuickEdit;
}

export default class CampaignQuickEditForm {
  public campaign: ICampaignQuickEditFormFields;

  constructor(props?: ICampaignQuickEditFormProps) {
    this.campaign = {
      id: {
        value: props && props.campaign && props.campaign.id || null,
      },
      budget: {
        isRequired: !(props && props.campaign && props.campaign.non_profit),
        nonEditable: props && props.campaign && props.campaign.non_profit || false,
        requiredError: ERRORS_STRINGS.CAMPAIGN_BUDGET,
        value: props && props.campaign && props.campaign.budget
          && { value: Currency.fromCents(props.campaign.budget.value) } || null,
      },
      non_profit: {
        value: props && props.campaign && props.campaign.non_profit || false,
      },
      paid_participations_count: {
        value: props && props.campaign && props.campaign.paid_participations_count || null,
      },
      sex: {
        value: props && props.campaign && props.campaign.sex || ['male', 'female'],
      },
      placements: {
        isRequired: true,
        requiredError: ERRORS_STRINGS.CAMPAIGN_SOCIAL_NETWORKS_REQUIRED,
        value: props && props.campaign && props.campaign.placements
          ? [...props.campaign.placements].map((placement: ISocialNetworkPlacement) => ({
            ...placement,
            price: {
              value: Currency.fromCents(placement.price.value),
            },
          }))
          : [
            {
              post_text: null,
              price: {
                value: null,
              },
              social_network: 'instagram',
              type: 'feed',
            },
            {
              post_text: null,
              price: {
                value: null,
              },
              social_network: 'instagram',
              type: 'story',
            },
            {
              post_text: null,
              price: {
                value: null,
              },
              social_network: 'twitter',
              type: 'feed',
            },
          ],
      },
    };
  }
}
