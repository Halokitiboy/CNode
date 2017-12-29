let url="https://cnodejs.org/api/v1/";
const apis={
  topics:url+'topics',//主体首页 get(获取) post（新建）
  topicDetail:url+"topic/",// topic/:id（主题详情）
  topicsUpdate:url+'topics/update',//编辑主题（post）
  topicCollect:url+'topic_collect/collect',//收藏主题（post）
  topicsDeleteCollect:url+'topic_collect/de_collect',//取消主题（post）
  topicsAllCollect:url+'topic_collect/',// /topic_collect/:loginname 用户所收藏的主题（get)
  topicsReplies :url+'topic/',//topic/:topic_id/replies 新建评论(post)
  topicsUps:url+"reply/",// reply/:reply_id/ups 为评论点赞(post)
  user:url+'user/',//user/:loginname 用户详情(get)
  accessToken:url+"accesstoken",//验证 accessToken 的正确性(post)
  messageCount:url+"message/count",//获取未读消息数(get)
  messages:url+"messages/",//获取已读和未读消息（get）
  messageMarkAll:url+"message/mark_all",//标记全部已读(post)
  messageMarkOne:url+"message/mark_one/"// message/mark_one/:msg_id 标记单个消息为已读(post)
};
export default apis;

