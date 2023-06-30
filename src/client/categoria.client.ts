import { Categoria } from '@/model/categoria'
import axios, { AxiosInstance } from 'axios'

export class CategoriaClient{

    private axiosClient: AxiosInstance
    
    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/categorias',
            headers: { 'Content-type': 'application/json' }
        })
    }

    public async findAll(): Promise<Categoria[]> {
        try {
          const response = await this.axiosClient.get<Categoria[]>('/listar');
          return response.data;
        } catch (error) {
          console.error(error);
          return []; // Return an empty array if there's an error
        }
      }

    public async findByNome(nome: string): Promise<Categoria> {
        try {
          const response = await axios.get<Categoria>(`http://localhost:8080/categorias/nomeCategoria?nomeCategoria=${nome}`)
      
          return response.data;

        } catch (error) {
          return Promise.reject(error);
        }
      }


      public async findByDatePdf(startDate: string, endDate: string): Promise<Categoria[]> {
        try {
            return (await this.axiosClient.get<Categoria[]>(`/pdf/dataCriacao/${startDate}/${endDate}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findById(id: number): Promise<Categoria> {
        try {
            return (await this.axiosClient.get<Categoria>(`/id?${id}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByAtivos(): Promise<Categoria> {
        try {
            return (await this.axiosClient.get<Categoria>(`/ativos`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByCategoria(nome: string): Promise<Categoria> {
        try {
            return (await this.axiosClient.get<Categoria>(`?nome=${nome}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByListaEspera(nome: string): Promise<Categoria> {
        try {
            return (await this.axiosClient.get<Categoria>(`/listaespera?nome=${nome}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }



    public async save(Categoria: Categoria): Promise<Categoria> {
        try {
            return (await this.axiosClient.post('', Categoria)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async update(Categoria: Categoria): Promise<Categoria> {
        try {
            return (await this.axiosClient.put<Categoria>('', Categoria)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            await this.axiosClient.delete(`?id=${id}`)
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }




}