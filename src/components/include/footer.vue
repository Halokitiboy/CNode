<template>
  <mu-paper>
    <mu-bottom-nav :value="bottomNav" @change="handleChange">
      <mu-bottom-nav-item value="home" title="首页" icon="home" />
      <mu-bottom-nav-item value="good" title="精品" icon="favorite" />
      <mu-bottom-nav-item value="share" title="分享" icon="share" />
      <mu-bottom-nav-item value="ask" title="问答" icon="location_on" />
      <mu-bottom-nav-item value="me" title="我的" icon="person_pin" />
    </mu-bottom-nav>
  </mu-paper>
</template>
<script>
  export default {
    name: '',
    data() {
      return {
        bottomNav: 'home'
      }
    },
    methods:{
      handleChange (val) {
        let vm=this;
        vm.bottomNav = val
        console.log(val)
        vm.$router.push(`/${val}`);
      },

    }
  }

</script>
<style scoped lang="less">
    .mu-paper{
      /*position: fixed;*/
      /*left:0;*/
      /*bottom:0;*/
      /*height:4rem;*/
      .mu-buttom-item{
       max-width: 100%;
      }
    }
</style>
