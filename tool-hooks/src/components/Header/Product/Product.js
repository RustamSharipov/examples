import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 6rem;
  height: 6rem;
`;

const Model = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.text.active};
    font-size: 1.75rem;
    line-height: 1.25em;
  `}
`;

const Modification = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.text.primary};
    font-size: 1.65rem;
    line-height: 1.25em;
  `}
`;

const Info = styled.div`
  margin-left: 1rem;
`;

const Product = ({ className, product }) => (
  <Wrapper className={className}>
    <ProductImage
      width="48"
      height="48"
      src={product.modification.image.thumbSrc}
      alt={product.name}
    />

    <Info>
      <Model>
        {product.name}
      </Model>

      <Modification>
        {product.modification.name}
      </Modification>
    </Info>
  </Wrapper>
);

Product.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object,
};

export default Product;
