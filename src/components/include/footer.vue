<template>
  <mu-paper>
    <mu-bottom-nav :value="bottomNav" @change="handleChange">
      <mu-bottom-nav-item value="home" title="首页" icon="home" />
      <mu-bottom-nav-item value="good" title="精品" icon="favorite" />
      <mu-bottom-nav-item value="share" title="分享" icon="share" />
      <mu-bottom-nav-item value="ask" title="问答" icon="location_on" />
      <mu-bottom-nav-item value="userInfo" title="我的" icon="person_pin" />
    </mu-bottom-nav>
  </mu-paper>
</template>
<script>
  export default {
    name: '',
//    props:['bottomNav'],
    data() {
      return {
        bottomNav:'home'
      }
    },
    methods:{
      handleChange (val) {
        let vm=this;

//         vm.bottomNav=vm.$route.name;
         console.log(val,vm.$route.name);
         vm.bottomNav=val;

        vm.$router.push(`/${val}`);
      },
    },
    mounted(){
      this.bottomNav=this.$route.name;
    }
  }

</script>
<style scoped lang="less">
    .mu-paper{
      .mu-buttom-item{
       max-width: 100%;
        min-width:0;
      }
    }
</style>
