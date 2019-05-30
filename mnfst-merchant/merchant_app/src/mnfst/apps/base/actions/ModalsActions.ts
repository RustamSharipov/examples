import { MODAL_DISPLAY } from 'constants/base';
import { IModalActionDisplay } from 'apps/base/interfaces/modals';

export function display(props: IModalActionDisplay) {
  const { modal, text } = props;

  return (dispatch) => {
    dispatch({
      type: MODAL_DISPLAY,
      payload: { modal, text },
    });
  };
}

export function close() {
  return (dispatch) => {
    dispatch({
      type: MODAL_DISPLAY,
      payload: {
        modal: null,
        text: null,
      },
    });
  };
}
