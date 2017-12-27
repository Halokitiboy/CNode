<template>
  <div class="newTopic">
    <section class="newTopic-main">
      <div>
        <h3>标题</h3>
        <mu-text-field hintText="标题字数10字以上" fullWidth @input="input"/>
      </div>
      <div>
        <h3>板块</h3>
        <mu-radio label="问答" name="tab" nativeValue="ask" v-model="value" class="newTopic-radio"
                  @change="checkTopicArea"/>
        <mu-radio label="分享" name="tab" nativeValue="share" v-model="value" class="newTopic-radio"
                  @change="checkTopicArea"/>
        <mu-radio label="招聘" name="tab" nativeValue="job" v-model="value" class="newTopic-radio"
                  @change="checkTopicArea"/>
        <mu-radio label="客户端测试" name="tab" nativeValue="dev" v-model="value" class="newTopic-radio"
                  @change="checkTopicArea"/>
      </div>
      <div>
        <h3>内容</h3>
        <quill-editor v-model="content"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @change="onEditorChange($event)">
        </quill-editor>
      </div>
    </section>
    <mu-raised-button class="submit-btn" label="提 交" fullWidth @click="submit" primary/>
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    name: '',
    data() {
      return {
        content: '',
        value: '1',
        title: '',
        tab: '',
        text: '',
        editorOption: {
          // some quill options
        },
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    methods: {
      onEditorChange({quill, html, text}) {
        this.content = html;
        this.text = text;
        console.log(html);
      },
      handleChange(value) {
        this.value = value;
      },
      input(val) {
        console.log(val);
        this.title = val;
      },
      checkTopicArea(val) {
        console.log(val);
        this.tab = val;
      },
      submit() {
        let vm = this;
        if (vm.title === '') {
          vm.$toasted.show('标题不能为空！');
          return false;
        }
        if (vm.tab === '') {
          vm.$toasted.show('请选择板块！');
          return false;
        }
        if (vm.text === '') {
          vm.$toasted.show('内容不能为空！');
          return false;
        }

        let params = {
          accesstoken: vm.accesstoken,
          title: vm.title,
          tab: vm.tab,
          content: vm.text
        };
        vm.$service.newTopic('', params, (res) => {
          console.log(res)
        }, (res) => {
          vm.$toasted.show(res);
        })
      }
    },
    computed: {
      ...mapState({
        accesstoken: state => state.accesstoken
      })
    }
  }

</script>
<style scoped lang="less">
  .newTopic {
    text-align: left;
    padding: 10px;
    display: flex;
    height: 100%;
    flex-direction: column;
    .newTopic-main {
      flex: 1;
      .newTopic-radio {
        margin-right: 1rem;
      }
    }
  }
</style>
