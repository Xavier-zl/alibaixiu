

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
        console.log(response)
        var html = template('modifyTpl', response)
        console.log(html)
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
        // console.log(response)
        location.reload()
    }
})
// 阻止表单默认跳转
return false;
})
// 删除用户
$('#userBox').on('click', '.delete', function() {
// 获取用户id
confirm('确认要删除用户吗？')
if(confirm ) {
    var id = $(this).attr('data-id');
    $.ajax({
        url:'/users/' +id ,
        type:'delete',
        success: function() {
            location.reload()
        }
    })
}

})
// 批量删除用户
var selectAll = $('#selectAll')
var deleteMany = $('#deleteMany')
selectAll.on('change', function() {
var status = $(this).prop('checked')
// 获取所有用户的状态，并将所有用户的状态改为与全选按钮一致
$('#userBox').find('.userStatus').prop('checked', status)
// 如果全选按钮为true那么显示删除按钮
if(status) {
    deleteMany.show()
} else {
    deleteMany.hide()
}
})
$('#userBox').on('change', '.userStatus', function() {
//判断所有用户的数量是否跟选中状态数量的长度一致，如果一致就讲selectAll的状态改为true，
//否则就改为false
// 所有input用户
var inputs = $('#userBox').find('.userStatus');
// 判断所有用户数量的长度是否等于选中状态用户的长度
if(inputs.length === inputs.filter(':checked').length ) {
    selectAll.prop('checked',true)
} else {
    selectAll.prop('checked',false)
}
// 如果用户选中的数量大于1则显示批量删除
if(inputs.filter(':checked').length > 1) {
    deleteMany.show()
} else {
    deleteMany.hide()
}
})

// 为批量删除按钮添加删除事件
deleteMany.on('click', function() {
    var ids = [];
    // 获取选中的用户
   var userChecked = $('#userBox').find('.userStatus').filter(':checked')
    // 拿到id并且将其添加到新数组ids中
    userChecked.each( function(index,element) {
        ids.push($(element).attr('data-id'))
    })
    if ( confirm('确认要批量删除以下用户吗？')) {
        $.ajax({
            type:'delete',
            url:'/users/' + ids.join('-'),
            success: function() {
                location.reload()
            }
        })
    }

})