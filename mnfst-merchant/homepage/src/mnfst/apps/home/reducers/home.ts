import { HOME_UPDATE_HOME_DETAILS, HOME_ADD_NAVIGATION_ITEM } from 'constants/home';
import { IHomeReducer } from 'apps/home/interfaces/home';

const initialState: IHomeReducer = {
  home: {},
  navigation: [],
  status: null,
};

export default function home(state = initialState, action) {
  switch (action.type) {
    case HOME_UPDATE_HOME_DETAILS:
      return {
        ...state,
        ...action.payload,
      };

    case HOME_ADD_NAVIGATION_ITEM:
      const { id, elementNode } = action.payload;

      return {
        ...state,
        navigation: {
          ...state.navigation,
          [id]: elementNode,
        },
      };

    default:
      return state;
  }
}
