import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { ColumnTable, DrumSelect, LightSwitcher, Section } from 'components';
import { SuggestionsTable } from '.';

const Wrapper = styled(Section)``;

const SubSection = styled.div`
  @media (min-width: 768px) {
    margin-top: 8rem;
  }
`;

const ProductLightSwitcher = styled(LightSwitcher)`
  position: relative;
  left: -2rem;
  width: calc(100% + 4rem);
  margin-top: 2rem;

  @media (min-width: 768px) {
    left: 0;
    width: 100%;
  }
`;

const ProductFocalLengthSwitcher = styled(DrumSelect)`
  position: relative;
  left: -2rem;
  width: calc(100% + 4rem);
  margin-top: 2rem;

  @media (min-width: 768px) {
    left: 0;
    width: 100%;
  }
`;

const ProductPinholeSizeSwitcher = styled(DrumSelect)`
  position: relative;
  left: -2rem;
  width: calc(100% + 4rem);
  margin-top: 2rem;

  @media (min-width: 768px) {
    left: 0;
    width: 100%;
  }
`;

const Description = styled.div`
  ${({ theme }) => css`
    padding: 1rem 0;
    color: ${theme.colors.text.secondary};
    text-align: center;
  `}
`;

const DataTable = styled(ColumnTable)`
  position: relative;
  left: -2rem;
  width: calc(100% + 4rem);
  margin-top: 4rem;

  @media (min-width: 768px) {
    left: 0;
    width: 100%;
  }
`;

const LightSection = ({
  className, product, light, focalLength, pinholeSize, onLightChange, onFocalLengthChange, onPinholeSizeChange, t
}) => {
  const focalLengthList = product.modification.exposure
    .filter(({ focalLength }) => !!focalLength)
    .map(({ focalLength }) => ({
      label: focalLength,
      value: focalLength,
    }));
  const defaultFocalLength = focalLengthList.length > 0 && focalLengthList[0].value;

  const pinholeSizeList = product.modification.exposure
    .filter(({ pinholeSize }) => !!pinholeSize)
    .map(({ pinholeSize }) => ({
      label: pinholeSize,
      value: pinholeSize,
    }));
  const defaultPinholeSize = pinholeSizeList.length > 0 && pinholeSizeList[0].value;

  return (
    <Wrapper className={className}>
      <Section.Title>
        {t('Product.Light.Title')}
      </Section.Title>
  
      <ProductLightSwitcher
        onChange={(value) => onLightChange(value)}
        value={light}
      />
  
      <Description>
        {t('Product.Light.SwitchCaption')}
      </Description>
  
      {pinholeSizeList.length > 1 && (
        <SubSection>
          <Section.Title>
            {t('Product.PinholeSize.Title')}
          </Section.Title>
      
          <ProductPinholeSizeSwitcher
            items={pinholeSizeList}
            onChange={(value) => onPinholeSizeChange(value)}
            value={pinholeSize || defaultPinholeSize}
          />
        </SubSection>
      )}

      {focalLengthList.length > 1 && (
        <SubSection>
          <Section.Title>
            {t('Product.FocalLength.Title')}
          </Section.Title>
      
          <ProductFocalLengthSwitcher
            items={focalLengthList}
            onChange={(value) => onFocalLengthChange(value)}
            value={focalLength || defaultFocalLength}
          />
        </SubSection>
      )}
  
      <SuggestionsTable
        {...product.modification.getSuggestions(
          focalLength || defaultFocalLength,
          pinholeSize || defaultPinholeSize,
        )}
      />
  
      <DataTable>
        <ColumnTable.Head>
          <ColumnTable.HeadCell width="50%">
            {t('Product.Light.ISO')}
          </ColumnTable.HeadCell>
  
          <ColumnTable.HeadCell width="50%">
            {t('Product.Light.ShutterSpeed')}
          </ColumnTable.HeadCell>
        </ColumnTable.Head>
  
        {product.modification.light.map(({ iso, shutterSpeed }, index) => (
          <ColumnTable.Row key={index}>
            <ColumnTable.RowCell width="50%">
              {iso}
            </ColumnTable.RowCell>
  
            <ColumnTable.RowCell width="50%">
              {shutterSpeed}
            </ColumnTable.RowCell>
          </ColumnTable.Row>
        ))}
      </DataTable>
    </Wrapper>
  );
};

LightSection.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
  onFocalLengthChange: PropTypes.func.isRequired,
  onPinholeSizeChange: PropTypes.func.isRequired,
  onLightChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  light: PropTypes.string,
  focalLength: PropTypes.number,
  pinholeSize: PropTypes.number,
};

export default withTranslation()(LightSection);
