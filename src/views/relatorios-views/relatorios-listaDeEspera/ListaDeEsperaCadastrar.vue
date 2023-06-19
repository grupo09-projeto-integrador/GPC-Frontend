<template>
    <div class="main-content">
        <LinkDinamicoComponent routeList="/relatorios/listadeespera" routeRegister="/relatorios/listadeespera/cadastrar"
            default-active="register" />
        <form class="form-app d-flex flex-column align-items-start mt-4 gap-4">
            <div class="d-flex align-items-center align-self-start gap-5">
                <div class="d-flex flex-column align-self-start gap-2">
                    <label for="beneficiario">Beneficiario</label>
                    <input class="form-control" list="datalistOptions" id="beneficiario" style="width: 300px" />
                </div>
                <datalist id="datalistOptions">
                    <option v-for="option in datalistOptions" :value="option"></option>
                </datalist>
                <router-link to="" class="btn btn-primary align-self-end">Cadastrar Beneficiario</router-link>
            </div>
            <div class="d-flex align-items-center align-self-start gap-5">
                <div class="d-flex flex-column align-self-start gap-2">
                    <label for="categoria">Categoria</label>
                    <input class="form-control" list="datalistOptions" id="categoria" style="width: 300px" />
                </div>
                <datalist id="datalistOptions">
                    <option v-for="option in datalistOptionsCategoria" :value="option"></option>
                </datalist>
                <div class="d-flex flex-column align-self-end gap-2">
                    <label for="urgent">Nível de Urgência</label>
                    <select class="form-select" id="urgent" style="width: 300px" >
                    </select>
                </div>
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