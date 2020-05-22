import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { Form } from '.';

const Wrapper = styled.div`
  ${({ isExpanded }) => isExpanded && css`
    @media (min-width: 768px) {
      position: relative;
      left: -2rem;
    }
  `}
`;

const FeedbackForm = styled(Form)`
  max-width: 40rem;
  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: initial;
  }
`;

const FeedbackContainer = styled.div`
  ${({ isExpanded }) => css`
    position: relative;
    bottom: -4rem;
    height: 0;
    overflow: hidden;
    opacity: 0;
    transition:
      bottom 0.25s,
      opacity 0.25s;

    ${isExpanded && css`
      bottom: 0;
      height: auto;
      opacity: 1;
    `}
  `}
`;

const Header = styled.div`
  ${({ theme, isCollapsed }) => css`
    position: relative;
    left: -2rem;
    width: calc(100% + 4rem);
    margin-top: 4rem;
    padding: 2rem 0;
    border-top: 1px solid ${theme.colors.passive.secondary};
    color: ${theme.colors.text.secondary};
    cursor: pointer;
    font-size: 2.5rem;
    text-align: center;

    ${isCollapsed && css`
      display: none;
    `}
  `}
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  font-size: 3rem;
  text-align: center;
`;

const Feedback = ({ className, t }) => {
  const [isExpanded, setExpandStatus] = useState(false);
  const [isSent, setSendStatus] = useState(false);

  const handleExpand = () => {
    setExpandStatus(true);
    
    if (window.innerWidth < 768) {
      setTimeout(
        () => {
          feedbackForm.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
        },
        500,
      );
    }
  };

  const handleFeedbackSuccess = () => {
    setSendStatus(true);
  };

  const feedbackForm = useRef();

  return (
    <Wrapper
      className={className}
      isExpanded={isExpanded}
    >
      <Header
        isCollapsed={isExpanded}
        onClick={handleExpand}
      >
        {t('Feedback.Title')}
      </Header>
  
      <FeedbackContainer
        ref={feedbackForm}
        isExpanded={isExpanded}
      >
        {isSent
          ? (
            <Status>
              {t('Feedback.Sent')}
            </Status>
          )
          : <FeedbackForm onSuccess={handleFeedbackSuccess} />
        }
      </FeedbackContainer>
    </Wrapper>
  );
};

Feedback.propTypes = {
  className: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Feedback);
