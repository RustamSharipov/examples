import styled, { css } from 'styled-components'

interface IProps {
  width?: number
  height?: number
}

export default styled.div<IProps>`
  ${({ width, height }) => css`
    display: inline-flex;
    flex-shrink: 0;
    background: var(--color-secondary-light);

    ${width && css`
      width: ${width}px;
    `}

    ${height && css`
      height: ${height}px;
    `}
  `}
`
