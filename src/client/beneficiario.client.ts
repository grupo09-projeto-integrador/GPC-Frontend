import { Beneficiario } from '@/model/beneficiario'
import axios, { AxiosInstance } from 'axios'

export class BeneficiarioClient {
  private axiosClient: AxiosInstance

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8080/beneficiarios',
      headers: { 'Content-type': 'application/json' }
    })
  }

  public async findById(id: number): Promise<Beneficiario> {
    try {
      return (await this.axiosClient.get<Beneficiario>(`/id?id=${id}`)).data
    } catch (error: any) {
      return Promise.reject(error.response)
    }
  }

  public async findByCPF(cpf: string): Promise<Beneficiario> {
    try {
      return (await this.axiosClient.get<Beneficiario>(`/cpf?cpf=${cpf}`)).data
    } catch (error: any) {
      return Promise.reject(error.response)
    }
  }

  public async findAll(): Promise<Beneficiario[]> {
    try {
      return (await this.axiosClient.get<Beneficiario[]>('/listar')).data
    } catch (error: any) {
      return Promise.reject(error.response)
    }
  }
  
}
