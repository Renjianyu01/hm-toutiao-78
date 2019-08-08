// 配置 axios 导出一个配置好的axios
import axios from 'axios'
import store from '@/store'

// 进行配置
// 基准路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 请求头字段
axios.defaults.headers = {
  Authorization: `Bearer ${store.getUser().token}`
}
// 导出
export default axios
