import axios from 'axios'
// 导入store
import store from '@/store'
// 创建一个新的axios实例 设置基地址和超时时间
const service = axios.create({
  // 基地址
  // baseURL: 'http://ihrm-java.itheima.net', // 设置基地址
  // baseURL: process.env.VUE_APP_BASE_API, // 使用环境变量
  baseURL: 'http://localhost:8080',
  // 超时等待时间
  timeout: 5000
})

service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 设置统一的请求头
  // 获取token 
  console.log(store)
  const token = store.state.user.token
  // 如果有token就加在请求头上
  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// response interceptor 响应拦截器
// request interceptor 请求拦截器
// 添加请求拦截器
// 对于以下情况axios会主动抛出错误
// 1. 如果本次请求得到的响应状态码不是2开头的
// 2. 如果本粗请求出现网络错误
// 但是当我们提供错误的用户名和密码的时候,没有触发上面两个错误
// 此时axios不会主动报错 就需要添加响应拦截器
// 添加响应拦截器
service.interceptors.response.use(response => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  // 如果response.data.success返回true就代表操作成功
  if(response.data.success) {
    // 操作成功
    return response.data
  } else {
    // 如果success为false,拦截器抛出错误
    console.log('操作失败')
    return Promise.reject(new Error('请求错误'))
  }
}, error => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});



// 导出axios实例
export default service
