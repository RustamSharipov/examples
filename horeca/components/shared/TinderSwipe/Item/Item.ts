import styled, { css } from 'styled-components'

import { TinderCard } from 'components/shared'

interface IProps {
  zIndex?: number
}

export default styled(TinderCard)<IProps>`
  ${({ zIndex }) => css`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    ${zIndex && css`
      z-index: ${zIndex};
    `}
  `}
`
