import styled, { css } from 'styled-components'

interface IProps {
  isActive: boolean
}

export default styled.div<IProps>`
  ${({ isActive }) => css`
    display: flex;
    justify-content: center;
    position: relative;
    margin: 0 1rem;
    cursor: pointer;
    color: var(--color-secondary-dark);
    font-size: 2rem;
    text-transform: uppercase;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

    ${isActive && css`
      color: var(--color-primary-dark);
    `}
  `}
`
