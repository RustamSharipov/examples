import axios from 'axios';
import { UserAuthorization } from 'apps/ui/utils/users';

interface IRequestParams {
  absoluteUri?: boolean;
  noAuthToken?: boolean;
}

export default (data: any, params: IRequestParams = {}) => {
  const { absoluteUri, noAuthToken } = params;
  const domain: string = process.env.REACT_APP_API_URL || '';

  if (!absoluteUri) {
    data.url = `${domain}${data.url}`;
  }

  const authData = UserAuthorization.get();
  const token = authData && authData.token;
  const headers = { ...data.headers };

  if (!noAuthToken && !absoluteUri) {
    headers.Authorization = token;
  }

  return axios({
    ...data,
    headers,
    withCredentials: !noAuthToken && !absoluteUri,
    'Access-Control-Allow-Origin': '*',
  });
};

export function post(url: string, data: any, params: IRequestParams = {}) {
  const { absoluteUri, noAuthToken } = params;
  const domain: string = process.env.REACT_APP_API_URL || '';
  const authData = UserAuthorization.get();
  const token = authData && authData.token;
  const headers = { ...data.headers };

  if (!noAuthToken) {
    headers.Authorization = token;
  }

  return axios.post(
    absoluteUri ? url : `${domain}${url}`,
    data,
    {
      headers: {
        Authorization: token,
      },
    });
}
