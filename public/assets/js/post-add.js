$(function() {
    // 查询分类列表
$.ajax({
    url:'/categories',
    type:'get',
    success: function(response) {
        // console.log(response)
        var html = template('categorTpl', {data:response})
        $('#category').html(html)

    }
})
//实现图片文件上传
$('#feature').on('change', function() {
    // 获取选择到的文件
    var file = this.files[0];
    // console.log(files)
    // 创建formdata使图片变成二进制格式
    var formData = new FormData();
    // 将管理员选择的文件添加到formdata中
    formData.append('avatar',file )
    $.ajax({
        url:'/upload',
        type:'post',
        data:formData,
        processData:false,
        contentType:false,
        success: function(response) {
            console.log(response)
            $('#thumbnail').val(response[0].avatar)
        }
    
    })
})

$('#formRow').on('submit', function() {
    // 获取用户输入的内容
    var formData = $(this).serialize();
    
    $.ajax({
        url:'/posts',
        type:'POST',
        data:formData,
        success: function() {
            location.href= '/admin/posts.html'
        }
    })
    // 阻止表单默认事件
    return false;
})
})