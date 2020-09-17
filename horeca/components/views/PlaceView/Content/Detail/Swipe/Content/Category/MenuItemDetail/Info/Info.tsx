import { ReactNode } from 'react'
import { inject, observer } from 'mobx-react'

import { ConnectedComponent } from 'types'
import { MenuItem } from 'types/menus'

import { MenuItemInfo } from 'components/shared'
import { Wrapper } from '.'

interface IProps {
  data: MenuItem
  renderExpandInfoControl?: () => ReactNode
}

const Info: ConnectedComponent<IProps> = ({ data, placeState, renderExpandInfoControl }) => {
  const { isInfoExpanded, place } = placeState

  return (
    <Wrapper isExpanded={isInfoExpanded}>
      <MenuItemInfo
        data={data}
        currency={place.currency}
        renderExpandInfoControl={renderExpandInfoControl}
      />
    </Wrapper>
  )
}

export default inject('placeState')(observer(Info))
