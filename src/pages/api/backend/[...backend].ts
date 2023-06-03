import { axiosInstance } from '@/services/axios-instance';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import { Session } from 'next-auth';

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
  } catch (error) {
  }
}

export default handler;