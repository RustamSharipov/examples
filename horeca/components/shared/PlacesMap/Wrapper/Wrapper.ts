import styled from 'styled-components'

export default styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .leaflet-container {
    width: 100%;
    height: 100%;
  }

  .leaflet-tooltip {
    padding: 0.5rem;
    background: var(--color-primary-light);
    color: var(--color-primary-dark);
    pointer-events: all;
  }
`
