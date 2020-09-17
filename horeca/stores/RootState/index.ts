import { action, observable, computed } from 'mobx'

import { PlaceType } from 'types/places'
import { LatLng } from 'types/map'

import { MAP_CENTER } from 'defaults'
import { createLatLng } from 'utils/map'

export default class RootState {
  @observable isGeoLocationEnabled = false
  @observable isPreloaderDisplay = true
  @observable isInitialUserLocationDetected = false
  @observable language = 'ru'
  @observable placeType: PlaceType = null
  @observable region = 'ru'
  @observable userGeoPosition = null

  @computed get userPosition() {
    return this.userGeoPosition && createLatLng(this.userGeoPosition[0], this.userGeoPosition[1])
  }

  @action
  showPreloader = () => {
    this.isPreloaderDisplay = true
  }

  @action
  hidePreloader = () => {
    this.isPreloaderDisplay = false
  }

  @action
  setPlaceType = (type: PlaceType) => {
    this.placeType = type
  }

  @action
  setUserPosition = (latLng: LatLng) => {
    this.isGeoLocationEnabled = true
    this.isInitialUserLocationDetected = true
    this.userGeoPosition = latLng
  }

  @action
  disableUserPositionDetecting = () => {
    this.isGeoLocationEnabled = false
    this.isInitialUserLocationDetected = true
    this.userGeoPosition = MAP_CENTER
  }
}
