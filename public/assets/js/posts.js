// 获取文章列表信息
$.ajax({
    url:'/posts',
    type:'get',
    success: function(response) {
        // console.log(response)
        var html = template('postsTpl' , response)
        // console.log(html)
        $('#recordsTbody').html(html)
     
    }
})
//处理日期格式
function formateDate(date) {
    date = new Date(date);
   return date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate()
}

//分页


//向服务器发送请求索要分类数据
$.ajax({
    url:'/categories',
    type:'get',
    success: function(response) {
        // console.log(response)
        var html = template('categoriesTpl', {data:response})
        // console.log(html)
        $('#titleSelect').html(html)
    }
})

// 当用户进行文章列表筛选的时候
$("#categoryForm").on('submit', function() {
    // 获取用户选择的内容
    var formData = $(this).serialize();
    console.log(formData)
    $.ajax({
        url:'/posts',
        type:'get',
        data:formData,
        success: function(response) {
            console.log(response)
            var html = template('postsTpl' , response)
            // console.log(html)
            $('#recordsTbody').html(html)
         
        }
    })
    return false;

})

