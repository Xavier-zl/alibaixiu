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