import styled from 'styled-components'

interface IProps {
  lat?: number
  lng?: number
}

export default styled.div<IProps>`
  width: 1.5rem;
  height: 1.5rem;
  background: var(--color-popup-dark);
  border-radius: 100%;
  border: 2px solid var(--color-primary-light);
  opacity: 0.8;
`
