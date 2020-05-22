import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Row, Label, Value } from '.';

import { ChildrenPropType } from 'types';

const Wrapper = styled.div`
  display: table;
  width: 100%;
`;

const RowTable = ({ className, children }) => (
  <Wrapper className={className}>
    {children}
  </Wrapper>
);

RowTable.propTypes = {
  className: PropTypes.string,
  children: ChildrenPropType,
};

RowTable.Row = Row;

RowTable.Label = Label;

RowTable.Value = Value;

export default RowTable;
