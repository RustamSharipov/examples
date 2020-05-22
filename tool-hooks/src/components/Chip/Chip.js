import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { ChildrenPropType } from 'types';

const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 7.5rem;
    margin: 0.25rem 0;
    padding: 0.5rem;
    background: ${theme.colors.passive.primary};
    border-radius: 1.5rem;
  `}
`;

const Label = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    width: 100%;
    color: ${theme.colors.text.primary};
    font-size: 2rem;
    line-height: 1.35em;
  `}
`;

const Value = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    width: 100%;
    color: ${theme.colors.text.active};
    font-size: 2.5rem;
    line-height: 1.35em;
  `}
`;

const Chip = ({ className, label, value }) => (
  <Wrapper className={className}>
    <Value>
      {value}
    </Value>

    {label && (
      <Label>
        {label}
      </Label>
    )}
  </Wrapper>
);

Chip.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: ChildrenPropType.isRequired,
};

export default Chip;
