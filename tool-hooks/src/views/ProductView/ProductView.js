import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import { Header, Footer, Content, Container, Section } from 'components';
import { LightSection, ModificationSection, ShopSection, SpecsSection, Navigation, Feedback } from '.';

import routes from 'routes';
import { products } from 'data';

const Details = styled.div`
  @media (max-width: 767px) {
    max-width: 70rem;
    margin: 0 auto;
  }
`;

const Row = styled.div`
  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

const Column = styled.div`
  @media (min-width: 768px) {
    max-width: 40rem;

    :not(:first-child) {
      margin-left: 6rem;
    }
  
    :not(:last-child) {
      margin-right: 6rem;
    }
  }
`;

const ProductNavigation = styled(Navigation)`
  @media (max-width: 767px) {
    display: none;
  }
`;

const ProductSpecsSectionMobile = styled(SpecsSection)`
  @media (min-width: 768px) {
    display: none;
  }
`;

const ProductSpecsSectionDesktop = styled(SpecsSection)`
  margin-left: 2.5rem;

  @media (max-width: 767px) {
    display: none;
  }
`;

const ProductView = ({ history, match, t }) => {
  const [light, setLight] = useState('cloudy');
  const [focalLength, setFocalLength] = useState(null);
  const [pinholeSize, setPinholeSize] = useState(null);
  const { model, modification } = match.params;
  const product = products.get(model, modification, light);

  const handleModelChange = (model) => {
    setFocalLength(null);
    setPinholeSize(null);
    history.push(routes.productFullDetails.getPath({ model, modification }));
  };

  const handleModificationChange = (modification) => {
    setFocalLength(null);
    setPinholeSize(null);
    history.push(routes.productFullDetails.getPath({ model, modification }));
  };

  const handleFeedbackSuccess = () => {
    console.log('Success');
  };

  return (
    <Container>
      <Header product={product} />

      <Content>
        <Details>
          <Row>
            <Column>
              <ProductNavigation
                model={model}
                modification={modification}
                light={light}
                onModelChange={handleModelChange}
                onModificationChange={handleModificationChange}
              />

              <ProductSpecsSectionDesktop data={product.modification.specs} />
            </Column>

            <Column>
              <Section>
                <Section.Title>
                  {t('Product.QuickGuide.Title')}
                </Section.Title>

                <Section.Description>
                  {t('Product.QuickGuide.Description')}
                </Section.Description>
              </Section>

              <LightSection
                product={product}
                onLightChange={(value) => { setLight(value) }}
                onFocalLengthChange={(value) => { setFocalLength(value) }}
                onPinholeSizeChange={(value) => { setPinholeSize(value) }}
                light={light}
                focalLength={focalLength}
                pinholeSize={pinholeSize}
              />

              <ProductSpecsSectionMobile data={product.modification.specs} />

              <ModificationSection
                items={product.modification.exposure}
                onChange={handleModificationChange}
                value={modification}
              />
            </Column>
          </Row>

          <ShopSection />

          <Feedback onSuccess={handleFeedbackSuccess} />
        </Details>
      </Content>

      <Footer />
    </Container>
  );
};

ProductView.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

export default withRouter(withTranslation()(ProductView));
