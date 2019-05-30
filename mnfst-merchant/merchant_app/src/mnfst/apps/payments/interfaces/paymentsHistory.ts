import { IMoney } from 'apps/campaigns/interfaces/campaign';
import { IPDF } from 'interfaces';

export interface ISpendingDetailsCampaign {
  id: number;
  amount: IMoney;
  commission_percentage: number;
  impressions: number;
  name: string;
}

export interface IPaymentsHistoryPaymentAccount {
  account_type: string;
  brand: string;
  last_digits: string;
}

export interface IPaymentsInvoicesItem {
  id: number;
  amount: IMoney;
  date: string;
  pdf: IPDF;
}

export interface IPaymentsTransactionsItem {
  id: number;
  amount: IMoney;
  created_at: string;
  description: string;
  object_id: string;
  payment_account: IPaymentsHistoryPaymentAccount | null;
  state: string;
}

export interface IPaymentsSpendingDetailsItem {
  id: number;
  amount: IMoney;
  campaigns: ISpendingDetailsCampaign[];
  campaigns_count: number;
  date: string;
  impressions: number;
}

export interface IPaymentsHistoryReducer {
  dateFrom?: string;
  dateTo?: string;
  page: number | null;
  totalPages: number;
  invoices: IPaymentsInvoicesItem[];
  transactions: IPaymentsTransactionsItem[];
  spendingDetails: IPaymentsSpendingDetailsItem[];
  status: string | null;
  total: any | null;
  type: string;
}

export interface IPaymentsHistoryActionChangeHistoryTypeParams {
  history: any;
  type: string;
}

export interface IPaymentsTransactionsActionUpdateDateParams {
  dateFrom: string;
  dateTo: string;
  history: any;
}

export interface IPaymentsHistoryActions {
  changeHistoryType: (params: IPaymentsHistoryActionChangeHistoryTypeParams) => void;
  fetchData: () => void;
  init: () => void;
  updateDate: (params?: IPaymentsTransactionsActionUpdateDateParams) => void;
}
