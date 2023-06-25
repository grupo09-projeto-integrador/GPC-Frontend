import { AbstractEntity } from "./abstract-entity";
export class Pessoa extends AbstractEntity {
    nome!: string
    email!: string
    telefone!: string
    dataNascimento!: Date
    rg!: string
    cpf!: string
    endereco!: string
}