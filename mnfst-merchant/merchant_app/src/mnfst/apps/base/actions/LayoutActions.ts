import { LAYOUT_DISPLAY } from 'constants/base';
import { ILayoutActionInit } from 'apps/base/interfaces/layout';

export function init(props: ILayoutActionInit) {
  const { isAdaptive, isHeaderHidden, isFooterHidden } = props;

  return (dispatch) => {
    dispatch({
      type: LAYOUT_DISPLAY,
      payload: {
        isHeaderHidden,
        isFooterHidden,
        isAdaptive,
      },
    });
  };
}
