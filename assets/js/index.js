$(function(){
  getUerSugget()

  $('.goBack').on('click',function(){
      var layer = layui.layer
    layer.confirm('确定要退出吗?', {icon: 3, title:'提示'}, function(index){
      //do something
      localStorage.removeItem('token')
      location.href = '/login.html'
      layer.close(index);
    });
  })


})

function getUerSugget(){
  $.ajax({
    method: "GET",
    url: '/my/userinfo',
    // headers:{
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function(res){
      if(res.status !== 0){
        return layer.msg('获取失败')
      }
      renderAvatar(res.data)
    },
    // complete: function(res){
    //   // console.log(res);
    //   if(res.responseJSON.status ===1 || res.responseJSON.status === "身份认证失败！"){
    //     localStorage.removeItem('token')
    //     location.href = '/login.html'
    //     console.log(res.responseJSON);
    //     } 
    // }
  })
}

function renderAvatar(data){
  var name = data.nickname || data.username
  $(".welcome").html('欢迎&nbsp;&nbsp;' + name)

  if(data.user_pic !== null){
    $('.layui-nav-img').attr('src',data.user_pic).show()
    $('.text-useravants').hide()
  }else{
  $('.layui-nav-img').attr('src',data.user_pic).hide()
    var first = name[0].toUpperCase()
    $('.text-useravants').html(first).show()
  }

}

