import { NextApiRequest, NextApiResponse } from 'next'

import { getShortPlacesAround, getAllShortPlaces, getSomePlaces } from 'api/places'
import { getPlacesMenusCategories, getPlacesMenuItems } from 'api/menus'

import { createPlace, createShortPlace, createError } from 'api/models'

import { sortPlacesByDistance } from 'utils/map'

import { UUID } from 'types'
import { LatLng } from 'types/map'
import { ShortPlace } from 'types/places'

import { createLatLng } from 'utils/map'

const getPlacesListAround = async(center: LatLng, distance: number) => {
  const data = await getShortPlacesAround(center, distance)
  console.log('Got places around:', new Date())
  const placesList = data
    .filter(place => place.uid)
    .map(place => createShortPlace(place))

  return sortPlacesByDistance<ShortPlace>(placesList, center)
}

const getAllShortPlacesList = async(center: LatLng) => {
  const data = await getAllShortPlaces()
  const placesList = data.map(place => createShortPlace(place))

  return sortPlacesByDistance<ShortPlace>(placesList, center)
}

const getPlacesByIds = async(placesIds: UUID[]) => {
  const ids = Array.isArray(placesIds) ? placesIds : [placesIds]
  const somePlaces = await getSomePlaces(ids)
  const menuCategories = await getPlacesMenusCategories(ids)
  const categoriesIds = menuCategories.map(item => item.uid)
  const menuItems = await getPlacesMenuItems(ids)
  const menuItemsIds = menuItems.map(item => item.uid)
  const places = somePlaces.map(place => ({
    ...place,
    menu: menuCategories
      .filter(category => categoriesIds.includes(category.uid) && category.place_uid === place.uid)
      .map(category => ({
        ...category,
        items: menuItems.filter(
          item => menuItemsIds.includes(item.uid) && item.is_active && item.place_uid === place.uid
            && item.category_uid === category.uid,
        ),
      })),
  }))

  return places.map(place => createPlace(place))
}

export default async(request: NextApiRequest, response: NextApiResponse) => {
  const { query } = request
  const center = query['center[]'] && createLatLng(
    Number(query['center[]'][0]),
    Number(query['center[]'][1]),
  )
  const ids = query['ids[]'] as UUID[]
  const distance = Number(query.distance)

  if (ids) {
    try {
      const data = await getPlacesByIds(ids)
      response
        .status(200)
        .json(data)
    }

    catch (error) {
      response.json(error)
    }
  }

  else if (center) {
    try {
      const data = distance
        ? await getPlacesListAround(center, distance)
        : await getAllShortPlacesList(center)

      response
        .status(200)
        .json(data)
    }

    catch (error) {
      response.json(error)
    }
  }

  else {
    response
      .status(400)
      .json(createError('Method not implemented'))
  }
}
