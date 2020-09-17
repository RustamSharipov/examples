import { useTranslation } from 'react-i18next'
import { inject, observer } from 'mobx-react'

import { CategoryNav } from 'components/shared'

import { NavItem, ConnectedComponent } from 'types'
import { PlaceType } from 'types/places'

const PlaceTypeSelect: ConnectedComponent = ({ placesMapState, shortPlacesStore, rootState }) => {
  const { t } = useTranslation()
  const { placeType, setPlaceType } = rootState
  const { update } = placesMapState
  const { getOfType } = shortPlacesStore

  const navItems: NavItem<PlaceType>[] = [
    {
      name: 'restaurant',
      label: t('PlaceTypes.Restaurants'),
    },
    {
      name: 'hotel',
      label: t('PlaceTypes.Hotels'),
      isDisabled: true,
    },
    {
      name: 'beach',
      label: t('PlaceTypes.Beaches'),
      isDisabled: true,
    },
  ]

  const handlePlaceTypeChange = (type: PlaceType) => {
    setPlaceType(type)
    update(getOfType(type))
  }

  return (
    <CategoryNav<PlaceType>
      items={navItems}
      value={placeType}
      onSelect={handlePlaceTypeChange}
    />
  )
}

export default inject('placesMapState', 'shortPlacesStore', 'rootState')(observer(PlaceTypeSelect))
