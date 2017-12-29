<template>
  <div class="userInfo" v-if="showPage">
    <mu-row gutter>
      <mu-col width="100" tablet="50" desktop="33">
        <img class="userInfo-avstar" :src="avatar_url" alt="">
        <p>注册日期：{{createTime}}</p>
        <p class="userInfo-name">{{loginname}}</p>
      </mu-col>
      <mu-col width="100" tablet="50" desktop="33">
        <mu-flat-button label="退出" class="flat-button" icon="power_settings_new" backgroundColor="#7E57C2"
                        color="#FFF" @click="logonOut"/>
      </mu-col>
    </mu-row>
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="tab1" title="我的收藏"/>
      <mu-tab value="tab2" title="已读消息"/>
      <mu-tab value="tab3" title="未读消息"/>
      <mu-tab value="tab4" title="我的话题"/>
      <mu-tab value="tab5" title="我的回复"/>
    </mu-tabs>
    <div v-if="activeTab === 'tab1'">
      <mu-paper v-if="showCollect" class="paper" :zDepth="2" v-for="(item , index) in collectData" :key="index">
        <router-link class="collect-item"
                     :to="{ name: 'topicDetail', params: { id: item.id }}">
          <div>
            <p>{{item.title}}</p>
          </div>
          <div>
            <p>最新回复时间：{{item.last_reply_at}}</p>
          </div>
        </router-link>
      </mu-paper>
      <h3 v-if="!showCollect">
        您还没有收藏哦！
      </h3>
    </div>
    <div v-if="activeTab === 'tab2'">
      <mu-paper v-if="showHasReadInfo" class="paper" :zDepth="2" v-for="(item , index) in hasReadInfo" :key="index">
        <router-link class="collect-item"
                     :to="{ name: 'topicDetail', params: { id: item.topic.id }}">
          <div>
            <h3></h3>
            <p>{{item.topic.last_reply_at}}&nbsp;&nbsp;{{item.author.loginname}}&nbsp;&nbsp;在话题《{{item.topic.title}}》中@了你</p>
          </div>
        </router-link>
      </mu-paper>
      <h3 v-if="!showHasReadInfo">
        没有已读消息
      </h3>
    </div>
    <div v-if="activeTab === 'tab3'">
      <mu-paper v-if="showNoReadInfo" class="paper" :zDepth="2" v-for="(item , index) in noReadInfo" :key="index">
        <router-link class="collect-item"
                     :to="{ name: 'topicDetail', params: { id: item.topic.id }}">
          <div>
            <h3></h3>
            <p>{{item.topic.last_reply_at}}&nbsp;&nbsp;{{item.author.loginname}}&nbsp;&nbsp;在话题《{{item.topic.title}}》中@了你</p>
          </div>
        </router-link>
      </mu-paper>
      <h3 v-if="!showNoReadInfo">
        没有未读消息
      </h3>
    </div>
    <div v-if="activeTab === 'tab4'">
      <mu-paper v-if="showTopic" class="paper" :zDepth="2" v-for="(item , index) in user.recent_topics" :key="index">
        <router-link class="collect-item"
                     :to="{ name: 'topicDetail', params: { id: item.id }}">
          <div>
            <p>{{item.title}}</p>
          </div>
          <div>
            <p>最新回复时间：{{item.last_reply_at}}</p>
          </div>
        </router-link>
      </mu-paper>
      <h3 v-if="!showTopic">
        您还没参与话题
      </h3>
    </div>
    <div v-if="activeTab === 'tab5'">
      <mu-paper v-if="showReplice" class="paper" :zDepth="2" v-for="(item , index) in user.recent_replies" :key="index">
        <router-link class="collect-item"
                     :to="{ name: 'topicDetail', params: { id: item.id }}">
          <div>
            <p>{{item.title}}</p>
          </div>
          <div>
            <p>最新回复时间：{{item.last_reply_at}}</p>
          </div>
        </router-link>
      </mu-paper>
      <h3 v-if="!showReplice">
        您还没有回复
      </h3>
    </div>
  </div>
  <div v-else="!showPage">
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
        collectData: [],
        hasReadInfo: [],
        noReadInfo: [],
        recentReplies: [],
        recentTopics: [],
        user: null,
        showPage: false,
        activeTab: 'tab1',
        info: null,
        tab: 'tab1',
        createTime:null,
        avatar_url:null,
        loginname:null
      }
    },
    methods: {
      handleTabChange(val) {
        this.activeTab = val;
      },
      collectTopices() {
        let vm = this;
        if (vm.hasLogon) {
          vm.$service.topicAllCollect(vm.userInfo.loginname, {}, (res) => {
            let results = res.data;
            if (results.data.length !== 0) {
              vm.collectData = results.data;
              vm.collectData.map(function (item, index) {
                item['last_reply_at'] = vm.$moment(item.last_reply_at).startOf('mm').fromNow();
              });
            }
          }, (res) => {
            vm.$toasted.show(res);
          })
        }
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
            }
          }, (res) => {
            vm.$toasted.show(res)
          })
        }
      },
      getMessages() {
        let vm = this;
        let params={
          accesstoken:vm.accesstoken
        };
        if(vm.hasLogon){
          vm.$service.getMessages('', params, (res) => {
            let result = res.data;
            if (result.success === true) {
              vm.hasReadInfo=result.data.has_read_messages;
              vm.noReadInfo=result.data.hasnot_read_messages;
              vm.hasReadInfo.map(function (item,index) {
                  item['topic']['last_reply_at']=vm.$moment(item['topic']['last_reply_at']).startOf('mm').fromNow();
              });
              vm.noReadInfo.map(function (item,index) {
                item['topic']['last_reply_at']=vm.$moment(item['topic']['last_reply_at']).startOf('mm').fromNow();
              });
            }
          }, (res) => {
            vm.$toasted.show(res)
          })
        }
      },
      checkedUser() {
        let vm = this;
        if (vm.userInfo) {
          vm.collectTopices();
          vm.toppics();
          vm.getMessages();
          vm.showPage = true;
        }
      },
      goLogin() {
        this.$router.push({name: 'login', params: {redirect: 'userInfo'}});
      },
      logonOut() {
        this.$store.dispatch('logonOut');
        this.showPage = false;
      },
      updateTab() {
        this.activeTab = this.$route.query.tab || 'tab1';
      }
    },
    computed: {
      ...mapState({
        hasLogon: state => state.hasLogon,
        userInfo: state => state.userInfo,
        accesstoken:state=>state.accesstoken
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
    padding: 10px;
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
