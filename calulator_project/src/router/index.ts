import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/index.vue'

const routes = [
    {
        path: '/',
        component: HomeView,
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
