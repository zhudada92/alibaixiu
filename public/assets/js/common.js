$('#logout').on('click', function () {
  // confirm 方法 弹出询问框
  var isconfirm = confirm('您确定退出吗？');
  if (isconfirm) {
    $.ajax({
      type: 'post',//get或post
      url: '/logout',//请求的地址
      success: function (result) {//成功的回调函数
        location.href = 'login.html';
        alert('退出成功')
      },
      error: function () {
        alert('退出失败')
      }
    })
  }

})


// 头像、用户名
$.ajax({
  type: 'get',//get或post
  url: '/users/' + userId,//请求的地址
  success: function (result) {//成功的回调函数
    console.log(result)
    $('.profile .avatar').attr('src',result.avatar)
    $('.profile .name').html(result.nickName)
  }
})