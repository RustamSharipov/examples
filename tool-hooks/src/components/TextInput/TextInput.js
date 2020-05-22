import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.label``;

const Label = styled.div`
  padding: 1rem 0;
  font-size: 1.75rem;
`;

const Input = styled.input`
  ${({ theme }) => css`
    appearance: none;
    display: inline-block;
    width: 100%;
    padding: 2.5rem 3rem;
    background: ${theme.colors.passive.primary};
    border: 0.125rem solid ${theme.colors.passive.primary};
    border-radius: 2rem;
    font-size: 2.5rem;
    resize: none;
    transition: border-color 0.25s;

    :required:focus:invalid {
      border-color: ${theme.colors.error.primary};
    }
  `}
`;

const TextInput = ({ as, className, disabled, label, name, placeholder, required, rows, type, value, onChange }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange({ name, value });
  };

  return (
    <Wrapper className={className}>
      {label && (
        <Label>
          {label}
        </Label>
      )}

      <Input
        as={as}
        className={className}
        disabled={disabled}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        type={type}
        value={value}
      />
    </Wrapper>
  );
};

TextInput.propTypes = {
  as: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
};

TextInput.defaultProps = {
  type: 'text',
};

export default TextInput;
