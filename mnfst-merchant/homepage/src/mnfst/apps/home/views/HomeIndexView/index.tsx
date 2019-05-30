import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IHomeReducer, IHomeActions } from 'apps/home/interfaces/home';
import { IUserLocationReducer } from 'apps/ui/interfaces/userLocation';
import * as HomeActions from 'apps/home/actions/HomeActions';
import Brands from './Brands';
import Earnings from './Earnings';
import HowItWorks from './HowItWorks';
import MNFSTApp from './MNFSTApp';
import ProfileValue from './ProfileValue';
import QNA from './QNA';
import Teaser from './Teaser';
import Press from './Press';

interface IHomeIndexViewProps {
  home: IHomeReducer;
  userLocation: IUserLocationReducer;
  HomeActions: IHomeActions;
}

class HomeIndexView extends React.Component<IHomeIndexViewProps> {
  public componentDidMount() {
    this.props.HomeActions.fetchData();
  }

  public render() {
    const {
      userLocation: { lang },
    } = this.props.userLocation;

    return (
      <React.Fragment>
        <Teaser />
        <HowItWorks
          id="how-it-works"
          onRef={this.handleSectionRef} />
        <Earnings lang={lang} />
        <ProfileValue />
        <Brands />
        <Press />
        <QNA
          id="qna"
          onRef={this.handleSectionRef} />
        <MNFSTApp />
      </React.Fragment>
    );
  }

  private handleSectionRef = (params) => {
    const { id, elementNode } = params;
    this.props.HomeActions.addNavigationItem({ id, elementNode });
  }
}

function mapStateToProps(state) {
  return {
    userLocation: state.userLocation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    HomeActions: bindActionCreators(HomeActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeIndexView);
