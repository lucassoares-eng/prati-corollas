import axios from "axios";
import { parseCookies } from 'nookies'

const { 'corollas.token': token} = parseCookies()

export const api_cc = axios.create({
  baseURL: 'http://172.31.150.8:8000'
})

api_cc.interceptors.request.use(config => {
  console.log(config)
  return config
})

if (token) {
  api_cc.defaults.headers['Authorization'] = `Bearer ${token}`
}