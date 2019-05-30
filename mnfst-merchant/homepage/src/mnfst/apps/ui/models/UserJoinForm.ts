import { IJoin, IUserJoinForm } from 'apps/ui/interfaces/userJoinForm';

export default class UserJoinForm {
  public join: IJoin;

  constructor(props?: IUserJoinForm) {
    this.join = {
      phone_number: {
        isRequired: true,
        value: props && props.join && props.join.phone_number || null,
      },
    };
  }
}
