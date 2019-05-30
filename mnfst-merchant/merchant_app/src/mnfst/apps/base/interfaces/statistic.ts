import { IMoney } from 'apps/campaigns/interfaces/campaign';

export interface IStatistic {
  balance: IMoney;
  credit: IMoney;
  reserved: IMoney;
}

export interface IStatisticReducer {
  statistic: IStatistic | null;
  status: string | null;
}

export interface IStatisticActions {
  fetchData: () => void;
}
