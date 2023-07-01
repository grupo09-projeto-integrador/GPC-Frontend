import { AbstractEntity } from "./abstract-entity";
import { Ativo } from "./ativo";
import { Pessoa } from "./pessoa";

export class Categoria extends AbstractEntity {

    nomeCategoria!: string
    minimoAmarelo!: number
    maximoAmarelo!: number
    listaEspera!: Array<Pessoa>
    qtdeAtivos!: number
}