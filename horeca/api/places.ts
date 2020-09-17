import firebase from 'connection/firebase'

import { UUID } from 'types'
import { LatLng } from 'types/map'

import { getGeoPoint } from './utils'

export async function getShortPlacesAround(center: LatLng, distance: number) {
  const [lesserGeoPoint, greaterGeoPoint] = getGeoPoint(center, distance)
  console.log('Start query places around:', new Date())
  const snapshot = await firebase
    .firestore()
    .collection('short_places')
    .where('geo_point', '>', lesserGeoPoint)
    .where('geo_point', '<', greaterGeoPoint)
    .get()
  console.log('End query places around:', new Date())
  return snapshot.docs.map(doc => doc.data())
}

export async function getAllShortPlaces() {
  const snapshot = await firebase
    .firestore()
    .collection('short_places')
    .get()

  return snapshot.docs.map(doc => doc.data())
}

export async function getSomePlaces(ids: UUID[]) {
  const snapshot = await firebase
    .firestore()
    .collection('places')
    .where('uid', 'in', ids)
    .get()

  return snapshot.docs.map(doc => doc.data())
}
