import { backend } from '../../config';
import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';


const AuthenticatedApiClient = () => {
  const defaultOptions = {
    baseURL: `${process.env.API_URL}/api`,
    headers: { 
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json',
    },
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    console.log('=============request===============');
    console.log({request});
    console.log('=============request===============');
    const data = await getSession();
    let token: any = {};
    if (data && data.token) {
      token = data.token;
    }
    if (token && request.headers) {
      request.headers.Authorization = `Bearer ${token.token}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const {response: {status}} = error;
      if(Number(status) === 401) {
        signOut();
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export default AuthenticatedApiClient;