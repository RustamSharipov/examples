import styled, { css } from 'styled-components'

// @ts-ignore
import Icon from 'assets/icons/arrowRight.svg'

interface IProps {
  isExpanded: boolean
}

export default styled(Icon)<IProps>`
  ${({ isExpanded }) => css`
    width: 1.5rem;
    height: 1.5rem;
    margin-left: auto;
    fill: currentColor;
    transition: transform 0.25s;

    ${isExpanded && css`
      transform: rotate(90deg);
    `}
  `}
`
