export interface ILayoutActionInit {
  isHeaderHidden?: boolean;
  isFooterHidden?: boolean;
  isAdaptive?: boolean;
}

export interface ILayoutActions {
  init: (props: ILayoutActionInit) => void;
}
