import axios from 'axios';
import {setupInterceptorsTo} from "./axios-interceptors";

const axiosInstance = setupInterceptorsTo(axios.create());

export {axiosInstance};
