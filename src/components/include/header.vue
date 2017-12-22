<template>
  <mu-appbar title="CNode">
      <mu-badge slot="left">
        <mu-icon-button icon="arrow_back"></mu-icon-button>
      </mu-badge>
      <mu-badge content="0" circle secondary slot="right">
        <mu-icon-button icon="notifications"/>

      </mu-badge>
      <mu-badge slot="right">
        <mu-icon-button icon="edit_mode" />
      </mu-badge>
  </mu-appbar>
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
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
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
