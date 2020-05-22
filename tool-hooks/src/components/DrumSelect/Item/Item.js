import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ChildrenPropType } from 'types';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 6.5rem;
  height: 6.5rem;
  border: 1px solid transparent;
  border-radius: 1.5rem;
  cursor: pointer;
  font-size: 2.5rem;
  line-height: 6.5rem;
`;

const Item = ({ className, label, value, onClick }) => (
  <Wrapper
    className={className}
    onClick={() => onClick(value)}
  >
    {label}
  </Wrapper>
);

Item.propTypes = {
  className: PropTypes.string,
  label: ChildrenPropType,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])
};

export default Item;
