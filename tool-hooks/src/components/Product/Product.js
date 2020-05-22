import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Image } from 'components';

import { products } from 'data';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductImage = styled(Image)`
  width: 32rem;
  height: 32rem;
`;

const Title = styled.div`
  margin: 1rem 0;
  font-size: 3.5rem;
  line-height: 4rem;
  font-weight: 600;
  text-align: center;
`;

const Product = ({ className, model, modification, onClick }) => {
  const product = products.get(model, modification);

  return (
    <Wrapper
      className={className}
      onClick={onClick && onClick}
    >
      <ProductImage
        width="256"
        height="256"
        src={product.modification.image.src}
        alt={product.name}
      />
      
      <Title>
        {product.name}
      </Title>
    </Wrapper>
  );
};

Product.propTypes = {
  className: PropTypes.string,
  model: PropTypes.string.isRequired,
  modification: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Product;
