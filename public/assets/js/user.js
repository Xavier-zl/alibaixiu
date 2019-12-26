

$('#userForm').on('submit' ,function() {
        // 获取用户的输入的内容转化为字符串参数格式
        var formData = $(this).serialize();
        // 发送请求
        $.ajax({
            url:'/users',
            type:'post',
            data:formData,
            success: function() {
                location.reload()
            },
            error: function() {
                alert('创建失败')
            }
        })
      
        //阻止表单默认行为
        return false;
})

// 实现头像图片上传功能
//事件委托的形式来上传图片
$('#modifyBox').on('change','#avatar', function() {
      // 创建formData
    // this.files[0]
    var formData = new FormData();
    formData.append('avatar', this.files[0])
    $.ajax({
        url:'/upload',
        type:'POST',
        data:formData,
        processData:false,
        contentType:false,
        success: function(response) {
            // console.log(response)
            //实现头像预览功能，给页面添加元素即可
            $('#preview').attr('src', response[0].avatar)
            //设置一个隐藏域。这里的路径是需要发送给服务器的
            $('#hiddenAvatar').val(response[0].avatar)
        }
    })
})
//用户列表展示
$.ajax({
    url:'/users',
    type:'get',
    success: function(response) {
        // console.log(response)
        var html = template('userTpl',{data:response})
        $('#userBox').html(html)
        
    }
})

// 获取当前点击的用户
$('#userBox').on('click', '.edit', function() {
    // 获取点击的id
    var id = $(this).attr('data-id')
    // console.log(id)
    // 发送 请求
    $.ajax({
        type:'PUT',
        url:'/users/' + id,
        success: function(response) {
            // console.log(response)
            var html = template('modifyTpl', response)
            // console.log(html)
            $('#modifyBox').html(html)
        }
    })

})
//修改用户信息
$('#modifyBox').on('submit', '#modifyForm', function() {
    // 获取内容格式化成参数
    var formData = $(this).serialize();
    var id = $(this).attr('data-id')
    // console.log(formData)
    $.ajax({
        url:'/users/' + id,
        type:'put',
        data:formData,
        success: function(response) {
            location.reload()
        }
    })
    // 阻止表单默认跳转
    return false;
})