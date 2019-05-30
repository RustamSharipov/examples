import React from 'react';
import { getLocalData } from 'apps/ui/utils/localization';
import {
  HomePageSection, HomePageSectionTitle, HomePageSectionDescription,
} from 'apps/home/components/HomePageSection';
import { PartnerBrandLogo } from 'apps/home/components/PartnerBrandsLogos';
import PartnerBrandsAnimatedLogos from 'apps/home/components/PartnerBrandsAnimatedLogos';

const brandsList = [
  {
    id: 1,
    image: 'https://mnfst-static.s3.amazonaws.com/merchant/user-landing-brands/idealFlatmateLogo.png',
    name: 'Ideal Flatmate',
  },
  {
    id: 2,
    image: 'https://mnfst-static.s3.amazonaws.com/merchant/user-landing-brands/gettLogo.png',
    name: 'Gett',
  },
  {
    id: 3,
    image: 'https://mnfst-static.s3.amazonaws.com/merchant/user-landing-brands/princesTrustLogo.png',
    name: 'Prince\'s Trust',
  },
  {
    id: 4,
    image: 'https://mnfst-static.s3.amazonaws.com/merchant/user-landing-brands/theBoxBoutiqueLogo.png',
    name: 'The Box Boutique',
  },
  {
    id: 5,
    image: 'https://mnfst-static.s3.amazonaws.com/merchant/user-landing-brands/aspireLogo.png',
    name: 'Aspire',
  },
  {
    id: 6,
    image: 'https://mnfst-static.s3.amazonaws.com/merchant/user-landing-brands/shelterLogo.png',
    name: 'Shelter',
  },
  {
    id: 7,
    image: 'https://mnfst-static.s3.amazonaws.com/merchant/user-landing-brands/annaLogo.png',
    name: 'Anna',
  },
  {
    id: 8,
    image: 'https://mnfst-static.s3.amazonaws.com/merchant/user-landing-brands/theRubzLogo.png',
    name: 'The Rubz',
  },
  {
    id: 9,
    image: 'https://mnfst-static.s3.amazonaws.com/merchant/user-landing-brands/kasaStefczykaLogo.png',
    name: 'Kasa Stefczyka',
  },
  {
    id: 10,
    image: 'https://mnfst-static.s3.amazonaws.com/merchant/user-landing-brands/getTransferLogo.png',
    name: 'Get Transfer',
  },
];

const moreBrandsList = [
  {
    id: 4,
    image: 'https://mnfst-static.s3.amazonaws.com/merchant/user-landing-brands/theBoxBoutiqueLogo.png',
    name: 'The Box Boutique',
  },
  {
    id: 5,
    image: 'https://mnfst-static.s3.amazonaws.com/merchant/user-landing-brands/aspireLogo.png',
    name: 'Aspire',
  },
  {
    id: 7,
    image: 'https://mnfst-static.s3.amazonaws.com/merchant/user-landing-brands/annaLogo.png',
    name: 'Anna',
  },
  {
    id: 6,
    image: 'https://mnfst-static.s3.amazonaws.com/merchant/user-landing-brands/shelterLogo.png',
    name: 'Shelter',
  },
  {
    id: 9,
    image: 'https://mnfst-static.s3.amazonaws.com/merchant/user-landing-brands/kasaStefczykaLogo.png',
    name: 'Kasa Stefczyka',
  },
  {
    id: 8,
    image: 'https://mnfst-static.s3.amazonaws.com/merchant/user-landing-brands/theRubzLogo.png',
    name: 'The Rubz',
  },
  {
    id: 1,
    image: 'https://mnfst-static.s3.amazonaws.com/merchant/user-landing-brands/idealFlatmateLogo.png',
    name: 'Ideal Flatmate',
  },
  {
    id: 10,
    image: 'https://mnfst-static.s3.amazonaws.com/merchant/user-landing-brands/getTransferLogo.png',
    name: 'Get Transfer',
  },
  {
    id: 2,
    image: 'https://mnfst-static.s3.amazonaws.com/merchant/user-landing-brands/gettLogo.png',
    name: 'Gett',
  },
  {
    id: 3,
    image: 'https://mnfst-static.s3.amazonaws.com/merchant/user-landing-brands/princesTrustLogo.png',
    name: 'Prince\'s Trust',
  },
];

const Brands = () => {
  return (
    <HomePageSection>
      <HomePageSectionTitle>
        {getLocalData('pages.userLanding.brands.title')}
      </HomePageSectionTitle>
      <HomePageSectionDescription>
        {getLocalData('pages.userLanding.brands.description')}
      </HomePageSectionDescription>
      <PartnerBrandsAnimatedLogos
        itemShiftDuration={15}
        directionRight={true}>
        {brandsList.map(brand => (
          <PartnerBrandLogo
            key={brand.id}
            image={brand.image}
            name={brand.name} />
        ))}
      </PartnerBrandsAnimatedLogos>
      <PartnerBrandsAnimatedLogos
        itemShiftDuration={15}
        directionRight={true}
        itemOffset={50}>
        {moreBrandsList.map(brand => (
          <PartnerBrandLogo
            key={brand.id}
            image={brand.image}
            name={brand.name} />
        ))}
      </PartnerBrandsAnimatedLogos>
    </HomePageSection>
  );
};

export default Brands;
