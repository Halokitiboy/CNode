<template>
    <div class="layer">
      <img :src="src" alt="">
    </div>
</template>
<script>
	export default {
		name: '',
    props:['src'],
		data() {
			return {

      }
		},
    mounted(){
		  console.log(this.src)
    }
	}

</script>
<style scoped lang="less">
    .layer{
      background: rgba(0,0,0,.5);
      position: fixed;
      top:0;
      bottom:0;
      right:0;
      left:0;
      img{

        min-width:100%;
        position: absolute;
        top:50%;
        left:0;
        transform: translateY(-50%);
      }
    }
</style>
