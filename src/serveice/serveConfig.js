import Axios from 'axios';
import Apis from './api';

export default {
  /**
   * [getData]
   * @param  {[type]}   url         [description]
   * @param  {Function} callback    [description]
   * @param  {[type]}   errCallback [description]
   * @return {[type]}               [description]
   **/
  getData(url, params, callback, errCallback) {
    Axios.get(url, {params: params})
      .then(function (response) {
        callback(response.data);
      })
      .catch(function (error) {
        errCallback(error.data)
      });
  },
  /**
   * [postData]
   * @param  {[type]}   url         [description]
   * @param  {Function} callback    [description]
   * @param  {[type]}   errCallback [description]
   * @return {[type]}               [description]
   **/
  postData(url, params, callback, errCallback) {
    Axios.post(url, {params: params})
      .then(function (response) {
        callback(response);
      })
      .catch(function (error) {
        errCallback(error);
      });
  },
  /**
   * 主题首页
   * @param id
   * @param params={
       page: Number, //页数,
       tab :String ,//主题分类。目前有 ask share job good,
       limit :Number, //每一页的主题数量,
       mdrender :String //当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本
    }
   * @param callback
   * @param errcallback
   */
  getTopics(id, params, callback, errcallback) {
    this.getData(Apis['topics'] + id, params, callback, errcallback);
  },
  /**
   *  主题详情
   * @param id
   * @param params={
        mdrender : String ,//当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
        accesstoken:String //当需要知道一个主题是否被特定用户收藏以及对应评论是否被特定用户点赞时，才需要带此参数。会影响返回值中的 is_collect 以及 replies 列表中的 is_uped 值。
   }
   * @param callback
   * @param errcallback
   */
  getTopicsDetail(id, params, callback, errcallback) {
    this.getData(Apis["topicDetail"] + id, params, callback, errcallback);
  },
  /**
   *  新建主题
   * @param id
   * @param parmas={
          accesstoken :String, //用户的 accessToken
          title :String ,//标题
          tab :String ,//目前有 ask share job dev。开发新客户端的同学，请务必将你们的测试帖发在 dev 专区，以免污染日常的版面，否则会进行封号一周处理。
          content :String //主体内容
   }
   * @param callback
   * @param errcallback
   */
  newTopic(id, parmas, callback, errcallback) {
    this.postData(Apis['topics'] + id, params, callback, errcallback);
  },
  /**
   * 编辑主题
   * @param id
   * @param params={
        accesstoken： String，// 用户的 accessToken
        topic：_id String ，//主题id
        title ：String ，//标题
        tab ：String，// 目前有 ask share job
        content： String //主体内容
        }
   * @param callback
   * @param errcallback
   */
  updateTopics(id, params, callback, errcallback) {
    this.postData(Apis['topicsUpdate'] + id, params, callback, errcallback);
  },
  /**
   * 收藏主题
   * @param id
   * @param params={
    accesstoken: String,// 用户的 accessToken
    topic_id :String //主题的id}
   * @param callback
   * @param errcallback
   */
  collectTopic(id, params, callback, errcallback) {
    this.postData(Apis['topicCollect'] + id, params, callback, errcallback);
  },
  /**
   * 取消主题
   * @param id
   * @param params={
        accesstoken :String,// 用户的 accessToken
        topic_id: String //主题的id}
   * @param callback
   * @param errcallback
   */
  deleteTopicCollect(id, params, callback, errcallback) {
    this.postData(Apis['topicsDeleteCollect'] + id, params, callback, errcallback);
  },
  /**
   * 用户所收藏的主题
   * @param id
   * @param params={loginname:loginname}
   * @param callback
   * @param errcallback
   */
  topicAllCollect(id, params, callback, errcallback) {
    this.getData(Apis['topicsAllCollect'] + id, params, callback, errcallback);
  },
  /**
   * 新建评论
   * @param id
   * @param params={
      accesstoken :String,// 用户的 accessToken
      content :String ,//评论的主体
      reply_id :String //如果这个评论是对另一个评论的回复，请务必带上此字段。这样前端就可以构建出评论线索图。}
   * @param callback
   * @param errcallback
   */
  topicReplies(id, params, callback, errcallback) {
    this.postData(Apis['topicsReplies '] + id, params, callback, errcallback);
  },
  /**
   * 为评论点赞
   * @param id
   * @param params={
      accesstoken:accesstoken
   }
   * @param callback
   * @param errcallback
   */
  topicUps(id, params, callback, errcallback) {
    this.postData(Apis['topicsUps'] + id, params, callback, errcallback);
  },
  /**
   * 用户详情
   * @param id
   * @param params={loginname :loginname }
   * @param callback
   * @param errcallback
   */
  userInfo(id, params, callback, errcallback) {
    this.getData(Apis['user'] + id, params, callback, errcallback);
  },
  /**
   * 验证 accessToken 的正确性
   * @param id
   * @param params={accesstoken:accesstoken}
   * @param callback
   * @param errcallback
   */
  checkAccesstoken(id, params, callback, errcallback) {
    this.postData(Apis['accessToken'] + id, params, callback, errcallback);
  },
  /**
   * 获取未读消息数
   * @param id
   * @param params={accesstoken :accesstoken }
   * @param callback
   * @param errcallback
   */
  getMessageCount(id, params, callback, errcallback) {
    this.getData(Apis['messageCount'] + id, params, callback, errcallback);
  },
  /**
   * 获取已读和未读消息
   * @param id
   * @param params={
      accesstoken :String,
      mdrender :String// 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。}
   * @param callback
   * @param errcallback
   */
  getMessages(id, params, callback, errcallback) {
    this.getData(Apis['messages'] + id, params, callback, errcallback);
  },
  /**
   * 标记全部已读
   * @param id
   * @param params={accesstoken:accesstoken}
   * @param callback
   * @param errcallback
   * @constructor
   */
  markAllMessage(id, params, callback, errcallback) {
    this.postData(Apis['messageMarkAll'] + id, params, callback, errcallback);
  },
  /**
   * 标记单个消息为已读
   * @param id
   * @param params={accesstoken:accesstoken}
   * @param callback
   * @param errcallback
   */
  markOneMessage(id,params,callback,errcallback){
    this.postData(Apis['messageMarkOne']+id,params,callback,errcallback);
  }
}


