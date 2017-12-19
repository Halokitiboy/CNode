<template>
  <div class="detail">
    <h2>{{data.title}}</h2>
    <p>发布于{{data.create_at}} * 作者{{data.author}} * 浏览{{data.visit_count}} * 来自{{data.tab}}</p>
   {{data.content}}
  </div>
</template>
<script>
  export default {
    name: '',
    data() {
      return {
        data: {},
      }
    },
    methods: {
      getDetail() {
        let vm = this;
        let id = vm.$route.params.id;
        let params = {
          'mdrender': true,
          'accesstoken ': ''
        };
        vm.$service.getTopicsDetail(id, params, (res) => {
          let results = res;
          if (results.success === true) {
            vm.data = results.data;
          }
        }, (res) => {
          console.log(res)
        })
      }
    },
    mounted() {
      this.getDetail();
    }
  }

</script>
<style>

</style>
