<template>
  <div class="userInfo" v-if="showPage">
    <mu-row gutter>
      <mu-col width="100" tablet="50" desktop="33">
        <img class="userInfo-avstar" :src="userInfo.avatar_url" alt="">
        <p class="userInfo-name">{{userInfo.loginname}}</p>
      </mu-col>
      <mu-col width="100" tablet="50" desktop="33">
        <!--<mu-menu-item title="退出" leftIcon="power_settings_new"/>-->
        <mu-flat-button label="退出" class="flat-button" icon="power_settings_new" backgroundColor="#7E57C2"
                        color="#FFF" @click="logonOut"/>
      </mu-col>
    </mu-row>
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="tab1" title="我的收藏"/>
      <mu-tab value="tab2" title="已读消息"/>
      <mu-tab value="tab3" title="未读消息"/>
    </mu-tabs>
    <div v-if="activeTab === 'tab1'">
      <mu-paper class="paper" :zDepth="2">
        <router-link class="collect-item" v-for="(item , index) in collectData" :key="index"
                     :to="{ name: 'topicDetail', params: { id: item.id }}">
          <div>
            <img :src="item.author.avatar_url" alt="">
            <p>{{item.author.loginname}}</p>
          </div>
          <div>
            <p>{{item.title}}</p>
            <p>{{item.last_reply_at}}</p>
          </div>
        </router-link>
      </mu-paper>
    </div>
    <div v-if="activeTab === 'tab2'">
      <h3>没有已读消息</h3>
    </div>
    <div v-if="activeTab === 'tab3'">
      <h3>没有未读消息</h3>
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
        userInfo: {},
        collectData: [],
        showPage: false,
        activeTab: 'tab1'
      }
    },
    methods: {
      handleTabChange(val) {
        this.activeTab = val;
        console.log(val);
      },
      handleActive() {
        window.alert('tab active');
      },
      collectTopices() {
        let vm = this;
        if(vm.hasLogon){
          vm.$service.topicAllCollect(vm.userInfo.loginname, {}, (res) => {
            let results = res.data;
            if (results.data.length !== 0) {
              vm.collectData = results.data;
              vm.collectData.last_reply_at = vm.$moment(vm.collectData.last_reply_at).startOf('mm').fromNow();
            }
          }, (res) => {
            vm.$toasted.show(res);
          })
        }

      },
      checkedUser() {
        let vm = this;
        if (localStorage.getItem('userInfo')) {
          vm.userInfo = JSON.parse(localStorage.getItem('userInfo'));
          vm.showPage = true;
        } else {

        }
      },
      goLogin() {
        this.$router.push({name: 'login', params: {redirect: 'userInfo'}});
      },
      logonOut(){
        localStorage.clear();
        this.$store.dispatch('logonOut');
        this.showPage=false;
        this.checkedUser();
      }
    },
    computed:{
      ...mapState({
          hasLogon:state=>state.hasLogon
        })
    },
    mounted() {
      this.checkedUser();
      this.collectTopices();
    }
  }

</script>
<style scoped lang="less">
  .userInfo {
    padding: 10px;
    .flat-button{
      margin:1rem 0;
    }
    .userInfo-avstar {
      width: 10rem;
      height: 10rem;
      border-radius: 50%;
      margin: auto;
    }
    .paper {
      .collect-item {
        display: flex;
        width: 90%;
        margin: auto;
        padding: 1em;
        img {
          width: 4rem;
          height: 4rem;
        }
      }
    }
  }
</style>
