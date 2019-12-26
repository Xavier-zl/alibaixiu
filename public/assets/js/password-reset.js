// 获取表单点击事件
$('#modifyPass').on('submit', function() {
    // 获取用户在表单中输入的内容
    var formData  = $(this).serialize();
    console.log(formData)
    $.ajax({
        url:'/users/password',
        type:'put',
        data: formData,
        success: function() {
            location.href = "/admin/login.html"
        }
    })
    // 问题？如果检测密码不一致
    // 阻止表单默认提交行为
    return false;
})