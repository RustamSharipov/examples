import styled, { css } from 'styled-components'

interface IProps {
  isExpanded: boolean
}

export default styled.div<IProps>`
  ${({ isExpanded }) => css`
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 100;
    left: 50%;
    transform: translateX(-50%);
    bottom: -8rem;
    width: calc(100% - 8rem);
    opacity: 0;
    transition:
      bottom 0.25s,
      opacity 0.25s;

    ${isExpanded && css`
      bottom: 1rem;
      opacity: 1;
    `}
  `}
`
