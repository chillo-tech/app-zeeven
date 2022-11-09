import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.API_URL}`,
  headers: {
    'Accept': 'application/json',
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json',
    'service-id': `${process.env.SERVICE_ID}`,
    'service-key': `${process.env.SERVICE_KEY}`
  }
});

export {instance};