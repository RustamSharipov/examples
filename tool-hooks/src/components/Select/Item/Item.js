import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { ChildrenPropType } from 'types';

const Wrapper = styled.li`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    padding: 2rem 2.5rem;
    font-size: 2rem;
    cursor: pointer;

    :hover {
      background-color: ${theme.colors.passive.light};
    }
  `}
`;

const Item = ({ className, value, children, onClick }) => {
  const handleClick = () => {
    onClick(value);
  };

  return (
    <Wrapper
      className={className}
      onClick={handleClick}
    >
      {children}
    </Wrapper>
  );
};

Item.propTypes = {
  className: PropTypes.string,
  children: ChildrenPropType.isRequired,
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Item;
