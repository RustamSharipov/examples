import { MenuCategory } from 'types/menus'

import { createMedia, emptyStringToNull } from 'api/utils'

import { createMenuItem } from '.'

export default function createMenu(props): MenuCategory {
  const photoUri = createMedia(props.photo_uri) || createMedia(props.items[0]?.photo_uri)
  const menuCategory: MenuCategory = {
    photoUri,
    id: props.uid,
    description: emptyStringToNull(props.description),
    isActive: props.is_active,
    items: props.items ? props.items.map(item => createMenuItem(item)) : [],
    placeId: props.place_uid,
    sortIndex: props.sort_index,
    title: emptyStringToNull(props.title),
    type: emptyStringToNull(props.type),
    updatedAt: props.updated_at,
  }

  return menuCategory
}
