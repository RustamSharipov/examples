import styled, { css } from 'styled-components'
import { DistanceUnits } from 'types'

interface IProps {
  units: DistanceUnits
}

export default styled.div<IProps>`
  ${({ units = 'm' }) => css`
    padding: 1rem 0;
    font-size: 1.5rem;

    ::after {
      content: " ${units}";
    }
  `}
`
