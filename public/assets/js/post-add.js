// 查询分类列表
$.ajax({
    url:'/categories',
    type:'get',
    success: function(response) {
        console.log(response)
        var html = template('categorTpl', {data:response})
        $('#category').html(html)

    }
})