import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Head, HeadCell, Row, RowCell } from '.';

import { ChildrenPropType } from 'types';

const Wrapper = styled.div`
  display: table;
  width: 100%;
`;

const ColumnTable = ({ className, children }) => (
  <Wrapper className={className}>
    {children}
  </Wrapper>
);

ColumnTable.propTypes = {
  className: PropTypes.string,
  children: ChildrenPropType,
};

ColumnTable.Head = Head;

ColumnTable.HeadCell = HeadCell;

ColumnTable.Row = Row;

ColumnTable.RowCell = RowCell;

export default ColumnTable;
