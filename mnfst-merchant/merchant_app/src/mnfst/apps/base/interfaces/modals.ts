export interface IModalsReducer {
  modal?: React.ReactNode;
  text?: string | null;
}

export interface IModalActionDisplay {
  modal?: React.ReactNode;
  text?: string | null;
}

export interface IModalsActions {
  close: () => void;
  display: (props: IModalActionDisplay) => void;
}
