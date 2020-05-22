import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { Section, Suggestions } from 'components';

import { links, products } from 'data';

const Wrapper = styled(Section)``;

const ProductsSuggestions = styled(Suggestions)`
  flex-wrap: nowrap;
  justify-content: space-between;
  position: relative;
  left: -2rem;
  width: calc(100% + 4rem);
  margin-top: 1rem;

  @media (min-width: 768px) {
    width: 100%;
  }
`;

const ShopLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 0 1rem;
  }
`;

const ShopCode = styled.div`
  ${({ theme }) => css`
    margin-top: 1.5rem;
    color: ${theme.colors.text.active};
    font-size: 2.5rem;
    text-align: center;

    @media (min-width: 768px) {
      display: none;
    }
  `}
`;

const ShopImage = styled.img`
  width: 7.5rem;
  height: 7.5rem;

  @media (min-width: 768px) {
    width: 11rem;
    height: 11rem;
  }
`;

const ShopDetails = styled.div`
  margin-left: 2rem;

  @media (max-width: 767px) {
    display: none;
  }
`;

const ShopTitle = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.text.active};
    font-size: 2.5rem;
    line-height: 1.5em;
  `}
`;

const ShopDescription = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.text.primary};
    font-size: 1.5rem;
    line-height: 1.25em;
  `}
`;

const Suggestion = styled(Suggestions.Item)`
  height: 15rem;
`;

const ShopSection = ({ className, t }) => (
  <Wrapper className={className}>
    <Section.Title>
      {t('Product.Shop.Title')}
    </Section.Title>

    <ProductsSuggestions>
      {products.getList().reverse().map(({ codeName, name, image, description }, index) => (
        <Suggestion
          key={index}
          value={(
            <ShopLink href={links.shop[codeName]}>
              <ShopImage
                width="60"
                height="60"
                src={image.thumbSrc}
                alt={name}
              />

              <ShopCode>
                {codeName.toUpperCase()}
              </ShopCode>

              <ShopDetails>
                <ShopTitle>
                  {name}
                </ShopTitle>

                <ShopDescription>
                  {description}
                </ShopDescription>
              </ShopDetails>
            </ShopLink>
          )}
        />
      ))}
    </ProductsSuggestions>
  </Wrapper>
);

ShopSection.propTypes = {
  className: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(ShopSection);
