// Vueアプリケーションのエントリーポイント

import { createApp } from 'vue' // Vueアプリケーションを作成する関数をインポート
import { createPinia } from 'pinia' // 状態管理ライブラリPiniaをインポート
import { router } from './router' // ルーターをインポート
import App from './App.vue' // ルートコンポーネントをインポート

const app = createApp(App) // アプリケーションインスタンスを作成
app.use(createPinia()) // Piniaをアプリケーションに登録
app.use(router) // ルーターをアプリケーションに登録
app.mount('#app') // アプリケーションを#app要素にマウント