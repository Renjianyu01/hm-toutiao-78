// 储存信息时：
// 约定信息的 key 是什么？ hm-toutiao-78-user
// 储存信息的值是什么？ 用户信息对象 字符串格式 json
const KEY = 'hm=toutiao-78-user'

export default {
  // 储存用户信息到sessionStorage
  setUser (user) {
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  // 获取用户信息
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  }
}
