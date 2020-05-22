import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import withClickOutside from 'react-click-outside';

import { Item } from '.';

import { ReactComponent as ArrowIcon } from './assets/arrowIcon.svg';

const Wrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 100%;
    height: 7.5rem;
    margin: 0.25rem 0;
    background: ${theme.colors.passive.primary};
    border-radius: 1.5rem;
    user-select: none;
  `}
`;

const Value = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0 3rem;
    color: ${theme.colors.text.active};
    cursor: pointer;
    font-size: 2.5rem;
    line-height: 1.35em;
  `}
`;

const Arrow = styled(ArrowIcon)`
  width: 2rem;
  height: 2rem;
`;

const DropdownList = styled.ul`
  ${({ isExpanded, theme }) => css`
    position: absolute;
    z-index: 100;
    width: 100%;
    left: 0;
    top: calc(100% - 1.5rem);
    padding: 0.5rem;
    background: ${theme.colors.passive.primary};
    border-radius: 1rem;
    opacity: 0;
    pointer-events: none;
    transition:
      top 0.25s,
      opacity 0.25s;

    ${isExpanded && css`
      top: calc(100% + 0.5rem);
      opacity: 1;
      pointer-events: all;
    `}
  `}
`;

const DropdownItem = styled(Item)`
  :first-child {
    border-radius: 1rem 1rem 0 0;
  }

  :last-child {
    border-radius: 0 0 1rem 1rem;
  }
`;

class Select extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })),
    onChange: PropTypes.func,
    value: PropTypes.string.isRequired,
  };

  state = {
    isExpanded: false,
  };

  handleClickOutside() {
    this.setState({ isExpanded: false });
  }

  render() {
    const { className, items, value } = this.props;
    const { isExpanded } = this.state;
    const selectedLabel = items.find(item => item.value === value).label;

    return (
      <Wrapper className={className}>
        <Value onClick={this.handleClick}>
          {selectedLabel}

          <Arrow />
        </Value>
    
        <DropdownList isExpanded={isExpanded}>
          {items.map(({ label, value }, index) => (
            <DropdownItem
              key={index}
              value={value}
              onClick={this.handleChange}
            >
              {label}
            </DropdownItem>
          ))}
        </DropdownList>
      </Wrapper>
    );
  }

  handleClick = () => {
    this.setState(
      state => ({
        isExpanded: !state.isExpanded,
      }),
    );
  }

  handleChange = (value) => {
    const { onChange } = this.props;

    this.setState({ isExpanded: false });
    onChange(value);
  }
}

export default withClickOutside(Select);
