import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
    {
        path: '/',
        component: HomeView,
        meta:{title:"標準電卓"},
    },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    // ページタイトルを更新
    if (to.meta.title) {
        document.title = to.meta.title as string;
    }
    next();
})

export default router