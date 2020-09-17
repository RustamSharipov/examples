import { action, computed, observable, toJS } from 'mobx'

import { Place } from 'types/places'

export default class PlacesState {
  @observable data: any = []
  @observable isCreated = false

  @computed get places(): Place[] {
    return this.data.map(item => toJS(item))
  }

  @computed get isEmpty(): boolean {
    return this.data.length === 0
  }

  @action
  init = (data: any) => {
    this.data = data
    this.isCreated = true
  }

  @action
  update = (data: any) => {
    this.data = data
  }

  @action
  clear = () => {
    this.data = []
    this.isCreated = false
  }
}
