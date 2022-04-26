$(function(){
  initEditor()

   // 1. 初始化图片裁剪器
  var $image = $('#image')
  
   // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }
   // 3. 初始化裁剪区域
  $image.cropper(options)

  var form = layui.form
  var layer = layui.layer
  ititList()


  $('#check').on('click',function(){
      $('#file').click()
  })

  $('#file').on('change',function(e){
    e.preventDefault();
    var file = e.target.files[0]
    var newImgURL = URL.createObjectURL(file)
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
  })


  var state = '已发布'
  $("#btn2").on('click',function(){
    state = '草稿'
  })


  //  发布文章
  $('body').on('submit','#pub_form',function(e){
    e.preventDefault()
    var fd = new FormData($(this)[0])
    fd.append('state',state)
    state = '已发布'
    $image
    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 400,
    height: 280
    })
    .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
    // 得到文件对象后，进行后续的操作
      fd.append('cover_img',blob)

    pushAtr(fd)
    })


  })
 
  function pushAtr(fd){
    $.ajax({
    method: 'POST',
    url:'/my/article/add',
    data: fd,
    contentType:false,
    processData: false,
    success: function(res){
      if(res.status !== 0){
        return layer.msg('发布失败')

      }
      console.log(res.message);
      layer.msg('发布成功')
      // location.href = "/article/atr_list.html"

    }
    })
  
  }

  function ititList(){
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function(res){
        if(res.status !==0){
        return layer.msg('初始文章失败')
        }
        var htmlstr = template('tpl-cate',res)
        $('[name=cate_id]').html(htmlstr)
        form.render()
      }
    })
  }


})