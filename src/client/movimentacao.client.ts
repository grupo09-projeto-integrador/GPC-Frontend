import { Movimentacao } from '@/model/movimentacao'
import axios, { AxiosInstance } from 'axios'

export class MovimentacoesClient {
  private axiosClient: AxiosInstance

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8080/movimentacoes',
      headers: { 'Content-type': 'application/json' }
    })
  }

  public async findById(id: number): Promise<Movimentacao> {
    try {
      return (await this.axiosClient.get<Movimentacao>(`/?id=${id}`)).data
    } catch (error: any) {
      return Promise.reject(error.response)
    }
  }
  public async save(movimentacao: Movimentacao): Promise<Movimentacao> {
    try {
        return (await this.axiosClient.post<Movimentacao>('', movimentacao)).data
    } catch (error: any) {
        return Promise.reject(error.response)
    }
}
}
