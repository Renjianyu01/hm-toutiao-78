<template>
  <div class="container">
    <!-- 筛选区域 -->
    <el-card>
      <div slot="header" class="clearfix">
        <my-bread>內容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态:">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <!-- 自己封裝的組件 -->
          <!-- <my-channel :value='reqParams.channel_id' @input="fn2"></my-channel> -->
          <my-channel v-model='reqParams.channel_id'></my-channel>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            value-format="yyyy-MM-dd"
            @change="changeDate"
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
      <source />
    </el-card>
    <!-- 结果区域 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <!-- 表格組件 -->
      <el-table :data="articles" style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" fit="cover" style="width:120px;height:80px">
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" alt style="width:120px;height:80px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待審核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">審核通過</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">審核失敗</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已刪除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.id)" icon="el-icon-edit" plain circle></el-button>
            <el-button type="danger" @click="del(scope.row.id)" icon="el-icon-delete" plain circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div style="text-align:center;margin-top:30px;">
        <!-- 分页组件  默认的每页显示10条数   page-size 每页显示几条-->
        <!-- 当你更改组件的当前页码的时候  拿着新的页码重新请求渲染列表  @current-change="changePager"-->
        <!-- 当你不是点击按钮触发的分页 不会去选中按钮的样式  current-page 需要把当前页码数据和分页组件进行绑定 -->
        <el-pagination
          background
          layout="prev, pager, next,total"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="changePager"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'art',
  data () {
    return {
      // 收集请求的参数
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 频道下拉菜单数据
      // channelOptions: [],
      // 日期数据
      dateArr: [],
      // 文章数据
      articles: [],
      // 总数
      total: 0
    }
  },
  // 因为clearable 清空会为空字符串，axios 提交时会报错，后台需要的是id值，我们需要事件监听来确认改变数据的id
  watch: {
    'reqParams.channel_id': function (newValue, oldValue) {
      if (newValue === '') {
        this.reqParams.channel_id = null
      }
    }
  },
  created () {
    // 获取下来菜单信息
    // this.getChannelOptions()
    // 获取文章列表数据
    this.getArticles()
  },
  methods: {
    // fn2 (val) {
    //   this.reqParams.channel_id = val
    // },
    // 编辑文章
    edit (id) {
      this.$router.push('/publish?=' + id)
    },
    // 删除文章
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`articles/${id}`)
        // 提示更新列表
        this.$message.success('删除文章成功')
        this.getArticles()
      }).catch(() => {})
    },
    // 日期选择 格式与绑定的数据格式一致，自带清空功能，返回的也会是一个空字符
    // dateArr 是一个数组
    changeDate (dateArr) {
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选功能
    search () {
      this.reqParams.page = 1
      this.getArticles()
    },
    // 点击当前页 获取新的数据
    changePager (newPager) {
      this.reqParams.page = newPager
      this.getArticles()
    },
    // async getChannelOptions () {
    //   const {
    //     data: { data }
    //   } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },
    async getArticles () {
      // 请求方式是 get 传递参数为对象 {params：需要传递的参数}
      const {
        data: { data }
      } = await this.$http.get('/articles', { params: this.reqParams })
      this.articles = data.results
      // 获取总条数
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.el-card {
  margin-bottom: 20px;
}
</style>
