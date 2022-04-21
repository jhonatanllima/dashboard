import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // headers: {
  //   Authorization: `Bearer ${process.env.API_KEY}`,
  // },
});

export { api };
