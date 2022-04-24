  
  // 在发起ajax请求之前，回先调用ajaxPrefilter这个函数
  
  $.ajaxPrefilter(function(options){
    // 在发起ajax请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url

    // 统一未有权限的结构，设置请求头
    if(options.url.indexOf('/my/') !== -1){
      options.headers = {
        Authorization: localStorage.getItem('token') || ''
      }
    }

    // 全局统一挂载complete回调函数
    options.complete = function(res){
      if(res.responseJSON.status ===1 || res.responseJSON.status === "身份认证失败！"){
        localStorage.removeItem('token')
        location.href = '/login.html'
        console.log(res.responseJSON);
        } 
    }
  })
