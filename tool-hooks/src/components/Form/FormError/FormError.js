import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.error.primary};
  `}
`;

const FormError = ({ className, error }) => (
  <Wrapper className={className}>
    {error}
  </Wrapper>
);

FormError.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
}

export default FormError;
