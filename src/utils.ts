import { AxiosRequestConfig } from 'axios'

export function CreateAxiosConfigFunction(USER_KEY: string, BASE_URL: string) {
  const headers = {
    accept: 'application/json',
    'x-user-key': USER_KEY,
    'content-type': 'application/json'
  }

  const createAxiosConfig = (method: string, url: string, data?: any): AxiosRequestConfig => ({
    method,
    url: `${BASE_URL}${url}`,
    headers,
    data
  })

  return createAxiosConfig
}
