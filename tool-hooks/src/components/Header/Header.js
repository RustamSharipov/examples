import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { ThingyfyLogo } from 'components';
import { Product } from '.';

import ReactRouterPropTypes from 'react-router-prop-types';

import routes from 'routes';

const Wrapper = styled.header`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: ${theme.maxWidth};
    height: 8rem;
    padding: 0 3rem;

    @media (min-width: 768px) {
      justify-content: center;
    }
  `}
`;

const HeaderProduct = styled(Product)`
  @media (min-width: 768px) {
    display: none;
  }
`;

const Logo = styled.span`
  margin-left: auto;

  @media (min-width: 768px) {
    margin-left: 0;
  }
`;

const Header = ({ className, location, product }) => {
  const isHome = location.pathname === routes.home.path;

  return (
    <Wrapper className={className}>
      {product && (
        <HeaderProduct product={product} />
      )}
  
      <Logo
        as={!isHome && Link}
        to={!isHome ? routes.home.path : undefined}
      >
        <ThingyfyLogo />
      </Logo>
    </Wrapper>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  location: ReactRouterPropTypes.location.isRequired,
  product: PropTypes.object,
};

export default withRouter(Header);
