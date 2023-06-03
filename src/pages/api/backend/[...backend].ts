import { axiosInstance } from '@/services/axios-instance';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { Session } from 'next-auth';
import axios, { AxiosError } from 'axios';
import { signOut } from 'next-auth/react';

interface AppSession extends Session {
  token: {
    accessToken: string
  }
}
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    const session = await getServerSession(req, res, authOptions) as AppSession;
    let headers = {};
    if(session && session.token) {
      const {accessToken} = session.token;
      headers = {...headers, 'Authorization':`Bearer ${accessToken}`};
    }
    const {url = ''} = req;
    const backendUrl = url.substring(url.indexOf('backend')) || '';
    const {data} = await axiosInstance.get(`${backendUrl}`, {headers});
    return res.status(200).json(data);
  } catch (error: any) {
    const axiosError = error as Error | AxiosError;
    if(axios.isAxiosError(axiosError)){
      const {status, response} = error;
      if(status === 401 || (response && response.status && response.status === 401)) {
        signOut();
      }
      return Promise.reject(error);
    }
  }
}

export default handler;