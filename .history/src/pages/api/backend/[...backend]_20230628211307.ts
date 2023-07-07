import { axiosInstance } from '@/services/axios-instance';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession, } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { Session } from 'next-auth';
import axios, { AxiosError } from 'axios';

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
    const urlParams = new URLSearchParams(url);
console.log('====================================');
console.log(urlParams);
console.log('====================================');
    if (req.method === 'POST') {
      const {data} = await axiosInstance.post(`${backendUrl}`, req.body, {headers});
      console.log(data)
      return res.status(200).json(data);
    } else if (req.method === 'PUT') {
      const {data} = await axiosInstance.post(`${backendUrl}`, req.body, {headers});
      return res.status(200).json(data);
    } else if (req.method === 'PATCH') {
      const {data} = await axiosInstance.patch(`${backendUrl}`, req.body, {headers});
      return res.status(200).json(data);
    }  else if (req.method === 'DELETE') {
      const {data} = await axiosInstance.delete(`${backendUrl}`, {headers});
      return res.status(200).json(data);
    } else {
      const {data} = await axiosInstance.get(`${backendUrl}`, {headers});
      return res.status(200).json(data);
    }
  } catch (error: any) {
    const axiosError = error as Error | AxiosError;
    if(axios.isAxiosError(axiosError)){
      const axiosError = error as Error | AxiosError;
      if(axios.isAxiosError(axiosError)){
        const {status, response} = error;
      
        if(status === 401 || (response && response.status && response.status === 401)) {
          res.status(401).json({ message: "Veuillez vous connecter" });
          return;
        }
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
}

export default handler;