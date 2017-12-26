<template>
  <div id="app" >
    <header-body :showBar="showBar"></header-body>
    <main class="el-main">
        <router-view></router-view>
    </main>
    <!--<mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"></mu-infinite-scroll>-->
    <foot-body v-show="showBar" :bottomNav="urlPath"></foot-body>
    <mu-back-top :height="1" :bottom="100" :right="50" :duration="1000" :callBack="backTopCallBack">
      <mu-raised-button label="Back Top" class="demo-raised-button" primary/>
    </mu-back-top>
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
        loading: false,
        scroller: null,
        urlPath:'home'
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      backTopCallBack () {
        window.alert('I back top!')
      },
      loadMore () {
        this.loading = true
        setTimeout(() => {
          for (let i = this.num; i < this.num + 10; i++) {
            this.list.push('item' + (i + 1))
          }
          this.num += 10;
          this.loading = false
        }, 2000)
      }
    },
      computed:{
        ...mapState({
          showBar:state=>state.showBar
        })
      },
    components: { HeaderBody, AsideLogin,FootBody,Logon},
    mounted(){
//     this.urlPath=this.$route.name;
    }
  }
</script>

<style lang="less">
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    background: #FAFAFA;
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      height: 100%;
      display: flex;
      flex-direction:column;
      .el-loading-mask{
        position: fixed;
      }
      .mu-badge-float {
        top: 0px;
        right: -5px;
      }
      .el-main {
        flex:1;
        display: flex;
        overflow-y: scroll;
        flex-direction: column;
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
