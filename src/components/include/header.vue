<template>
    <el-container>
      <el-header class="bs-header">
          <el-menu
            :default-active="activeIndex2"
            class="header-ul"
            mode="horizontal"
            @select="handleSelect"
            background-color="#5A6167"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1">
              <router-link class="route-link" to="/home">首页</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link class="route-link" to="/good">精华</router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link class="route-link" to="/share">分享</router-link>
            </el-menu-item>
            <el-menu-item index="4">
              <router-link class="route-link" to="/ask">问答</router-link>
            </el-menu-item>
          </el-menu>
      </el-header>
    </el-container>
</template>
<script>
  export default {
    name: '',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    methods:{
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }

</script>
<style scoped lang="less">
    .bs-header{
      .header-ul{
        width:1240px;
        margin:auto;
        .el-menu-item{
          width:150px;
        }
        .route-link{
          display: block;
          height:100%;
          width:100%;
          text-decoration: none;
        }
      }
      .el-menu--horizontal{
        border-bottom:none;
      }
      .log{
        width:100px;
      }
    }
</style>
