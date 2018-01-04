<template>
  <div class="myResponse">
    <mu-paper v-if="hasdata" class="paper" :zDepth="2" v-for="(item , index) in recentTopics" :key="index">
      <router-link class="collect-item"
                   :to="{ name: 'topicDetail', params: { id: item.id }}">
        <div>
          <p>
            您在{{item.last_reply_at}}回复了话题《{{item.title}}》</p>
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
        hasdata: false,
        recentTopics: null
      }
    },
    methods: {
      getLength() {
        this.recentTopics = JSON.parse(sessionStorage.getItem('recent_topics'));
        let len = this.recentTopics.length;
        console.log(this.recentTopics)
        if (len > 0) {
          this.hasdata = true;
        }
      }
    },
    mounted() {
      this.getLength();
    }
  }

</script>
<style scoped lang="less">
  .myResponse {
    padding: 10px;
    text-align: left;
    .paper {
      padding: .5rem;
    }
  }
</style>
