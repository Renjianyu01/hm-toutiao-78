<template>
  <el-select :value="value" clearable placeholder="请选择" @change="fn">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  props: ['value'],
  name: 'my-channel',
  data () {
    return {
      myValue: null,
      channelOptions: []
    }
  },
  watch: {
    'value': function (newVal, oldVal) {
      if (newVal === '') {
        this.myValue = null
      }
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    fn (val) {
      this.$emit('input', val)
    },
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style scoped lang='less'></style>
