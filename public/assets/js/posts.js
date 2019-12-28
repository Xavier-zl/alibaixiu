// 获取文章列表信息
$.ajax({
    url:'/posts',
    type:'get',
    success: function(response) {
        console.log(response)
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
