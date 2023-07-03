import { AbstractEntity } from "./abstract-entity";
import { Endereco } from "./endereco";
export class Pessoa extends AbstractEntity {
    nome!: string
    email!: string
    telefone!: string
    dataNascimento!: Date
    rg!: string
    cpf!: string
    endereco!: Endereco
}