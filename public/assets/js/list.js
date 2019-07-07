// 获得地址栏传过来的id参数
function getUrlParams(name) {
  var paramAry = location.search.substr(1).split('&');
  for (var i = 0; i < paramAry.length; i++) {
    var tmp = paramAry[i].split('=');
    if (tmp[0] == name) {
      return tmp[1]
    }
  }
  return -1;
}

var id = getUrlParams('id')
$.ajax({
  type: 'get',//get或post
  url: '/posts/category/' + id,//请求的地址
  success: function (result) {//成功的回调函数
    console.log(result)
    var html = template('tpl', { data: result });
    $('.new').append(html);
    $('.new h3').html(result[0].category.title);

  }
})