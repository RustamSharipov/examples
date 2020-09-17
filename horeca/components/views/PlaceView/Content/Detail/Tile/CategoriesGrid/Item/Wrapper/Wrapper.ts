import styled, { css } from 'styled-components'

interface IProps {
  isFirst?: boolean
  imageSrc?: string
}

export default styled.div<IProps>`
  ${({ isFirst = false, imageSrc = '/images/restaurantPlaceholder.jpg' }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50vw;
    height: 50vw;
    padding: 1rem 2rem;
    line-height: 1.5em;
    background: center center no-repeat url(${imageSrc});
    background-size: cover;
    box-shadow: inset 0 0 1px 1px rgba(0, 0, 0, 0.25);
    font-weight: 600;
    text-align: center;

    ${isFirst && css`
      width: 100vw;
      height: 100vw;
    `}
  `}
`
