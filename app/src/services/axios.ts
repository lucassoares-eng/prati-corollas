import axios from "axios"
import { parseCookies } from "nookies"
import{ NextPageContext, NextApiRequest } from 'next';


export function getAPIClient(ctx?: Pick<NextPageContext, 'req'> | {req: NextApiRequest } | null | undefined) {
  const { 'corollas.token': token} = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://172.31.150.8:8000'
  })

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
  }

  return api
}