import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DropdownSuggestionsField from 'apps/campaigns/components/DropdownSuggestionsField';
import { FormRowSection, FormRow } from 'apps/ui/components/Form';
import { ICampaignFormReducer, ICampaignFormActions } from 'apps/campaigns/interfaces/campaignForm';
import {
  ICampaignGeoTargetingActions, ICampaignsGeoTargetingReducer, IGeoTarget,
} from 'apps/campaigns/interfaces/campaignGeoTargeting';
import { IUserReducer } from 'apps/users/interfaces/user';
import { GEOTARGETING_DEFAULT_MAP_CENTER } from 'constants/geoTargeting';
import { IElementEventTarget } from 'interfaces';
import { GeoLocationCoordiantes } from 'apps/ui/types/geoTargeting';
import * as CampaignFormActions from 'apps/campaigns/actions/CampaignFormActions';
import * as CampaignGeoTargetingActions from 'apps/campaigns/actions/CampaignGeoTargetingActions';
import { getLocalData } from 'apps/ui/utils/localization';
import GeoTargetingMap from './GeoTargetingMap';
import { GeoTargetItem, GeoTargets } from './GeoTargets';
import TargetNestingWarningDialog from './TargetNestingWarningDialog';
import styles from './style.css';

interface IGeoTargetingProps {
  campaignForm: ICampaignFormReducer;
  campaignGeoTargeting: ICampaignsGeoTargetingReducer;
  CampaignFormActions: ICampaignFormActions;
  CampaignGeoTargetingActions: ICampaignGeoTargetingActions;
  user: IUserReducer;
}

interface IGeoTargetingState {
  centeringCoordinates: GeoLocationCoordiantes;
  centeringCountryCode: string | null;
  geoTargetQuery: string | null;
}

class GeoTargeting extends React.Component<IGeoTargetingProps, IGeoTargetingState> {
  // we need a constructor here because of the ts issue
  // https://github.com/Microsoft/TypeScript/issues/11498#issuecomment-348857890
  constructor(props: IGeoTargetingProps) {
    super(props);
    this.state = {
      centeringCoordinates: GEOTARGETING_DEFAULT_MAP_CENTER,
      centeringCountryCode: null,
      geoTargetQuery: null,
    };
  }

  public componentDidMount() {
    const { geo_targets } = this.props.campaignForm.campaignForm.campaign;
    const countryTargetsList: IGeoTarget[] = geo_targets.value.filter(geoTarget => geoTarget.kind === 'country');

    if (countryTargetsList.length === 1) {
      const centeringCountryCode = countryTargetsList[0].country_code;

      if (centeringCountryCode) {
        this.setState({ centeringCountryCode });
      }
    }
  }

  public render() {
    const {
      campaignForm: {
        campaignForm,
        currentGeoTarget,
        dialogType,
      },
      campaignGeoTargeting: {
        suggestedGeoTargetsList,
      },
    } = this.props;
    const {
      centeringCoordinates,
      centeringCountryCode,
    } = this.state;

    return (
      <FormRow>
        <FormRowSection className={styles.geoTargetingLocations}>
          <div className={styles.locations}>
            <div className={styles.suggestions}>
              <DropdownSuggestionsField
                disabled={campaignForm.campaign.geo_targets.nonEditable}
                items={
                  suggestedGeoTargetsList.map(geoTarget => ({
                    name: geoTarget.name,
                    value: geoTarget,
                  }))
                }
                label={getLocalData('pages.campaigns.create.targeting.locationQuery')}
                name="geoTargets"
                onChange={this.handleGeoTargetQuery}
                onSelect={this.handleGeoTargetSuggestionSelect} />
            </div>
            <GeoTargets>
              {campaignForm.campaign.geo_targets.value.map((geoTarget, index) => (
                <GeoTargetItem
                  key={index}
                  id={geoTarget.id}
                  countryCode={geoTarget.country_code}
                  isEditable={!campaignForm.campaign.geo_targets.nonEditable}
                  kind={geoTarget.kind}
                  lat={geoTarget.lat}
                  lng={geoTarget.lng}
                  name={geoTarget.name}
                  onClick={this.handleGeoTargetItemClick}
                  onRadiusChange={this.handlePointRadiusChange}
                  onRemove={this.handleLocationItemRemove}
                  radius={geoTarget.radius} />
              ))}
            </GeoTargets>
          </div>
        </FormRowSection>
        <FormRowSection part="two-thirds">
          <GeoTargetingMap
            disabled={campaignForm.campaign.geo_targets.nonEditable}
            centeringCoordinates={centeringCoordinates}
            centeringCountryCode={centeringCountryCode}
            onGeoTargetAdd={this.handleGeoTargetAdd}
            onMapCentering={this.handleMapCentering}
            onPointLocationChange={this.handlePointLocationChange}
            points={
              campaignForm.campaign.geo_targets.value.map(geoTarget => ({
                ...geoTarget,
                id: String(geoTarget.id),
              }))
            } />
        </FormRowSection>
        {currentGeoTarget && (
          <TargetNestingWarningDialog
            geoTarget={currentGeoTarget}
            isOpen={!!(dialogType && dialogType === 'targetNestingWarning')}
            onApply={this.handleTargetNestingWarningApply}
            onClose={this.closeTargetNestingWarningDialog} />
        )}
      </FormRow>
    );
  }

