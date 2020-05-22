import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ChildrenPropType } from 'types';

const Wrapper = styled.div`
  display: table-row;
`;

const Row = ({ className, children }) => (
  <Wrapper className={className}>
    {children}
  </Wrapper>
);

Row.propTypes = {
  className: PropTypes.string,
  children: ChildrenPropType,
};

export default Row;
