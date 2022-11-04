import { instance } from "./axios-instance"

const add = (endpoint: string, data: any) => {
  return instance.post(
    endpoint, 
    data, 
    {
      headers: {"Content-Type": "application/json"}
    }
  )
}

export {add}