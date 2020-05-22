import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Header, Footer, Content, Container, Button, ModificationSwitcher } from 'components';
import { Slider } from '.';

import routes from 'routes';

const Products = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductModificationSwitcher = styled(ModificationSwitcher)`
  max-width: 40rem;
  margin: 4rem 0 2rem;
`;

const Controls = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 1rem 0;
`;

const ProductsView = ({ t }) => {
  const [modification, setModification] = useState('mirrorless');
  const [model, setModel] = useState('pp');

  const handleModelChange = (model) => {
    setModel(model);
  };

  return (
    <Container>
      <Header />

      <Content>
        <Products>
          <Slider
            modification={modification}
            onChange={handleModelChange}
          />

          <ProductModificationSwitcher
            onChange={(value) => { setModification(value) }}
            value={modification}
          />

          <Controls>
            <Button
              to={routes.productFullDetails.getPath({ model, modification })}
              variant="success"
            >
              {t('Product.SelectProduct')}
            </Button>
          </Controls>
        </Products>
      </Content>

      <Footer />
    </Container>
  );
};

export default withTranslation()(ProductsView);
