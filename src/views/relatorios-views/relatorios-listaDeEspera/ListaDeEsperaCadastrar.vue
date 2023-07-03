<template>
    <div class="main-content">
        <LinkDinamicoComponent routeList="/relatorios/listadeespera" routeRegister="/relatorios/listadeespera/cadastrar"
            default-active="register" />
        <form class="form-app d-flex flex-column align-items-start mt-4 gap-4" @submit.prevent="submitForm">
            <div class="d-flex align-items-center align-self-start gap-4">
                <div class="d-flex flex-column align-self-start gap-2">
                    <label for="beneficiario">CPF do Beneficiario</label>
                    <input class="form-control" list="datalistOptions" id="beneficiario" style="width: 300px"
                        v-model="beneficiario.cpf" />
                    <datalist id="datalistOptions">
                        <option v-for="option in datalistOptions" :value="option"></option>
                    </datalist>
                </div>
                <div class="d-flex flex-column align-self-start gap-2">
                    <label for="Nomebeneficiario">Nome do Beneficiario</label>
                    <input class="form-control" list="datalistOptions" id="Nomebeneficiario" readonly v-model="ascNome"
                        style="width: 300px" />
                </div>
                <router-link to="" class="btn btn-primary align-self-end">Ou Cadastrar Novo Beneficiario</router-link>
            </div>

            <div class="d-flex align-items-center align-self-start gap-5">
                <div class="d-flex flex-column align-self-start gap-2">
                    <label for="categoria">Categoria do Ativo</label>
                    <select class="form-select" id="categoria" style="width: 300px" v-model="selectedCategoria">
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
export default defineComponent({
    name: "ListaDeEsperaCadastrar",
    components: {
        LinkDinamicoComponent
    },
    data() {
        return {
            categoriaList: [] as Categoria[],
            pessoaList: [] as Pessoa[],
            beneficiario: new Pessoa(),
            datalistOptions: [] as string[],
            searchQuery: "",
            ascNome: "",
            selectedCategoria: "",
            id: 0,
        }
    },
    mounted() {
        this.loadCategoria();
        this.loadDatalistOptions();
    },
    methods: {
        async submitForm() {
            const categoria = new CategoriaClient();

            const respo = await categoria.findAll();
            respo.forEach(async (element) => {
                if (element.nomeCategoria === this.selectedCategoria) {
                    this.id = element.id;
                    const define = await categoria.findById(this.id);
                    define.listaEspera.push(this.beneficiario);
                    await categoria.update(define);
                }
            });
        },

        async loadCategoria() {
            const client = new CategoriaClient();
            this.categoriaList = await client.findAll();
        },
        async loadDatalistOptions() {
            this.datalistOptions = this.pessoaList.map(pessoa => pessoa.cpf);
        }
    },
})

</script>

<style></style>