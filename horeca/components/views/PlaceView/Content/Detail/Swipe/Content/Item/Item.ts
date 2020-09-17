import styled, { css } from 'styled-components'

interface IProps {
  position?: 'top' | 'bottom'
}

export default styled.div<IProps>`
  ${({ position }) => css`
    position: relative;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    ${position === 'top' && css`
      position: absolute;
      z-index: 3;
      left: -100%;
    `}

    ${position === 'bottom' && css`
      position: absolute;
      z-index: 1;
    `}
  `}
`
