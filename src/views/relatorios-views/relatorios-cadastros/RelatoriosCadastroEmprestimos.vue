<template>
    <div class="main-content d-flex flex-column">
        <div class="header d-flex align-items-center justify-content-between">
            <div class="titles">
                <p class="title m-0">Relatórios de Cadastro | Emprestimos</p>
                <p class="nowDate">Data de geração : {{ nowsDate }}</p>
                <p class="fromTo">De {{ from }} Até {{ to }}</p>
            </div>
            <div class="download">
                <button class="btn btn-danger d-flex align-items-center gap-2" style="background-color: #DC3545;color: #fff; margin-right: 30px;">
                    <i class="bi bi-download"></i>
                    <span>Download</span>
                </button>
            </div>
        </div>
    </div>
</template> 

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'RelatoriosCadastroAtivosView',
    data() {
        return {
            nowsDate: '',
            from: '',
            to: ''
        }
    },
    created() {
        // Access query parameters from the URL
        const query = this.$route.query;
        this.from = query.from?.toString() || '';
        this.to = query.to?.toString() || '';
        this.nowsDate = new Date().toLocaleString();
    },
});
</script>

<style scoped>
.title {
    font-size: 24px;
    font-weight: 600;
    color: #333;
}

.nowDate,
.fromTo {
    font-size: 16px;
    color: #777;
}
</style>