import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: '3000',
        host: '127.0.0.1',
        open: true, //是否开启本地跨域代理,
        https: false,
        proxy: {
            '/base': {
                target: 'http://127.0.0.1:8000/',
                changeOrigin: true,
                ws: true,
                rewrite: path => path.replace(/^\/base/, '')
            }
        }
    }
})
