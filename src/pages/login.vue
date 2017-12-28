<template>
  <div class="login">
    <mu-text-field label="请输入您的Token" fullWidth labelFloat v-model="token"/>
    <br/>
    <p>请前往CN-Nodejs社区，将设置页面中的Access Token 复制到上方区域，进行登录</p>
    <mu-switch label="保持登录状态" v-model="toggle" class="demo-switch" @change="chengeSaveAccesstokenMode"/>
    <br/>
    <mu-raised-button class="login-btn" label="登录" fullWidth primary @click="login"/>
  </div>
</template>
<script>
  export default {
    name: '',
    data() {
      return {
        toggle: false,
        token: '',
        isLong: null
      }
    },
    methods: {
      login() {
        let vm = this;
        if (vm.token === '') {
          vm.$toasted.show('accesstoken不能为空！');
          return false;
        }
        const accesstoken = vm.token;
        vm.$service.checkAccesstoken('', {accesstoken: accesstoken}, (res) => {
          let results = res.data;
          if (results.success === true) {
            if (vm.isLong) {
              localStorage.setItem('accesstoken', accesstoken);
              localStorage.setItem('userInfo', JSON.stringify(results));
            } else {
              sessionStorage.setItem('accesstoken', accesstoken);
              sessionStorage.setItem('userInfo', JSON.stringify(results));
            }
            vm.$store.dispatch('getAccesstoken', {accesstoken: accesstoken});
            vm.$store.dispatch('getUserInfo', {userInfo: JSON.stringify(results)});
            vm.$store.dispatch('logonIn');
            vm.$router.go(-1);
          }
        }, (res) => {
          vm.$toasted.show(res);
        })
      },
      chengeSaveAccesstokenMode(val) {
        this.isLong = val;
      }
    }
  }

</script>
<style scoped lang="less">
  .login {
    padding: 10px;
    .login-btn {
      margin-top: 1rem;
    }
  }
</style>
