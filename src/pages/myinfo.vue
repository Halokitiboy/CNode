<template>
  <div class="myinfo">
    <mu-list >
      <mu-list-item :title="'已读消息('+readNum+')'" @click="showReadBox">
        <mu-icon slot="left" value="message"/>
      </mu-list-item>
    </mu-list>
    <section v-show="hasread">
      <mu-paper class="paper" :zDepth="2" v-for="(item , index) in hasReadInfo" :key="index">
        <router-link class="collect-item"
                     :to="{ name: 'topicDetail', params: { id: item.topic.id }}">
          <div>
            <h3></h3>
            <p>
              {{item.topic.last_reply_at}}&nbsp;&nbsp;{{item.author.loginname}}&nbsp;&nbsp;在话题《{{item.topic.title}}》中@了你</p>
          </div>
        </router-link>
      </mu-paper>
    </section>
    <mu-list >
      <mu-list-item  :title="'未读消息('+noreadNum+')'" @click="showNoReadBox">
        <mu-icon slot="left" value="message"/>
      </mu-list-item>
    </mu-list>
    <section v-show="hasnoread">
      <mu-paper class="paper" :zDepth="2" v-for="(item , index) in noReadInfo" :key="index">
        <router-link class="collect-item"
                     :to="{ name: 'topicDetail', params: { id: item.topic.id }}">
          <div>
            <h3></h3>
            <p>
              {{item.topic.last_reply_at}}&nbsp;&nbsp;{{item.author.loginname}}&nbsp;&nbsp;在话题《{{item.topic.title}}》中@了你</p>
          </div>
        </router-link>
      </mu-paper>
    </section>
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    name: '',
    data() {
      return {
        myInfo: null,
        hasread: false,
        hasnoread: false,
        hasReadInfo: null,
        noReadInfo: null,
        noreadNum:0,
        readNum:0
      }
    },
    methods: {
      getMessages() {
        let vm = this;
        let params = {
          accesstoken: vm.accesstoken
        };
        if (vm.hasLogon) {
          vm.$service.getMessages('', params, (res) => {
            let result = res.data;
            if (result.success === true) {
              vm.hasReadInfo = result.data.has_read_messages;
              vm.noReadInfo = result.data.hasnot_read_messages;
              vm.noreadNum=vm.noReadInfo.length;
              vm.readNum=vm.hasReadInfo.length;
              vm.hasReadInfo.map(function (item, index) {
                item['topic']['last_reply_at'] = vm.$moment(item['topic']['last_reply_at']).startOf('mm').fromNow();
              });
              vm.noReadInfo.map(function (item, index) {
                item['topic']['last_reply_at'] = vm.$moment(item['topic']['last_reply_at']).startOf('mm').fromNow();
              });
              vm.hasdata = true;
            }
          }, (res) => {
            vm.$toasted.show(res)
          })
        }
      },
      showReadBox() {
        this.hasread=!this.hasread;
      },
      showNoReadBox() {
      this.hasnoread=!this.hasnoread;
      }

    },
    computed: ({
      ...mapState({
        hasLogon: state => state.hasLogon,
        accesstoken: state => state.accesstoken
      })
    }),
    mounted() {
      this.getMessages()
    }
  }

</script>
<style scoped lang="less">
  .myinfo {
    padding: 10px;
    .mu-list {
      div:nth-of-type(1) {
        border: 1px solid #eee;
        background: #fff;
      }
    }
    .paper {
      padding: .5rem;
      text-align: left;
    }
  }
</style>
