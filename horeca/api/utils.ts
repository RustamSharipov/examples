import { firestore } from 'firebase'

import { MediaUri } from 'types'
import { LatLng } from 'types/map'

export const createMedia = (imageUri): MediaUri => {
  if (imageUri) {
    if (typeof imageUri === 'string' && imageUri.length > 0) {
      return {
        url: imageUri,
      }
    }

    else if (typeof imageUri === 'object' && imageUri.url) {
      return imageUri
    }
  }

  return null
}

export const emptyStringToNull = <T = any>(value: T) => {
  if (typeof value === 'string' && value === '') {
    return null
  }

  return value
}

export const getGeoPoint = (latLng: LatLng, distance: number) => {
  const latitude = latLng[0]
  const longitude = latLng[1]

  // one mile in lat and lng
  const mileInLat = 0.0144927536231884
  const mileInLng = 0.0181818181818182
  const lowerLat = latitude - (mileInLat * distance)
  const lowerLng = longitude - (mileInLng * distance)
  const greaterLat = latitude + (mileInLat * distance)
  const greaterLng = longitude + (mileInLng * distance)
  const lesserGeopoint = new firestore.GeoPoint(lowerLat, lowerLng)
  const greaterGeopoint = new firestore.GeoPoint(greaterLat, greaterLng)

  return [lesserGeopoint, greaterGeopoint]
}
