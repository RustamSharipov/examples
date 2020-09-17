import styled, { css } from 'styled-components'

import { snippets } from 'theme'

interface IProps {
  isExpanded: boolean
}

export default styled.div<IProps>`
  ${({ isExpanded }) => css`
    position: absolute;
    z-index: 1;
    left: 0;
    bottom: 8rem;
    width: 100%;
    ${snippets.textShadow}
    transition: bottom 0.25s;

    ${isExpanded && css`
      bottom: 2rem;
    `}
  `}
`
