import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ChildrenPropType } from 'types';

const Wrapper = styled.div`
  ${({ disabled, variant, theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 8rem;
    cursor: pointer;
    background: ${theme.colors.passive.primary};
    border: 0;
    border-radius: 2rem;
    font-size: 2.5rem;
    transition:
      background-color 0.25s,
      color 0.25s;

    ${variant === 'success' && css`
      background-color: ${theme.colors.success.active};
      color: ${theme.colors.passive.light};
    `}

    ${disabled && css`
      background-color: ${theme.colors.passive.secondary};
      color: ${theme.colors.text.primary}
      cursor: default;
    `}
  `}
`;

const Button = ({ as, className, children, disabled, onClick, variant, to }) => {
  return (
    <Wrapper
      as={as || (to && Link)}
      className={className}
      disabled={disabled}
      onClick={onClick && onClick}
      to={to}
      variant={variant}
    >
      {children}
    </Wrapper>
  );
};

Button.propTypes = {
  as: PropTypes.string,
  className: PropTypes.string,
  children: ChildrenPropType.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  variant: PropTypes.string,
};

export default Button;
