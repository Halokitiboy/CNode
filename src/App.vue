<template>
  <div id="app">
    <header-body :showBar="showBar"></header-body>
    <main class="el-main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </main>
    <foot-body v-show="showBar" :bottomNav="urlPath"></foot-body>
    <!--<mu-back-top/>-->
    <Loading v-if="pageLoading"></Loading>
  </div>
</template>
<script>
  import HeaderBody from './components/include/header.vue'
  import AsideLogin from './components/aside/aside.vue'
  import FootBody from './components/include/footer.vue'
  import Logon from './pages/login.vue'
  import Loading from './components/loading.vue'
  import {mapState} from 'vuex';

  export default {
    name: 'app',
    data() {
      return {
        loading: false,
        scroller: null,
        urlPath: 'home'
      }
    },
    methods: {
      handleSelect(key, keyPath) {
//        console.log(key, keyPath);
      },
      backTopCallBack() {

      },
      loadMore() {
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
    computed: {
      ...mapState({
        showBar: state => state.showBar,
        pageLoading: state => state.pageLoading
      })
    },
    components: {HeaderBody, AsideLogin, FootBody, Logon,Loading},
    mounted() {
//     this.urlPath=this.$route.name;
      console.log(this.$route)
      console.log(document.body.scrollTop)
      this.$nextTick(function () {
        window.addEventListener('scroll', this.onScroll)
      })
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
      flex-direction: column;
      .custom-icon {
        font-size: inherit;
      }
      .el-loading-mask {
        position: fixed;
      }
      .mu-badge-float {
        top: 0px;
        right: -5px;
      }
      .el-main {
        flex: 1;
        display: flex;
        flex-direction: column;
        img {
          max-width: 100%;
          height: auto;
        }
        .ql-editor {
          height: 15rem;
        }
        .submit-btn {
          margin: 10px 0;
        }
        .wrap {
          padding: 10px;
          width: 100%;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          .mu-paper {
            margin: 1rem 0;
          }
          .wrap-head {
            line-height: 50px;
          }
          .wrap-item {
            display: flex;
            /*line-height: 50px;*/
            .wrap-item-left {
              align-items: center;
              justify-content: center;
              padding: 1rem;
              width: 5rem;
              word-break: break-all;
            }
            .wrap-item-right {
              padding: 1rem;
              .tabs {
                span {
                  display: inline-block;
                  padding: .2rem .4rem;
                  color: #fff;
                  border-radius: .2rem;
                  &.top {
                    background: #f44336;
                  }
                  &.good {
                    background: #f89406;
                  }
                  &.tab {
                    background: #7E57C2;
                  }
                }
              }
              div:nth-of-type(1) {
                text-align: left;
              }
              div:nth-of-type(2) {
                text-align: left;
                text-overflow: ellipsis;
                overflow: hidden;
                a {
                  p {
                    word-break: break-all;
                  }
                }
              }
              div:nth-of-type(3) {
                display: flex;
                p:nth-of-type(1) {
                  flex: 4;
                  text-align: left;
                }
                p:nth-of-type(2) {
                  flex: 3;
                  text-align: right;
                }
              }
            }
            div:nth-of-type(2) {
              flex: 1;
            }
            div:nth-of-type(3) {
              flex: 1;
            }
            div:nth-of-type(5) {
              width: 200px;
            }
            img {
              width: 50px;
              height: 50px;
            }
            border-bottom: 1px solid #aaa;
          }
          .item {
            :last-of-type {
              border-bottom: none;
            }
          }
        }
      }
      .bs-header {
        background-color: #5A6167;
        color: #fff;
      }
    }
  }

</style>
