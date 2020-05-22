import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { Image, ModificationSwitcher, Select } from 'components';

import { products } from 'data';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductModelSelect = styled(Select)`
  max-width: 35rem;
  margin: 4rem 0 1rem;
`;

const ProductModificationSwitcher = styled(ModificationSwitcher)`
  max-width: 35rem;
  margin-top: 1rem;
`;

const ProductSample = styled.div`
  @media (min-width: 768px) {
    width: 40rem;
    height: 42rem;
  }
`;

const Navigation = ({ className, model, modification, light, onModelChange, onModificationChange }) => {
  const product = products.get(model, modification, light);

  return (
    <Wrapper className={className}>
      <ProductSample>
        <Image
          width="336"
          height="336"
          src={product.modification.image.src}
          alt={product.name}
        />
      </ProductSample>

      <ProductModelSelect
        onChange={onModelChange}
        items={products.map(({ name, codeName }) => ({
          label: name,
          value: codeName
        }))}
        value={model}
      />

      <ProductModificationSwitcher
        onChange={onModificationChange}
        value={modification}
      />
    </Wrapper>
  );
};

Navigation.propTypes = {
  className: PropTypes.string,
  model: PropTypes.string.isRequired,
  modification: PropTypes.string.isRequired,
  light: PropTypes.string.isRequired,
  onModelChange: PropTypes.func.isRequired,
  onModificationChange: PropTypes.func.isRequired,
};

export default withRouter(Navigation);
