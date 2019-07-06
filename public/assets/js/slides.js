$('#myFile').on('change', function () {
  var formData = new FormData();
  formData.append('avatar', this.files[0])
  $.ajax({
    type: 'post',//get或post
    url: '/upload',//请求的地址
    contentType: false,
    processData: false,
    data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) {//成功的回调函数
      console.log(result)
      $('#preview').attr('src', result[0].avatar).show();
      $('#hiddenIpt').val(result[0].avatar)
    }
  })
})

$('#fileForm').on('submit', function () {
  var formData = $(this).serialize();
  $.ajax({
    type: 'post',//get或post
    url: '/slides',//请求的地址
    data: formData,
    success: function (result) {//成功的回调函数
      console.log(result)
      location.reload()
    }
  })
  return false;
})

$.ajax({
  type: 'get',//get或post
  url: '/slides',//请求的地址
  success: function (result) {//成功的回调函数
    console.log(result)
    var html = template('tpl', { data: result })
    $('#slideBox').html(html)
  }
})

$('#slideBox').on('click', '.delete', function () {
  if (confirm('你确定删除此项吗?')) {
    var id = $(this).attr('data-id');
    $.ajax({
      type: 'delete',//get或post
      url: '/slides/' + id,//请求的地址
      success: function (result) {//成功的回调函数
        console.log(result)
        location.reload()
      }
    })
  }
})