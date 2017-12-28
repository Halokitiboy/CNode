<template>
  <div class="home wrap" ref="wrap">
    <mu-paper class="demo-paper" :zDepth="2" v-for="(item ,index) in data" :key="index">
      <div class="wrap-item item">
        <div class="wrap-item-left">
          <img :src="item.author.avatar_url"/>
          <p>{{item.author.loginname}}</p>
        </div>
        <div class="wrap-item-right">
          <div class="tabs">
            <span class="top" v-if="item.top">置顶</span>
            <span class="good" v-if="item.good">精华</span>
            <span class="tab">{{item.tab}}</span>
          </div>
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
  import tabCheck from '../lib/tab';

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
          limit: vm.pageLimit,
          tab: ''
        };
        vm.$service.getTopics('', params, (res) => {
          if (res.data.success === true) {
            let results = res.data;
            vm.loading = false;
            results.data.map(function (item, index) {
              item['last_reply_at'] = vm.$moment(item.last_reply_at).startOf('mm').fromNow();
              item['tab'] = tabCheck(item.tab);
            });
            vm.data = vm.data.concat(results.data);
          }
        }, (res) => {
          vm.$toasted.show(res);
        })
      },
      loadMore() {
        let vm = this;
        vm.loading = true;
        vm.currentPage += 1;
        vm.homeList(vm.currentPage);
      },
      tabCheck(tab) {
        let nameTab = '';
        switch (tab) {
          case 'share':
            nameTab = '分享';
            break;
          case 'good':
            nameTab = '精华';
            break;
          case 'ask':
            nameTab = '问答';
            break;
          default:
            break;
        }
        return nameTab;
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

</style>
