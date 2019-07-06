
// 选择分类
$.ajax({
  type: 'get',//get或post
  url: '/categories',//请求的地址
  success: function (result) {//成功的回调函数
    // console.log(result)
    var html = template('categoryTpl', { data: result });
    $('#category').html(html)
  }
})


// 文件上传
$('#feature').on('change', function () {
  var formData = new FormData();
  formData.append('avatar', this.files[0])
  $.ajax({
    type: 'post',//get或post
    url: '/upload',//请求的地址
    contentType: false,
    processData: false,
    data: formData,
    success: function (result) {//成功的回调函数
      $('.thumbnail').attr('src', result[0].avatar).show()
      $('#hiddenImg').val(result[0].avatar)
    }
  })
})


// 添加文章
$('#addTitle').on('submit', function () {
  var formData = $(this).serialize()
  $.ajax({
    type: 'post',//get或post
    url: '/posts',//请求的地址
    data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) {//成功的回调函数
      console.log(result)
      location.href = 'posts.html'
    }
  })

  return false;
})

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

// 判断是修改页面
var id = getUrlParams('id')
if (id != -1) {
  $.ajax({
    type: 'get',//get或post
    url: '/posts/' + id,//请求的地址
    success: function (result) {//成功的回调函数
      console.log(result)
      $.ajax({
        type: 'get',//get或post
        url: '/categories',//请求的地址
        success: function (response) {//成功的回调函数
          result.categories = response;
          var html = template('modifyTpl', result)
          $('#parentForm').html(html)

        }
      })
    }
  })
}

// 事件委托方式上传文件
$('#parentForm').on('change', '#feature', function () {
  var formData = new FormData();
  formData.append('avatar', this.files[0])
  $.ajax({
    type: 'post',//get或post
    url: '/upload',//请求的地址
    contentType: false,
    processData: false,
    data: formData,
    success: function (result) {//成功的回调函数
      $('.thumbnail').attr('src', result[0].avatar).show()
      $('#hiddenImg').val(result[0].avatar)
    }
  })
})

// 提交修改文章
$('#parentForm').on('submit', '#modifyForm', function () {
  var formData = $(this).serialize();
  var id = $(this).attr('data-id')
  $.ajax({
    type: 'put',//get或post
    url: '/posts/' + id,//请求的地址
    data: formData,
    success: function (result) {//成功的回调函数
      console.log(result)
      location.href = 'posts.html'
    }
  })
  return false;
})
