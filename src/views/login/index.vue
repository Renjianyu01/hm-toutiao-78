<template>
  <div class="container">
    <el-card class="my-card">
      <!-- logo -->
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 表单 -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:230px;margin-right:17px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// eslint-disable-next-line semi
import store from '@/store';
export default {
  data () {
    return {
      // 表单数据对象
      loginForm: {
        // 字段参考接口文档
        mobile: '18735624049',
        code: '246810'
      },
      loginRules: {
        mobile: [
          {
            required: true,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          },
          {
            len: 6,
            message: '请输入六位验证码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login () {
      // 对整体表单进行校验
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // console.log('success')
          // this.$http
          //   .post(
          //     'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
          //     this.loginForm
          //   )
          //   .then(res => {
          //     // res 是响应对象 res.data数据属于响应主体
          //     // console.log(res.data)
          //     this.$router.push('/')
          //   })
          //   .catch(() => {
          //     // 请求失败 提示  手机号或验证码错误
          //     this.$message.error('手机号或验证码错误')
          //   })
          // try {可能出现的错误} catch（）{处理错误}
          try {
            const {
              // 结构赋值
              data: { data }
            } = await this.$http.post('authorizations', this.loginForm)
            store.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号验证码错误')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url(../../assets/images/login_bg.jpg) no-repeat center/cover;
  .my-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto;
    }

    .el-form {
      margin-top: 20px;
    }
  }
}
</style>
