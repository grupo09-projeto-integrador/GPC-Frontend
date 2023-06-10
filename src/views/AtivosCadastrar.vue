<template>
    <div class="main-content d-flex flex-column align-items-start">
        <LinkDinamicoComponent routeList="/ativos" routeRegister="/ativos/cadastrar" default-active="register" />
        <form class="form-app d-flex flex-column align-items-start mt-4 h-100">
            <div class="row d-flex align-items-center align-self-start">
                <div class="col d-flex flex-column align-self-start">
                    <label for="categoria-id">Categoria</label>
                    <input type="text" class="form-control" id="categoria-id" placeholder="ID da Categoria" />
                </div>
                <button type="submit" class="col-md-2 btn btn-primary align-self-end">
                    <i class="bi bi-search"></i>
                </button>
            </div>
            <div class="d-flex flex-column">
                <label for="patrimonio-id">Patrimônio</label>
                <input type="text" class="form-control" id="patrimonio-id" placeholder="ID do Patrimônio" />
            </div>
            <div class="row g-3">
                <div class="col-md-6 d-flex flex-column align-items-start">
                    <label for="patrimonio-id">Condição</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Selecione uma condição</option>
                    </select>
                </div>
                <div class="col-md-6 d-flex flex-column align-items-start">
                    <label for="patrimonio-id">Status</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Selecione um status</option>
                    </select>
                </div>
            </div>
            <div class="d-flex flex-column">
                <label for="dt_entrada">Data de Entrada</label>
                <input type="date" class="form-control" id="dt_entrada" style="width: 300px;" />
            </div>
            <div class="form-floating" style="width: 600px;">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                    style="height: 100px"></textarea>
                <label for="floatingTextarea2">Adicione uma descrição (opcional)</label>
            </div>
        </form>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import LinkDinamicoComponent from "@/components/LinkDinamicoComponent.vue";

export default defineComponent({
    name: "AtivosCadastrar",
    components: {
        LinkDinamicoComponent,
    },
});
</script>

<style scoped>
form {
    width: 100%;
    height: 100%;
    gap: 15px;
}

.form-select {
    text-indent: 10px;
    display: block;
    width: 300px;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
</style>