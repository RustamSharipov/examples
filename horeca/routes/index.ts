import { UUID } from 'types'
import { PlaceType } from 'types/places'

export default {
  home: {
    all: () => ([
      '/',
      '/',
    ]),
  },

  places: {
    all: (type: PlaceType) => ([
      '/[place]',
      `/${type}`,
    ]),

    one: (type: PlaceType, id: UUID) => ([
      '/[place]/[id]',
      `/${type}/${id}`,
    ]),
  },
}
