import 'mobx-react-lite/batchingForReactDom'

import MenusStore from './MenusStore'
import PlacesStore from './PlacesStore'
import PlacesState from './PlacesState'
import PlacesMapState from './PlacesMapState'
import PlaceState from './PlaceState'
import ShortPlacesStore from './ShortPlacesStore'
import RootState from './RootState'

export const stores = {
  menusStore: new MenusStore(),
  placeState: new PlaceState(),
  placesStore: new PlacesStore(),
  placesState: new PlacesState(),
  placesMapState: new PlacesMapState(),
  shortPlacesStore: new ShortPlacesStore(),
  rootState: new RootState(),
}

export function initStore() {
  return stores
}
