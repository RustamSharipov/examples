import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { ChildrenPropType } from 'types';

import { Item } from '.';

const DURATION = 500;

const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 7.5rem;
    margin: 0.25rem 0;
    padding: 0.5rem;
    background: ${theme.colors.passive.primary};
    border-radius: 1.5rem;
  `}
`;

const Switcher = ({ className, items, onChange, value }) => {
  const [activeItemMarkerNode, setActiveItemMarkerNode] = useState(null);
  const [isImmutable, setImmutableStatus] = useState(false);

  const handleClick = ({ value, markerNode }) => {
    if (!isImmutable) {
      setImmutableStatus(true);

      const {
        left: targetLeft,
        width: targetWidth,
      } = markerNode.getBoundingClientRect();
  
      const {
        left: currentLeft,
      } = activeItemMarkerNode.getBoundingClientRect();
  
      activeItemMarkerNode.style.width = targetWidth;
      activeItemMarkerNode.style.left = `${targetLeft - currentLeft}px`;
    
      setTimeout(
        () => {
          onChange(value);
          activeItemMarkerNode.style.left = 0;
          activeItemMarkerNode.style.width = undefined;
          setActiveItemMarkerNode(markerNode);

          setImmutableStatus(false);
        },
        DURATION,
      );
    }
  };

  const handleActiveItemRef = (node) => {
    setActiveItemMarkerNode(node);
  };

  return (
    <Wrapper className={className}>
      {items.map((item, index) => (
        <Item
          key={index}
          animationDuraton={DURATION}
          isActive={item.value === value}
          label={item.label}
          value={item.value}
          onClick={handleClick}
          onActiveItemRef={handleActiveItemRef}
        />
      ))}
    </Wrapper>
  );
};

Switcher.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: ChildrenPropType,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func.isRequired,
};

export default Switcher;
