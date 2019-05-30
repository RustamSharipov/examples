import React from 'react';
import classNames from 'classnames';
import { Accordion, AccordionItem } from 'apps/ui/components/Accordion';
import styles from './style.css';
import QuestionCircleIcon from 'apps/ui/components/icons/QuestionCircleIcon';
import ChevronIcon from 'apps/ui/components/icons/ChevronIcon';

interface IQNAItemEventParams {
  id: number;
}

interface IQNAItemProps {
  answer: string[];
  className?: string;
  id: number;
  isExpanded: boolean;
  onClick: (params: IQNAItemEventParams) => void;
  question: string;
}

interface IQNAListProps {
  children: React.ReactNode;
}

export class QNAItem extends React.Component<IQNAItemProps> {
  public render() {
    const { answer, className, id, isExpanded, question } = this.props;

    return (
      <AccordionItem
        className={classNames(
          styles.qnaItem,
          className,
        )}
        classNamesMap={{
          content: styles.qnaItemContent,
          title: styles.qnaItemTitle,
        }}
        content={(
          <div className={styles.qnaItemContentInner}>
            {answer.map((item, index) => (
              <p
                key={index}
                className={styles.p}>{item}</p>
            ))}
          </div>
        )}
        id={id}
        isExpanded={isExpanded}
        onTitleClick={this.handleClick}
        title={(
          <div className={classNames(
            styles.qnaItemTitle,
            isExpanded && styles.isExpanded,
          )}>
            <QuestionCircleIcon className={styles.qnaItemTitleIcon} />
            <div className={styles.qnaItemTitleText}>
              {question}
            </div>
            <ChevronIcon
              className={styles.qnaItemTitleChevron}
              direction={isExpanded ? 'top' : 'bottom'} />
          </div>
        )} />
    );
  }

  private handleClick = (params) => {
    const { id } = params;
    const { onClick } = this.props;

    if (onClick) {
      onClick({ id });
    }
  }
}

export const QNAList: React.SFC<IQNAListProps> = (props) => {
  const { children } = props;

  return (
    <Accordion className={styles.qnaList}>
      {children}
    </Accordion>
  );
};
