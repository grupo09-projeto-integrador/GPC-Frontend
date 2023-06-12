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
    component: () => import('../views/MovimentacoesView.vue')
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
