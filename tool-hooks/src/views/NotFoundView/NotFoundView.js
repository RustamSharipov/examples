import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';

import { Header, Footer, Content, Container } from 'components';

import routes from 'routes';

const NotFound = styled.div``;

const Title = styled.div`
  ${({ theme }) => css`
    margin: 3rem 0;
    font-size: 5rem;
    line-height: 1.5em;
    text-align: center;
    color: ${theme.colors.text.primary};
  `}
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3rem 0;
`;

const HomeLink = styled(Link)`
  ${({ theme }) => css`
    font-size: 2rem;
    color: ${theme.colors.text.passive};

    @media (min-width: 768px) {
      font-size: 2.5rem;
      color: ${theme.colors.success.active};
      transition: color 0.25s;

      :hover {
        color: ${theme.colors.text.active};
      }
    }
  `}
`;

const NotFoundView = ({ t }) => {
  return (
    <Container>
      <Header />

      <Content>
        <NotFound>
          <Title>
            {t('NotFound.Title')}
          </Title>
          
          <Controls>
            <HomeLink to={routes.home.getPath()}>
              {t('NotFound.HomeLink')}
            </HomeLink>
          </Controls>
        </NotFound>
      </Content>

      <Footer />
    </Container>
  );
};

export default withTranslation()(NotFoundView);
