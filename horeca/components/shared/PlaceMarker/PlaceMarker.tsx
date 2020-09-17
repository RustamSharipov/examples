import { FC, ReactNode } from 'react'
import { CircleMarker, Marker, Tooltip } from 'react-leaflet-universal'

import { ShortPlace } from 'types/places'

import { createLatLng } from 'utils/map'
import colors from 'theme/colors'

interface IProps {
  data: ShortPlace
  zoom: number
  renderTooltip?: () => ReactNode
  onClick: (data: ShortPlace) => void
}

const PlaceMarker: FC<IProps> = ({ data, zoom, renderTooltip, onClick }) => {
  const { type } = data
  const latLng = createLatLng(data.lat, data.lng)

  const handleClick = () => {
    onClick(data)
  }

  const renderIcon = () => {
    const Leaflet = require('leaflet')

    switch (type) {
      case 'beach':
        return Leaflet.icon({
          iconUrl: 'images/beachPlace.svg',
          iconSize: [48, 48],
          iconAnchor: [24, 42],
        })

      case 'hotel':
        return Leaflet.icon({
          iconUrl: 'images/hotelPlace.svg',
          iconSize: [48, 48],
          iconAnchor: [24, 42],
        })

      case 'restaurant':
        return Leaflet.icon({
          iconUrl: 'images/restaurantPlace.svg',
          iconSize: [48, 48],
          iconAnchor: [24, 42],
        })

      default:
        return null
    }
  }

  const placeMarkerOptions = {
    icon: renderIcon(),
    position: latLng,
  }

  const circleMarkerOptions = {
    center: latLng,
    color: colors['primary.light'],
    fillColor: colors['primary.darkest'],
    fillOpacity: 1,
    radius: zoom < 10 ? 4 : 5,
    weight: 1,
  }

  const renderMarkerTooltip = () =>
    <Tooltip direction="center">
      {renderTooltip()}
    </Tooltip>

  if (zoom < 16) {
    return (
      <CircleMarker
        {...circleMarkerOptions}
        onClick={handleClick}
      >
        {renderMarkerTooltip()}
      </CircleMarker>
    )
  }

  return (
    <Marker
      {...placeMarkerOptions}
      onClick={handleClick}
    >
      {renderMarkerTooltip()}
    </Marker>
  )
}

export default PlaceMarker
