<template>
  <div class="myTopic wrap">
    <mu-paper v-if="hasdata" class="paper" :zDepth="2" v-for="(item , index) in recentReplies" :key="index">
      <router-link class="collect-item"
                   :to="{ name: 'topicDetail', params: { id: item.id }}">
        <div>
          <h3></h3>
          <p>
            {{item.last_reply_at}}&nbsp;&nbsp;{{item.author.loginname}}&nbsp;&nbsp;在话题《{{item.title}}》中@了你</p>
        </div>
      </router-link>
    </mu-paper>
    <h3 v-if="!hasdata">
      没有已读消息
    </h3>
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    name: '',
    data() {
      return {
        hasdata: false,
        recentReplies: null
      }
    },
    methods: {
      getLength() {
        this.recentReplies = JSON.parse(sessionStorage.getItem('recent_replies'));
        let len = this.recentReplies.length;

        console.log(this.recentReplies)
        if (len > 0) {
          this.hasdata = true;
        }
      }
    },

    computed: ({
//      ...mapState({
//        recentReplies: state => state.recent_replies
//      })
    }),
    mounted() {
      this.getLength();
    }
  }

</script>
<style scoped lang="less">
  .myTopic {
    padding: 10px;
    .paper {
      padding: .5rem;
      text-align: left;
    }
  }
</style>
