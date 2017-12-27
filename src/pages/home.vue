<template>
  <div class="home" ref="wrap">
    <mu-paper class="demo-paper" :zDepth="2" v-for="(item ,index) in data" :key="index">
      <div class="home-item item">
        <div class="home-item-left">
          <img :src="item.avatar_url"/>
          <p>{{item.loginname}}</p>
        </div>
        <div class="home-item-right">
          <div>{{item.tab}}</div>
          <div :title="item.title">
            <router-link :to="{ name: 'topicDetail', params: { id: item.id }}"><p>{{item.title}}</p></router-link>
          </div>
          <div>
            <p>最近更新：{{item.last_reply_at}}</p>
            <p>
              <i class="icon-eye-open"></i>
              {{item.visit_count}}
              <i class="icon-reply"></i>
              {{item.reply_count}}
            </p>
          </div>
        </div>
      </div>
    </mu-paper>
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    name: 'home',
    data() {
      return {
        data: [],
        currentPage: 1,
        pageLimit: 20,
        loading: false,
        scroller: null
      }
    },
    methods: {
      homeList(currentPage) {
        let vm = this;
        let params = {
          page: currentPage,
          limit: vm.pageLimit
        };
        vm.$service.getTopics('', params, (res) => {
          if (res.data.success === true) {
            let results = res.data;
            vm.loading = false;
            console.log(results)
            results.data.map(function (value, index) {
              let obj = {};
              obj.loginname= value.author.loginname;
              obj.avatar_url= value.author.avatar_url;
              obj.createTime = value.create_at;
              obj['last_reply_at'] = moment(value.last_reply_at).startOf('mm').fromNow();
              obj.reply_count = value.reply_count;
              obj.visit_count= value.visit_count;
              obj.top = value.top;
              obj.tab = value.tab;
              obj.title = value.title;
              obj.author_id = value.author_id;
              obj.good = value.good;
              obj.id = value.id;
              vm.data.push(obj);
            })
          }
        }, (res) => {
          console.log(res);
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.homeList(this.currentPage);
        console.info(`当前页: ${val}`);
      },
      loadMore () {
        let vm=this;
          vm.loading = true;
          vm.currentPage+=1;
          vm.homeList(vm.currentPage);
      }
    },
    mounted() {
      this.homeList(this.currentPage);
      this.scroller = this.$el;
    },
    components: {}
  }

</script>
<style scoped lang="less">
  .home {
    padding: 10px;
    width: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .mu-paper {
      margin: 1rem 0;
    }
    .home-head {
      line-height: 50px;
    }
    .home-item {
      display: flex;
      /*line-height: 50px;*/
      .home-item-left{
        align-items: center;
        justify-content: center;
        padding: 1rem;
        width: 5rem;
        word-break: break-all;
      }
      .home-item-right {
        padding: 1rem;
        div:nth-of-type(1){
          text-align: left;
        }
        div:nth-of-type(2) {
          text-align: left;
          text-overflow: ellipsis;
          overflow: hidden;
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
</style>
