// 添加分类
$('#addCategory').on('submit', function () {
  var formData = $(this).serialize();
  $.ajax({
    type: 'post',//get或post
    url: '/categories',//请求的地址
    data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) {//成功的回调函数
      // console.log(result)
      location.reload()
    }
  })
  return false;
})

// 展示分类数据
$.ajax({
  type: 'get',//get或post
  url: '/categories',//请求的地址
  success: function (result) {//成功的回调函数
    console.log(result)
    var html = template('categoryTpl', { data: result })
    $('#categoryList').html(html)
  }
})

// 编辑功能  给编辑按钮的tobody添加事件委托 
$('#categoryList').on('click', '.edit', function () {
  var id = $(this).attr('data-id');
  console.log(id);
  $.ajax({
    type: 'get',//get或post
    url: '/categories/' + id,//请求的地址
    success: function (result) {//成功的回调函数
      console.log(result)
      var html = template('modifyCategoryTpl', result);
      $('#formBox').html(html)
    }
  })
})

// 提交修改之后的表单内容
$('#formBox').on('submit', '#modifyCategory', function () {
  var formData = $(this).serialize();
  var id = $(this).attr('data-id');
  $.ajax({
    type: 'put',//get或post
    url: '/categories/' + id,//请求的地址
    data: formData,
    dataType: 'json',
    success: function (result) {//成功的回调函数
      // console.log(result)
      location.reload()
    }
  })
})

// 删除分类
$('#categoryList').on('click', '.delete', function () {
  if (confirm('确定删除吗？')) {
    var id = $(this).attr('data-id')
    $.ajax({
      type: 'delete',//get或post
      url: '/categories/' + id,//请求的地址
      success: function (result) {//成功的回调函数
        console.log(result)
        location.reload()
      }
    })
  }
})

// 全选
$('#checkedAll').on('change', function () {
  var bool = $(this).prop('checked');
  $('#categoryList').find('.status').prop('checked', bool)
  if (bool == true) {
    $('#deleteAll').show()
  } else {
    $('#deleteAll').hide()
  }
})

// 单选
$('#categoryList').on('change', '.status', function () {
  // 先获得所有用户 在所有用户中过滤出被选中的用户,判断是否数量是否一致
  if ($('#categoryList').find('.status').length == $('#categoryList').find('.status').filter(':checked').length) {
    $('#checkedAll').prop('checked', true)
  } else {
    $('#checkedAll').prop('checked', false)
  }
  if ($('#categoryList').find('.status').filter(':checked').length >= 2) {
    $('#deleteAll').show()
  } else {
    $('#deleteAll').hide()
  }
})

// 批量删除
$('#deleteAll').on('click', function () {
  if (confirm('确定删除?')) {
    var selectAll = $('#categoryList').find('.status').filter(':checked')
    console.log(selectAll);
    var arr = [];
    selectAll.each(function (index, element) {
      console.log($(element).attr('data-id'))
      arr.push($(element).attr('data-id'))
    })
    $.ajax({
      type: 'delete',//get或post
      url: '/categories/' + arr.join('-'),//请求的地址
      success: function (result) {//成功的回调函数
        console.log(result)
        location.reload()

      }
    })
  }
})