import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ChildrenPropType } from 'types';

const Wrapper = styled.div`
  display: table-cell;
  padding: 1rem 0;
  font-size: 2rem;
  line-height: 1.5em;
`;

const Label = ({ className, children }) => (
  <Wrapper className={className}>
    {children}
  </Wrapper>
);

Label.propTypes = {
  className: PropTypes.string,
  children: ChildrenPropType,
};

export default Label;
