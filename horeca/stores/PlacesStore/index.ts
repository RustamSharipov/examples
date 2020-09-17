import { action, computed, observable, toJS } from 'mobx'

import requests from 'connection/requests'

import { UUID } from 'types'
import { Place } from 'types/places'

export default class PlacesStore {
  @observable data = []
  @observable isFetched = false
  @observable hasError = false

  @computed get isEmpty(): boolean {
    return this.data.length === 0
  }

  @computed get hasPlaces(): boolean {
    return this.data.length > 0
  }

  @action
  all = () => {
    return this.data
  }

  @action
  one = (id: UUID) => {
    return this.data.find(item => toJS<Place>(item).id === id)
  }

  @action
  first = () => {
    return this.data[0]
  }

  @action
  fetch = async(ids: UUID[]) => {
    try {
      this.isFetched = false
      const { data } = await requests.places.fetchSome(ids)

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
}
