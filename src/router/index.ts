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
    component: () => import('../views/AtivosView.vue')
  },
  {
    path: '/emprestimos',
    name: 'emprestimos',
    component: () => import('../views/EmprestimosView.vue')
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
