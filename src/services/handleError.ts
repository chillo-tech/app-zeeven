import axios, { AxiosError } from "axios";
import { signOut } from "next-auth/react";

function handleError(error: any) {
  const axiosError = error as Error | AxiosError;
  if(axios.isAxiosError(axiosError)){
    const {status, response} = error;

    if(status === 401 || (response && response.status && response.status === 401)) {
      signOut();
      window.location.href= '/auth/signin';
    }
  }
}


export {handleError}