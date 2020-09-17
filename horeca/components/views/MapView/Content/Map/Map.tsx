import { inject, observer } from 'mobx-react'
import { useRouter } from 'next/router'

import { PlacesMap } from 'components/shared'

import { ConnectedComponent } from 'types'
import { ShortPlace } from 'types/places'

import routes from 'routes'
import { detectUserPosition } from 'utils/map'

import { MAP_ZOOM } from 'defaults'

const Map: ConnectedComponent = ({ placesStore, placesMapState, rootState }) => {
  const router = useRouter()

  const {
    language,
    region,
    userPosition,
  } = rootState

  const {
    isEmpty,
    mapCenter,
    places,
    zoom,
    setMapCenter,
    setMapLoaded,
    setZoom,
  } = placesMapState

  const { fetch } = placesStore

  const handleMapLoad = () => {
    setMapLoaded()
  }

  const handlePlaceHighlight = (placeItem: ShortPlace) => {
    fetch([placeItem.id])
  }

  const handlePlaceSelect = (placeItem: ShortPlace) => {
    console.log(placeItem)
    const [url, as] = routes.places.one(placeItem.type, placeItem.id)
    router.push(url, as)
  }

  const handleViewCenter = () => {
    detectUserPosition((latLng) => {
      setMapCenter(...latLng)
      setZoom(MAP_ZOOM)
    })
  }

  const handleCenterChange = (lat: number, lng: number) => {
    setMapCenter(lat, lng)
  }

  const handleZoomChange = (zoom: number) => {
    setZoom(zoom)
  }

  if (isEmpty) return null

  return (
    <PlacesMap
      center={mapCenter}
      currentPosition={userPosition}
      language={language}
      places={places}
      region={region}
      zoom={zoom}
      onCenterChange={handleCenterChange}
      onZoomChange={handleZoomChange}
      onLoaded={handleMapLoad}
      onPlaceHighlight={handlePlaceHighlight}
      onPlaceSelect={handlePlaceSelect}
      onViewCenter={handleViewCenter}
    />
  )
}

export default inject('placesStore', 'placesMapState', 'rootState')(observer(Map))
