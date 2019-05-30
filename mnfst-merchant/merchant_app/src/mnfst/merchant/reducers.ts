import auth from 'apps/users/reducers/auth';
import brandForm from 'apps/campaigns/reducers/brandForm';
import campaign from 'apps/campaigns/reducers/campaign';
import campaignQuickEditForm from 'apps/campaigns/reducers/campaignQuickEditForm';
import campaignForm from 'apps/campaigns/reducers/campaignForm';
import campaignGeoTargeting from 'apps/campaigns/reducers/campaignGeoTargeting';
import campaignsList from 'apps/campaigns/reducers/campaignsList';
import creativesList from 'apps/stream/reducers/creativesList';
import feedbackForm from 'apps/stream/reducers/feedbackForm';
import layout from 'apps/base/reducers/layout';
import loginForm from 'apps/users/reducers/loginForm';
import modals from 'apps/base/reducers/modals';
import payments from 'apps/payments/reducers/payments';
import paymentAccounts from 'apps/payments/reducers/paymentAccounts';
import paymentsHistory from 'apps/payments/reducers/paymentsHistory';
import paymentMethodForm from 'apps/payments/reducers/paymentMethodForm';
import passwordChangeForm from 'apps/users/reducers/passwordChangeForm';
import passwordResetForm from 'apps/users/reducers/passwordResetForm';
import profileForm from 'apps/users/reducers/profileForm';
import registrationForm from 'apps/users/reducers/registrationForm';
import statistic from 'apps/base/reducers/statistic';
import user from 'apps/users/reducers/user';
import userLocation from 'apps/ui/reducers/userLocation';

const reducers = {
  auth,
  brandForm,
  campaign,
  campaignForm,
  campaignGeoTargeting,
  campaignQuickEditForm,
  campaignsList,
  creativesList,
  feedbackForm,
  layout,
  loginForm,
  modals,
  payments,
  paymentAccounts,
  paymentsHistory,
  paymentMethodForm,
  passwordChangeForm,
  passwordResetForm,
  profileForm,
  registrationForm,
  statistic,
  user,
  userLocation,
};

export default reducers;
