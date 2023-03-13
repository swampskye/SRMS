import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import './assets/main.css'

const app = createApp(App)

app.use(router).use(ElementPlus).mount('#app')

router.beforeEach((to, from, next) =>{
    if (to.path === '/signin' || to.path === '/signup'){
        next()
    }else {
        let token = window.localStorage.token
        if (token === 'null' || token === '' || token === undefined){
            next('/signin')
        }else {
            next()
        }
    }
})