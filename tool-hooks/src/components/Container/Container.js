import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import styled, { css } from 'styled-components';

import { ChildrenPropType } from 'types';

import routes from 'routes';

const Wrapper = styled.div`
  ${({ isMounted, theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100%;
    position: relative;
    top: -6rem;
    background: ${theme.colors.passive.light};
    opacity: 0;
    pointer-events: none;
    transition:
      top 0.5s,
      opacity 0.5s;

    ${isMounted && css`
      top: 0;
      opacity: 1;
      pointer-events: all;
    `}
  `}
`;

const Container = ({ children, className, match }) => {
  const [isMounted, setMountStatus] = useState(false);
  const [prevRoute, setCurrentRoute] = useState({});
  const currentRoute = Object.values(routes).find(route => route.path === match.path);

  useEffect(
    () => {
      if (!(currentRoute && currentRoute.isView && prevRoute && prevRoute.isView)) {
        window.scrollTo(0, 0);
        setCurrentRoute(currentRoute);
      }

      if (!isMounted) {
        setMountStatus(true);
      }
    },
    [
      currentRoute,
      prevRoute,
      isMounted,
    ],
  );

  return (
    <Wrapper
      className={className}
      isMounted={isMounted}
    >
      {children}
    </Wrapper>
  );
};

Container.propTypes = {
  className: PropTypes.string,
  children: ChildrenPropType.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

export default withRouter(Container);
