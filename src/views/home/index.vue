<template>
  <el-container class="wrapper">
    <el-aside :width="isCollapse?'64px':'200px'">
      <!-- logo -->
      <div class="logo" :class="{minlogo:isCollapse}"></div>
      <!-- 导航菜单 -->
      <el-menu
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <!-- el-submenu 是菜单项包含子级菜单 -->
        <!-- el-menu-item 是菜单项不包含子级菜单 -->
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 绑定点击事件，切换侧边的显示与隐藏 -->
        <span class="el-icon-s-fold" @click="toggleMenu()"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 组件中自定义绑定的办法，有默认传参，不需要加（） -->
        <el-dropdown class="my-dropdown" @command="clickMenu">
          <span class="el-dropdown-link">
            <img :src="photo" />
            {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!--
            click 为DOM原生事件，绑定在定义中为无效事件
            需要绑定在解析后的DOM，需要使用事件修饰符 native（绑定原生事件）
            @click.native="setting()
            @click.native="logout()-->
             <el-dropdown-item icon="el-icon-setting" command='setting'>个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command='logout'>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  created () {
    const user = store.getUser()
    this.name = user.name
    this.pthot = user.photo
  },
  methods: {
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    },
    setting () {
      this.$router.push('setting')
    },
    logout () {
      store.clearUser()
      // this.$router.push('login')
      this.$router.push({ name: 'login' })
    },
    clickMenu (menuType) {
      // 当点击：command='setting'、command='logout' 时，会把 setting、logout 传给clickMenu方法
      // menuType ===setting  this.setting
      // menuType ===logout   this.logout
      this[menuType]()
    }
  }
}
</script>

<style scoped lang='less'>
.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .el-aside {
    background-color: #002033;
  }
  .el-header {
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    .el-icon-s-fold {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      margin-left: 10px;
    }
    .my-dropdown {
      float: right;
      .el-dropdown-link {
        font-weight: bold;
      }
      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
    }
  }
  .logo {
    width: 100%;
    height: 60px;
    background-color: #002244;
    background: #002244 url(../../assets/images/logo_admin.png) no-repeat center /
      140px auto;
  }
  .minlogo {
    background-image: url(../../assets/images/logo_admin_01.png);
    background-size: 36px auto;
  }
  .el-menu {
    border-right: none;
  }
}
</style>
