import styled from 'styled-components'

import { snippets } from 'theme'

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 5rem;
  mask-image: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%);
  ${snippets.textShadow}
  user-select: none;

  ::before {
    content: "";
    position: absolute;
    left: 0;
    top: 1rem;
    width: 100%;
    height: 3rem;
    background: var(--color-accent-light);
    backdrop-filter: blur(4px);
  }
`
