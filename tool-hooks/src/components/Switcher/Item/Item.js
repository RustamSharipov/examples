import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { ChildrenPropType } from 'types';

const Wrapper = styled.div`
  flex-grow: 1;
  position: relative;
  height: 100%;
  cursor: pointer;
`;

const Marker = styled.div`
  ${({ theme, animationDuraton, isActive }) => css`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: 1px solid transparent;
    border-radius: 1.5rem;
    transition:
      width ${animationDuraton}ms,
      left ${animationDuraton}ms;

    ${isActive && css`
      background: ${theme.colors.passive.light};
      border-color: ${theme.colors.passive.secondary};
      cursor: default;
    `}
  `}
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  font-size: 2.5rem;
`;

const Item = ({ className, animationDuraton, label, value, onClick, isActive, onActiveItemRef }) => {
  const markerNode = useRef(null);

  const handleClick = () => {
    onClick({
      value,
      markerNode: markerNode.current,
    })
  };

  useEffect(
    () => {
      if (isActive) {
        onActiveItemRef(markerNode.current);
      }
    },
    [
      isActive,
      onActiveItemRef,
    ],
  );

  return (
    <Wrapper
      className={className}
      onClick={handleClick}
    >
      <Marker
        ref={markerNode}
        animationDuraton={animationDuraton}
        isActive={isActive}
      />

      <Label>
        {label}
      </Label>
    </Wrapper>
  );
};

Item.propTypes = {
  className: PropTypes.string,
  animationDuraton: PropTypes.number,
  isActive: PropTypes.bool,
  label: ChildrenPropType,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onClick: PropTypes.func.isRequired,
  onActiveItemRef: PropTypes.func.isRequired,
};

Item.defaultProps = {
  animationDuraton: 0,
};

export default Item;
