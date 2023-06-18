import { Ativo } from '@/model/ativo'
import { Condicao } from '@/model/condicao'
import { PageRequest } from '@/model/page/page-request'
import { PageResponse } from '@/model/page/page-response'
import { Status } from '@/model/status'
import axios, { AxiosInstance } from 'axios'

export class AtivoClient {

    private axiosClient: AxiosInstance


    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080',
            headers: { 'Content-type': 'application/json' }
        })
    }

    public async findById(id: number): Promise<Ativo> {

        try {
            const response = await this.axiosClient.get<Ativo>(`/ativos/${id}`);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }


    public async findAll(): Promise<Ativo[]> {
        try {
            const response = await this.axiosClient.get<Ativo[]>('/ativos');
            return response.data;
        } catch (error) {
            console.error(error);
            return []; // Return an empty array if there's an error
        }
    }

    public async save(ativo: Ativo): Promise<Ativo> {
        try {
            const response = await this.axiosClient.post<Ativo>('/ativos', ativo);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async update(ativo: Ativo): Promise<Ativo> {
        try {
          const response = await this.axiosClient.put<Ativo>('http://localhost:8080/ativos', ativo);
          return response.data;
        } catch (error) {
          return Promise.reject(error);
        }
      }   

    public async delete(id: number): Promise<void> {
        try {
            await this.axiosClient.delete(`/ativos?id=${id}`)
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByFiltrosPaginado(pageRequest: PageRequest): Promise<PageResponse<Ativo>> {
        try {
            let requestPath = ''

            requestPath += `page=${pageRequest.currentPage}`
            requestPath += `&size=${pageRequest.pageSize}`

            return (await this.axiosClient.get<PageResponse<Ativo>>(`/ativos?${requestPath}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByCondicao(condicao: Condicao): Promise<Ativo[]> {
        try {
            return (await this.axiosClient.get<Ativo[]>(`/ativos/condicao?condicao=${condicao}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByStatus(status: Status): Promise<Ativo[]> {
        try {
            return (await this.axiosClient.get<Ativo[]>(`/ativos/status?status=${status}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByIdPatrimonio(idPatrimonio: string): Promise<Ativo[]> {
        try {
            return (await this.axiosClient.get<Ativo[]>(`/ativos/idPatrimonio?idPatrimonio=${idPatrimonio}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByNomeCategoria(nomeCategoria: string): Promise<Ativo[]> {
        try {
            return (await this.axiosClient.get<Ativo[]>(`/ativos/nomeCategoria?nomeCategoria=${nomeCategoria}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

}