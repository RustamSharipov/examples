import React from 'react';
import { Navigation, NavigationItem } from 'apps/ui/components/Navigation';
import { MNFST_EXTERNAL_LINKS } from 'apps/ui/constants/base';
import { getLocalData } from 'apps/ui/utils/localization';

interface IExternalNavigationProps {
  className?: string;
  currentPage: string;
}

const externalNavigationItems = [
  {
    id: 1,
    href: MNFST_EXTERNAL_LINKS.USER_LANDING,
    name: 'user',
    getTitle: () => getLocalData('externalLinks.influencers'),
  },
  {
    id: 2,
    href: MNFST_EXTERNAL_LINKS.BUSINESS_LANDING,
    name: 'business',
    getTitle: () => getLocalData('externalLinks.business'),
  },
  {
    id: 3,
    href: MNFST_EXTERNAL_LINKS.CAREERS,
    name: 'careers',
    getTitle: () => getLocalData('externalLinks.careers'),
  },
];

const ExternalNavigation: React.SFC<IExternalNavigationProps> = (props) => {
  const { className, currentPage } = props;

  return (
    <Navigation className={className}>
      {[
        externalNavigationItems.filter(item => item.name === currentPage)[0],
        ...externalNavigationItems.filter(item => item.name !== currentPage),
      ].map(item => (
        <NavigationItem
          key={item.id}
          href={item.href}
          isActive={currentPage === item.name}
          isHighlighted={true}>
          {item.getTitle()}
        </NavigationItem>
      ))}
    </Navigation>
  );
};

export default ExternalNavigation;
