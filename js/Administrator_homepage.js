// $(function() {
//     // $('#otherInfoTab a:last').tab('show');//初始化显示哪个tab
//
//     $('#otherInfoTab a').click(function(e) {
//         e.preventDefault();//阻止a链接的跳转行为
//         $(this).tab('show');//显示当前选中的链接及关联的content
//     })
// })



$(function () {
    $.ajax({
        url:'',
        type:'POST',
        success:function (result) {
            if(result.isRight) {
            // if(!false) {
                $('.cover').css('display','flex');
                setTimeout(jumb,1000);
            }
        }
    })
})

function jumb(){
    window.location.href = '../error_1.html';
}



$('.signin').click(function () {
    window.location.href = 'sign_in_administrator.html';
})
$('.manage').click(function () {
    window.location.href = 'manage_administrator.html';
})












































