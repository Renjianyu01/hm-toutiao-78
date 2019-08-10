<template>
  <div class="container">
    <div class="header">header</div>
    <div class="content">
      <slot name="content" :msg='msg'></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-text',
  data () {
    return {
      msg: '作用域插槽'
    }
  }
}
</script>

<style scoped lang='less'></style>
