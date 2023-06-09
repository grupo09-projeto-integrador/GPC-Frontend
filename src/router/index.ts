import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/inicio',
    name: 'home',
    component: () => import('../views/home-view/HomeView.vue')
  },
  {
    path: '/pessoas',
    name: 'pessoas',
    component: () => import('../views/pessoa-views/PessoasView.vue')
  },
  {
    path: '/pessoa',
    name: 'pessoa.listar',
    component: () => import('../views/pessoa-views/PessoaInfo.vue')
  },
  {
    path: '/pessoa/cadastro',
    name: 'pessoa.cadastro',
    component: () => import('../views/pessoa-views/PessoaCadastrar.vue'),
    children: [
      {
        path: '/pessoa/cadastro',
        name: 'pessoa.cadastro.editar',
        component: () => import('../views/pessoa-views/PessoaCadastrar.vue'),
      },
      {
        path: '/pessoa/cadastro',
        name: 'pessoa.cadastro.toggle',
        component: () => import('../views/pessoa-views/PessoaCadastrar.vue'),
      }
    ]
  },
  {
    path: '/movimentacao/cadastro',
    name: 'movimentacao.cadastro',
    component: () => import('../views/movimentacao-views/MovimentacoesCadastrar.vue'),
    children: [
      {
        path: '/movimentacao/cadastro',
        name: 'movimentacao.cadastro.editar',
        component: () => import('../views/movimentacao-views/MovimentacoesCadastrar.vue'),
      },
      {
        path: '/movimentacao/cadastro',
        name: 'movimentacao.cadastro.toggle',
        component: () => import('../views/movimentacao-views/MovimentacoesCadastrar.vue'),
      }
    ]
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: () => import('../views/NotificationsView.vue')
  },
  {
    path: '/categorias',
    name: 'categorias',
    component: () => import('../views/categoria-views/CategoriasView.vue')
  },
  {
    path: '/categorias/cadastrar',
    name: 'categorias-cadastrar',
    component: () => import('../views/categoria-views/CategoriaCadastrarView.vue')
  },
  {
    path: '/categorias/editar',
    name: 'categorias editar',
    component: () => import('../views/categoria-views/CategoriaEditarView.vue')
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
    path: '/movimentacoes/cadastrar/:ativoId',
    name: 'movimentacoes.cadastrar',
    component: () => import('../views/movimentacao-views/MovimentacoesCadastrar.vue')
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
    path: '/relatorios/cadastros',
    name: 'relatorios.cadastros',
    component: () => import('../views/relatorios-views/RelatoriosCadastro.vue')
  },
  {
    path: '/relatorios/cadastros/beneficiarios',
    name: 'relatorios.cadastros.beneficiarios',
    component: () => import('../views/relatorios-views/relatorios-cadastros/RelatoriosCadastroBeneficiarios.vue')
  },
  {
    path: '/relatorios/cadastros/categorias',
    name: 'relatorios.cadastros.categorias',
    component: () => import('../views/relatorios-views/relatorios-cadastros/RelatoriosCadastroCategorias.vue')
  },
  {
    path: '/relatorios/cadastros/ativos',
    name: 'relatorios.cadastros.ativos',
    component: () => import('../views/relatorios-views/relatorios-cadastros/RelatoriosCadastroAtivos.vue')
  },
  {
    path: '/relatorios/cadastros/empréstimos',
    name: 'relatorios.cadastros.empréstimos',
    component: () => import('../views/relatorios-views/relatorios-cadastros/RelatoriosCadastroEmprestimos.vue')
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
