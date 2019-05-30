import { MODAL_DISPLAY } from 'constants/base';

const initialState = {
  modal: null,
};

export default function modals(state= initialState, action) {
  switch (action.type) {
    case MODAL_DISPLAY:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
