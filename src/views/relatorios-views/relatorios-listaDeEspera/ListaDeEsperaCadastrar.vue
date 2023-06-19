<template>
    <div class="main-content">
        <LinkDinamicoComponent routeList="/relatorios/listadeespera" routeRegister="/relatorios/listadeespera/cadastrar"
            default-active="register" />
        <form class="form-app d-flex flex-column align-items-start mt-4 gap-4">
            <div class="d-flex align-items-center align-self-start gap-4">
                <div class="d-flex flex-column align-self-start gap-2">
                    <label for="beneficiario">CPF do Beneficiario</label>
                    <input class="form-control" list="datalistOptions" id="beneficiario" style="width: 300px" />
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
                    <input class="form-control" list="datalistOptions" id="categoria" style="width: 300px" />
                </div>
                <datalist id="datalistOptions">
                    <option v-for="option in datalistOptionsCategoria" :value="option"></option>
                </datalist>
                <div class="d-flex flex-column align-self-end gap-2">
                    <label for="urgent">Nível de Urgência</label>
                    <select class="form-select" id="urgent" style="width: 300px">
                    </select>
                </div>
            </div>
            <div class="descricao d-flex flex-column gap-2">
                <label for="descricao">Adicione uma descrição (opcional)</label>
                <textarea class="form-control" placeholder="Faça uma observação aqui" id="descricao"
                    style="height: 120px;width: 800px;"></textarea>
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
export default defineComponent({
    name: "ListaDeEsperaCadastrar",
    components: {
        LinkDinamicoComponent,
    },
    data() {
        return {
            datalistOptions: [] as string[],
            datalistOptionsCategoria: [] as string[],
        };
    },
});
</script>

<style></style>