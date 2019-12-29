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

// 点击编辑修改文章

// 从浏览器地址栏获取参数
 var id = articlesId('id')
if ( id != -1 ) {
    // 说明是在进行修改操作
    $.ajax({
        url:'/posts/' + id,
        success: function(res) {
            $.ajax({
                url:'/categories',
                type:'get',
                success: function(response) {
                    // console.log(response)
                 res.categories = response
                    console.log(res)
                    var html = template('updataTpl',res)
                    console.log(html)
                    $('#parentdBox').html(html)
                  
            
                }
            })
          
        }
    })
}
function articlesId  (name) {
    var   getArticlesId =location.search.substring(1).split('&')
    console.log(getArticlesId)
    for ( var i = 0; i < getArticlesId.length ; i++) {
        var temp =  getArticlesId[i].split('=')
        if ( temp[0] == name ) {
            return temp[1]
        }
    }
    return -1
} 

// 当文章点击修改按钮时
$('#parentdBox').on('submit','#updateRow' , function() {
    var formData = $(this).serialize();
    var id = $(this).data('id')
    $.ajax({
        url:'/posts/' + id,
        type:'put',
        data: formData,
        success: function() {
            location.href = '/admin/posts.html'
        }

    })
})
