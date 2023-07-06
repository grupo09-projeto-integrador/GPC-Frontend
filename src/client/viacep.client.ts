import axios, { AxiosInstance } from 'axios'

export class ViaCepClient {
    private axiosClient: AxiosInstance
  
    constructor() {
      this.axiosClient = axios.create({
        baseURL: 'https://viacep.com.br',
        headers: { 'Content-type': 'application/json' }
      })
    }
    public async getByCep(cep: string): Promise<any> {
        try {
          return (await this.axiosClient.get<any>(`/ws/${cep}/json/`)).data
        } catch (error: any) {
          return Promise.reject(error.response)
        }
    }
}