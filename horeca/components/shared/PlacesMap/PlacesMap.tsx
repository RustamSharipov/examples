import { FC, useState, useRef, MutableRefObject } from 'react'
import { Map } from 'react-leaflet-universal'
import dynamic from 'next/dynamic'

import { PlaceMapTooltip } from 'components/shared'
import { UserCurrentPosition, UserCurrentPositionControl, Wrapper } from '.'

import { LatLng } from 'types/map'
import { ShortPlace } from 'types/places'

import { GOOGLE_MAPS_API_KEY } from 'defaults'

const ReactLeafletGoogleLayer = dynamic(
  () => import('react-leaflet-google-layer'),
  { ssr: false },
)

const PlaceMarker = dynamic(
  () => import('components/shared/PlaceMarker'),
  { ssr: false },
)

const googleMapsLoaderConf: any = { KEY: GOOGLE_MAPS_API_KEY }

interface IProps {
  center: LatLng
  currentPosition?: LatLng
  language: string
  places: ShortPlace[]
  region: string
  zoom: number
  onCenterChange: (lat: number, lng: number) => void
  onZoomChange: (zoom: number) => void
  onLoaded?: () => void
  onPlaceSelect: (placeItem: ShortPlace) => void
  onPlaceHighlight: (placeItem: ShortPlace) => void
  onViewCenter: () => void
}

const PlacesMap: FC<IProps> = ({
  center,
  currentPosition,
  places,
  zoom,
  onLoaded,
  onPlaceSelect,
  onPlaceHighlight,
  onViewCenter,
  onCenterChange,
  onZoomChange,
}) => {
  const ref = useRef() as MutableRefObject<any>
  const [visiblePlaces, setVisiblePlaces] = useState([])

  const options = {
    attributionControl: false,
    clickableIcons: false,
    fullscreenControl: false,
    preferCanvas: false,
    zoomControl: false,
  }

  // const urlKeys = {
  //   language,
  //   region,
  //   key: GOOGLE_MAPS_API_KEY,
  // }

  const handlePlaceClick = (placeItem: ShortPlace) => {
    onPlaceHighlight(placeItem)
  }

  const handleViewCenter = () => {
    onViewCenter()
  }

  const handleMarkersDisplay = () => {
    const map = ref.current.leafletElement
    const visiblePlaces = places.filter(place => map.getBounds().contains(place))
  
    setVisiblePlaces(visiblePlaces)
  }

  const handleLoaded = () => {
    handleMarkersDisplay()

    if (onLoaded) onLoaded()
  }

  const handlePlaceSelect = (placeItem: ShortPlace) => {
    onPlaceSelect(placeItem)
  }

  const handleZoom = ({ target }) => {
    onZoomChange(target._zoom)
  }

  const handleMove = ({ target }) => {
    const { lat, lng } = target._lastCenter
    onCenterChange(lat, lng)
  }

  const markers = visiblePlaces.map(placeItem => (
    <PlaceMarker
      key={placeItem.id}
      data={placeItem}
      zoom={zoom}
      renderTooltip={() =>
        <PlaceMapTooltip
          data={placeItem}
          onClick={handlePlaceSelect}
        />
      }
      onClick={handlePlaceClick}
    />
  ))

  const renderCurrentPosition = () => {
    if (!currentPosition) return null

    return (
      <UserCurrentPosition
        lat={currentPosition[0]}
        lng={currentPosition[1]}
      />
    )
  }

  return (
    <Wrapper>
      <Map
        ref={ref}
        center={center}
        zoom={zoom}
        onMove={handleMove}
        onMoveEnd={handleMarkersDisplay}
        onZoom={handleZoom}
        onLoad={handleLoaded}
        { ...options }
      >
        <ReactLeafletGoogleLayer
          googleMapsLoaderConf={googleMapsLoaderConf}
          type={'terrain'}
        />

        {markers}
        {renderCurrentPosition()}
      </Map>

      <UserCurrentPositionControl onClick={handleViewCenter} />
    </Wrapper>
  )
}

export default PlacesMap
