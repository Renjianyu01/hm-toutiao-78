<template>
  <div class="container">article</div>
</template>

<script>
export default {
  created () {
    this.$http.get('http://ttapi.research.itcast.cn/mp/v1_0/authorizations')
  }
}
</script>

<style scoped lang='less'></style>
