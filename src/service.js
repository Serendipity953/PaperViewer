import axios from "axios";
//import { config } from "vue/types/umd";
//import { getToken } from "./utils/setToken";
import { Message } from "element-ui";
const service = axios.create({
    baseURL: '/api',
    timeout: 3000
})
//请求拦截器
service.interceptors.request.use((config) => {

    //请求之前的动作
    //config.headers['token']=getToken('token')//请求之前先携带token
    return config
},
    (erro) => {
        return Promise.reject(erro)
    })
//响应拦截器
service.interceptors.response.use((response) => {
    //对响应数据的一些处理
    if(response.status!=200){
        Message({message:response.data.message||'error',type:'warning'})
    }
    return response
},
    (erro) => {
        return Promise.reject(erro)
    })
export default service