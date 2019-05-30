import { IUserLocation, ILegalDocuments, IBankRequisites } from 'apps/ui/interfaces/userLocation';

export default class UserLocation {
  public bank_requisites: IBankRequisites | null;
  public companyAddress: string | null;
  public countryCode: string | null;
  public lang: string | null;
  public legalDocuments: ILegalDocuments | null;

  constructor(props?: IUserLocation) {
    this.bank_requisites = props && props.bank_requisites || null;
    this.companyAddress = props && props.companyAddress || null;
    this.countryCode = props && props.countryCode || null;
    this.lang = props && props.lang || null;
    this.legalDocuments = props && props.legalDocuments || null;
  }
}
