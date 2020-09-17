import { Place } from 'types/places'

import { createMedia, emptyStringToNull } from 'api/utils'
import { createMenu } from '.'

export default function createPlace(props): Place {
  const place: Place = {
    id: props.uid,
    address: emptyStringToNull(props.address),
    city: emptyStringToNull(props.city),
    country: emptyStringToNull(props.country),
    currency: emptyStringToNull(props.currency),
    description: emptyStringToNull(props.description),
    hasMenu: props.has_menu,
    hasListView: props.is_list_menu_hidden,
    hasSwipeView: props.is_swipe_menu_available_new,
    hasTileView: props.is_tile_menu_available_new,
    lat: props.l[0],
    lng: props.l[1],
    menu: props.menu ? props.menu.map(item => createMenu(item)) : [],
    name: emptyStringToNull(props.name),
    latinName: emptyStringToNull(props.lat_name),
    phone: emptyStringToNull(props.phone),
    photoUris: props.photo_uris.map(item => createMedia(item)).filter(item => item),
    radius: props.radius,
    serviceFee: emptyStringToNull(props.service_fee),
    shortDescription: emptyStringToNull(props.short_description),
    supportedFlows: props.supported_flows,
    tax: emptyStringToNull(props.tax),
    type: emptyStringToNull(props.type),
    videoUri: createMedia(props.video_uri),
    workingHours: props.working_hours,
  }

  return place
}
