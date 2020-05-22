import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { Section, RowTable } from 'components';

const Wrapper = styled(Section)``;

const SpecsSection = ({
  className,
  data: {
    apertureSize,
    apertureType,
    diameter,
    focalLength,
    fov,
    lensMount,
    weight,
  },
  t,
}) => (
  <Wrapper className={className}>
    <Section.Title>
      {t('Product.Specs.Title')}
    </Section.Title>

    <RowTable>
      <RowTable.Row>
        <RowTable.Label>
          {t('Product.Specs.FocalLength')}
        </RowTable.Label>

        <RowTable.Value>
          {focalLength.join('–')} mm
        </RowTable.Value>
      </RowTable.Row>

      <RowTable.Row>
        <RowTable.Label>
          {t('Product.Specs.FOV')}
        </RowTable.Label>

        <RowTable.Value>
          {fov}°
        </RowTable.Value>
      </RowTable.Row>

      <RowTable.Row>
        <RowTable.Label>
          {t('Product.Specs.Weight')}
        </RowTable.Label>

        <RowTable.Value>
          {weight} g
        </RowTable.Value>
      </RowTable.Row>

      <RowTable.Row>
        <RowTable.Label>
          {t('Product.Specs.Diameter')}
        </RowTable.Label>

        <RowTable.Value>
          {diameter} mm
        </RowTable.Value>
      </RowTable.Row>

      <RowTable.Row>
        <RowTable.Label>
          {t('Product.Specs.LensMount')}
        </RowTable.Label>

        <RowTable.Value>
          {lensMount.join(', ')}
        </RowTable.Value>
      </RowTable.Row>

      <RowTable.Row>
        <RowTable.Label>
          {t('Product.Specs.ApertureType')}
        </RowTable.Label>

        <RowTable.Value>
          {apertureType}
        </RowTable.Value>
      </RowTable.Row>

      <RowTable.Row>
        <RowTable.Label>
          {t('Product.Specs.ApertureSize')}
        </RowTable.Label>

        <RowTable.Value>
          {apertureSize.map((item, index) => (
            <div key={index}>
              {item} mm
            </div>
          ))}
        </RowTable.Value>
      </RowTable.Row>
    </RowTable>
  </Wrapper>
);

SpecsSection.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    apertureSize: PropTypes.arrayOf(PropTypes.number),
    apertureType: PropTypes.string,
    diameter: PropTypes.number,
    focalLength: PropTypes.arrayOf(PropTypes.number),
    fov: PropTypes.number,
    lensMount: PropTypes.arrayOf(PropTypes.string),
    weight: PropTypes.number,
  }).isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(SpecsSection);
