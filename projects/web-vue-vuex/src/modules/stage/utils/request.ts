import axios, {AxiosError, AxiosResponse} from 'axios';
import {ApiPrefix} from '@/Global';
import {CustomError} from './errors';

export interface APIRequest<Req, Res> {
  Request: Req;
  Response: Res;
}

const instance = axios.create();

instance.interceptors.request.use((req) => {
  return {...req, url: ApiPrefix + req.url};
});

instance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response;
  },
  (error: AxiosError<{message: string}>) => {
    const httpErrorCode = error.response ? error.response.status : 0;
    const statusText = error.response ? error.response.statusText : '';
    const responseData: any = error.response ? error.response.data : '';
    const errorMessage = responseData.message || `${statusText}, failed to call ${error.config.url}`;
    throw new CustomError(httpErrorCode.toString(), errorMessage, responseData);
  }
);

export default instance;
