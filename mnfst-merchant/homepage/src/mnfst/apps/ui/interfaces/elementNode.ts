export interface IElementNode {
  height: number | null;
  left: number | null;
  node: any; // ToDo: Find proper type for all types of element nodes
  top: number | null;
  width: number | null;
}

export interface IClassNamesMap<T> {
  [name: string]: string | undefined;
}

export interface IElementEventTargetChildren {
  [name: string]: HTMLInputElement | HTMLElement;
}

export interface IElementEventTarget {
  children?: IElementEventTargetChildren;
  name: string;
  value?: any;
}
