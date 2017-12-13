<template>
  <div id="app">
    <el-container>
      <el-header class="bs-header">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#E46363"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-menu-item index="2"> 我的工作台</el-menu-item>
          <el-menu-item index="3">订单管理</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
      </el-main>
    </el-container>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods:{
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="less">
  html,body{
    margin:0;
    padding:0;
    height:100%;

    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      height:100%;
      .bs-header {
        background-color: #E46363;
        color: #fff;
      }
    }
  }

</style>
