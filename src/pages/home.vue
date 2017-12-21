<template>
  <div class="home">
    <div class="home-item home-head">
      <div>作者</div>
      <div>标签</div>
      <div>标题</div>
      <div>回复/浏览</div>
      <div>最后一次更新</div>
    </div>
    <div class="home-item item" v-for="(item,index) in data" :key="index">
      <div><img :src="item.author.avatar_url"/></div>
      <div><span>{{item.tab}}</span></div>
      <div :title="item.title">
        <router-link :to="{ name: 'topicDetail', params: { id: item.id }}"><span>{{item.title}}</span></router-link>
      </div>
      <div><span>{{item.reply_count}}/{{item.visit_count}}</span></div>
      <div><span>{{item.last_reply_at}}</span></div>
    </div>
    <el-pagination
      layout="prev, pager, next"
      :total="1000"
     @current-change="handleCurrentChange"
     >
    </el-pagination>
  </div>
</template>
<script>
  export default {
    name: 'home',
    data() {
      return {
        data: [],
        currentPage:1,
        pageLimit:20
      }
    },
    methods: {
      homeList(currentPage) {
        let vm = this;
        let params={
          page: currentPage,
          limit: vm.pageLimit
        };
        vm.$service.getTopics('', params, (res) => {
              console.log(res);
              vm.data=res.data;
        }, (res) => {
            console.log(res);
        })
      },
      handleCurrentChange(val) {
        this.currentPage=val;
        this.homeList(this.currentPage);
        console.info(`当前页: ${val}`);
      }
    },
    mounted(){
        this.homeList(this.currentPage);
    }
  }

</script>
<style scoped lang="less">
  .home{
    padding:10px;
    .home-head{
      line-height:50px;
    }
    .home-item{
      display: flex;
      /*line-height: 50px;*/
        div:nth-of-type(1){
          width:60px;
        }
      div:nth-of-type(2){
          width:60px;
      }
        div:nth-of-type(3){
          flex:1;
        }
      div:nth-of-type(5){
         width:200px;
      }
      img{
        width:50px;
        height:50px;
      }
      border-bottom:1px solid #aaa;
    }
    .item{

      :last-of-type{
        border-bottom:none;
      }
      &:hover{
        background: #F1F1F1;
      }
    }
  }
</style>
