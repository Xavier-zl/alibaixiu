$('#logout').on('click' , function() {
    var isConfirm = confirm('确定要退出登录吗');
    if( isConfirm ) {
        $.ajax({
          type:'post',
          url:'/logout',
          success: function() {
            location.href = 'login.html'
          },
          error: function() {
            alert('退出登录失败')
          }
        })
    }
})