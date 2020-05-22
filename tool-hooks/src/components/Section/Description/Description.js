import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { ChildrenPropType } from 'types';

const Wrapper = styled.div`
  ${({ theme }) => css`
    margin: 1.5rem 0;
    color: ${theme.colors.text.primary};
    font-size: 2rem;
    line-height: 1.4em;
  `}
`;

const Description = ({ className, children }) => {
  return (
    <Wrapper className={className}>
      {children}
    </Wrapper>
  );
};

Description.propTypes = {
  className: PropTypes.string,
  children: ChildrenPropType.isRequired,
};

export default Description;
