import styled, { css } from 'styled-components'

interface IProps {
  isDisplay: boolean
  src?: string
  width?: number
  height?: number
  alt?: string
}

export default styled.img.attrs(({ alt, width, height, src }) => ({ src, width, height, alt }))<IProps>`
  ${({ isDisplay }) => css`
    opacity: 0;
    transition: opacity 0.2s;

    ${isDisplay && css`
      opacity: 1;
    `}
  `}
`
