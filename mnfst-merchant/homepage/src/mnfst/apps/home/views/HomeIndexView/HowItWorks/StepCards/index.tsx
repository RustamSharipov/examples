import React from 'react';
import classNames from 'classnames';
import ComponentContainer from 'apps/ui/components/ComponentContainer';
import Image from 'apps/ui/components/Image';
import styles from './style.css';

interface IStepCardProps {
  id: number;
  description: string;
  image: string;
  isRevealed: boolean;
  onRef?: ({ id: string, elementNode: IElementNode }) => void;
  theme: string;
  title: string;
}

interface IStepCardsProps {
  children: React.ReactNode;
}

const themesClassNames = {
  blue: styles.blueTheme,
  green: styles.greenTheme,
  pink: styles.pinkTheme,
};

export const StepCard: React.SFC<IStepCardProps> = (props) => {
  const { id, description, image, isRevealed, onRef, theme, title } = props;
  const themeClassName = theme && themesClassNames[theme];

  return (
    <ComponentContainer
      className={classNames(
        styles.stepCard,
        isRevealed && styles.isRevealed,
        themeClassName,
      )}
      onRef={elementNode => onRef && onRef({ id, elementNode })}>
      <div className={styles.stepCardPicture}>
        <Image
          alt={title}
          className={styles.stepCardImage}
          src={image}
          width="256"
          height="192" />
      </div>
      <div className={styles.stepCardTitle}>
        {title}
      </div>
      <div
        className={styles.stepCardDescription}
        dangerouslySetInnerHTML={{
          __html: description,
        }} />
    </ComponentContainer>
  );
};

export const StepCards: React.SFC<IStepCardsProps> = (props) => {
  const { children } = props;

  return (
    <div className={styles.stepCards}>
      {children}
    </div>
  );
};
