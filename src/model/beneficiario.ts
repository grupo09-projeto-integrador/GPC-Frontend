import { AbstractEntity } from "./abstract-entity"
import { Pessoa } from "./pessoa"

export class Beneficiario extends AbstractEntity {
    perfil!: Pessoa
    responsavel!: Pessoa
}