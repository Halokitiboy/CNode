<template>
  <div class="detail">
    <div id="detail-content">
      <h2>{{qustionData.title}}</h2>
      <p>
        发布于{{qustionData.createTime}} * 作者{{qustionData.authorName}} * 浏览{{qustionData.visitCount}} * 来自{{qustionData.from}}</p>

      <section class="detail-content" v-html="qustionData.detailContent">

      </section>
    </div>
    <section id="replies" class="detail-replies-content">
      <div class="detail-replies-head">{{replyCount}}回复</div>
      <div class="detail-reply-body" v-for="(item , key) in reliesList" :key="item.id">
        <div class="detail-reply-author-head">
          <div>
            <img class="reply-head-img" :src="item.authorImg" alt="item.authorName">
            <span>{{item.floor + 1}}楼</span>
            <p>{{item.authorName}}</p>
          </div>
          <div>
            <i class="icon icon-thumbs-up" :reply_to_id="item.replyToId" :reply_id="item.id" :id="item.id"
               @click="topicUps"></i>
            <span>{{item.upsNum}}</span>
            <!--<i class="icon icon-reply" :reply_to_id="item.replyToId" :reply_id="item.id" :id="item.id"-->
               <!--@click="goToRePly"></i>-->
          </div>
        </div>
        <div class="reply-content" v-html="item.replyContent">
        </div>
        <span>最新回复时间：{{item.createTime}}</span>
      </div>
      <div class="write-reply">
        <quill-editor v-model="replyData.content"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @change="onEditorChange($event)">
        </quill-editor>
        <mu-raised-button class="submit-btn" label="回 复" fullWidth @click="topicReply" primary/>
      </div>
    </section>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import VueStar from 'vue-star'
  export default {
    name: '',
    components: {VueStar},
    data() {
      return {
        topPopup: false,
        data: {},

        qustionData: {
          title: null,
          createTime: null,
          detailContent: null,
          authorName: null,
          authorImg: null,
          visitCount: null,
          from: null
        },
        reliesList: [],
        replyCount: 0,
        replyData: {
          content: '',
          text:'',
          replyId: '',//回复另一个评论
        },
        editorOption: {
          // some quill options
        },
        id: ''
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    methods: {
      onEditorChange({quill, html, text}) {
        this.replyData.content = html;
        this.replyData.text=text;
      },
      getDetail() {
        let vm = this;
        vm.id = vm.$route.params.id;
        let params = {
          'mdrender': true,
          'accesstoken': vm.accesstoken
        };

        vm.$service.getTopicsDetail(vm.id, params, (res) => {
          let results = res.data;
          vm.reliesList = [];
          if (results.success === true) {
            vm.data = results.data;
            vm.qustionData.detailContent = results.data.content;
            vm.qustionData.createTime = vm.$moment(results.data.create_at).startOf('mm').fromNow();
            vm.qustionData.authorName = results.data.author.loginname;
            vm.qustionData.authorImg = results.data.author.avatar_url;
            vm.qustionData.from = results.data.tab;
            vm.qustionData.title = results.data.title;
            vm.qustionData.visitCount = results.data.visit_count;
            vm.replyCount = results.data.reply_count;
            results.data.replies.map(function (value, index) {
              let obj = {};
              obj.authorName = value.author.loginname;
              obj.authorImg = value.author.avatar_url;
              obj.createTime = vm.$moment(value.create_at).startOf('mm').fromNow();
              obj.replyId = value.reply_id;
              obj.replyContent = value.content;
              obj.id = value.id;
              obj.upsNum=value.ups.length===0 ? '':value.ups.length;
              obj.replyToId = value.reply_id || '';
              obj.isUped = value.is_uped;
              obj.floor = index;
              vm.reliesList.push(obj)
            });
          }

        }, (res) => {
          console.log(res)
        })
      },
      topicReply() {
        let vm = this;
        if(!vm.isLogon){
          vm.$toasted.show('请先登录！');
          return false;
        }
        let params = {
          accesstoken: vm.accesstoken,
          content: vm.replyData.text,
          reply_id: vm.replyData.replyId
        };
        if (vm.replyData.text != '') {
          vm.$service.topicReplies(`${vm.id}/replies`, params, (res) => {
            vm.replyData.content = '';
            vm.getDetail();
          }, (res) => {
            vm.$toasted.show(res);
          })
        } else {
          this.$toasted.show('回复不能为空');
        }

      },
      goToRePly() {

      },
      topicUps(e) {
        let vm = this;
        let replyId = e.target.attributes.id.nodeValue;
        let params = {
          accesstoken: vm.accesstoken
        };
        vm.$service.topicUps(`${replyId}/ups`, params, (res) => {
          vm.getDetail();
        }, (res) => {
          vm.$toasted.show(res);
        })
      }
    },
    computed: {
      ...mapState({
        isLoading: state => state.pageLoading,
        accesstoken:state=>state.accesstoken,
        isLogon:state=>state.hasLogon
      })
    },
    mounted() {
      this.getDetail();
    }
  }

</script>
<style scoped lang="less">
  @centerTxt: center;
  @leftTxt: left;
  @padding: 20px;
  @margin: 20px;
  .detail {
    padding: 10px;
    width: 100%;

    .el-breadcrumb {
      line-height: 50px;
      padding-left: @padding;
    }
    .detail-content {
      text-align: @leftTxt;
      word-wrap: break-word;
    }
    .detail-replies-content {
      text-align: @leftTxt;

      .detail-reply-body {
        padding: @margin;
        border: 1px solid #aaa;
        word-wrap: break-word;
        .reply-head-img {
          width: 50px;
          height: 50px;
        }
        .detail-reply-author-head {
          display: flex;
          .icon {
            &:hover {
              cursor: pointer;
            }
          }
          div:nth-of-type(1) {
            flex: 2;
          }
          div:nth-of-type(2) {
            width: 50px;
            text-align: right;
          }
        }
      }
      .write-reply {
        margin-top: @margin;
      }
    }
    .submit-btn{
      margin:1rem 0;
    }
  }
</style>
