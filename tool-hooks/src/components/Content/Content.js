import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { ChildrenPropType } from 'types';

const Wrapper = styled.div`
  ${({ theme }) => css`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: ${theme.maxWidth};
    padding: 0 4rem;

    @media (min-height: 736px) {
      padding-top: 3rem;
      padding-bottom: 3rem;
    }
  `}
`;

const Content = ({ children, className }) => (
  <Wrapper className={className}>
    {children}
  </Wrapper>
);

Content.propTypes = {
  children: ChildrenPropType,
  className: PropTypes.string
};

export default Content;
