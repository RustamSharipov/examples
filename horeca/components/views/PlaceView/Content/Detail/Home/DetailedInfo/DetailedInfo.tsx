import { inject, observer } from 'mobx-react'

import { ConnectedComponent } from 'types'

import { DetailsTable } from 'components/views/PlaceView/components'
import { Content, Wrapper } from '.'

const DetailedInfo: ConnectedComponent = ({ placeState }) => {
  const {
    isInfoExpanded,
    place,
  } = placeState

  const {
    address,
    description,
    phone,
    workingHours,
  } = place

  return (
    <Wrapper isExpanded={isInfoExpanded}>
      <Content>
        <DetailsTable
          items={[
            {
              type: 'address',
              value: address,
            },
            {
              type: 'phone',
              value: phone,
            },
            {
              type: 'workingHours',
              value: workingHours,
            },
            {
              type: 'info',
              value: description,
            },
          ]}
        />
      </Content>
    </Wrapper>
  )
}

export default inject('placeState')(observer(DetailedInfo))
