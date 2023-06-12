import { Categoria } from '@/model/categoria'
import axios, { AxiosInstance } from 'axios'

export class CategoriaClient{

    private axiosClient: AxiosInstance
    
    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8081',
            headers: { 'Content-type': 'application/json' }
        })
    }

    public async findAll(): Promise<Categoria[]> {
        try {
            return (await this.axiosClient.get<Categoria[]>('/categorias/listar')).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }



    public async findById(id: number): Promise<Categoria> {
        try {
            return (await this.axiosClient.get<Categoria>(`/categorias/id?${id}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByAtivos(): Promise<Categoria> {
        try {
            return (await this.axiosClient.get<Categoria>(`categorias/ativos`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByCategoria(nome: string): Promise<Categoria> {
        try {
            return (await this.axiosClient.get<Categoria>(`/categorias/categorias?nome=${nome}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findByListaEspera(nome: string): Promise<Categoria> {
        try {
            return (await this.axiosClient.get<Categoria>(`/categorias/listaespera?nome=${nome}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }



    public async save(Categoria: Categoria): Promise<Categoria> {
        try {
            return (await this.axiosClient.post<Categoria>('/categorias', Categoria)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async update(Categoria: Categoria): Promise<Categoria> {
        try {
            return (await this.axiosClient.put<Categoria>('/', Categoria)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            await this.axiosClient.delete(`/categorias?id=${id}`)
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }




}