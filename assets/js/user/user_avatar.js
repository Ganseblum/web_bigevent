$(function(){
  $("#btnUpload").on('click',function(e){
    $("#file").click()
    
  })

  $("#file").on('change',function(e){
    console.log(e);
    // file发生改变时获取改变的文件
    var filelist = e.target.files
    console.log(filelist.length);
    if(filelist.length === 0){
      return layui.layer.msg('请选择文件')

    }
    var file = e.target.files[0]
    // 根据选择的文件，创建一个对应的URL地址
    var newImgURL = URL.createObjectURL(file)
    $image
    .cropper('destroy')      // 销毁旧的裁剪区域
    .attr('src', newImgURL)  // 重新设置图片路径
    .cropper(options)        // 重新初始化裁剪区域
  })




    $('#btnDetermine').on('click',function(){
        var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      }).toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
      $.ajax({
        method: 'POST',
        url:'/my/update/avatar',
        data: {
          avatar: dataURL
        },
        success: function(res){
          if(res.status !== 0){
            return layui.layer.msg('更新失败')
          }
          layui.layer.msg('更新成功')
          window.parent.getUerSugget()
        }
      })
      
    }) 

     
})
