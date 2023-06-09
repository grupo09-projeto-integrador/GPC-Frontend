import { Movimentacao } from '@/model/movimentacao'
import axios, { AxiosInstance } from 'axios'

export class MovimentacoesClient {
  private axiosClient: AxiosInstance

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8080/api/movimentacoes',
      headers: { 'Content-type': 'application/json' }
    })
  }

  public async findById(id: number): Promise<Movimentacao> {
    try {
      return (await this.axiosClient.get<Movimentacao>(`/${id}`)).data
    } catch (error: any) {
      return Promise.reject(error.response)
    }
  }
}
