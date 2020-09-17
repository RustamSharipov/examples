import styled, { css } from 'styled-components'

interface IProps {
  count: number
  isDisabled: boolean
  isExpanded: boolean
}

export default styled.div<IProps>`
  ${({ count, isDisabled, isExpanded }) => css`
    position: relative;
    z-index: 10;
    width: 2.5rem;
    height: 2.5rem;
    color: var(--color-primary-light);
    user-select: none;

    ${isExpanded && css`
      color: var(--color-primary-dark);
    `}

    ${count > 0 && css`
      ::after {
        content: "${count}";
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 0;
        top: 0;
        width: 2.5rem;
        height: 2.5rem;
        background: var(--color-alert-primary);
        border-radius: 100%;
        color: var(--color-primary-light);
        font-size: 1.5rem;
        line-height: 1;
        transform: translate(1.25rem, -1.25rem);
      }
    `}

    ${isDisabled && css`
      opacity: 0.5;
    `}
  `}
`
