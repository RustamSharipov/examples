import React from 'react';
import TagManager from 'react-gtm-module';
import {
  HomePageSection, HomePageSectionTitle, HomePageSectionContent,
} from 'apps/home/components/HomePageSection';
import { QNAItem, QNAList } from 'apps/home/components/QNAList';
import { IElementNode } from 'apps/ui/interfaces/elementNode';
import { getLocalData } from 'apps/ui/utils/localization';
import { GTM_EVENTS } from 'constants/tracking';

interface IQNAItem {
  id: number;
  answer: string[];
  question: string;
}

interface IQNAProps {
  id?: string;
  onRef?: ({ id: string, elementNode: IElementNode }) => void;
}

interface IQNAState {
  expandedItems: number[];
}

class QNA extends React.Component<IQNAProps, IQNAState> {
  public state = {
    expandedItems: [0],
  };

  public render() {
    const { expandedItems } = this.state;
    const qnaList: IQNAItem[] = getLocalData('pages.userLanding.qna.items').map((item: IQNAItem, index: number) => ({
      ...item,
      id: index + 1,
    }));

    return (
      <HomePageSection onRef={this.handleRef}>
        <HomePageSectionTitle>
          {getLocalData('pages.userLanding.qna.title')}
        </HomePageSectionTitle>
        <HomePageSectionContent>
          {qnaList && (
            <QNAList>
              {qnaList.map(qnaItem => (
                <QNAItem
                  key={qnaItem.id}
                  answer={qnaItem.answer}
                  id={qnaItem.id}
                  isExpanded={expandedItems.includes(qnaItem.id)}
                  onClick={this.handleItemClick}
                  question={qnaItem.question} />
              ))}
            </QNAList>
          )}
          {/* <div
            className={styles.links}
            dangerouslySetInnerHTML={{
              __html: getLocalData('pages.userLanding.qna.links.seeMore', {
                placeholders: {
                  url: MNFST_EXTERNAL_LINKS.FAQ,
                },
              }),
            }} /> */}
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

  private handleItemClick = (params) => {
    const { id } = params;
    let { expandedItems } = this.state;

    if (expandedItems.includes(id)) {
      expandedItems = expandedItems.filter(item => item !== id);
    }
    else {
      expandedItems.push(id);
    }

    this.setState({ expandedItems });

    const dataLayer = GTM_EVENTS.LANDING.QNA[id];

    if (dataLayer) {
      TagManager.dataLayer({ dataLayer });
    }
  }
}

export default QNA;
