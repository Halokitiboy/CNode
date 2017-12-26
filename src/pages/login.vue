<template>
    <div class="login">
      <mu-text-field label="请输入您的Token" fullWidth labelFloat  v-model="token"/><br/>
      <p>请前往CN-Nodejs社区，将设置页面中的Access Token 复制到上方区域，进行登录</p>
      <mu-switch label="保持登录状态" v-model="toggle" class="demo-switch" /><br/>
      <mu-raised-button class="login-btn" label="登录" fullWidth primary @click="login"/>
    </div>
</template>
<script>
	export default {
		name: '',
		data() {
			return {
        toggle: false,
        token:''
      }
		},
    methods:{
		  login(){
		    let vm=this;
        const accesstoken =vm.token;
        vm.$service.checkAccesstoken('', {accesstoken: accesstoken}, (res) => {
          let results=res.data;
          if(results.success=== true){

            localStorage.setItem('accesstoken', accesstoken);
            localStorage.setItem('userInfo',JSON.stringify(results));
            vm.$router.push({name:'/home'});
          }
        }, (res) => {
          console.log(res)
        })
      }
    }
	}

</script>
<style scoped lang="less">
  .login{
    padding:10px;
    .login-btn{
      margin-top:1rem;
    }
  }
</style>
