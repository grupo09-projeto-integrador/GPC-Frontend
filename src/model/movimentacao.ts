import { AbstractEntity } from "./abstract-entity"
import { Ativo } from "./ativo"
import { Beneficiario } from "./beneficiario"
import { Pessoa } from "./pessoa"

export class Movimentacao extends AbstractEntity {
    dataEmprestimo! : Date
    dataDevolucao! : Date
    isDevolvido! : boolean
    beneficiario! : Pessoa
    ativo! : Ativo
    descricao! : string
    isAtrasado! : boolean
    responsavel!: Pessoa
}

export default new Movimentacao();