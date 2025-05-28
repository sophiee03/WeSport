import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../components/LoginView.vue';
import Annunci from '../components/Annunci.vue';

const routes = [
  { path: '/', component: LoginView },
  { path: '/annunci', component: Annunci },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;