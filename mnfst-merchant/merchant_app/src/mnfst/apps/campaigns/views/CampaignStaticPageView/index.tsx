import React from 'react';
import { withRouter } from 'react-router-dom';
import { Page, PageHeader, PageContent } from 'apps/ui/components/Page';
import Title from 'apps/ui/components/Title';
import BackControl from 'apps/ui/components/BackControl';
import { FlexLayout, FlexLayoutChild } from 'apps/ui/components/FlexLayout';
import MerchantStatistic from 'apps/base/components/MerchantStatistic';
import { localizeString } from 'utils/localization';
import { routes } from 'merchant/routes';
import StaticCreativesGuidelines from 'apps/campaigns/components/pages/StaticCreativesGuidelines';
import VideoCreativesGuidelines from 'apps/campaigns/components/pages/VideoCreativesGuidelines';
import { SideNavigation, SideNavigationItem } from 'apps/ui/components/SideNavigation';

interface ICampaignStaticPageViewProps {
  history: any;
  match: any;
}

interface ICampaignStaticPageViewState {
  navigation: any[];
  navigationTopOffset: number;
}

class CampaignStaticPageView extends React.Component<ICampaignStaticPageViewProps, ICampaignStaticPageViewState> {
  public navigationAbsoluteTopPosition: number | null;

  constructor(props) {
    super(props);
    this.navigationAbsoluteTopPosition = 0;

    this.state = {
      navigation: [],
      navigationTopOffset: 0,
    };
  }

  public componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    this.navigationAbsoluteTopPosition = null;
  }

  public render() {
    const { match: { params: { slug } } } = this.props;
    const { navigation, navigationTopOffset } = this.state;
    const navigationStyles = {
      top: navigationTopOffset,
    };
    let Component;
    let pageTitle;

    if (slug === 'static-creatives-guidelines') {
      Component = <StaticCreativesGuidelines onTitleInit={this.handleTitleInit} />;
      pageTitle = 'Static creative guidelines';
    }
    if (slug === 'video-creatives-guidelines') {
      Component = <VideoCreativesGuidelines onTitleInit={this.handleTitleInit} />;
      pageTitle = 'Video creative guidelines';
    }

    return (
      <Page>
        <PageHeader>
          <FlexLayout
            alignItems="flex-end"
            justifyContent="space-between">
            <FlexLayoutChild>
              <BackControl link={routes.campaigns.path}>
                {localizeString('Back to Campaigns')}
              </BackControl>
              <Title level="1">
                {pageTitle}
              </Title>
            </FlexLayoutChild>
            <FlexLayoutChild>
              <MerchantStatistic />
            </FlexLayoutChild>
          </FlexLayout>
        </PageHeader>
        <FlexLayout>
          <FlexLayoutChild className="grid-columns-9">
            <PageContent>
              {Component}
            </PageContent>
          </FlexLayoutChild>
          <FlexLayoutChild className="grid-columns-3">
            <SideNavigation
              onInit={this.handleNavigationInit}
              style={navigationStyles}>
              {navigation.map((item, index) => (
                <SideNavigationItem
                  key={index}
                  isActive={item.isActive}
                  level={item.level}
                  onClick={() => this.handleNavigationItemClick(index)}>
                  {item.name}
                </SideNavigationItem>
              ))}
            </SideNavigation>
          </FlexLayoutChild>
        </FlexLayout>
      </Page>
    );
  }

  private handleTitleInit = (params: any) => {
    const { element, level, text } = params;

    this.setState(state => ({
      navigation: [
        ...state.navigation,
        {
          level,
          isActive: state.navigation.length === 0,
          name: text,
          topOffset: element.getBoundingClientRect().top,
        },
      ],
    }));
  }

  private handleScroll = () => {
    if (this.navigationAbsoluteTopPosition) {
      const navigationTopOffset = window.pageYOffset > this.navigationAbsoluteTopPosition
        ? window.pageYOffset - this.navigationAbsoluteTopPosition
        : 0;

      const navigation = this.state.navigation.map((navItem, index, navItems) => {
        const nextNavItem = navItems[index + 1];
        const nextSameLevelNavItem = index < navItems.length - 1
          && navItems.filter((item, i) => item.level === navItem.level && i > index)[0];

        return {
          ...navItem,
          isActive:
            navItem.topOffset <= window.pageYOffset && nextNavItem && nextNavItem.topOffset > window.pageYOffset
            || navItem.topOffset <= window.pageYOffset && !nextNavItem
            || (this.navigationAbsoluteTopPosition || 0) > window.pageYOffset && index === 0
            || navItem.level === 1 && navItem.topOffset <= window.pageYOffset && nextNavItem.level === 2
              && nextSameLevelNavItem.topOffset > window.pageYOffset,
        };
      });

      this.setState({
        navigation,
        navigationTopOffset,
      });
    }
  }

  private handleNavigationInit = (element: HTMLElement) => {
    if (element) {
      this.navigationAbsoluteTopPosition = element.getBoundingClientRect().top || 0;
    }
  }

  private handleNavigationItemClick(id: number) {
    const navItem = this.state.navigation[id];
    window.scroll({
      behavior: 'smooth',
      top: navItem.topOffset,
    });
  }
}

export default withRouter(CampaignStaticPageView);
