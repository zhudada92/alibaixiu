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
  url: '/posts/' + id,//请求的地址
  data: {},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  dataType: 'json',
  success: function (result) {//成功的回调函数
    // console.log(result)
    var html = template('detailTpl', result)
    $('.content .article').html(html)
  }
})

// 点赞
$('.article').on('click', '#like', function () {
  $.ajax({
    type: 'post',//get或post
    url: '/posts/fabulous/' + id,//请求的地址
    success: function (result) {//成功的回调函数
      // alert('点赞成功👍')
      console.log('点赞成功👍')
    }
  })
})


//开启评论
$.ajax({
  type: 'get',//get或post
  url: '/settings',//请求的地址
  success: function (result) {//成功的回调函数
    console.log(result)
    review = result.review;
    // 网站设置开启评论功能  既开启评论功能
    if (result.comment == true) {
      var tpl = `
        <form>
          <textarea></textarea>
          <input type="submit" value="提交评论">
        </form>
      `;
      $('.comment').html(tpl)
    }
  }
})

var review;
// 提交评论功能
$('.comment').on('submit', 'form', function () {
  var content = $(this).find('textarea').val();
  var state;
  if (review == true) {
    state = 1;
  } else {
    state = 0;
  }
  $.ajax({
    type: 'post',//get或post
    url: '/comments',//请求的地址
    data: {
      content,
      post: id,
      state
    },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success: function (result) {//成功的回调函数
      location.reload();
    }
  })
  return false;
})