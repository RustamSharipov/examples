import React from 'react';
import { connect } from 'react-redux';
import {
  HomePageSection, HomePageSectionTitle, HomePageSectionDescription,
} from 'apps/home/components/HomePageSection';
import { IHomeReducer } from 'apps/home/interfaces/home';
import { getLocalData } from 'apps/ui/utils/localization';
import { formatMoney } from 'apps/ui/utils/text';
import Creatives from './Creatives';
import styles from './style.css';

interface IEarningsProps {
  home: IHomeReducer;
  lang: string;
}

interface IEarningsState {
  creativeIndex: number;
}

const CURRENCY_CODE = 'USD';

const creativesList = [
  {
    id: 1,
    brand: 'MNFST',
    srcSet: {
      desktop: [
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-creatives/mnfstAhmedCreative-desktop.jpg',
      ],
      mobile: [
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-creatives/mnfstAhmedCreative-mobile.jpg',
      ],
    },
    getName: () => getLocalData('pages.userLanding.creatives.influencers.ahmed'),
    getTitle: () => getLocalData('pages.userLanding.creatives.titles.mnfst'),
    price: {
      value: 400,
      currency_code: CURRENCY_CODE,
    },
    type: 'image',
  },
  {
    id: 2,
    brand: 'Gett',
    gender: 'male',
    srcSet: {
      desktop: [
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-creatives/gettRajCreative-desktop.jpg',
      ],
      mobile: [
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-creatives/gettRajCreative-mobile.jpg',
      ],
    },
    getName: () => getLocalData('pages.userLanding.creatives.influencers.raj'),
    getTitle: () => getLocalData('pages.userLanding.creatives.titles.gett1'),
    price: {
      value: 1200,
      currency_code: CURRENCY_CODE,
    },
    type: 'image',
  },
  {
    id: 3,
    brand: 'Gift of Life',
    srcSet: {
      desktop: [
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-creatives/giftOfLifeJessicaCreative'
        + '-desktop.webm',
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-creatives/giftOfLifeJessicaCreative'
        + '-desktop.mp4',
      ],
      mobile: [
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-creatives/giftOfLifeJessicaCreative'
        + '-mobile.webm',
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-creatives/giftOfLifeJessicaCreative'
        + '-mobile.mp4',
      ],
    },
    getName: () => getLocalData('pages.userLanding.creatives.influencers.jessica'),
    getTitle: () => getLocalData('pages.userLanding.creatives.titles.giftOfLife'),
    type: 'video',
  },
  {
    id: 4,
    brand: 'Ideal Flatmate',
    srcSet: {
      desktop: [
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-creatives/idealFlatmateJessicaCreative'
        + '-desktop.jpg',
      ],
      mobile: [
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-creatives/idealFlatmateJessicaCreative'
        + '-mobile.jpg',
      ],
    },
    getName: () => getLocalData('pages.userLanding.creatives.influencers.jessica'),
    getTitle: () => getLocalData('pages.userLanding.creatives.titles.idealFlatmate'),
    price: {
      value: 500,
      currency_code: CURRENCY_CODE,
    },
    type: 'image',
  },
  {
    id: 5,
    brand: 'Gett',
    srcSet: {
      desktop: [
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-creatives/gettTomekCreative-desktop.webm',
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-creatives/gettTomekCreative-desktop.mp4',
      ],
      mobile: [
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-creatives/gettTomekCreative-mobile.webm',
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-creatives/gettTomekCreative-mobile.mp4',
      ],
    },
    getName: () => getLocalData('pages.userLanding.creatives.influencers.tomek'),
    getTitle: () => getLocalData('pages.userLanding.creatives.titles.gett2'),
    price: {
      value: 800,
      currency_code: CURRENCY_CODE,
    },
    type: 'video',
  },
  {
    id: 6,
    brand: 'Me Too',
    srcSet: {
      desktop: [
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-creatives/meTooMiaCreative-desktop.jpg',
      ],
      mobile: [
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-creatives/meTooMiaCreative-mobile.jpg',
      ],
    },
    getName: () => getLocalData('pages.userLanding.creatives.influencers.mia'),
    getTitle: () => getLocalData('pages.userLanding.creatives.titles.meToo'),
    type: 'image',
  },
  {
    id: 7,
    brand: 'Palace to Palace',
    srcSet: {
      desktop: [
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-creatives/beyoncePalaceToPalaceCreative'
        + '-desktop.webm',
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-creatives/beyoncePalaceToPalaceCreative'
        + '-desktop.mp4',
      ],
      mobile: [
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-creatives/beyoncePalaceToPalaceCreative'
        + '-mobile.webm',
        'https://mnfst-static.s3.amazonaws.com/user-landing/user-landing-creatives/beyoncePalaceToPalaceCreative'
        + '-mobile.mp4',
      ],
    },
    getName: () => getLocalData('pages.userLanding.creatives.influencers.beyonce'),
    getTitle: () => getLocalData('pages.userLanding.creatives.titles.palaceToPalace'),
    type: 'video',
  },
];

class Earnings extends React.Component<IEarningsProps, IEarningsState> {
  public state = {
    creativeIndex: 1,
  };

  public render() {
    const {
      home: {
        home: {
          total_earn,
        },
      },
      lang,
    } = this.props;
    const { creativeIndex } = this.state;
    const totalEarnAmount = total_earn && formatMoney(
      Math.floor(total_earn.value / 100) * 100, // to remove cents
      total_earn.currency_code,
    );
    const activeCreative = creativesList.filter((creative, index) => index === creativeIndex)[0];
    const description = activeCreative.getTitle();

    if (lang) {
      return (
        <HomePageSection>
          <HomePageSectionTitle>
            <span
              dangerouslySetInnerHTML={{ __html: getLocalData('pages.userLanding.creatives.title', {
                placeholders: {
                  amount: totalEarnAmount,
                },
              })}} />
          </HomePageSectionTitle>
          <HomePageSectionDescription className={styles.description}>
            {description}
          </HomePageSectionDescription>
          <Creatives
            creativesList={creativesList.map(creative => ({
              ...creative,
              name: creative.getName(),
            }))}
            onCreativeChange={this.handleCreativeChange} />
        </HomePageSection>
      );
    }

    return null;
  }

  private handleCreativeChange = (params) => {
    const { creativeIndex } = params;
    this.setState({ creativeIndex });
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

export default connect(mapStateToProps)(Earnings);
