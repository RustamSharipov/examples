import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';

import { Image, Header, Footer, Content, Container } from 'components';

import { products } from 'data';
import routes from 'routes';

const Home = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  margin: 3rem 0;
  font-size: 3.5rem;
  line-height: 4rem;
  text-align: center;

  @media (min-width: 768px) {
    margin-top: 9rem;
    margin-bottom: 5rem;
    font-size: 3.75rem;
    font-weight: 600;
  }
`;

const Sample = styled(Image)`
  width: 32rem;
  height: 32rem;

  @media (min-width: 768px) {
    width: 42rem;
    height: 42rem;
  }

  @media (min-width: 1200px) {
    width: 53rem;
    height: 53rem;
  }
`;

const MobileProductsLink = styled(Link)`
  ${({ theme }) => css`
    display: block;
    font-size: 2rem;
    color: ${theme.colors.text.passive};

    @media (min-width: 768px) {
      display: none;
    }
  `}
`;

const DesktopProductsLink = styled(Link)`
  ${({ theme }) => css`
    display: none;

    @media (min-width: 768px) {
      display: block;
      font-size: 2.5rem;
      color: ${theme.colors.success.active};
      transition: color 0.25s;

      :hover {
        color: ${theme.colors.text.active};
      }
    }
  `}
`;

const HomeView = ({ t }) => {
  const { name, modification } = products.get('pps', 'dslr');

  return (
    <Container>
      <Header />

      <Content>
        <Home>
          <Sample
            width="256"
            height="256"
            src={modification.image.src}
            alt={name}
          />

          <Title>
            {t('Home.Title')}
          </Title>

          <MobileProductsLink to={routes.products.getPath()}>
            {t('Home.MobileProductsLink')}
          </MobileProductsLink>

          <DesktopProductsLink to={routes.products.getPath()}>
            {t('Home.DesktopProductsLink')}
          </DesktopProductsLink>
        </Home>
      </Content>

      <Footer />
    </Container>
  );
};

export default withTranslation()(HomeView);
