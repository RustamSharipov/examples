import styled, { css } from 'styled-components'

interface IProps {
  isCollapsed: boolean
}

export default styled.div<IProps>`
  ${({ isCollapsed }) => css`
    position: relative;
    height: 100%;
    transition: height 0.25s;

    ${isCollapsed && css`
      height: 50vh;
    `}
  `}
`
