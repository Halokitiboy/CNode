<template>
  <div id="app" >
    <header-body></header-body>
    <main class="el-main">
      <section class="main-content">
        <router-view></router-view>
      </section>
      <aside-login></aside-login>
    </main>
  </div>
</template>
<script>
  import HeaderBody from './components/include/header.vue'
  import AsideLogin from './components/aside/aside.vue'
  import {mapState} from 'vuex';

  export default {
    name: 'app',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

    },

    components: { HeaderBody, AsideLogin}
  }
</script>

<style lang="less">
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    /**{*/
    /*box-sizing: border-box;*/
    /*}*/
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      height: 100%;
      .el-loading-mask{
        position: fixed;
      }
      .el-main {
        display: flex;
        width: 1240px;
        margin: auto;
        .main-content {
          border: 1px solid #aaa;
          flex: 1;
          width: 100%;
          img {
            max-width: 100%;
            height: auto;
          }
          .ql-editor {
            height: 200px;
          }
        }
        .aside {
          width: 250px;
          border: 1px solid #aaa;
          margin-left: 10px;
        }
      }
      .bs-header {
        background-color: #5A6167;
        color: #fff;
      }
    }
  }

</style>
