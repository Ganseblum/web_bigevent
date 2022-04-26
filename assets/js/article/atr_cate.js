$(function(){
  getAtr()

  var layer = layui.layer
  var form = layui.form
  var indexAdd = null
  $('#addArt').on('click',function(){
    indexAdd = layer.open({
      type: 1,
      title: '添加文章分类',
      area: ['500px','250px'],
      content: $('#tpl-add').html()
    });   
  })


  $('body').on('submit','#form-atr',function(e){
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function(res){
        if(res.status !== 0){
          layer.msg('新增失败')
        }else{
          layer.msg('新增成功')
          getAtr()
          layer.close(indexAdd)
        }
      }
    })
  })

  // 编辑
  var indexEdit = null
  $('tbody').on('click','.btn-edit',function(e){
    e.preventDefault();
    indexEdit = layer.open({
      type: 1,
      title: '添加文章分类',
      area: ['500px','250px'],
      content: $('#tpl-edit').html()
    });  

    var id = $(this).attr('data-id')
    console.log(id);
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' +id,
      success: function(res){
        form.val('form-edit',res.data)
      }
    })
    
    // 修改

    $('body').on('submit','#form-edit',function(e){
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function(res){
        if(res.status !== 0){
          return layer.msg('修改失败')
        }

          getAtr()
          layer.msg('修改成功')
          layer.close(indexEdit)

        
        }
      })
    })
    
  })
  
  var indexEdit = null
  $('tbody').on('click','#btn-del',function(e){
    e.preventDefault()
    var id = $(this).attr('data-id')
    $.ajax({
      method: 'GET',
      url: '/my/article/deletecate/' + id,
      success: function(res){
        if(res.status !== 0){
          layer.msg('删除失败')
        }
        layer.msg('删除成功')
        getAtr()

      }
    })
  })





  function getAtr(){
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function(res){
        var htmlstr = template('tpl-tbody',res)
        $('tbody').html(htmlstr)
      }
    })
  }


})

