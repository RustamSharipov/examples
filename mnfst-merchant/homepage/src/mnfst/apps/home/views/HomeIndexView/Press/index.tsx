import React from 'react';
import { getLocalData } from 'apps/ui/utils/localization';
import {
  HomePageSection, HomePageSectionTitle,
} from 'apps/home/components/HomePageSection';
import { PartnerBrandLogo, PartnerBrandsLogos } from 'apps/home/components/PartnerBrandsLogos';
import logo1 from './images/logo1.png';
import logo2 from './images/logo2.png';
import logo3 from './images/logo3.png';

{/* tslint:disable:max-line-length */}
const pressList = [
  {
    id: 1,
    image: logo1,
    name: 'Grid Daily',
    link: 'https://gritdaily.com/mnfst-launches-its-micro-influencer-platform-to-help-everyone-leverage-their-communities/',
  },
  {
    id: 2,
    image: logo2,
    name: 'Mobile Marketing',
    link: 'https://www.mobilemarketingmagazine.com/is-the-influencer-marketing-opportunity-bigger-than-thought-for-mobile-marketers-',
  },
  {
    id: 3,
    image: logo3,
    name: 'Echo',
    link: 'https://www.liverpoolecho.co.uk/news/uk-world-news/simple-way-your-instagram-account-16286357',
  },
];
{/* tslint:enable:max-line-length */}

const Press = () => {
  return (
    <HomePageSection>
      <HomePageSectionTitle>
        {getLocalData('pages.userLanding.press.title')}
      </HomePageSectionTitle>
      <PartnerBrandsLogos>
        {pressList.map(press => (
          <PartnerBrandLogo
            key={press.id}
            image={press.image}
            name={press.name}
            link={press.link} />
        ))}
      </PartnerBrandsLogos>
    </HomePageSection>
  );
};

export default Press;
