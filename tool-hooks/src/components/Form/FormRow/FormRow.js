import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ChildrenPropType } from 'types';

const Wrapper = styled.div`
  padding: 0.5rem 0;
`;

const FormRow = ({ className, children }) => (
  <Wrapper className={className}>
    {children}
  </Wrapper>
);

FormRow.propTypes = {
  className: PropTypes.string,
  children: ChildrenPropType.isRequired
}

export default FormRow;
