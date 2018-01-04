<template>
  <mu-appbar title="CNode" style="text-align: left">
    <mu-badge slot="left" v-show="!showBar">
      <mu-icon-button icon="arrow_back" @click="goBack"></mu-icon-button>
    </mu-badge>
    <mu-badge v-show="showBar" :content="messageNum" circle secondary slot="right">
      <mu-icon-button icon="notifications" @click="checkInfo"/>
    </mu-badge>
    <mu-badge v-show="showBar" slot="right">
      <mu-icon-button icon="edit_mode" @click="newTopic"/>
    </mu-badge>
  </mu-appbar>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    name: '',
    props: ['showBar'],
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        messageNum: '0'
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      goBack() {
        let vm = this;
        vm.$router.go(-1);
        console.log('-1')
      },
      checkInfo() {
        let vm = this;
        if (!vm.hasLogon) {
          vm.$toasted.show('请先登录！')
        } else {
          vm.$router.push({name: 'userInfo'});
        }
      },
      newTopic() {
        let vm = this;
        if (!vm.hasLogon) {
          vm.$toasted.show('请先登录！')
        } else {
          vm.$router.push({name: 'newTopic'});
        }
      },
      getMessageCount() {
        let vm = this;
        let params = {
          accesstoken: this.accesstoken
        };
        if (this.hasLogon) {
          vm.$service.getMessageCount('', params, (res) => {
            let results = res.data;
            if (results.success === true) {
              vm.messageNum = results.data.toString();
            }
          }, (res) => {

          })
        }
      }
    },
    computed: ({
      ...mapState({
        hasLogon: state => state.hasLogon,
        accesstoken: state => state.accesstoken
      })
    }),
    create: {},
    mounted() {
      this.getMessageCount();
    },
    activated() {
      this.getMessageCount();
    }
  }

</script>
<style scoped lang="less">

  .bs-header {
    .header-ul {
      width: 1240px;
      margin: auto;
      .el-menu-item {
        width: 150px;
      }
      .route-link {
        display: block;
        height: 100%;
        width: 100%;
        text-decoration: none;
      }
    }
    .el-menu--horizontal {
      border-bottom: none;
    }
    .log {
      width: 100px;
    }
  }
</style>
