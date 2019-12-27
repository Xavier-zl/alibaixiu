// 获取用户from表单
$('#addCategories').on('submit', function() {
    // 获取用户输入内容转化为参数字符串
    var formData = $(this).serialize()
    // 给服务器发送请求
    $.ajax({
        url:'/categories',
        type:'post',
        data:formData,
        success: function() {
            location.reload()
        }
    })
    // 阻止表单默认提交行为
    return false;
})
//分类数据展示在页面中
$.ajax({
    url:'/categories',
    type:'get',
    success: function(response) {
        // console.log(response)
        var html = template('categoriesTpl',{data:response})
        $('#categoriesBody').html(html)
    }
})
//分类数据的修改
$('#categoriesBody').on('click','.edit', function() {
    var id = $(this).attr('data-id');
    // 根据id获取详细信息
    $.ajax({
        url:'/categories/' + id ,
        type:'get',
        success: function(response) {
            var html = template('modifyCategoriesTpl', response)
            $('#categoriesBox').html(html)
        }
    })
})
//点击修改按钮实现修改功能
$('#categoriesBox').on('submit','#modifyCategories', function() {
    var formData  = $(this).serialize();
    var id = $(this).attr('data-id')
    $.ajax({
        url:'/categories/' +id,
        type:'put',
        data:formData,
        success: function() {
            location.reload()
        }
    })
    // 阻止表单默认提交行为
    return false;
})

// 事件委托方式添加点击删除事件
$('#categoriesBody').on('click', '.delete', function() {
    if(confirm('确认要删除此分类吗？')) {
      var id = $(this).attr('data-id')
      $.ajax({
          url:'/categories/' +id,
          type:'DELETE',
          success: function() {
              location.reload()
          }
      })
    }

})