import { Beneficiario } from '@/model/beneficiario'
import { Pessoa } from '@/model/pessoa'
import axios, { AxiosInstance } from 'axios'

export class PessoaClient {
  private axiosClient: AxiosInstance

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8080/pessoa',
      headers: { 'Content-type': 'application/json' }
    })
  }

  public async findById(id: number): Promise<Pessoa> {
    try {
      return (await this.axiosClient.get<Pessoa>(`/id?id=${id}`)).data
    } catch (error: any) {
      return Promise.reject(error.response)
    }
  }

  public async findByCPF(cpf: string): Promise<Pessoa> {
    try {
      return (await this.axiosClient.get<Pessoa>(`/cpf?cpf=${cpf}`)).data
    } catch (error: any) {
      return Promise.reject(error.response)
    }
  }
}
