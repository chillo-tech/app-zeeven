import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import { Session } from "next-auth";
import { getSession, useSession, signOut } from 'next-auth/react';

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
  const session = await getSession() as AppSession;
  const {url = ''} = config;
  const urlToCall = url.startsWith('backoffice') ? url.replaceAll('backoffice', 'items') : `${url}`;
  let authorization: any = session && session.token ? { 'Authorization': `Bearer ${session.token.accessToken}` } : {};
  authorization = url.startsWith('backoffice') ?  { 'Authorization':`Bearer ${process.env.BACKOFFICE_API_TOKEN}`} : authorization;

  const credentials = url.startsWith('backoffice') ?  {} : { 'service-id': `${process.env.SERVICE_ID}`, 'service-key': `${process.env.SERVICE_KEY}`};

  const baseURL = url.startsWith('backoffice') ? process.env.BACKOFFICE_API : `${process.env.API_URL}/api`;

  console.log('====================================');
  console.log({baseURL});
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
    window.location.href = '/';
   }
    return Promise.reject(error);
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest as any, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
}