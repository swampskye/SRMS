import axios from "axios";
import cookie from 'react-cookies'

// create an axios instance
const instance = axios.create({
})


// request interceptor
instance.interceptors.request.use(
    config => {
        config.headers['token'] = cookie.load('token')
        // }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// export default axios;
export default instance;