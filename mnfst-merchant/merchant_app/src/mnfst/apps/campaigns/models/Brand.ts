import { IBrand } from 'apps/brands/interfaces';

export default class Brand {
  public color: string;
  public image: string;
  public name: string;

  constructor(props?: IBrand) {
    this.color = props && props.color || '';
    this.image = props && props.image || '';
    this.name = props && props.name || '';
  }
}
