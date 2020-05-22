import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { ChildrenPropType } from 'types';

const Wrapper = styled.div`
  ${({ width }) => css`
    display: table-cell;
    padding: 1.5rem 0;
    font-size: 2rem;
    text-align: center;

    ${width && css`
      width: ${width};
    `}
  `}
`;

const RowCell = ({ className, children, width }) => (
  <Wrapper
    className={className}
    width={width}
  >
    {children}
  </Wrapper>
);

RowCell.propTypes = {
  className: PropTypes.string,
  children: ChildrenPropType,
  width: PropTypes.string,
};

export default RowCell;
