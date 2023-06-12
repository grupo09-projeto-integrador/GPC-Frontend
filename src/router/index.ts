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
    component: () => import('../views/AtivosView.vue')
  },
  {
    path: '/ativos/cadastrar',
    name: 'ativos.cadastrar',
    component: () => import('../views/AtivosCadastrar.vue')
  },
  {
    path: '/movimentacoes',
    name: 'movimentacoes',
    component: () => import('../views/MovimentacoesView.vue')
  },
  {
    path: '/movimentacoes/cadastrar',
    name: 'movimentacoes.cadastrar',
    component: () => import('../views/MovimentacoesCadastrar.vue')
  },
  {
    path: '/relatorios',
    name: 'relatorios',
    component: () => import('../views/RelatoriosView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
