<template>
    <div class="main-content d-flex flex-column">
        <div class="printable ml-2 mr-2  d-flex flex-column">
            <div class="header d-flex align-items-center justify-content-between">
                <div class="titles">
                    <p class="title m-0">Relatórios de Cadastro | Ativos</p>
                    <p class="nowDate">Data de geração : {{ nowsDate }}</p>
                    <p class="fromTo">De {{ from }} Até {{ to }}</p>
                </div>
                <div class="actions d-flex align-items-center align-self-start mt-3">
                    <div class="search-container ">
                    <input type="text" class="search-input" placeholder="Buscar por Id Património ..."
                        v-model="searchQuery" />
                    <i class="bi bi-search search-icon"></i>
                </div>
                    <button class="download btn btn-danger d-flex align-items-center gap-2" id="downloadButton" @click="downloadPDF"
                style="background-color: #DC3545;color: #fff;">
                <i class="bi bi-download"></i>
            </button>
                </div>
            </div>
            <form class="form-app mt-2 h-auto flex-row d-flex align-itens-cemter gap-4 align-self-start">
                <div class="row d-flex align-items-center align-self-start">

                    <div class="col d-flex flex-column align-self-start">
                        <label for="condicao_id">Condição</label>
                        <select class="form-select" v-model="selectedCondicao" style="width: 230px">
                            <option value="" selected>Todas as condiçoes</option>
                            <option v-for="condicao in availableCondicao" :value="condicao">{{ condicao }}</option>
                        </select>
                    </div>

                    <div class="col d-flex flex-column align-self-start">
                        <label for="status_id">Status</label>
                        <select class="form-select" v-model="selectedStatus" style="width: 230px">
                            <option value="" selected>Todas as status</option>
                            <option v-for="status in availableStatus" :value="status">{{ status }}</option>
                        </select>
                    </div>

                    <div class="col d-flex align-self-start align-items-center gap-2">

                        <div class="d-flex flex-column">
                            <label for="dt_entrada">Data de Entrada</label>
                            <input type="date" class="form-control" id="dt_entrada" style="width: 230px"
                                v-model="selectedDate" />
                        </div>
                    </div>
                    <div class="col d-flex align-self-center align-items-center gap-2 ml-2 mt-4">
                        <div class="d-flex flex-column">
                            <input class="form-check-input" type="checkbox" id="flexCheckIndeterminate" v-model="checked" />
                            <label class="form-check-label p-0" for="flexCheckIndeterminate">
                                Ativos Emprestados
                            </label>
                        </div>
                    </div>
                </div>
            </form>
            <div class="data mt-4">
                <div class="summary-section">
                    <div class="summary-item">
                        <span>Ativos Cadastrados :</span>
                        <span>{{ countAtivosCadastrados }}</span>
                    </div>
                    <div class="summary-item">
                        <span>Ativos Disponiveis :</span>
                        <span>{{ countAtivosDisponiveis }}</span>
                    </div>
                    <div class="summary-item">
                        <span>Ativos Indisponiveis :</span>
                        <span>{{ countAtivosIndisponiveis }}</span>
                    </div>
                    <div class="summary-item">
                        <span>Ativos Ativos :</span>
                        <span>{{ countAtivosAtivos }}</span>
                    </div>
                    <div class="summary-item">
                        <span>Ativos Inativos :</span>
                        <span>{{ countAtivosInativos }}</span>
                    </div>
                </div>
            </div>
            <table class="table table-sm table-bordered w-100 mt-1">
                <thead>
                    <tr>
                        <th scope="col">Data de Cadastro</th>
                        <th scope="col">Nome Categoria</th>
                        <th scope="col">Id Património</th>
                        <th scope="col">Condição</th>
                        <th scope="col">Status</th>
                        <th scope="col">Data de Entrada</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ativo in ativosFilter" :key="ativo.id">
                        <td> {{ formatDate(ativo.dataCriacao) }} </td>
                        <td>{{ ativo.categoria.nomeCategoria }}</td>
                        <td>{{ ativo.idPatrimonio }}</td>
                        <td>{{ ativo.condicao }}</td>
                        <td>{{ ativo.status }}</td>
                        <td>{{ formatDate(ativo.dataEntrada) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template> 

<script lang="ts">
import { AtivoClient } from '@/client/ativo.client';
import { Ativo } from '@/model/ativo';
import { defineComponent } from 'vue';
import jsPDF from 'jspdf';
import { Condicao } from '@/model/condicao';
import { Status } from '@/model/status';
export default defineComponent({
    name: 'RelatoriosCadastroAtivosView',
    data() {
        return {
            ativos: [] as Ativo[],
            nowsDate: '',
            from: '',
            to: '',
            searchQuery: '',
            selectedStatus: null as Status | null,
            selectedCondicao: null as Condicao | null,
            selectedDate: null as string | null,

            checked: false,
        }
    },
    computed: {
        countAtivosAtivos(): number {
            return this.ativos.filter(ativo => !ativo.isSuspenso).length;
        },
        countAtivosInativos(): number {
            return this.ativos.filter(ativo => ativo.isSuspenso).length;
        },
        countAtivosCadastrados(): number {
            return this.ativos.length;
        },
        countAtivosDisponiveis(): number {
            return this.ativos.filter(ativo => ativo.status === 'DISPONIVEL').length;
        },
        countAtivosIndisponiveis(): number {
            return this.ativos.filter(ativo => ativo.status === 'USANDO').length;
        },
        ativosFilter(): Ativo[] {
            if (!this.searchQuery && !this.selectedStatus && !this.selectedCondicao && !this.selectedDate && !this.checked) {
                return this.ativos;
            } else {
                const lowerCaseQuery = this.searchQuery.toLowerCase();
                const filteredAtivos = this.ativos.filter((ativo: Ativo) => {
                    const matchesQuery = ativo.idPatrimonio.toString().toLocaleLowerCase().includes(lowerCaseQuery);
                    const matchesStatus = !this.selectedStatus || ativo.status === this.selectedStatus;
                    const matchesCondicao = !this.selectedCondicao || ativo.condicao === this.selectedCondicao;
                    const matchesDate = !this.selectedDate || ativo.dataEntrada.toString().includes(this.selectedDate);
                    const matchesEmprestado = !this.checked || ativo.status === Status.USANDO;

                    return matchesQuery && matchesStatus && matchesCondicao && matchesDate && matchesEmprestado;
                });
                return filteredAtivos;
            }
        },

        availableStatus(): string[] {
            const status = Object.values(Status);
            return status.map((st) => st.toUpperCase());
        },
        availableCondicao(): string[] {
            const condicao = Object.values(Condicao);
            return condicao.map((cond) => cond.toUpperCase());
        },
    },
    created() {
        // Access query parameters from the URL
        const query = this.$route.query;
        this.from = query.from?.toString() || '';
        this.to = query.to?.toString() || '';
        this.nowsDate = new Date().toLocaleString();
        this.fetchAtivos();
    },
    methods: {
        downloadPDF() {
    const pdf = new jsPDF();
    const element = document.querySelector('.printable') as HTMLElement;

    // Hide the .search-container element
    const searchElement = element.querySelector('.search-container') as HTMLElement;
    if (searchElement) {
        searchElement.style.display = 'none';
    }

    const downloadButton = document.querySelector('.btn-danger') as HTMLElement;
if (downloadButton) {
    downloadButton.style.setProperty('display', 'none', 'important');
    console.log(downloadButton);
}


    // Hide the form elements
    const formElements = element.querySelectorAll('form label, form input, form select') as NodeListOf<HTMLElement>;
    formElements.forEach((formElement) => {
        formElement.style.display = 'none';
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const widthRatio = pdfWidth / element.offsetWidth;
    const heightRatio = pdfHeight / element.offsetHeight;
    const scale = Math.min(widthRatio, heightRatio);

    pdf.html(element, {
        callback: function (pdf) {
            pdf.save(`ReportAtivo.pdf`);

            // Show the .search-container element and form elements after saving the PDF
            if (searchElement) {
                searchElement.style.display = '';
            }
            if (downloadButton) {
                downloadButton.style.display = '';
            }

            formElements.forEach((formElement) => {
                formElement.style.display = '';
            });
        },
        x: 0,
        y: 0,
        html2canvas: {
            scale: scale,
        },
    });
},


        formatDate(dateString: string | number | Date) {
            const dateTime = new Date(dateString);
            const formattedDate = dateTime.toLocaleDateString();
            const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return `${formattedDate} ${formattedTime}`;
        },
        async fetchAtivos() {
            try {
                const ativoClient = new AtivoClient();
                const response = await ativoClient.findByDatePdf(this.from, this.to)
                this.ativos = response;
            } catch (error) {
                console.error(error);
            }
        },
    }
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

.search-container {
    position: relative;
    margin-right: 30px;
}

.search-input {
    position: relative;
    width: 350px;
    height: 36px;
    padding: 0.5rem 1rem 0.5rem 2rem;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 50px;
    background: #f5f5f5;
}

.search-input:focus {
    outline: none;
    border-color: #aaa;
}

.search-input::placeholder {
    font-family: "Raleway", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    color: #3c3c43;
}

.search-icon {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    color: #888;
}

td,
th,
tr {
    text-align: center;
}

th {
    text-align: center;
    height: 30px;
    background: #0d6efd;
    color: #fff;
    font-weight: 300;
}

.summary-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
}

.data {
    margin-bottom: 20px;
}

.table {
    border-collapse: collapse;
}

td {
    height: 30px;
}</style>