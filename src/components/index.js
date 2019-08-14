// 封裝一個vue插件
// 注册 components 下的組件為全局組件
import MyBread from '@/components/my-bread'
import MyText from '@/components/my-text'
import MyChannel from '@/components/my-channel'

// 规则：暴露一个对象{}，在对象中 install（）{} 函数形参 vue对象
export default {
  install (Vue) {
    // 全局注册组件
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyText.name, MyText)
    Vue.component(MyChannel.name, MyChannel)
  }
}
