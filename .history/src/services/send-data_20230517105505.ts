import { axiosInstance } from "./axios-instance";
const sendData = (endpoint: string, data: any) => {
  return axiosInstance.post(
    endpoint, 
    data, 
    {
      headers: {"Content-Type": "application/json"}
    }
  )
}
export {sendData};