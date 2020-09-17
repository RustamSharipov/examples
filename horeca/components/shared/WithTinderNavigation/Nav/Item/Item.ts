import styled, { css } from 'styled-components'

interface IProps {
  isActive: boolean
}

export default styled.div<IProps>`
  ${({ isActive }) => css`
    flex-grow: 1;
    height: 0.25rem;
    margin: 0.125rem;
    background: var(--color-primary-light);
    opacity: 0.5;

    ${isActive && css`
      opacity: 1;
    `}
  `}
`
