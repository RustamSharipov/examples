import { MediaUri, UUID } from 'types'

export type MenuType = 'food' | 'drink'

export type MenuItemModifier = {
  uid: string,
}

export type MenuItem = {
  id: UUID,
  alcoholDegrees: number,
  calories: number,
  categoryId: UUID,
  cookingTime: number,
  defaultPriority: number,
  description: string,
  indexInBest: number,
  ingredients: string,
  isActive: boolean,
  isHidden: boolean,
  isTheBestDish: boolean,
  modifiers: MenuItemModifier[],
  onStopTitle: string,
  photoUri: MediaUri,
  placeId: UUID,
  price: number,
  recipe: string,
  sortIndex: number,
  title: string,
  type: MenuType,
  updatedAt: string,
  videoUri: MediaUri,
}

export type MenuCategory = {
  id: UUID,
  description: string,
  isActive: boolean,
  items: MenuItem[],
  photoUri: MediaUri,
  placeId: UUID,
  sortIndex: number,
  title: string,
  type: MenuType,
  updatedAt: string,
}
