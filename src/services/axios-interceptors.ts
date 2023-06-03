import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import { Session } from "next-auth";
import { signOut } from 'next-auth/react';

/**
  const instance = axios.create({ baseURL: `${process.env.API_URL}/items`});
  instance.defaults.headers.common['Authorization'] = `Bearer ${process.env.ACCES_TOKEN}`;
  instance.defaults.headers.common['Accept'] = 'application/json';
 */
interface AppSession extends Session {
  token: {
    accessToken: string
  }
}
const onRequest = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => { 
  let {headers = {}}= config;
  let authorization: any = {'Authorization': headers['Authorization']}
  
  const {url = ''} = config;
  const urlToCall = url.startsWith('/api/backoffice') ? url.replaceAll('/api/backoffice', '/items') : `/${url}`;
  authorization = url.startsWith('/api/backoffice') ?  { 'Authorization':`Bearer ${process.env.BACKOFFICE_API_TOKEN}`} : authorization;

  const credentials = url.startsWith('/api/backoffice') ?  {} : { 'service-id': `${process.env.SERVICE_ID}`, 'service-key': `${process.env.SERVICE_KEY}`};
  const baseURL = url.startsWith('/api/backoffice') ? process.env.BACKOFFICE_API : `${process.env.API_URL}`;
console.log('====================================');
console.log({baseURL, url: urlToCall});
console.log('====================================');
  return {
      ...config,
      baseURL,
      url: urlToCall,
      headers: {
        ...config.headers,
        ...(authorization),
        ...(credentials)
      }
     
    };
}
const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
}
const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
}

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
   const {status, response} = error;
   if(status === 401 || (response && response.status && response.status === 401)) {
    signOut();

    if (typeof window !== "undefined") {
      window.location.href = '/';
    }
   }
    return Promise.reject(error);
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest as any, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
}