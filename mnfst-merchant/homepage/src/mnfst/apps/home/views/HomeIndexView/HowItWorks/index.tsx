import React from 'react';
import {
  HomePageSection, HomePageSectionContent, HomePageSectionTitle, HomePageSectionDescription,
} from 'apps/home/components/HomePageSection';
import { getLocalData } from 'apps/ui/utils/localization';
import { StepCard, StepCards } from './StepCards';
import createStep from './images/createStep.svg';
import getPaidStep from './images/getPaidStep.svg';
import postStep from './images/postStep.svg';
import { IElementNode } from 'apps/ui/interfaces/elementNode';

const REVEAL_THRESHOLD_FACTOR: number = 0.125;

interface IStepCard {
  id: number;
  getDescription: () => string;
  getTitle: () => string;
  image: string;
  isRevealed: boolean;
  top: number;
  theme: string;
}

interface IHowItWorksProps {
  id?: string;
  onRef?: ({ id: string, elementNode: IElementNode }) => void;
}

interface IHowItWorksState {
  stepCards: IStepCard[];
}

class HowItWorks extends React.Component<IHowItWorksProps, IHowItWorksState> {
  public state = {
    stepCards: [
      {
        id: 1,
        getDescription: () => getLocalData('pages.userLanding.howItWorks.create.description'),
        getTitle: () => getLocalData('pages.userLanding.howItWorks.create.title'),
        image: createStep,
        isRevealed: false,
        theme: 'blue',
        top: 0,
      },
      {
        id: 2,
        getDescription: () => getLocalData('pages.userLanding.howItWorks.post.description'),
        getTitle: () => getLocalData('pages.userLanding.howItWorks.post.title'),
        image: postStep,
        isRevealed: false,
        theme: 'pink',
        top: 0,
      },
      {
        id: 3,
        getDescription: () => getLocalData('pages.userLanding.howItWorks.getPaid.description'),
        getTitle: () => getLocalData('pages.userLanding.howItWorks.getPaid.title'),
        image: getPaidStep,
        isRevealed: false,
        theme: 'green',
        top: 0,
      },
    ],
  };

  public componentDidMount() {
    window.addEventListener('scroll', this.handleWindowScroll);
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.handleWindowScroll);
  }

  public render() {
    const { stepCards } = this.state;

    return (
      <HomePageSection onRef={this.handleRef}>
        <HomePageSectionTitle>
          {getLocalData('pages.userLanding.howItWorks.title')}
        </HomePageSectionTitle>
        <HomePageSectionDescription>
          {getLocalData('pages.userLanding.howItWorks.description')}
        </HomePageSectionDescription>
        <HomePageSectionContent>
          <StepCards>
            {stepCards.map(stepCard => (
              <StepCard
                key={stepCard.id}
                id={stepCard.id}
                isRevealed={stepCard.isRevealed}
                description={stepCard.getDescription()}
                onRef={this.handleStepCardRef}
                title={stepCard.getTitle()}
                {...stepCard} />
            ))}
          </StepCards>
        </HomePageSectionContent>
      </HomePageSection>
    );
  }

  private handleRef = (elementNode: IElementNode) => {
    const { id, onRef } = this.props;

    if (onRef) {
      onRef({ id, elementNode });
    }
  }

  private handleStepCardRef = (params) => {
    const {
      id,
      elementNode: { top },
    } = params;

    this.setState(state => ({
      stepCards: state.stepCards.map(item => ({
        ...item,
        top: item.id === id ? top : item.top,
      })),
    }));
  }

  private handleWindowScroll = () => {
    const { innerHeight, scrollY } = window;
    const { stepCards } = this.state;

    stepCards.forEach((stepCard) => {
      if (!stepCard.isRevealed) {
        this.setState(state => ({
          stepCards: state.stepCards.map((stepCard, index) => {
            const stepCardThreshold = innerHeight * REVEAL_THRESHOLD_FACTOR * (index + 1);

            return {
              ...stepCard,
              isRevealed: stepCard.top + stepCardThreshold <= innerHeight + scrollY,
            };
          }),
        }));
      }
    });
  }
}

export default HowItWorks;
