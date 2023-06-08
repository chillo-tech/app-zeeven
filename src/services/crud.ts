import axios from "axios"
import {axiosInstance} from "./axios-instance"

const deleteItem = (endpoint: string) => {
	return axios.delete(endpoint)
}

const add = (endpoint: string, data: any) => {
  try {
    return axios.post(
      `${endpoint}`,
      data,
      {
        headers: {"Content-Type": "application/json"}
      }
    )
  } catch (error) {
    console.log('==========axios error===================');
    console.log(error);
    console.log('=========axios error=================');
  }

}

const patch = (endpoint: string, data: any) => {
	return axiosInstance.patch(
		endpoint,
		data,
		{
			headers: {"Content-Type": "application/json"}
		}
	)
}

const search = (endpoint: string) => {
	return axios.get(endpoint)
}

export {add, search, patch, deleteItem}
