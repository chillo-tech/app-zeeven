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
  const isToBackOffice = url.startsWith('/api/backoffice');
  const urlToCall = isToBackOffice
    ? url.replaceAll('/api/backoffice', '/items')
    : url.replaceAll('/api/backend', '/backend');
  authorization = isToBackOffice
    ? { Authorization: `Bearer ${process.env.BACKOFFICE_API_TOKEN}` }
    : authorization;
  const credentials = isToBackOffice
    ? {}
    : { 'service-id': `${process.env.SERVICE_ID}`, 'service-key': `${process.env.SERVICE_KEY}` };
  const baseURL = isToBackOffice ? process.env.BACKOFFICE_API : process.env.API_URL;

  console.log('====================================');
  console.log(baseURL, process.env.BACKOFFICE_API_TOKEN);
  console.log('====================================');
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
