import axios from 'axios';
interface Params {
  path: string;
  fields?: string;
  sort?: string;
  search?: string;
  limit?: number;
  filter?: any;
}

const fetchDataClient = (params: Params) => {
  return axios.get(params.path, {
    params: {
      ...(params.fields ? { fields: params.fields } : {}),
      ...(params.limit ? { limit: params.limit } : {}),
      ...(params.filter ? { filter: params.filter } : {}),
      ...(params.search ? { search: params.search } : {}),
      ...(params.sort ? { sort: params.sort } : {}),
    },
  });
};

const fetchData = (params: Params) => {
  return axios.get(params.path, {
    params: {
      ...(params.fields ? { fields: params.fields } : {}),
      ...(params.limit ? { limit: params.limit } : {}),
      ...(params.filter ? { filter: params.filter } : {}),
      ...(params.search ? { search: params.search } : {}),
      ...(params.sort ? { sort: params.sort } : {}),
    },
  });
};
export { fetchData, fetchDataClient };
