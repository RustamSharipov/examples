import { MenuItem } from 'types/menus'

import { createMedia, emptyStringToNull } from 'api/utils'

export default function createMenuItem(props): MenuItem {
  const menuItem: MenuItem = {
    id: props.uid,
    alcoholDegrees: emptyStringToNull(props.alcohol_degrees),
    calories: emptyStringToNull(props.calories),
    categoryId: props.category_uid,
    cookingTime: emptyStringToNull(props.cooking_time),
    defaultPriority: props.default_priority,
    description: emptyStringToNull(props.description),
    indexInBest: props.index_in_best,
    ingredients: emptyStringToNull(props.ingredients),
    isActive: props.is_active,
    isHidden: props.is_hidden,
    isTheBestDish: props.is_the_best_dish,
    modifiers: props.modifiers,
    onStopTitle: emptyStringToNull(props.on_stop_title),
    photoUri: createMedia(props.photo_uri),
    placeId: props.place_uid,
    price: Number(props.price),
    recipe: emptyStringToNull(props.recipe),
    sortIndex: props.sort_index,
    title: emptyStringToNull(props.title),
    type: props.type,
    updatedAt: props.updated_at,
    videoUri: props.video_uri,
  }

  return menuItem
}
