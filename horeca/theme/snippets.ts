import { css } from 'styled-components'

export default {
  bottomShadow: css`
    left: 0;
    bottom: 0;
    width: 100%;
    height: 12rem;
    background: linear-gradient(
      0deg,
      rgba(0,0,0,0.75) 0%,
      rgba(0,0,0,0) 100%
    );
  `,

  topShadow: css`
    left: 0;
    top: 0;
    width: 100%;
    height: 8rem;
    padding: 0.125rem 1rem;
    background: linear-gradient(
      180deg,
      rgba(0,0,0,0.5) 0%,
      rgba(0,0,0,0) 100%
    );
  `,

  textShadow: css`
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  `,
}
