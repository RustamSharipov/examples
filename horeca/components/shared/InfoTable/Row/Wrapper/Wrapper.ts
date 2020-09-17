import styled, { css } from 'styled-components'

interface IProps {
  isExpandable: boolean
}

export default styled.div<IProps>`
  ${({ isExpandable }) => css`
    position: relative;
    padding: 1.5rem 2rem;

    :not(:last-child)::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 4rem);
      height: 0.125rem;
      background: var(--color-primary-dark);
      opacity: 0.25;
    }

    ${isExpandable && css`
      cursor: pointer;
    `}
  `}
`
