import { action, observable } from 'mobx'

import requests from 'connection/requests'

export default class PlacesStore {
  @observable data = {
    categories: null,
    items: null,
  }
  @observable isFetched = false
  @observable hasError = false

  @action
  all = () => {
    return this.data
  }

  @action
  fetch = async() => {
    try {
      this.isFetched = false
      const { data: categories } = await requests.menus.categories.fetch()
      const { data: items } = await requests.menus.items.fetch()
      const data = {
        categories,
        items,
      }

      this.data = data
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
