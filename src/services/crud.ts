import { axiosInstance } from "./axios-instance"

const add = (endpoint: string, data: any) => {
  return axiosInstance.post(
    endpoint, 
    data, 
    {
      headers: {"Content-Type": "application/json"}
    }
  )
}

const search = (endpoint: string) => {
  return axiosInstance.get(endpoint)
}

export {add, search}