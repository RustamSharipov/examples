import { LAYOUT_DISPLAY } from 'constants/base';

const initialState = {
  isHeaderHidden: false,
  isFooterHidden: false,
};

export default function layout(state= initialState, action) {
  switch (action.type) {
    case LAYOUT_DISPLAY:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
