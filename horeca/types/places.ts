import { MediaUri, UUID } from 'types'
import { Currency } from 'types/localization'
import { MenuCategory } from 'types/menus'

export type PlaceType = 'beach' | 'hotel' | 'restaurant'

export type Place = {
  id: UUID,
  address: string,
  city: string,
  country: string,
  currency: Currency,
  description: string,
  hasMenu: boolean,
  hasListView: boolean,
  hasSwipeView: boolean,
  hasTileView: boolean,
  lat: number,
  lng: number,
  menu: MenuCategory[],
  name: string,
  latinName: string,
  phone: string,
  photoUris: MediaUri[],
  radius: number,
  serviceFee: number,
  shortDescription: string,
  supportedFlows: SupportedFlows,
  tax: 0,
  type: PlaceType,
  videoUri: MediaUri,
  workingHours: WorkingHours,
}

export type ShortPlace = {
  id: UUID,
  distance?: number,
  lat: number,
  lng: number,
  name: string,
  latinName: string,
  photoUris: MediaUri[],
  type: PlaceType,
}

export type SupportedFlows = {
  chats: boolean,
  orders: boolean,
}

export type WorkingHours = [string, string]

export type PlaceViewType = 'home' | 'tile' | 'list' | 'swipe' | 'drinks' | 'order'
