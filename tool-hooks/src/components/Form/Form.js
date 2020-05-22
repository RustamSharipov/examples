import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormRow, FormError } from '.';

import { ChildrenPropType } from 'types';

const Wrapper = styled.form.attrs(() => ({ autoComplete: 'off' }))``;

const Form = ({ children, className, onSubmit }) => (
  <Wrapper
    className={className}
    onSubmit={onSubmit}
  >
    {children}
  </Wrapper>
);

Form.Error = FormError;

Form.Row = FormRow;

Form.propTypes = {
  children: ChildrenPropType.isRequired,
  className: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default Form;
