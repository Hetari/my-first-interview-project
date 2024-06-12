import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/phone/:id',
    component: () => import('../views/Phone.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
