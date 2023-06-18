import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/inicio',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: () => import('../views/UsuariosView.vue')
  },
  {
    path: '/categorias',
    name: 'categorias',
    component: () => import('../views/CategoriasView.vue')
  },
  {
    path: '/categorias/cadastrar',
    name: 'categorias cadastrar',
    component: () => import('../views/CategoriaCadastrarView.vue')
  },

  {
    path: '/ativos',
    name: 'ativos',
    component: () => import('../views/ativo-views/AtivosView.vue')
  },
  {
    path: '/ativos/cadastrar',
    name: 'ativos.cadastrar',
    component: () => import('../views/ativo-views/AtivosCadastrar.vue')
  },
  {
    path: '/ativos/editar/:ativoId',
    name: 'ativos-editar',
    component: () => import('../views/ativo-views/AtivosEditar.vue')
  },
  {
    path: '/movimentacoes',
    name: 'movimentacoes',
    component: () => import('../views/movimentacao-views/MovimentacoesView.vue')
  },
  {
    path: '/movimentacoes/cadastrar',
    name: 'movimentacoes.cadastrar',
    component: () => import('../views/movimentacao-views/MovimentacoesCadastrar.vue')
  },
  {
    path: '/relatorios',
    name: 'relatorios',
    component: () => import('../views/relatorios-views/RelatoriosView.vue')
  },
  {
    path: '/relatorios/beneficiarios',
    name: 'relatorios.beneficiarios',
    component: () => import('../views/relatorios-views/RelatoriosBeneficiarios.vue')
  },
  {
    path: '/relatorios/funcionarios',
    name: 'relatorios.funcionarios',
    component: () => import('../views/relatorios-views/RelatoriosFuncionarios.vue')
  },
  {
    path: '/relatorios/emprestimos',
    name: 'relatorios.emprestimos',
    component: () => import('../views/relatorios-views/RelatoriosEmprestimo.vue')
  },
  {
    path: '/relatorios/listadeespera',
    name: 'relatorios.listadeespera',
    component: () => import('../views/relatorios-views/relatorios-listaDeEspera/ListaDeEsperaListar.vue')
  },
  {
    path: '/relatorios/listadeespera/cadastrar',
    name: 'relatorios.listadeespera.cadastrar',
    component: () => import('../views/relatorios-views/relatorios-listaDeEspera/ListaDeEsperaCadastrar.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
