<template>
  <mu-paper class="paper" :zDepth="2">
    <mu-circular-progress :size="60"/>
    <p>加载中...</p>
  </mu-paper>
</template>
<script>
  export default {
    name: '',
    data() {
      return {}
    }
  }

</script>
<style scoped lang="less">
  .paper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 10rem;
    height: 8rem;
    padding: 1rem;
    border-radius: 10px;

  }
</style>
