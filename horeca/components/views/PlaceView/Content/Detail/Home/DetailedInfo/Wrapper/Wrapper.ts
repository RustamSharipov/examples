import styled, { css } from 'styled-components'

interface IProps {
  isExpanded: boolean
}

export default styled.div<IProps>`
  ${({ isExpanded }) => css`
    overflow: hidden;
    height: 0;
    background: var(--color-secondary-light);
    transition: height 0.35s;

    ${isExpanded && css`
      height: 50vh;
    `}
  `}
`
