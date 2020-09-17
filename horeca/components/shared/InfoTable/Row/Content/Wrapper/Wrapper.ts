import styled, { css } from 'styled-components'

interface IProps {
  isExpanded: boolean
}

export default styled.div<IProps>`
  ${({ isExpanded }) => css`
    height: 0;
    font-size: 1.65rem;
    overflow: hidden;
    transition:
      height 0.25s,
      margin-top 0.25s;

    ${isExpanded && css`
      height: auto;
      margin-top: 1rem;
    `}

    ol, ul {
      margin: 0 0 0 4.5rem;
      padding: 0;
    }

    ul li {
      list-style: none;
      line-height: 1.5;
    }
  `}
`
