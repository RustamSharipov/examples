import styled, { css } from 'styled-components'

interface IProps {
  isExpanded: boolean
}

export default styled.div<IProps>`
  ${({ isExpanded }) => css`
    position: relative;
    z-index: 10;
    width: 2.5rem;
    height: 2.5rem;
    user-select: none;

    color: var(--color-primary-light);

    ${isExpanded && css`
      color: var(--color-primary-dark);
    `}
  `}
`
