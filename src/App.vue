<template>
  <div id="app" >
    <header-body></header-body>
    <main class="el-main">
        <router-view></router-view>
    </main>
    <!--<mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"></mu-infinite-scroll>-->
    <foot-body></foot-body>
  </div>
</template>
<script>
  import HeaderBody from './components/include/header.vue'
  import AsideLogin from './components/aside/aside.vue'
  import FootBody from './components/include/footer.vue'
  import Logon from './pages/login.vue'
  import {mapState} from 'vuex';

  export default {
    name: 'app',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        loading: false,
        scroller: null
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      loadMore () {
        this.loading = true
        setTimeout(() => {
          for (let i = this.num; i < this.num + 10; i++) {
            this.list.push('item' + (i + 1))
          }
          this.num += 10
          this.loading = false
        }, 2000)
      }

    },

    components: { HeaderBody, AsideLogin,FootBody,Logon},
    mounted(){
      this.scroller = this.$el;
    }
  }
</script>

<style lang="less">
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    background: #FAFAFA;
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
      display: flex;
      flex-direction:column;
      .mu-badge-float{
        top: 0px;
        right: -6px;
      }
      .el-loading-mask{
        position: fixed;
      }
      .el-main {
        flex:1;
        display: flex;
        overflow-y: scroll;
          img {
            max-width: 100%;
            height: auto;
          }
          .ql-editor {
            height: 10rem;
          }

      }
      .bs-header {
        background-color: #5A6167;
        color: #fff;
      }
    }
  }

</style>
