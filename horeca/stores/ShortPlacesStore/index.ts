import { action, computed, observable, toJS } from 'mobx'

import requests from 'connection/requests'

import { ShortPlace, PlaceType } from 'types/places'
import { LatLng } from 'types/map'
import { UUID } from 'types'

export default class ShortPlacesStore {
  @observable data = []
  @observable isFetched = false
  @observable isFetchedAll = false
  @observable hasError = false

  @computed get isEmpty(): boolean {
    return this.data.length === 0
  }

  @computed get hasPlaces(): boolean {
    return this.data.length > 0
  }

  @action
  closestIds = (id: UUID) => {
    const ids = this.data.map(item => toJS<ShortPlace>(item).id)
    const index = ids.findIndex(item => item === id)
    const currentId = ids[index]
    const prevId = index === 0 ? null : ids[index - 1]
    const nextId = index === ids.length - 1 ? null : ids[index + 1]

    if (index === -1) {
      return null
    }

    return [ prevId, currentId, nextId]
  }


  @action
  all = () => {
    return this.data
  }

  @action
  one = (id: UUID) => {
    return this.data.find(item => toJS<ShortPlace>(item).id === id)
  }

  @action
  first = () => {
    return this.data[0]
  }

  @action
  getOfType = (placeType: PlaceType) => {
    return this.data.find(item => toJS<ShortPlace>(item).type === placeType) || []
  }

  @action
  fetchAround = async(latLng: LatLng) => {
    try {
      this.isFetched = false
      const { data } = await requests.places.fetch(latLng, 1)

      this.data = data.length > 0 ? data : []
      this.isFetched = true
      return data
    }

    catch (error) {
      this.hasError = true
      this.isFetched = true

      return error
    }
  }

  @action
  fetchAll = async(latLng: LatLng) => {
    try {
      this.isFetchedAll = false
      const { data } = await requests.places.fetch(latLng)

      this.data = data.length > 0 ? data : []
      this.isFetchedAll = true

      return data
    }

    catch (error) {
      this.hasError = true
      this.isFetchedAll = true

      return error
    }
  }
}
