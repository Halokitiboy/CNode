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
            <i class="icon icon-thumbs-up"></i>
            <i class="icon icon-reply"></i>
          </div>
        </div>
        <div class="reply-content" v-html="item.replyContent">
        </div>
      </div>
      <div class="write-reply">
        <quill-editor v-model="content"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
        <button class="reply-btn">回复</button>
      </div>
    </section>
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    name: '',
    data() {
      return {
        data: {},
        components: {},
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
        content: '<h3></h3>',
        editorOption: {
          // some quill options
        }
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    methods: {
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({quill, html, text}) {
        console.log('editor change!', quill, html, text)
//        this.content = html
      },
      getDetail() {
        let vm = this;
        let id = vm.$route.params.id;
        let params = {
          'mdrender': true,
          'accesstoken ': ''
        };

        vm.$service.getTopicsDetail(id, params, (res) => {
          let results = res;
          if (results.success === true) {
            vm.data = results.data;
            vm.qustionData.detailContent = results.data.content;
            vm.qustionData.createTime = results.data.create_at;
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
              obj.createTime = value.create_at;
              obj.replyContent = value.content;
              obj.id = value.id;
              obj.isUped = value.is_uped;
              obj.floor = index;
              vm.reliesList.push(obj)
            });
          }

        }, (res) => {
          console.log(res)
        })
      }
    },
    computed: {
      ...mapState({
        isLoading: state => state.pageLoading
      })
    },
    mounted() {
      this.getDetail();
      console.log(sessionStorage.getItem('accesstoken'));
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

  }
</style>
