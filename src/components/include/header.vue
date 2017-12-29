<template>
  <mu-appbar title="CNode"  style="text-align: left" >
    <mu-badge slot="left" v-show="!showBar" >
      <mu-icon-button icon="arrow_back" @click="goBack"></mu-icon-button>
    </mu-badge>
    <mu-badge v-show="showBar" content="0" circle secondary slot="right" >
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
    props:['showBar'],
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      goBack(){
        let vm=this;
        vm.$router.go(-1);
        console.log('-1')
      },
      checkInfo(){
        let vm=this;
        if(!vm.hasLogon){
            vm.$toasted.show('请先登录！')
        }else{
          vm.$router.push({name:'userInfo'});
        }
      },
      newTopic(){
        let vm=this;
        if(!vm.hasLogon){
          vm.$toasted.show('请先登录！')
        }else{
          vm.$router.push({name:'newTopic'});
        }
      }
    },
    computed:({
      ...mapState({
        hasLogon:state=>state.hasLogon
      })
    }),
    create:{

    },
    mounted(){
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
