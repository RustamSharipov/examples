import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { ColumnTable, ModificationSwitcher, Section } from 'components';

const Wrapper = styled(Section)``;

const Title = styled(Section.Title)``;

const Description = styled(Section.Description)``;

const ProductModificationSwitcher = styled(ModificationSwitcher)`
  position: relative;
  left: -2rem;
  width: calc(100% + 4rem);
  margin: 4rem 0 2rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const DataTable = styled(ColumnTable)`
  position: relative;
  left: -2rem;
  width: calc(100% + 4rem);

  @media (min-width: 768px) {
    left: 0;
    width: 100%;
  }
`;

const ModificationSection = ({ className, items, value, onChange, t }) => {
  const columnsCount = Object.keys(items[0]).length;
  const columnWidth = `${100 / columnsCount}%`;

  return (
    <Wrapper className={className}>
      <Title>
        {t('Product.ExposureGuide.Title')}
      </Title>
  
      <Description>
        {t('Product.ExposureGuide.Description')}
      </Description>
  
      <ProductModificationSwitcher
        onChange={(value) => onChange(value)}
        value={value}
      />
  
      <DataTable>
        <ColumnTable.Head>
          {items[0].pinholeSize && (
            <ColumnTable.HeadCell width={columnWidth}>
              {t('Product.ExposureGuide.PinholeSize')}
            </ColumnTable.HeadCell>
          )}
  
          {items[0].focalLength && (
            <ColumnTable.HeadCell width={columnWidth}>
              {t('Product.ExposureGuide.FocalLength')}
            </ColumnTable.HeadCell>
          )}
  
          {items[0].fStop && (
            <ColumnTable.HeadCell width={columnWidth}>
              {t('Product.ExposureGuide.FStop')}
            </ColumnTable.HeadCell>
          )}
        </ColumnTable.Head>
  
        {items.map(({ focalLength, fStop, pinholeSize }, index) => (
          <ColumnTable.Row key={index}>
            {pinholeSize && (
              <ColumnTable.RowCell width={columnWidth}>
                {pinholeSize}
              </ColumnTable.RowCell>
            )}
  
            {focalLength && (
              <ColumnTable.RowCell width={columnWidth}>
                {focalLength}
              </ColumnTable.RowCell>
            )}
            
            {fStop && (
              <ColumnTable.RowCell width={columnWidth}>
                {fStop}
              </ColumnTable.RowCell>
            )}
          </ColumnTable.Row>
        ))}
      </DataTable>
    </Wrapper>
  );
};

ModificationSection.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    focalLength: PropTypes.number,
    fStop: PropTypes.number,
    pinholeSize: PropTypes.number,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default withTranslation()(ModificationSection);
