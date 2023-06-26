import { AbstractEntity } from "./abstract-entity"
import { Ativo } from "./ativo"
import { Beneficiario } from "./beneficiario"

export class Movimentacao extends AbstractEntity {
    dataEmprestimo! : Date
    dataDevolucao! : Date
    isDevolvido! : boolean
    beneficiario! : Beneficiario
    ativo! : Ativo
    descricao! : string
    isAtrasado! : boolean
}