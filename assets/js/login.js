$(function(){
  $('.loginAndRegBox .loginBox').on('click','a',function(){
    $('.loginBox').hide()
    $('.regBox').show()
  })
  $('.loginAndRegBox .regBox').on('click','a',function(){
    $('.regBox').hide()
    $('.loginBox').show()
  })

  // 从layui中获取form
  var form = layui.form
  var layer = layui.layer
  form.verify({
    pass: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位,且不能出现空格'
    ],
    repassword:function(value){
      var pwd = $(".regBox [name=password]").val()
      if(pwd !== value){
        return "两次密码不一致"
      }
      
    }
  });  

  // 监听登录表单事件
  $("#form_login").on('submit',function(e){
    e.preventDefault();
    $.ajax({
      url: '/api/login',
      method: "POST",
      // data:  {username: $('#form_login [name=username]').val(), password: $('#form_login [name=password]').val()},
      // 快速获取表单数据
      data: $(this).serialize(),
      success: function(res){
        if(res.status !== 0){
        console.log(res);

          return layer.msg('登录失败')
        }
      layer.msg('登录成功')
      localStorage.setItem('token', res.token)
      location.href = '/index.html'

      }
    })
  })

  // 监听注册表单事件

  $("#form_reg").on('submit',function(e){
    e.preventDefault();
    var data = {
      username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser',data,function(res){
      if(res.status !== 0){
        return console.log(res.message);
      }
      layer.msg('注册成功请登录')
      
      $('.linkToIndex').click()

    })
  })
  

})