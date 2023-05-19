import {axiosInstance} from "./axios-instance"

const deleteItem = (endpoint: string) => {
	return axiosInstance.delete(endpoint)
}

const add = (endpoint: string, data: any) => {
	return axiosInstance.post(
		endpoint,
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
	return axiosInstance.get(endpoint)
}

export {add, search, patch, deleteItem}
