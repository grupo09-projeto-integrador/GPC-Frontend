import { Movimentacao } from '@/model/movimentacao'
import axios, { AxiosInstance } from 'axios'

export class MovimentacoesClient {
  private axiosClient: AxiosInstance

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8080',
      headers: { 'Content-type': 'application/json' }
    })
  }

  public async findById(id: number): Promise<Movimentacao> {
    try {
      return (await this.axiosClient.get<Movimentacao>(`/movimentacoes?id=${id}`)).data
    } catch (error: any) {
      return Promise.reject(error.response)
    }
  }

  public async findAll(): Promise<Movimentacao[]> {
    try {
      return (await this.axiosClient.get<Movimentacao[]>('/movimentacoes/listar')).data
    } catch (error: any) {
      return Promise.reject(error.response)
    }
  }


  public async findByDatePdf(dataEntrada: string, dataDevolucao: string): Promise<Movimentacao[]> {
    try {
      return (await this.axiosClient.get<Movimentacao[]>(`/movimentacoes/pdf/${dataEntrada}/${dataDevolucao}`)).data
    } catch (error: any) {
      return Promise.reject(error.response)
    }
  }

  public async novaMovimentacao(movimentacao: Movimentacao): Promise<Movimentacao> {
    try {
      return (await this.axiosClient.post<Movimentacao>('/movimentacoes', movimentacao)).data
    } catch (error: any) {
      return Promise.reject(error.response)
    }
  }
  public async editar(movimentacao: Movimentacao): Promise<string> {
    try {
      return (await this.axiosClient.put<string>(`/movimentacoes?id=${movimentacao.id}`, movimentacao)).data
    } catch (error: any) {
      return Promise.reject(error)
    }
  }
  public async deletar(id: number): Promise<Movimentacao> {
    try {
      return (await this.axiosClient.delete<Movimentacao>(`/movimentacoes?id=${id}`,)).data
    } catch (error: any) {
      return Promise.reject(error.response)
    }
  }
  public async filtrar(params: {}): Promise<Movimentacao[]> {
    try {
      return (await this.axiosClient.get<Movimentacao[]>('/movimentacoes/filtrar', { params })).data
    } catch (error: any) {
      return []
    }
  }
}
