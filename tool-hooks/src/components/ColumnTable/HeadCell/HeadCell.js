import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { ChildrenPropType } from 'types';

const Wrapper = styled.div`
  ${({ theme, width }) => css`
    display: table-cell;
    vertical-align: bottom;
    padding: 2rem 0;
    font-size: 2rem;
    font-weight: 600;
    line-height: 2.5rem;
    text-align: center;
    border-bottom: 1px solid ${theme.colors.passive.secondary};

    ${width && css`
      width: ${width};
    `}
  `}
`;

const HeadCell = ({ className, children, width }) => (
  <Wrapper
    className={className}
    width={width}
  >
    {children}
  </Wrapper>
);

HeadCell.propTypes = {
  className: PropTypes.string,
  children: ChildrenPropType,
  width: PropTypes.string,
};

export default HeadCell;
