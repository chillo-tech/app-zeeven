import axios from "axios"
import {axiosInstance} from "./axios-instance"

const deleteItem = (endpoint: string) => {
	return axios.delete(endpoint)
}

const add = (endpoint: string, data: any) => {
	return axios.post(
		`${endpoint}`,
		data,
		{
			headers: {"Content-Type": "application/json"}
		}
	)
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
