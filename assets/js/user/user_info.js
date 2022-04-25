
$(function(){
  form.verify({
    nickname: function(value){
      if(value.length > 6){
        return '昵称长度必须在1-6之间'
      }
    }
  })
  getUserSuggest()

  $('.btnRest').on('click',function(e){
    e.preventDefault();
    getUserSuggest()
    
  })

  $('.layui-form').on('submit',function(e){
    e.preventDefault();
    var data1 = form.val("user_form")
    // console.log(data1);
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: data1,
      // data: $(this).serialize(),
      success: function(res){
        if(res.status !== 0){
          return layer.msg('更新失败')
        }
        layer.msg('更新成功')
        window.parent.getUerSugget()
        // console.log(window.parent);
      }

    })
  })



})
var form = layui.form

// 获取用户数据
function getUserSuggest(){
  $.ajax({
    methos: 'GET',
    url:'/my/userinfo',
    success: function(res){
      if(res.status !== 0){
        console.log(res.message);
      }
      form.val('user_form',res.data)
    }
  })
}



