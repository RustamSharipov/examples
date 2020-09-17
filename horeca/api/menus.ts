import firebase from 'connection/firebase'

import { UUID } from 'types'

export async function getMenuCategories() {
  const snapshot = await firebase
    .firestore()
    .collection('menu_categories')
    .get()

  return snapshot.docs.map(doc => doc.data())
}

export async function getMenuItems() {
  const snapshot = await firebase
    .firestore()
    .collection('menu_items')
    .get()

  return snapshot.docs.map(doc => doc.data())
}

export async function getPlacesMenusCategories(placesIds: UUID[]) {
  const snapshot = await firebase
    .firestore()
    .collection('menu_categories')
    .where('place_uid', 'in', placesIds)
    .get()
  
  return snapshot.docs.map(doc => doc.data())
}

export async function getPlacesMenuItems(placesIds: UUID[]) {
  const snapshot = await firebase
    .firestore()
    .collection('menu_items')
    .where('place_uid', 'in', placesIds)
    .get()

  return snapshot.docs.map(doc => doc.data())
}
