import { Movimentacao } from '@/model/movimentacao'
import axios, { AxiosInstance } from 'axios'

export class MovimentacoesClient {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: "http://localhost:8080/movimentacoes",
      headers: { "Content-type": "application/json" },
    });
  }

  public async findById(id: number): Promise<Movimentacao> {
    try {
      return (await this.axiosClient.get<Movimentacao>(`/?id=${id}`)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async findByDatePdf(
    dataEntrada: string,
    dataDevolucao: string
  ): Promise<Movimentacao[]> {
    try {
      return (
        await this.axiosClient.get<Movimentacao[]>(
          `pdf/${dataEntrada}/${dataDevolucao}`
        )
      ).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async novaMovimentacao(
    movimentacao: Movimentacao
  ): Promise<Movimentacao> {
    try {
      return (await this.axiosClient.post<Movimentacao>("", movimentacao)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
  public async deletar(id: number): Promise<Movimentacao> {
    try {
      return (await this.axiosClient.delete<Movimentacao>(`?id=${id}`)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
  public async filtrar(params: {}): Promise<Movimentacao[]> {
    try {
      return (
        await this.axiosClient.get<Movimentacao[]>("/filtrar", { params })
      ).data;
    } catch (error: any) {
      return [];
    }
  }
  public async findAll(): Promise<Movimentacao[]> {
    try {
      return (await this.axiosClient.get<Movimentacao[]>(`/listar`))
        .data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
}
