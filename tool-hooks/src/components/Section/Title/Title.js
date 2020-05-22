import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ChildrenPropType } from 'types';

const Wrapper = styled.div`
  margin: 2rem 0 1rem;
  font-size: 4rem;
  font-weight: 600;
`;

const Title = ({ className, children }) => {
  return (
    <Wrapper className={className}>
      {children}
    </Wrapper>
  );
};

Title.propTypes = {
  className: PropTypes.string,
  children: ChildrenPropType.isRequired,
};

export default Title;