  private handleGeoTargetQuery = (query: string) => {
    if (query) {
      this.props.CampaignGeoTargetingActions.fetchGeoTargetsSuggestions({ query });
    }
  }

  private handleGeoTargetSuggestionSelect = (formTarget: IElementEventTarget<IGeoTarget>) => {
    const { value } = formTarget;

    if (value) {
      this.selectGeoTarget(value, true);
    }
  }

  private handleLocationItemRemove = (id: string) => {
    this.props.CampaignFormActions.removeGeoTargets({ ids: [id] });
  }

  private handlePointRadiusChange = (id: string, radius: number) => {
    this.props.CampaignFormActions.updateGeoTarget({ id, radius });
  }

  private handlePointLocationChange = (geoTarget: IGeoTarget) => {
    const { id, lat, lng, name } = geoTarget;

    if (id) {
      this.props.CampaignFormActions.updateGeoTarget({ id, lat, lng, name });
    }
  }

  private handleGeoTargetItemClick = (id: string) => {
    const geoTarget = this.props.campaignForm.campaignForm.campaign.geo_targets.value
      .filter(geoTarget => geoTarget.id === id)[0];

    if (geoTarget) {
      if (geoTarget.kind === 'circle') {
        this.setState({
          centeringCoordinates: [geoTarget.lng, geoTarget.lat],
        });
      }

      if (geoTarget.kind === 'country') {
        this.setState({
          centeringCountryCode: geoTarget.country_code,
        });
      }
    }
  }

  private handleMapCentering = () => {
    this.setState({ centeringCountryCode: null });
  }

  private handleGeoTargetAdd = (geoTarget: IGeoTarget) => {
    this.selectGeoTarget(geoTarget);
  }

  private handleTargetNestingWarningApply = () => {
    const { currentGeoTarget } = this.props.campaignForm;

    if (currentGeoTarget) {
      if (currentGeoTarget.kind === 'circle') {
        const countryPoint = this.props.campaignForm.campaignForm.campaign.geo_targets.value.filter(
          geoTarget => geoTarget.kind === 'country' && geoTarget.country_code === currentGeoTarget.country_code,
        )[0];

        if (countryPoint) {
          this.props.CampaignFormActions.removeGeoTargets({
            ids: [countryPoint.id],
          });
        }
      }

      if (currentGeoTarget.kind === 'country') {
        const nestedPoints = this.props.campaignForm.campaignForm.campaign.geo_targets.value.filter(
          geoTarget => geoTarget.kind === 'circle' && geoTarget.country_code === currentGeoTarget.country_code,
        );

        if (nestedPoints.length > 0) {
          this.props.CampaignFormActions.removeGeoTargets({
            ids: nestedPoints.map(point => point.id),
          });
        }
      }

      this.selectGeoTarget(currentGeoTarget);
      this.setState({
        centeringCountryCode: currentGeoTarget.country_code || null,
      });
    }

    this.closeTargetNestingWarningDialog();
  }

  private closeTargetNestingWarningDialog = () => {
    this.props.CampaignFormActions.closeDialog();
  }

  private selectGeoTarget = (geoTarget: IGeoTarget, isCurrentTargetSuggestion?: boolean) => {
    const { isCurrentGeoTargetNeedUpdate } = this.props.campaignForm;

    // Geo target is unique
    if (
      this.props.campaignForm.campaignForm.campaign.geo_targets.value
        .filter(geoTargetItem => geoTarget.kind === 'country'
          ? geoTargetItem.kind === 'country' && geoTargetItem.country_code === geoTarget.country_code
          : geoTargetItem.lng === geoTarget.lng && geoTargetItem.lat === geoTarget.lat,
        )
        .length === 0
    ) {
      if (isCurrentGeoTargetNeedUpdate) {
        const { id, lat, lng } = geoTarget;

        if (id) {
          this.props.CampaignFormActions.updateGeoTarget({ id, lat, lng });
        }
      }

      else {
        if (isCurrentTargetSuggestion) {
          this.props.CampaignGeoTargetingActions.selectGeoTargetSuggestion(geoTarget);
        }
        else {
          this.props.CampaignFormActions.addGeoTarget({ geoTarget });
        }
      }
    }

    // Geo target is exist
    else {
      this.setState({
        centeringCoordinates: [
          geoTarget.lng as number,
          geoTarget.lat as number,
        ],
      });
    }
  }
}

function mapStateToProps(state) {
  return {
    campaignForm: state.campaignForm,
    campaignGeoTargeting: state.campaignGeoTargeting,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CampaignFormActions: bindActionCreators(CampaignFormActions, dispatch),
    CampaignGeoTargetingActions: bindActionCreators(CampaignGeoTargetingActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GeoTargeting);
