$('#userForm').on('submit',function(){
  //收集表单的数据
  $.ajax({
    type:'post',//get或post
    url:'/users',//请求的地址
    data:$('#userForm').serialize(),
    success:function(result){//成功的回调函数
      console.log(result)
      location.reload();//后面知道
    },
    error:function(err){
      alert('添加失败')
    }
  })
  return false;
})

//回调函数不能用es6箭头函数 this会出问题
//头像上传
//页面一打开就会执行
//事件委托
// 一定要委托给一直存在的元素
$('#formBox').on('change','#avatar',function(){
  //ajax在上传图片的时候必须要使用formData 文件上传 进度
  var formData = new FormData();
  formData.append('avatar', this.files[0]);

  //jq中$.ajax默认的contentType值是 'application/x-www-form-urlencoded'
  //jq中$.ajax默认会把数据变成key=value&key=value的形式，我们现在是不需要，因为数据是二进制的数据
  //图片预览
  $.ajax({
    type: 'post',//get或post
    url: '/upload',//请求的地址
    contentType: false,
    processData: false,
    data: formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success: function(result) {//成功的回调函数
      // console.log(result)
      $('#preview').attr('src', result[0].avatar)
      $('#hiddenImg').val(result[0].avatar)
    }
  })


    // // //之前只讲过原生的写法
  // //
  // var xhr = new XMLHttpRequest();
  // xhr.open('post','/upload');
  // // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  // xhr.send(formData);//二进制的数据 key=value&key=value

  // xhr.onload = function(){
  //   console.log(xhr.responseText);
  // }
})



//显示用户列表
$.ajax({
  type:'get',//get或post
  url:'/users',//请求的地址
  data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  success:function(result){//成功的回调函数
    console.log(result);
    var html = template('userTpl',{data:result});
    $('#usersBox').html(html);
  }
})

//修改分为两步
$('#usersBox').on('click','.edit',function(){
  //点击获取当前这个编辑按钮的id值
  //你想获取一个东西，这个东西必须提前存起来
  var id = $(this).attr('data-id');
  console.log(id);
  //通过ajax把当前这个用户的信息查询出来
  $.ajax({
    type:'get',//get或post
    url:'/users/'+id,//请求的地址
    data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    success:function(result){//成功的回调函数
      console.log(result)
      var html = template('modifyFormTpl',result);
      $('#formBox').html(html);
    }
  })
})


$('#formBox').on('submit','#userForm',function(){
  //收集表单数据
  console.log($(this).serialize());
  var id = $(this).attr('data-id');
  console.log(id);
  $.ajax({
    type:'put',//get或post
    url:'/users/'+id,//请求的地址
    data: $(this).serialize(),
    success:function(result){//成功的回调函数
      location.reload();
    }
  })
  return false;
})


//删除功能 事件委托
$('#usersBox').on('click','.delete',function(){
  var id = $(this).attr('data-id');
  console.log(id);
  $.ajax({
    type:'delete',//get或post
    url:'/users/'+id,//请求的地址
    success:function(result){//成功的回调函数
      //ajax不刷新
      location.reload();
    }
  })
})

//当切换全选input的时候，下面所有的input跟着来改变状态
$('#selectAll').on('change',function(){
  console.log($(this).prop('checked'));
  var bool = $(this).prop('checked');
  $('#usersBox').find('.status').prop('checked',bool);
  if(bool == true){
    $('#deleteMany').show();
  }else{
    $('#deleteMany').hide();
  }
})

//当tbody中的input全部选中的时候，我们就让全选也是选中的状态
$('#usersBox').on('change','.status',function(){
  if($('#usersBox').find('.status').length == $('#usersBox').find('.status').filter(':checked').length){
    $('#selectAll').prop('checked',true);
  }else{
    $('#selectAll').prop('checked', false);
  }
  if($('#usersBox').find('.status').filter(':checked').length >= 2){
    $('#deleteMany').show();
  }else{
    $('#deleteMany').hide();
  }
})



$('#deleteMany').on('click',function(){
  //找到所有的选中的input
  if(confirm('确定要删?')){
    var selectAll = $('#usersBox').find('.status').filter(':checked');
    var arr = [];
    selectAll.each(function(index, element) {
      console.log($(element).attr('data-id'))
      arr.push($(element).attr('data-id'));
    })
    $.ajax({
      type: 'delete',//get或post
      url: '/users/' + arr.join('-'),//请求的地址
      data: {},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      success: function(result) {//成功的回调函数
        location.reload();
      }
    })
  }
})