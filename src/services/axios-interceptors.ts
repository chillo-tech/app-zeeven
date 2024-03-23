import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Session } from 'next-auth';

interface AppSession extends Session {
  token: {
    accessToken: string;
  };
}
const onRequest = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  let { headers = {} } = config;
  let authorization: any = { Authorization: headers['Authorization'] };
  const { url = '' } = config;
  const isToBackOffice = url.startsWith('/api/backoffice') || url.startsWith('/api/chillo-backoffice');
  const isForDataModel = url.startsWith('/api/chillo-backoffice');
  const urlToCall = isForDataModel
    ? url.replaceAll('/api/chillo-backoffice', '')
    : isToBackOffice
    ? url.replaceAll('/api/backoffice', '/items')
    : url.replaceAll('/api/backend', '/backend');
  authorization = isForDataModel
    ? { Authorization: `Bearer ${process.env.BACKOFFICE_CHILLO_API_TOKEN}` }
    : isToBackOffice
    ? { Authorization: `Bearer ${process.env.BACKOFFICE_API_TOKEN}` }
    : authorization;

  const credentials = isToBackOffice
    ? {}
    : { 'service-id': `${process.env.SERVICE_ID}`, 'service-key': `${process.env.SERVICE_KEY}` };
  const baseURL = isForDataModel? process.env.BACKOFFICE_CHILLO_API : isToBackOffice ? process.env.BACKOFFICE_API : process.env.API_URL;

  return {
    ...config,
    baseURL,
    url: urlToCall,
    headers: {
      ...config.headers,
      ...authorization,
      ...credentials,
    },
  };
};
const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};
const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest as any, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
