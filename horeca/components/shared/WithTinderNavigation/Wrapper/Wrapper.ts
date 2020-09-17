import styled from 'styled-components'

import { snippets } from 'theme'

export default styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  ::after {
    content: "";
    position: absolute;
    ${snippets.bottomShadow}
    pointer-events: none;
  }
`
