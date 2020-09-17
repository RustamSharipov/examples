import { ShortPlace } from 'types/places'

import { createMedia } from 'api/utils'

export default function createShortPlace(props): ShortPlace {
  const place: ShortPlace = {
    id: props.uid,
    lat: props.l[0],
    lng: props.l[1],
    name: props.name,
    latinName: props.lat_name,
    photoUris: props.photo_uris ? props.photo_uris.map(item => createMedia(item)).filter(item => item) : [],
    type: props.type,
  }

  return place
}
