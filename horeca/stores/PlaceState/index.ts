import { action, computed, observable, toJS } from 'mobx'

import { Place, PlaceViewType } from 'types/places'
import { MenuType, MenuItem } from 'types/menus'

const defaults = {
  menuType: 'food',
  viewType: 'home',
}

export default class PlaceState {
  @observable data = null
  @observable isCreated = false
  @observable isInfoExpanded = false
  @observable menuType = defaults.menuType
  @observable viewType = defaults.viewType
  @observable currentMenuItem: MenuItem = null
  @observable menuItems: MenuItem[] = []

  @computed get place(): Place {
    return toJS<Place>(this.data)
  }

  @computed get isEmpty(): boolean {
    return this.data
  }

  @action
  init = (data: any, viewType: PlaceViewType) => {
    this.data = data
    this.isCreated = true
    this.setViewType(viewType)
  }

  @action
  clear = () => {
    this.data = null
    this.isCreated = false
    this.isInfoExpanded = false
  }

  @action
  setViewType = (type: PlaceViewType = 'home', isPush?: boolean) => {
    this.viewType = type
    if (isPush) history.pushState(null, null, `?view=${type}`)
  }

  @action
  setMenuType = (type: MenuType = 'food') => {
    this.menuType = type
  }

  @action
  setCurrentMenuItem = (menuItem: MenuItem) => {
    this.currentMenuItem = menuItem
  }

  @action
  collapseInfo = () => {
    this.isInfoExpanded = false
  }

  @action
  expandInfo = () => {
    this.isInfoExpanded = true
  }

  @action
  getOrderAmount = () => {
    const amount = this.menuItems.reduce((result, item) => result + (item?.price || 0), 0)
    return Number(amount.toFixed(2))
  }

  @action
  addOrderItem = () => {
    this.menuItems.push(this.currentMenuItem)
  }

  @action
  removeOrderItem = () => {
    (this.menuItems as any).remove(this.currentMenuItem)
  }

  @action
  clearOrderItems = () => {
    this.menuItems = []
  }
}
