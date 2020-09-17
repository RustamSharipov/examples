import styled from 'styled-components'

import { RESTAURANT_PLACEHOLDER_IMAGE_BASE64 } from 'defaults'

export default styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: center center no-repeat;
  background-image: url(${RESTAURANT_PLACEHOLDER_IMAGE_BASE64});
  background-size: cover;
`
