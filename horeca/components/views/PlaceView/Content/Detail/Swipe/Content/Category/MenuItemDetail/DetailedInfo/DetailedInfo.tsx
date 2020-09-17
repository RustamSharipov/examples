import { inject, observer } from 'mobx-react'

import { ConnectedComponent } from 'types'
import { MenuItem } from 'types/menus'

import { DetailsTable } from 'components/views/PlaceView/components'
import { Content, Wrapper } from '.'

interface IProps {
  data: MenuItem
}

const DetailedInfo: ConnectedComponent<IProps> = ({ data, placeState }) => {
  const { isInfoExpanded } = placeState

  const {
    calories,
    cookingTime,
    description,
    ingredients,
    recipe,
  } = data

  return (
    <Wrapper isExpanded={isInfoExpanded}>
      <Content>
        <DetailsTable
          items={[
            {
              type: 'calories',
              value: calories,
            },
            {
              type: 'cookingTime',
              value: cookingTime,
            },
            {
              type: 'info',
              value: description,
            },
            {
              type: 'ingredients',
              value: ingredients,
            },
            {
              type: 'recipe',
              value: recipe,
            },
          ]}
        />
      </Content>
    </Wrapper>
  )
}

export default inject('placeState')(observer(DetailedInfo))
