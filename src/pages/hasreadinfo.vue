<template>
  <div >
    <mu-paper v-if="hasdata" class="paper" :zDepth="2" v-for="(item , index) in hasReadInfo" :key="index">
      <router-link class="collect-item"
                   :to="{ name: 'topicDetail', params: { id: item.topic.id }}">
        <div>
          <h3></h3>
          <p>
            {{item.topic.last_reply_at}}&nbsp;&nbsp;{{item.author.loginname}}&nbsp;&nbsp;在话题《{{item.topic.title}}》中@了你</p>
        </div>
      </router-link>
    </mu-paper>
    <h3 v-if="!hasdata">
      没有已读消息
    </h3>
  </div>
</template>
<script>
  export default {
    name: '',
    data() {
      return {
        hasdata:false
      }
    }
  }

</script>
<style>

</style>
