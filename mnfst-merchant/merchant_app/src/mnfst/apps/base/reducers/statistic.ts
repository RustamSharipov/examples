import { STATISTIC_UPDATE } from 'constants/base';
import { IStatisticReducer } from 'apps/base/interfaces/statistic';

const initialState: IStatisticReducer = {
  statistic: null,
  status: null,
};

export default function statistic(state= initialState, action) {
  switch (action.type) {
    case STATISTIC_UPDATE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
