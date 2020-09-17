import { inject, observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'

import { DrumNav } from 'components/shared'

import { NavItem, ConnectedComponent } from 'types'
import { PlaceViewType } from 'types/places'

const DetailViewSelect: ConnectedComponent = ({ placeState }) => {
  const { place, setViewType, viewType } = placeState
  const { t } = useTranslation()

  if (!place) return null

  const navItems: NavItem<PlaceViewType>[] = [
    {
      name: 'home',
      label: t('PlaceViewTypes.Home'),
    },
  ]

  if (place.hasTileView) {
    navItems.push({
      name: 'tile',
      label: t('PlaceViewTypes.Tile'),
    })
  }

  if (place.hasListView) {
    navItems.push({
      name: 'list',
      label: t('PlaceViewTypes.List'),
    })
  }

  if (place.hasSwipeView) {
    navItems.push({
      name: 'swipe',
      label: t('PlaceViewTypes.Swipe'),
    })
  }

  const handlePlaceViewTypeChange = (value: PlaceViewType) => {
    setViewType(value, true)
  }

  const initialSlide = navItems.findIndex(item => item.name === viewType)

  return (
    <DrumNav<PlaceViewType>
      items={navItems}
      initialSlide={initialSlide !== -1 && initialSlide}
      onSelect={handlePlaceViewTypeChange}
    />
  )
}

export default inject('placeState')(observer(DetailViewSelect))
