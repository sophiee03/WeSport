import { createRouter, createWebHistory } from 'vue-router';
import LoginUI from '../views/LoginUI.vue';
import AreaSportivaUI from '../views/AreaSportivaUI.vue';
import Home from '../views/Home.vue';
//import Annunci from '../components/Annunci.vue';

const routes = [
  { path: '/login', component: LoginUI },
  { path: '/', component: Home},
  { path: '/sport/:sport', component: AreaSportivaUI, props: true},
  //{ path: '/annunci', component: Annunci },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;