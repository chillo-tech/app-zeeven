import axios from 'axios';

const instance = axios.create({
  baseURL: `localhost`,
  headers: {
    'Accept': 'application/json',
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json',
    'service-id': `${process.env.SERVICE_ID}`,
    'service-key': `${process.env.SERVICE_KEY}`
  }
});

export {instance};