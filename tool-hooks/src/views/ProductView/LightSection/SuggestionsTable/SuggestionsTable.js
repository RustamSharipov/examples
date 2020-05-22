import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { Suggestions, Section } from 'components';

const Wrapper = styled.div`
  margin-top: 4rem;

  @media (min-width: 768px) {
    margin-top: 8rem;
  }
`;

const RecommendationsSuggestions = styled(Suggestions)`
  position: relative;
  left: -2rem;
  width: calc(100% + 4rem);
  margin-top: 1rem;

  @media (min-width: 768px) {
    left: -0.5rem;
    width: calc(100% + 1rem);
  }
`;

const Suggestion = styled(Suggestions.Item)``;

const SuggestionsTable = ({
  className,
  shutterSpeed,
  iso,
  fStop,
  t,
}) => (
  <Wrapper className={className}>
    <Section.Title>
      {t('Product.Recomended.Title')}
    </Section.Title>

    <RecommendationsSuggestions>
      {iso && (
        <Suggestion
          label={t('Product.Recomended.ISO')}
          value={iso}
        />
      )}

      {shutterSpeed && (
        <Suggestion
          label={t('Product.Recomended.Shutter')}
          value={shutterSpeed}
        />
      )}

      {fStop && (
        <Suggestion
          label={t('Product.Recomended.FStop')}
          value={fStop}
        />
      )}
    </RecommendationsSuggestions>
  </Wrapper>
);

SuggestionsTable.propTypes = {
  className: PropTypes.string,
  shutterSpeed: PropTypes.string,
  fStop: PropTypes.number,
  iso: PropTypes.number,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(SuggestionsTable);
