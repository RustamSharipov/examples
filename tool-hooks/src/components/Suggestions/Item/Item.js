import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Chip } from 'components';

import { ChildrenPropType } from 'types';

const Wrapper = styled(Chip)`
  width: calc(33% - 1rem);
  margin: 0.5rem;

  @media (min-width: 768px) {
    width: calc(33% - 0.87rem);
  }
`;

const Item = ({ className, label, value }) => {
  return (
    <Wrapper
      className={className}
      label={label}
      value={value}
    />
  );
};

Item.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: ChildrenPropType.isRequired,
};

export default Item;
