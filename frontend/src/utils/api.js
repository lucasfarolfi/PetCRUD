import axios from "axios";
import baseUrl from './baseUrl'

const api = () =>{
  return axios.create({
    baseURL: baseUrl
  });
}

export default api;