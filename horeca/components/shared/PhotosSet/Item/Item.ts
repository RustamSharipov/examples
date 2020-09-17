import styled, { css } from 'styled-components'

interface IProps {
  isActive: boolean
}

export default styled.div<IProps>`
  ${({ isActive }) => css`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;

    ${isActive && css`
      opacity: 1;
      pointer-events: all;
    `}
  `}
`
