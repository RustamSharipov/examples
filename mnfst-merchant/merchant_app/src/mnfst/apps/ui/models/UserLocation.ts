import { IUserLocation, ILegalDocuments, IBankRequisites } from 'apps/ui/interfaces/userLocation';

export default class UserLocation {
  public bank_requisites: IBankRequisites | null;
  public beneficiaryAddress: string | null;
  public companyAddress: string | null;
  public companyName: string | null;
  public companyNumber: string | null;
  public countryCode: string | null;
  public gateway: string | null;
  public lang: string | null;
  public legalDocuments: ILegalDocuments | null;

  constructor(props?: IUserLocation) {
    this.bank_requisites = props && props.bank_requisites || null;
    this.beneficiaryAddress = props && props.beneficiaryAddress || null;
    this.companyAddress = props && props.companyAddress || null;
    this.companyName = props && props.companyName || null;
    this.companyNumber = props && props.companyNumber || null;
    this.countryCode = props && props.countryCode || null;
    this.gateway = props && props.gateway || null;
    this.lang = props && props.lang || null;
    this.legalDocuments = props && props.legalDocuments || null;
  }
}
