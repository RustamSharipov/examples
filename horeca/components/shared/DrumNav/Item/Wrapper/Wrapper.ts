import styled, { css } from 'styled-components'

interface IProps {
  isActive: boolean
}

export default styled.div<IProps>`
  ${({ isActive }) => css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    height: 5rem;
    padding: 0 2rem;
    cursor: pointer;
    color: var(--color-primary-light);
    font-size: 2rem;
    text-transform: uppercase;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

    ::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0.25rem;
      width: 100%;
      height: calc(100% - 0.5rem);
      background: var(--color-accent-light);
      border-radius: 2.5rem;
      box-shadow: 0 0 8px 1px rgba(0,0,0,0.25);
      transform: scale(0);
      transition: transform 0.25s;

      ${isActive && css`
        transform: scale(1);
      `}
    }
  `}
`
