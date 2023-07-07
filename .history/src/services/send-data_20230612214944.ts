import axios from "axios";
import { axiosInstance } from "./axios-instance";
const sendData = (endpoint: string, data: any) => {
  return axios.post(
    endpoint, 
    data, 
    {
      headers: {"Content-Type": "application/json"}
    }
  )
}
export {sendData};