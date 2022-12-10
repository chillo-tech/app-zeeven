import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import { Session } from "next-auth";
import { getSession, useSession } from 'next-auth/react';

interface AppSession extends Session {
  token: {
    accessToken: string
  }
}
const onRequest = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const session = await getSession() as AppSession;
    return {
      ...config,
      baseURL: `${process.env.API_URL}`,
      headers: {
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        'service-id': `${process.env.SERVICE_ID}`,
        'service-key': `${process.env.SERVICE_KEY}`,
        ...(session && session.token ? { 'Authorization': `Bearer ${session.token.accessToken}` } : {})
      }
    };
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
    console.info(`[response] [${JSON.stringify(response.data)}]`);
    return response;
}

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  const session = await getSession() as AppSession;

    console.error(`[response error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
}