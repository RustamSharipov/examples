import { createGlobalStyle } from 'styled-components'
import { createColors } from 'theme'

export default createGlobalStyle`
  :root {
    ${createColors()}
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
  }

  html {
    font-size: 8px;
  }

  body {
    margin: 0;
    background: var(--color-primary-darkest);
    color: var(--color-primary-light);
    font-size: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #__next {
    height: 100%;
  }
`
