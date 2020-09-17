import { DistanceUnits } from 'types'
import { LatLng } from 'types/map'

function distanceBetweenEarthCoordinates(point1: LatLng, point2: LatLng, units?: DistanceUnits): [number, DistanceUnits] {
  const degreesToRadians = (degrees: number) => degrees * Math.PI / 180
  let distanceUnits = units

  const earthRadiusKm = 6371
  const dLat = degreesToRadians(point2[0] - point1[0])
  const dLon = degreesToRadians(point2[1] - point1[1])

  const lat1 = degreesToRadians(point1[0])
  const lat2 = degreesToRadians(point2[0])

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2)
    * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  let value = earthRadiusKm * c

  if (value < 1 || units === 'm') {
    value *= 1000
    distanceUnits = 'm'
  }
  
  else {
    distanceUnits = 'km'
  }

  return [
    Math.floor(value),
    distanceUnits,
  ]
}

export default {
  distanceBetweenEarthCoordinates,
}
