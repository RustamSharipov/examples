import axios from 'axios'

import { UUID } from 'types'
import { LatLng } from 'types/map'

export default {
  menus: {
    categories: {
      fetch: () => axios.get('/api/menus'),
    },
    items: {
      fetch: () => axios.get('/api/menus/items'),
    },
  },

  places: {
    fetch: (center: LatLng, distance?: number) => axios.get('/api/places', { params: { center, distance } }),
    fetchSome: (ids: UUID[]) => axios.get('/api/places', { params: { ids } }),
  },
}
