import { OperationStatus } from 'apps/ui/types/base';
import { IElementNode } from 'apps/ui/interfaces/elementNode';
import { IMoney } from 'apps/ui/interfaces/money';

export interface IMediaSrcSet {
  desktop?: string[];
  mobile?: string[];
}

export interface ICreative {
  id: number;
  brand?: string;
  gender?: string;
  name: string;
  getName: () => string;
  price?: IMoney;
  srcSet: IMediaSrcSet;
  type: string;
}

export interface IHome {
  total_earn?: IMoney;
}

export interface IHomeReducer {
  home: IHome;
  navigation: any[];
  status: OperationStatus;
}

export interface IHomeActionAddNavigationItem {
  id: string;
  elementNode: IElementNode;
}

export interface IHomeActions {
  addNavigationItem: (params: IHomeActionAddNavigationItem) => void;
  fetchData: () => void;
}
