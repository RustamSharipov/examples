import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.footer`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: ${theme.maxWidth};
    height: 12rem;
    padding: 2rem;
    font-size: 2rem;
    color: ${theme.colors.text.passive};
  `}
`;

const Footer = ({ className }) => (
  <Wrapper className={className}>
    © Thingyfy Inc., {new Date().getFullYear()}
  </Wrapper>
);

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
