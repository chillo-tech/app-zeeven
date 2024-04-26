import axios from "axios";


const deleteItem = (endpoint: string) => {
	return axios.delete(endpoint)
}

const add = (endpoint: string, data: any) => {
    const qrcodeId = sessionStorage.getItem("qrcodeId");
    const result = axios.post(
      `${endpoint}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          ...(qrcodeId && {"qrcode-id": qrcodeId})
        }
      }
    )
    return result;
}

const patch = (endpoint: string, data: any) => {
	return axios.patch(
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
