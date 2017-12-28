<template>
  <div class="share wrap" ref="wrap">
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
  export default {
    name: '',
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
      goodList(currentPage) {
        let vm = this;
        let params = {
          page: currentPage,
          limit: vm.pageLimit,
          tab: 'share'
        };
        vm.$service.getTopics('', params, (res) => {
          if (res.data.success === true) {
            let results = res.data;
            vm.loading = false;
            results.data.map(function (item, index) {
              item['last_reply_at'] = vm.$moment(item.last_reply_at).startOf('mm').fromNow();
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
        vm.goodList(vm.currentPage);
      }
    },
    mounted() {
      this.goodList(this.currentPage);
      this.scroller = this.$el;
    }
  }

</script>
<style>

</style>
