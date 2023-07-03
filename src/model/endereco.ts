import { AbstractEntity } from "./abstract-entity"

export class Endereco extends AbstractEntity {

    logradouro!: string
    bairro!: string
    cidade!: string
    uf!: string
    pais!: string
    complemento!: string
    cep!: string
    numero!: number
}