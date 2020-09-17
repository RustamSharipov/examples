import { action, computed, observable, toJS } from 'mobx'

import { Place } from 'types/places'

import { createLatLng } from 'utils/map'

import { MAP_CENTER, MAP_ZOOM } from 'defaults'

export default class PlacesMapState {
  @observable data = []
  @observable isCreated = false
  @observable isMapLoaded = false
  @observable mapCenter: any = null
  @observable zoom = MAP_ZOOM

  @computed get places(): Place[] {
    return this.data.map(item => toJS<Place>(item))
  }

  @computed get isEmpty(): boolean {
    return this.data.length === 0
  }

  @action
  init = (data: any) => {
    this.data = data
    this.toClosestPlace()
    this.isCreated = true
  }

  @action
  update = (data: any) => {
    this.data = data
    this.toClosestPlace()
  }

  @action
  clear = () => {
    this.data = []
    this.isCreated = false
  }

  @action
  toClosestPlace = () => {
    const closestPlace = this.places[0]
    this.mapCenter = closestPlace ? createLatLng(closestPlace.lat, closestPlace.lng) : MAP_CENTER
  }

  @action
  setMapLoaded = () => {
    this.isMapLoaded = true
  }

  @action
  setMapCenter = (lat: number, lng: number) => {
    this.mapCenter = createLatLng(lat, lng)
  }

  @action
  setZoom = (zoom: number) => {
    this.zoom = zoom
  }
}
