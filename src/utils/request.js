import axios from 'axios'

// 创建一个新的axios实例 设置基地址和超时时间
const service = axios.create({
  // 基地址
  baseURL: 'http://ihrm-java.itheima.net', // 设置基地址
  // 超时等待时间
  timeout: 5000
})

// request interceptor 请求拦截器


// response interceptor 响应拦截器

// 导出axios实例
export default service
