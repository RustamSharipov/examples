import { localizeString } from 'utils/localization';

export const ALLOWED_SOCIAL_NETWORKS = ['instagram', 'twitter'];

export const CAMPAIGNS_UPDATE_CAMPAIGNSLIST = 'CAMPAIGNS_UPDATE_CAMPAIGNSLIST';
export const CAMPAIGNS_FETCHING_STATUS = 'CAMPAIGNS_FETCHING_STATUS';
export const CAMPAIGNS_CREATE_NEW_CAMPAIGN = 'CAMPAIGNS_CREATE_NEW_CAMPAIGN';
export const CAMPAIGNS_UPDATE_CAMPAIGN_FORM = 'CAMPAIGNS_UPDATE_CAMPAIGN_FORM';
export const CAMPAIGNS_UPDATE_CAMPAIGN_FORM_FIELD = 'CAMPAIGNS_UPDATE_CAMPAIGN_FORM_FIELD';
export const CAMPAIGNS_FILE_UPLOADED = 'CAMPAIGNS_FILE_UPLOADED';
export const CAMPAIGNS_UPDATE_CAMPAIGN_DETAILS = 'CAMPAIGNS_UPDATE_CAMPAIGN_DETAILS';
export const CAMPAIGNS_UPDATE_CAMPAIGN_QUICK_EDIT_FORM = 'CAMPAIGNS_UPDATE_CAMPAIGN_QUICK_EDIT_FORM';

export const CAMPAIGN_FORM_ERROR = 'CAMPAIGN_FORM_ERROR';
export const CAMPAIGN_FORM_ADD_GEO_TARGET = 'CAMPAIGN_FORM_ADD_GEO_TARGET';
export const CAMPAIGN_FORM_REMOVE_GEO_TARGET = 'CAMPAIGN_FORM_REMOVE_GEO_TARGET';
export const CAMPAIGN_FORM_UPDATE_GEO_TARGET = 'CAMPAIGN_FORM_UPDATE_GEO_TARGET';
export const CAMPAIGN_FORM_DIALOG_DISPLAY = 'CAMPAIGN_FORM_DIALOG_DISPLAY';
export const CAMPAIGN_FORM_DIALOG_CLOSE = 'CAMPAIGN_FORM_DIALOG_CLOSE';
export const CAMPAIGN_FORM_RESTORE_PREVIOUS_GEO_TARGET = 'CAMPAIGN_FORM_RESTORE_PREVIOUS_GEO_TARGET';

export const CAMPAIGNS_UPDATE_BRAND_FORM = 'CAMPAIGNS_UPDATE_BRAND_FORM';

export const CAMPAIGNS_URI_CAMPAIGNS = '/api/merchants/v2/campaigns';
export const CAMPAIGNS_URI_CREATE_CAMPAIGN = '/api/merchants/v2/campaigns';
export const CAMPAIGNS_URI_EDIT_CAMPAIGN = '/api/merchants/v2/campaigns/CAMPAIGN_ID/edit';
export const CAMPAIGNS_URI_COPY_CAMPAIGN = '/api/merchants/v2/campaigns/CAMPAIGN_ID/copy';
export const CAMPAIGNS_URI_VIEW_CAMPAIGN = '/api/merchants/v2/campaigns/CAMPAIGN_ID';
export const CAMPAIGNS_URI_CAMPAIGN_STATISTIC = '/api/merchants/v2/campaigns/:id/statistic';
export const CAMPAIGNS_URI_BRANDS = '/api/merchants/v1/brands';
export const CAMPAIGNS_URI_BRAND_UPDATE = '/api/merchants/v1/brands/BRAND_ID';
export const CAMPAIGNS_URI_QUICK_EDIT_CAMPAIGN = '/api/merchants/v2/campaigns/:id/quick_update';
export const CAMPAIGNS_URI_PLACEMENTS = '/api/merchants/v2/campaigns/placements';

export const BRAND_LOGO_MAX_FILE_SIZE = 2 * 1024 * 1024;
export const STATIC_OVERLAY_MAX_FILE_SIZE = 10 * 1024 * 1024;
export const VIDEO_OVERLAY_MAX_FILE_SIZE = 70 * 1024 * 1024;

export const FEED_CREATIVE_SIZE = [1080, 1080];
export const STORY_CREATIVE_SIZE = [1080, 1920];

export const BRAND_NAME_MAX_LENGTH = 20;
export const POST_TEXT_MAX_LENGTH = 200;
export const FACEBOOK_POST_TEXT_MAX_LENGTH = 500;
export const INSTAGRAM_FEED_POST_TEXT_MAX_LENGTH = 200;
export const INSTAGRAM_STORY_POST_TEXT_MAX_LENGTH = 50;
export const TWITTER_POST_TEXT_MAX_LENGTH = 260;

export const ERRORS_STRINGS = {
  BRAND_ID_REQUIRED: localizeString('You need to select your brand or create new'),
  BRAND_COLOR_REQUIRED: localizeString('You need to pick color'),
  BRAND_IMAGE_REQUIRED: localizeString('You need to select logo image'),
  BRAND_NAME_REQUIRED: localizeString('You need to specify name'),
  CAMPAIGN_BUDGET: localizeString('You need to specify campaign budget amount'),
  CAMPAIGN_START_AT: localizeString('Field is required'),
  CAMPAIGN_END_AT: localizeString('Field is required'),
  CAMPAIGN_NAME_REQUIRED: localizeString('Campaign name is required'),
  CAMPAIGN_FACEBOOK_CPM_REQUIRED: localizeString('You need to specify Facebook CPM amount'),
  CAMPAIGN_INSTAGRAM_CPM_REQUIRED: localizeString('You need to specify Instagram CPM amount'),
  CAMPAIGN_TWITTER_CPM_REQUIRED: localizeString('You need to specify Twitter CPM amount'),
  CAMPAIGN_SOCIAL_NETWORKS_REQUIRED: localizeString('You need to select at least one social network'),
  CAMPAIGN_CREATIVE_TEMPLATE_REQUIRED: localizeString('You need to select creative'),
  CAMPAIGN_POST_TEXT_MAX_LENGTH: localizeString('Your exceeded character limit!'),
  CAMPAIGN_PAID_PARTICIPATIONS_COUNT_REQUIRED: localizeString('Field is required'),
};
