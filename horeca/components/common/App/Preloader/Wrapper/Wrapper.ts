import styled, { css } from 'styled-components'

interface IProps {
  isDisplay: boolean
}

export default styled.div<IProps>`
  ${({ isDisplay = false }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: var(--color-primary-dark);
    color: var(--color-primary-light);

    ${!isDisplay && css`
      display: none;
    `}
  `}
`
