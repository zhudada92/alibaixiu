// 处理文章时间
function dataFormTime(time) {
  time = new Date(time)
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var day = time.getDate();
  return year + '-' + month + '-' + day
}

var page = 1;
render();
// 分页
function changePage(currentPage) {
  page = currentPage;
  render();
}
// 展示文章
function render() {
  $.ajax({
    type: 'get',//get或post
    url: '/posts',//请求的地址
    data: {
      page: page
    },//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) {//成功的回调函数
      console.log(result)
      var html = template('postsTpl', result);
      $('#postBox').html(html);

      var page = template('pageIpl', result);
      $('#pageBox').html(page)
    }
  })
}

$.ajax({
  type: 'get',//get或post
  url: '/categories',//请求的地址
  data: {},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  dataType: 'json',
  success: function (result) {//成功的回调函数
    console.log(result)
    var html = template('categoryTpl', { data: result });
    $('#categoryBox').html(html);

  }
})


$('#filterForm').on('submit', function () {
  var formData = $(this).serialize();
  $.ajax({
    type: 'get',//get或post
    url: '/posts',//请求的地址
    data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) {//成功的回调函数
      console.log(result)
      var html = template('postsTpl', result);
      $('#postBox').html(html);

      var page = template('pageIpl', result);
      $('#pageBox').html(page)

    }
  })
  return false;
})

$('#postBox').on('click', '.delete', function () {
  if (confirm('确定删除此文章吗?')) {
    var id = $(this).attr('data-id')
    $.ajax({
      type: 'delete',//get或post
      url: '/posts/' + id,//请求的地址
      success: function (result) {//成功的回调函数
        location.reload()
      }
    })
  }
})