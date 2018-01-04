<template>
  <div class="mycollect">
    <mu-paper v-if="hasdata" class="paper" :zDepth="2" v-for="(item , index) in mycollect" :key="index">
      <router-link class="collect-item"
                   :to="{ name: 'topicDetail', params: { id: item.id }}">
        <div>
          <h3>
            《{{item.title}}》</h3>
        </div>
      </router-link>
    </mu-paper>
    <h3 v-if="!hasdata">
      没有收藏的话题！
    </h3>
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    name: '',
    data() {
      return {
        hasdata: false,
        mycollect: null
      }
    },
    methods: {
      collectTopices() {
        let vm = this;
        if (vm.hasLogon) {
          vm.$service.topicAllCollect(vm.userInfo.loginname, {}, (res) => {
            let results = res.data;
            if (results.data.length !== 0) {
              vm.mycollect = results.data;
              vm.hasdata = true;
              vm.mycollect.map(function (item, index) {
                item['last_reply_at'] = vm.$moment(item.last_reply_at).startOf('mm').fromNow();
              });
            }
          }, (res) => {
            vm.$toasted.show(res);
          })
        }
      }
    },
    computed: ({
      ...mapState({
        userInfo: state => state.userInfo,
        hasLogon: state => state.hasLogon
      })
    }),
    mounted() {
      this.collectTopices()
    }
  }
</script>
<style scoped lang="less">
  .mycollect {
    padding: 10px;
    .paper {
      padding: .5rem;
      text-align: left;
    }
  }
</style>
