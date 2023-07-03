<template>
    <div class="main-content">
        <LinkDinamicoComponent routeList="/relatorios/listadeespera" routeRegister="/relatorios/listadeespera/cadastrar"
            default-active="register" />
        <form class="form-app d-flex flex-column align-items-start mt-4 gap-4" @submit.prevent="submitForm">
            <div class="d-flex align-items-center align-self-start gap-4">
                <div class="d-flex flex-column align-self-start gap-2">
                    <label for="beneficiario">CPF do Beneficiario</label>
                    <input class="form-control" list="datalistOptions" id="beneficiario" style="width: 300px"  />
                </div>
                <datalist id="datalistOptions">
                    <option v-for="option in datalistOptions" :value="option"></option>
                </datalist>
                <div class="d-flex flex-column align-self-start gap-2">
                    <label for="Nomebeneficiario">Nome do Beneficiario</label>
                    <input class="form-control" list="datalistOptions" id="Nomebeneficiario" readonly
                        style="width: 300px" />
                </div>
                <router-link to="" class="btn btn-primary align-self-end">Ou Cadastrar Novo Beneficiario</router-link>
            </div>

            <div class="d-flex align-items-center align-self-start gap-5">
                <div class="d-flex flex-column align-self-start gap-2">
                    <label for="categoria">Categoria do Ativo</label>
                    <select class="form-select"  id="categoria" style="width: 300px">
                        <option v-for="categoria in categoriaList" :value="categoria">{{ categoria.nomeCategoria }}</option>

                    </select>
                </div>
            </div>
            <div class="mt-3 d-flex align-items-center gap-3">
                <button type="submit" class="btn btn-primary">Adicionar Beneficiario</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LinkDinamicoComponent from "@/components/LinkDinamicoComponent.vue";
import { Categoria } from '@/model/categoria';
import { Pessoa } from '@/model/pessoa';
import { CategoriaClient } from '@/client/categoria.client';
import { Beneficiario } from '@/model/beneficiario';
import { BeneficiarioClient } from '@/client/beneficiario.client';
export default defineComponent({
    name: "ListaDeEsperaCadastrar",
    components: {
        LinkDinamicoComponent,
    },
    data() {
        return {
            datalistOptions: [] as string[],
            datalistOptionsCategoria: [] as string[],
            categoriaList: [] as Categoria[],
            listaDeEspera: [],
            beenficiario: [] as Beneficiario[],
            nivelUrgencia: [
                { id: 1, nome: 'Alta' },
                { id: 2, nome: 'Média' },
                { id: 3, nome: 'Baixa' },
            ],
        };
    },
    computed:{
        categoriaClient(){
            return new CategoriaClient();
        },
        beneficiarioClient(){
            return new BeneficiarioClient();
        }
    },

    mounted(){

        this.findCategoria();

    },
//     async mounted() {
//     try {
//       const beneficiarioClient = new BeneficiarioClient();
//       const data = await beneficiarioClient.findAll();
//       this.datalistOptions = data.map((beneficiario: { perfil: { cpf: string; }; }) => beneficiario.perfil.cpf);
//       console.log(this.datalistOptions);
//     } catch (error) {
//       console.error("Failed to fetch cpf data:", this.datalistOptions);
//     }
//   },
    methods: {
        async submitForm() {
            
        },
        async fetchBeneficiario() {
        },

        async findCategoria(){

            const categoriaClient = new CategoriaClient

            categoriaClient.findByAtivos()
            .then(sucess => {

            this.categoriaList = sucess

            }
            )
            .catch(error => {
            console.log(error);
            }); 
    },


}});
</script>

<style></style>