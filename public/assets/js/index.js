// 文章
$.ajax({
  type: 'get',//get或post
  url: '/posts/count',//请求的地址
  success: function (result) {//成功的回调函数
    console.log(result)
    $('#posts').html('<strong>' + result.postCount + '</strong>篇文章（<strong>' + result.draftCount + '</strong>篇草稿）')
  }
})
// 分类
$.ajax({
  type: 'get',//get或post
  url: '/categories/count',//请求的地址
  success: function (result) {//成功的回调函数
    console.log(result)
    $('#categories').html('<strong>' + result.categoryCount + '</strong>个分类')
  }
})
// 评论
$.ajax({
  type: 'get',//get或post
  url: '/comments/count',//请求的地址
  success: function (result) {//成功的回调函数
    console.log(result)
    $('#comments').html('<strong>' + result.commentCount + '</strong>条评论')
  }
})