interface IUserAuthorizationGet {
  token: string;
}

interface IUserAuthorizationSet {
  token: string;
}

export class UserAuthorization {
  public static get(): IUserAuthorizationGet | null {
    const token = localStorage.getItem('jwt');
    if (token) {
      return { token };
    }
    return null;
  }

  public static set(params: IUserAuthorizationSet) {
    const { token } = params;
    if (token) {
      localStorage.setItem('jwt', token);
    }
  }

  public static remove() {
    localStorage.removeItem('jwt');
  }
}
