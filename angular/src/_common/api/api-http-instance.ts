import { Axios } from 'axios'
import {environment} from "../../../env";

export class AxiosHttp {
  private static _instance: Axios

  static getInstance(): Axios {
    if (!this._instance) {
      this._instance = this.create()
    }
    return this._instance
  }

  static create() {
    const adapter = new Axios({
      baseURL: environment.API_BASE_URL,
      timeout: 3000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    adapter.interceptors.request.use(
      (config) => {
        if (config.headers['Content-Type'] === 'application/json' && config.data)
          return { ...config, data: JSON.stringify(config.data) }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )
    adapter.interceptors.response.use((response) => {
      if ((response.headers['content-type'] ?? '').startsWith('application/json') && response.data)
        return { ...response, data: JSON.parse(response.data) }
      return response
    })
    return adapter
  }
}
