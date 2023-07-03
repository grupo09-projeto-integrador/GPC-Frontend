import axios, { AxiosInstance } from 'axios'
import {Pessoa} from "@/model/pessoa";

export class PessoaClient {

    private axiosClient: AxiosInstance


    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080',
            headers: { 'Content-type': 'application/json' }
        })
    }

    public async findById(id: number): Promise<Pessoa> {

        try {
            const response = await this.axiosClient.get<Pessoa>(`/pessoas?id=${id}`);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    public async findAll(): Promise<Pessoa[]> {
        try {
            const response = await this.axiosClient.get<Pessoa[]>('/pessoas/todos');
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    public async findByCPF(cpf: string): Promise<Pessoa> {
        try {
            const response = await this.axiosClient.get<Pessoa>(`/pessoas/cpf?cpf=${cpf}`);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    public async findByAtivo(): Promise<Pessoa[]> {
        try {
            const response = await this.axiosClient.get<Pessoa[]>('/pessoas/ativos');
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    public async cadastrarPessoa(pessoa: Pessoa): Promise<string> {
        try {
            const response = await this.axiosClient.post<string>('/pessoas', pessoa);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    public async editar(pessoa: Pessoa): Promise<string> {
        try {
            const response = await this.axiosClient.put<string>(`/pessoas?id=${pessoa.id}`, pessoa);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    public async deletar(id: number): Promise<string> {
        try {
            const response = await this.axiosClient.delete<string>(`/pessoas?id=${id}`);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
