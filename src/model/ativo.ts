import { AbstractEntity } from "./abstract-entity"
import { Categoria } from "./categoria"
import { Condicao } from "./condicao"
import { Status } from "./status"

export class Ativo extends AbstractEntity {


    categoria! : Categoria
    idPatrimonio! : string
    condicao! : Condicao
    status! : Status
    descricao! : string
    dataEntrada! : Date

    constructor() {
        super()
        this.categoria = new Categoria();
    }


}