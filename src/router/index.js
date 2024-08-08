import { createRouter, createWebHistory } from "vue-router";
import HomeView from '../views/HomeView.vue';
import BasicView from '../views/BasicView.vue';
import AgendaView from '../views/AgendaView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/basic',
        name: 'basic',
        component: BasicView
    },
    {
        path: '/agenda',
        name: 'agenda',
        component: AgendaView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;