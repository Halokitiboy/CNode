const tabCheck = function (tab) {
  switch (tab) {
    case 'share':
      tab = '分享';
      break;
    case 'good':
      tab = '精华';
      break;
    case 'ask':
      tab = '问答';
      break;
    case 'dev':
      tab = '测试';
      break;
    default:
      tab = '未知';
      break;
  }
  return tab;
};
export default tabCheck;
