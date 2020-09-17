import styled, { css } from 'styled-components'

import { PlaceType } from 'types/places'

interface IProps {
  isActive: boolean
  isMini: boolean
  type: PlaceType
}

const renderTypeStyle = (type: PlaceType) => {
  switch (type) {
    case 'hotel':
    case 'restaurant':
      return css`
        background: var(--color-primary-dark);
        border: 1px solid var(--color-primary-light);
      `

    default:
      return css`
        background: var(--color-primary-light);
        border: 1px solid var(--color-primary-dark);
      `
  }
}

export default styled.div<IProps>`
  ${({ isActive, isMini, type }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;

    ${isActive && css`
      z-index: 1;
    `}

    ${isMini && css`
      background: var(--color-primary-darkest);
      border: 1px solid var(--color-primary-light);
      border-radius: 2rem;
    `}

    ${!isMini && css`
      width: 4rem;
      height: 4rem;
      transform: translate(-50%, -100%);

      ::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        ${renderTypeStyle(type)}
        border-radius: 4rem 4rem 1rem 4rem;
        transform: rotate(45deg);
      }

      ::after {
        content: "";
        position: absolute;
        bottom: -1rem;
        left: 50%;
        transform: translateX(-50%);
        width: 33%;
        height: 0.25rem;
        background: var(--color-primary-dark);
        border-radius: 100%;
        opacity: 0.25;
      }
    `}
  `}
`
