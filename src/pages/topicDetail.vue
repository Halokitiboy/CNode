<template>
  <div class="detail warp" v-if="showPage">
    <div id="detail-content">
      <h2>{{qustionData.title}}</h2>
      <p>
        发布于{{qustionData.create_at}} * 作者{{qustionData.loginname}} * 浏览{{qustionData.visit_count}} * 来自{{qustionData.tab}}</p>
      <section @click="watchBigImg" class="detail-content" v-html="qustionData.content" v-highlight>
      </section>
    </div>
    <section id="replies" class="detail-replies-content">
      <div class="detail-replies-head">
        <mu-raised-button :label="qustionData.reply_count+'条回复'" fullWidth primary/>
      </div>

      <div class="detail-reply-body" v-for="(item , key) in reliesList" :key="item.id">
        <div class="detail-reply-author-head">
          <div>
            <img class="reply-head-img" :src="item.author.avatar_url" :alt="item.author.loginname">
            <span>{{key + 1}}楼</span>
            <p>{{item.author.loginname}}</p>
          </div>
          <div>
            <!--<i class="custom-icon material-icons" :reply_to_id=" item.reply_id || '' " :reply_id="item.id" :id="item.id"-->
               <!--@click="topicUps" :data-ups="item.ups">thumb_up</i>-->
            <!--<span>{{item.ups.length}}</span>-->
            <!--<i class="icon icon-reply" :reply_to_id="item.replyToId" :reply_id="item.id" :id="item.id"-->
            <!--@click="goToRePly"></i>-->
          </div>
        </div>
        <div class="reply-content" v-html="item.content" v-highlight>
        </div>
        <span>最新回复时间：{{item.create_at}}</span>
      </div>
      <div class="write-reply" name="#reply">
        <quill-editor v-model="replyData.content"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @change="onEditorChange($event)">
        </quill-editor>
        <mu-raised-button class="submit-btn" label="回 复" fullWidth @click="topicReply" primary/>
      </div>
    </section>
    <mu-float-button :icon="icon" class="float-button" @click="collectTopic" :backgroundColor="bgcolor"/>
    <!--<mu-float-button icon="reply" class="float-reply" @click.native="toReply" backgroundColor=""/>-->
    <Layer v-show="showBigImg" :src="src"></Layer>
  </div>
  <Loading v-else="!showPage"></Loading>
