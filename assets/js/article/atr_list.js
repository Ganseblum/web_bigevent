$(function(){

  var q = {
    pagenum: 1,//页码值
    pagesize: 2,//每页显示多少条数据
    cate_id:'' ,//文章分类的 Id
    state:'',	//文章的状态，可选值有：已发布、草稿
  }


  var laypage = layui.laypage

// 分页操作


initList()

  // 初始化显示表格
function initList(){
  $.ajax({
    method: 'GET',
    url: '/my/article/list',
    data: q,
    success: function(res){
      if(res.status !== 0){
        return layer.msg('显示失败')
      }else{
        var htmlstr = template('tpl-tbody',res)
        $('tbody').html(htmlstr) 
        layer.msg('显示成功')

      
        renderPage(res.total)
      }
    
    }
  })

  getList()

}

//分页
function renderPage(total){
  laypage.render({
    elem: 'page',
    count: total, //数据总数，从服务端得到
    limit: q.pagesize, //每条显示多少数据
    curr: q.pagenum, //设置默认选中的分页
    layout: ['count','limit','prev','page','next','skip'],
    limits : [2,3,5,10],
    jump: function(obj,first){
      // first为触发对象
      q.pagenum = obj.curr
      q.pagesize = obj.limit
      if(!first){
        initList()
      }
    }
  });
}


$('#search_form').on('submit',function(e){
  e.preventDefault();

  // 获取表单的的值
  var cate_id = $('[name=cate_id]').val()
  var state = $('[name=state]').val()

  q.cate_id = cate_id
  q.state = state

  initList()
  
})


//删除
$('.layui-table').on('click','.btn-del',function(e){
  e.preventDefault()
  var id = $(this).attr('id')
  var len = $('.btn-del').length
  console.log(len);
  layer.confirm('确认删除？', {icon: 3, title:'提示'}, function(index){
    //do something
    $.ajax({
      method: 'GET',
      url:'/my/article/delete/'+ id,
      success: function(res){
        if(res.status !== 0){
          layer.msg('删除失败')
        }else{
          layer.msg('删除成功')
          if(len === 1){
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum-1
          }
          initList()

        }
      }
    })
    layer.close(index);
  });

})




})
var form = layui.form
var layer = layui.layer


// 获取列表
function getList(){
  $.ajax({
    method: "GET",
    url: '/my/article/cates',
    success: function(res){
      if(res.status !== 0){
        // console.log(res.msg);
        return layer.msg('获取失败')
      }else{
        var htmlstr = template('tpl-select',res)
        $('[name=cate_id]').html(htmlstr)
        form.render()
        layer.msg('获取成功')
      }
      

    }
  })
}


