
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

// 批量删除功能
var deleteMany = $('#deleteMany')
var deleteAll =$('#deleteAll')
 deleteMany.on('change',  function() {
    // 获取全选按钮状态
    var status = $(this).prop('checked');
    // 获取所有input按钮,并且将状态与全选按钮保持一致
    $('#categoriesBody').find('.ipt').prop('checked',status);
    // 如果全选按钮为true则显示批量删除
    if(status) {
        $('#deleteAll').show()
    }else{
        $('#deleteAll').hide()
    }
})

// 判断选中的input是否等于所有用户的数量
$('#categoriesBody').on('change', '.ipt', function() {
    var inputs =$('#categoriesBody').find('.ipt')
    if(inputs.length == inputs.filter(':checked').length) {
        deleteMany.prop('checked',true)
    } else {
        deleteMany.prop('checked',false)

    } 
    if (inputs.filter(':checked').length> 1) {
        $('#deleteAll').show()

    } else {
        $('#deleteAll').hide()
    }
})
// 点击批量删除按钮实现删除功能
deleteAll.on('click' ,function() {
    // 声明一个新数组
    var arrNew = [];
    // 点击批量删除按钮获取所有选中的用户
    var categoriesChecked =$('#categoriesBody').find('.ipt').filter(':checked')
    // console.log(inputs)
    // 循环inputs并且拿到每个的id
    categoriesChecked.each( function(index,element) {
      arrNew.push($(element).attr('data-id'))
    })
   if(confirm('确认要删除以下分类吗？')) {
    $.ajax({
        url:'/categories/' + arrNew.join('-'),
        type:'DELETE',
        success: function() {
            location.reload()
        }
    })
   }
})