</template>
<script>
  import {mapState} from 'vuex'
  import VueStar from 'vue-star'
  import tabCheck from '../lib/tab';
  import Loading from '../components/loading.vue'
  import Layer from '../components/layer.vue'
  export default {
    name: '',
    props: ['id'],
    components: {VueStar, Loading,Layer},
    data() {
      return {
        topPopup: false,
        data: {},
        qustionData: {},
        reliesList: [],
        replyCount: 0,
        isCollect: null,
        colollectIcon: 'star',
        showBigImg:false,
        bgColor:'',
        src:'',
        replyData: {
          content: '',
          text: '',
          replyId: '',//回复另一个评论
        },
        editorOption: {
          // some quill options
        },
        showPage: false
      }
    },
    methods: {
      onEditorChange({quill, html, text}) {
        this.replyData.content = html;
        this.replyData.text = text;
      },
      getDetail() {
        let vm = this;
        let params = {
          'mdrender': true,
          'accesstoken': vm.accesstoken
        };
//        vm.showPage=false;
        vm.$service.getTopicsDetail(vm.id, params, (res) => {
          let results = res.data;
          vm.reliesList = [];
          if (results.success === true) {
            vm.qustionData = results.data;
            vm.isCollect = results.data.is_collect;
            vm.qustionData.loginname = results.data.author.loginname;
            vm.qustionData.tab = tabCheck(vm.qustionData.tab);
            vm.qustionData.create_at = vm.$moment(results.data.create_at).startOf('mm').fromNow();
            vm.reliesList = vm.qustionData.replies;
            console.log(vm.qustionData.replies)
            vm.reliesList.map(function (item, index) {
              item['create_at'] = vm.$moment(item.create_at).startOf('mm').fromNow();
//              item['ups'] = item.ups.length === 0 ? '' : item.ups.length;
            });
            setTimeout(() => {
              vm.showPage = true;
            }, 500)
          }
        }, (res) => {
          console.log(res)
        })
        console.log(document.getElementsByClassName('.detail')[1])
      },
      watchBigImg(e){
        this.src=e.target.attributes['src'].value;
        this.showBigImg=true
//        this.$store.commit('updateBigImg',true);
      },
      topicReply() {
        let vm = this;
        if (!vm.isLogon) {
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
      topicUps(e) {
        let vm = this;
        let replyId = e.target.attributes.id.nodeValue;

        let params = {
          accesstoken: vm.accesstoken
        };
        if (!vm.isLogon) {
          vm.$toasted.show('请先登录！');
          return false;
        }
        vm.$service.topicUps(`${replyId}/ups`, params, (res) => {
          vm.getDetail();
        }, (res) => {
          vm.$toasted.show(res);
        })
      },
      collectTopic() {
        let vm = this;
        let params = {
          accesstoken: vm.accesstoken,
          topic_id: vm.id
        };
        if (!vm.isLogon) {
          vm.$toasted.show('请先登录！');
          return false;
        }
        vm.$service.collectTopic('', params, (res) => {
          let results = res.data;
          vm.isCollect = !vm.isCollect;
          if (results.success === true) {
            vm.$toasted.show('收藏成功');
          } else {
            vm.deleteTopicCollect();
          }
        }, (res) => {
          vm.$toasted.show(res);
        })
      },
      deleteTopicCollect() {
        let vm = this;
        let params = {
          accesstoken: vm.accesstoken,
          topic_id: vm.id
        };
        vm.$service.deleteTopicCollect('', params, (res) => {
          let results = res.data;
          if (results.success === true) {
            vm.$toasted.show('取消收藏');
          }
        }, (res) => {

        })
      }
    },
    computed: {
      ...mapState({
        isLoading: state => state.pageLoading,
        accesstoken: state => state.accesstoken,
        isLogon: state => state.hasLogon,
//        showBigImg:state=>state.showBigImg
      }),
      editor() {
        return this.$refs.myQuillEditor.quill;
      },
      icon() {
        return this.colollectIcon = this.isCollect ? 'star_border' : 'star';
      },
      bgcolor(){
        return this.bgColor = this.isCollect ? 'red' : '';
      }
    },
    mounted(){
          this.getDetail();
    },
    // activated(){
    //   this.getDetail();
    // },
  }

</script>
<style scoped lang="less">
  @centerTxt: center;
  @leftTxt: left;
  @padding: 20px;
  @margin: 20px;
  .bb {
    background-color: #f44336;
  }
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    50% { background: orange; }
    100% { background: yellowgreen; }
  }
  .detail {
    padding: 10px;
    width: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .float-button {
      position: fixed;
      right: 0;
      top: 80%;
    }
    .float-reply{
      position: fixed;
      right:0;
      top:87%;
    }
    .el-breadcrumb {
      line-height: 50px;
      padding-left: @padding;
    }
    .detail-content {
      text-align: @leftTxt;
      word-wrap: break-word;
      border: 1px solid #ccc;
      padding: 1rem;
    }
    .detail-replies-content {
      text-align: @leftTxt;
      .detail-replies-head {
        margin: 1rem 0;
      }
      .detail-reply-body {
        padding: @margin;
        border: 1px solid #ccc;
        word-wrap: break-word;
        .reply-head-img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          box-shadow: 0px 0px 5px 2px rgba(0,0,0,.15);
          &:hover{
            transform: rotate(360deg);
            transition-delay: .1s;
            transition-duration: .5s;
            cursor: pointer;
            animation: rotate 1s ease 0s 1;
          }
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
    .submit-btn {
      margin: 1rem 0;
    }
  }
</style>
