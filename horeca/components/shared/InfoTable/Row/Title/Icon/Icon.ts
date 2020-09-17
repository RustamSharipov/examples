import { cloneElement } from 'react'
import styled from 'styled-components'

export default styled(
  ({ component, className }) => cloneElement(component, { className }),
)`
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 2rem;
`
