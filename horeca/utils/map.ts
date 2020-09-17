import _get from 'lodash/get'

import { LatLng } from 'types/map'

export function createLatLng(lat: number, lng: number): LatLng {
  const latLng: LatLng = [lat, lng]
  return latLng
}

type DetectUserPositionSuccessCallback = (latLng: LatLng) => void
type DetectUserPositionFailCallback = () => void

export function detectUserPosition(success: DetectUserPositionSuccessCallback, fail?: DetectUserPositionFailCallback) {
  if (navigator?.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: Position) => {
        const { latitude, longitude } = position.coords
        const latLng: LatLng = [latitude, longitude]
        success(latLng)
      },

      () => {
        if (fail) fail()
      },
    )
  }
}

const geoPositionName = {
  x: 'lat',
  y: 'lng',
}

function distanceBetweenPoints(p1, p2) {
  return Math.abs(Math.sqrt(getDistanceY(p1, p2) + getDistanceX(p1, p2)))
}

function getDistanceX(p1, p2) {
  return (_get(p1, geoPositionName.x) - _get(p2, geoPositionName.x)) * (_get(p1, geoPositionName.x) - _get(p2, geoPositionName.x))
}

function getDistanceY(p1, p2) {
  return (_get(p1, geoPositionName.y) - _get(p2, geoPositionName.y)) * (_get(p1, geoPositionName.y) - _get(p2, geoPositionName.y))
}

function sortByDistance<T>(origin, points): T[] {
  const newPoints = points.slice()

  newPoints.sort(function (a, b) {
    a.distance = distanceBetweenPoints(origin, a)
    b.distance = distanceBetweenPoints(origin, b)

    return a.distance - b.distance
  })

  return newPoints
}

export function sortPlacesByDistance<T>(places: T[], mapCenter: LatLng): T[] {
  const sortedPlaces = sortByDistance<T>(
    {
      lng: mapCenter[0],
      lat: mapCenter[1],
    },
    places,
  )

  return sortedPlaces
}
