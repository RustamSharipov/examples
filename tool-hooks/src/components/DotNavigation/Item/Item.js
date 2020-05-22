import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  ${({ isActive, theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    cursor: pointer;

    ::after {
      content: "";
      width: 1rem;
      height: 1rem;
      background: ${theme.colors.text.passive};
      border-radius: 100%;
    }

    ${isActive && css`
      cursor: default;

      ::after {
        background: ${theme.colors.text.active};
      }
    `}
  `}
`;

const Item = ({ className, value, onClick, isActive }) => {
  return (
    <Wrapper
      className={className}
      isActive={isActive}
      onClick={() => onClick(value)}
    />
  );
};

Item.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Item;
