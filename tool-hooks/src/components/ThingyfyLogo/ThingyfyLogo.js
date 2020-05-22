import React from 'react';
import styled from 'styled-components';

import logoImage from './assets/logo.svg';

const ThingyfyLogo = styled.img`
  width: 13rem;
  height: 4rem;
`;

export default () => (
  <ThingyfyLogo
    width="104"
    height="32"
    src={logoImage}
    alt="Thngyfy"
  />
);
