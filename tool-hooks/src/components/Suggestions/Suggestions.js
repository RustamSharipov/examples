import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Item } from '.';

import { ChildrenPropType } from 'types';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  left: -1rem;
  width: calc(100% + 1rem);
`;

const Suggestions = ({ className, children }) => (
  <Wrapper className={className}>
    {children}
  </Wrapper>
);

Suggestions.propTypes = {
  className: PropTypes.string,
  children: ChildrenPropType,
};

Suggestions.Item = Item;

export default Suggestions;
