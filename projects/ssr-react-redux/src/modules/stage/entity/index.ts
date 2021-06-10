import request, {APIRequest} from '../utils/request';

export interface CurUser {
  id: string;
  username: string;
  hasLogin: boolean;
  avatar: string;
  mobile: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export type GetCurUser = APIRequest<{}, CurUser>;

export type Login = APIRequest<LoginParams, CurUser>;

export type Logout = APIRequest<{}, CurUser>;

export const guest: CurUser = {
  id: '',
  username: '游客',
  hasLogin: false,
  avatar: '',
  mobile: '',
};

class API {
  public getCurUser(): Promise<GetCurUser['Response']> {
    return request
      .get<CurUser>('/api/session')
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        return guest;
      });
  }
}

export const api = new API();
