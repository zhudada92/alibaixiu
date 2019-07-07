$.ajax({
  type: 'get',//get或post
  url: '/slides',//请求的地址
  success: function (result) {//成功的回调函数
    // console.log(result)
    var html = template('slideTpl', { data: result })
    $('#slideBox').html(html)
    // 轮播功能
    var swiper = Swipe(document.querySelector('.swipe'), {
      auto: 3000,
      transitionEnd: function (index) {
        // index++;

        $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
      }
    });

    // 上/下一张
    $('.swipe .arrow').on('click', function () {
      var _this = $(this);

      if (_this.is('.prev')) {
        swiper.prev();
      } else if (_this.is('.next')) {
        swiper.next();
      }
    })
  }
})

// 最近发布
$.ajax({
  type: 'get',//get或post
  url: '/posts/lasted',//请求的地址
  success: function (result) {//成功的回调函数
    // console.log(result)
    var html = template('latestTpl', { data: result });
    $('.new').append(html)
  }
})