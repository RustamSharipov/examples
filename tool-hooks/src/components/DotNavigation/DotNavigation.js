import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Item } from '.';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2rem;
`;

const DotNavigation = ({ className, items, onChange, value }) => {
  return (
    <Wrapper className={className}>
      {items.map((item, index) => (
        <Item
          key={index}
          isActive={item.value === value}
          value={item.value}
          onClick={onChange}
        />
      ))}
    </Wrapper>
  );
};

DotNavigation.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
  })),
  value: PropTypes.string,
};

export default DotNavigation;
