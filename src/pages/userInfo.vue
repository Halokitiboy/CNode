<template>
  <div class="userInfo wrap" v-if="hasLogon">
    <mu-row gutter>
      <mu-col width="100" tablet="50" desktop="33">
        <div style="width: 10rem;height: 10rem;display: inline-block;">
          <img class="userInfo-avstar" :src="avatar_url" alt="">
        </div>
        <p>注册日期：{{createTime}}</p>
        <p class="userInfo-name">{{loginname}}</p>
      </mu-col>
      <mu-col width="100" tablet="50" desktop="33">
        <mu-flat-button label="退出" class="flat-button" icon="power_settings_new" backgroundColor="#474A4F"
                        color="#FFF" @click="logonOut"/>
      </mu-col>
    </mu-row>
    <hr>
    <mu-list>
      <router-link to="/mycollect">
        <mu-list-item title="我的收藏">
          <mu-icon slot="left" value="grade"/>
        </mu-list-item>
      </router-link>
      <router-link to="/myinfo">
        <mu-list-item title="我的消息">
          <mu-icon slot="left" value="message"/>
        </mu-list-item>
      </router-link>
      <router-link to="/mytopic">
        <mu-list-item title="我的话题">
          <mu-icon slot="left" value="subject"/>
        </mu-list-item>
      </router-link>
      <router-link to="/myresponse">
        <mu-list-item title="我的回复">
          <mu-icon slot="left" value="reply"/>
        </mu-list-item>
      </router-link>
    </mu-list>
    <mu-divider/>
  </div>
  <div v-else="!hasLogon">
    <p><i class="material-icons">warning</i></p>
    <p>亲，您还没登录哦！</p>
    <mu-raised-button label="点我登录" class="demo-raised-button" primary @click="goLogin"/>
  </div>
</template>
<script>
  import {mapState} from 'vuex';

  export default {
    name: '',
    data() {
      return {
        recentReplies: [],
        recentTopics: [],
        user: null,
        activeTab: 'tab1',
        info: null,
        tab: 'tab1',
        createTime: null,
        avatar_url: null,
        loginname: null
      }
    },
    methods: {
      handleTabChange(val) {
        this.activeTab = val;
      },
      toppics() {
        let vm = this;
        if (vm.hasLogon) {
          vm.$service.userInfo(vm.userInfo.loginname, {}, (res) => {
            let results = res.data;
            if (results.success === true) {
              vm.user = results.data;
              vm.recentReplies = results.data.recent_replies;
              vm.recentTopics = results.data.recent_topics;
              vm.loginname = results.data.loginname;
              vm.avatar_url = results.data.avatar_url;
              vm.createTime = vm.$moment(results.data.create_at).format(" YYYYMMMMDodddd  h:mm:ss a");
              vm.recentReplies.map(function (item, index) {
                item['last_reply_at'] = vm.$moment(item.last_reply_at).startOf('mm').fromNow();
              });
              vm.recentTopics.map(function (item, index) {
                item['last_reply_at'] = vm.$moment(item.last_reply_at).startOf('mm').fromNow();
              });
              sessionStorage.setItem('recent_replies',JSON.stringify(vm.recentReplies));
              sessionStorage.setItem('recent_topics', JSON.stringify(vm.recentTopics));
            }
          }, (res) => {
            vm.$toasted.show(res)
          })
        }
      },
      checkedUser() {
        let vm = this;
        if (vm.userInfo) {
          vm.toppics();
        }
      },
      goLogin() {
        this.$router.push({name: 'login', params: {redirect: 'userInfo'}});
      },
      logonOut() {
        this.$store.dispatch('logonOut');
      },
      updateTab() {
        this.activeTab = this.$route.query.tab || 'tab1';
      }
    },
    computed: {
      ...mapState({
        hasLogon: state => state.hasLogon,
        userInfo: state => state.userInfo,
        accesstoken: state => state.accesstoken
      }),
      showCollect() {
        return this.collectData.length > 0;
      },
      showHasReadInfo() {
        return this.hasReadInfo.length > 0;
      },
      showNoReadInfo() {
        return this.noReadInfo.length > 0;
      },
      showReplice() {
        return this.user.recent_replies.length > 0;
      },
      showTopic() {
        return this.user.recent_topics.length > 0;
      }
    },
    mounted() {
      this.checkedUser();
      this.updateTab();
    }
  }
</script>
<style scoped lang="less">
  .userInfo {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 10px 10px 20px;
    .flat-button {
      margin: 1rem 0;
    }
    .userInfo-avstar {
      width: 10rem;
      height: 10rem;
      border-radius: 50%;
      margin: auto;
    }
    .paper {
      margin-top: .5rem;
      .collect-item {
        display: flex;
        width: 90%;
        margin: auto;
        padding: 1em;
        img {
          width: 4rem;
          height: 4rem;
        }
        div:nth-of-type(1) {
          flex: 1;
          text-align: left;
        }
      }
    }
  }
</style>
