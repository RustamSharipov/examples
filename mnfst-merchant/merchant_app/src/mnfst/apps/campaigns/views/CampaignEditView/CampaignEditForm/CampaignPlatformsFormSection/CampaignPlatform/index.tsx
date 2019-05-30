import React from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CampaignPlacementSocialNetwork } from 'apps/campaigns/components/CampaignPlacement';
import Description from 'apps/ui/components/Description';
import { FormRow, FormRowSection } from 'apps/ui/components/Form';
import TextField from 'apps/ui/components/TextField';
import { ICampaignFormReducer, ICampaignFormActions } from 'apps/campaigns/interfaces/campaignForm';
import { ICampaignReducer, ISocialNetworkPlacement } from 'apps/campaigns/interfaces/campaign';
import { IFormTarget, IClassNames } from 'interfaces';
import { getLocalString } from 'utils/localization';
import { isMoneyValue } from 'utils/number';
import { IUserReducer } from 'apps/users/interfaces/user';
import * as CampaignFormActions from 'apps/campaigns/actions/CampaignFormActions';
import styles from './style.css';

interface ICampaignPlatformProps {
  id: string;
  campaign: ICampaignReducer;
  campaignForm: ICampaignFormReducer;
  CampaignFormActions: ICampaignFormActions;
  className?: string;
  classNamesList?: IClassNames;
  onCPMFieldInit?: ({ element, type }) => void;
  onSelect: (selectedSocialNetworks: any) => void;
  user: IUserReducer;
}

class CampaignPlatform extends React.PureComponent<ICampaignPlatformProps> {
  public render() {
    const {
      campaignForm: {
        campaignForm,
        errors,
        placements,
        status,
      },
      className,
      id,
      user: { merchant },
    } = this.props;
    const isProfitCampaign: boolean = !campaignForm.campaign.non_profit.value;
    const socialNetworkPostTypes: ISocialNetworkPlacement[] = campaignForm.campaign.placements.value
      && campaignForm.campaign.placements.value.filter(item => item.social_network === id);
    const feed = socialNetworkPostTypes.filter(item => item.type === 'feed')[0];
    const story = socialNetworkPostTypes.filter(item => item.type === 'story')[0];

    return (
      <div className={classNames(
        styles.campaignPlatform,
        className,
      )}>
        <CampaignPlacementSocialNetwork
          disabled={campaignForm.campaign.placements.nonEditable || status === 'pending'}
          onFeedCheck={formTarget => this.handlePostTypeCheck(formTarget, 'feed')}
          onStoryCheck={formTarget => this.handlePostTypeCheck(formTarget, 'story')}
          socialNetwork={id}
          supportedFeatures={placements && placements[id]}
          value={{
            feed: !!feed,
            story: !!story,
          }} />
        {isProfitCampaign && (
          <div className={styles.formFields}>
            <FormRow>
              <FormRowSection part="half">
                <div className={classNames(
                  styles.formField,
                  !!story && styles.isExpanded,
                )}>
                  {placements && placements[id].story && (
                    <TextField
                      classNamesList={{
                        root: styles.inputRoot,
                      }}
                      disabled={campaignForm.campaign.placements.nonEditable || status === 'pending'}
                      errors={errors[`campaign.placements.${id}.story.price`]}
                      iconAfter={(
                        <Description className={styles.currency}>
                          {merchant && merchant.currency}
                        </Description>
                      )}
                      label={getLocalString('units.money.cpm')}
                      name={`campaign.placements.${id}.story.price`}
                      onInit={element => this.handleInit(element, 'story')}
                      onChange={formTarget => this.updatePlacementPrice(formTarget, 'story')}
                      value={story && story.price.value} />
                  )}
                </div>
              </FormRowSection>
              <FormRowSection part="half">
                <div className={classNames(
                  styles.formField,
                  !!feed && styles.isExpanded,
                )}>
                  {placements && placements[id].feed && (
                    <TextField
                      classNamesList={{
                        root: styles.inputRoot,
                      }}
                      disabled={campaignForm.campaign.placements.nonEditable || status === 'pending'}
                      errors={errors[`campaign.placements.${id}.feed.price`]}
                      iconAfter={(
                        <Description className={styles.currency}>
                          {merchant && merchant.currency}
                        </Description>
                      )}
                      label={getLocalString('units.money.cpm')}
                      name={`campaign.placements.${id}.feed.price`}
                      onInit={element => this.handleInit(element, 'feed')}
                      onChange={formTarget => this.updatePlacementPrice(formTarget, 'feed')}
                      value={feed && feed.price.value} />
                  )}
                </div>
              </FormRowSection>
            </FormRow>
          </div>
        )}
      </div>
    );
  }

  private handleInit = (element: IFormTarget, type: 'feed' | 'story') => {
    const { onCPMFieldInit } = this.props;

    if (onCPMFieldInit) {
      onCPMFieldInit({ element, type });
    }
  }

  private handlePostTypeCheck = (formTarget: IFormTarget, type: string) => {
    const { value } = formTarget;
    const { id: socialNetwork } = this.props;

    this.props.CampaignFormActions.updatePlacementFormField({ socialNetwork, type, value });
  }

  private updatePlacementPrice = (formTarget: IFormTarget, type: string) => {
    const { value } = formTarget;

    if (isMoneyValue(value)) {
      const { id: socialNetwork } = this.props;
      this.props.CampaignFormActions.updatePlacementPrice({ socialNetwork, type, value });
    }
  }
}

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    campaignForm: state.campaignForm,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CampaignFormActions: bindActionCreators(CampaignFormActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignPlatform);
