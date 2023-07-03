import { Endereco } from '@/model/endereco'
import axios, { AxiosInstance } from 'axios'

export class EnderecoClient {
    private axiosClient: AxiosInstance
  
    constructor() {
      this.axiosClient = axios.create({
        baseURL: 'http://localhost:8080',
        headers: { 'Content-type': 'application/json' }
      })
    }
    public async cadastrarEndereco(endereco: Endereco): Promise<Endereco> {
        try {
          return (await this.axiosClient.post<Endereco>('/enderecos', endereco)).data
        } catch (error: any) {
          return Promise.reject(error.response)
        }
    }
}