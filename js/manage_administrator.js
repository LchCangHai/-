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

$('.search_btn').click(function(){
    console.log('asdfdsfds');
    let val = $('.search_inp').val();
    $("table tbody tr").hide().filter(":contains('" + val + "')").show();
})


let cnt = 0;
$( document ).bind("click", function( e ) {
    let iniBtn = $('.initial_btn');
    let delBtn = $('.delete_btn');
    let checkN = $('.checkedNum');
    // $( e.target ).closest("tr").addClass('selected');
    let ev = $(e.target);
    // console.log(ev.prop('checked'));
    // console.log(ev);
    if(ev.is('input') && ev.prop('type') == 'checkbox'){
        if(ev.prop('checked') == true){
            cnt++;
            ev.closest("tr").addClass('selected');
        } else {
            cnt--;
            ev.closest("tr").removeClass('selected');
        }
        if(cnt){
            delBtn.show();
            iniBtn.show();
            checkN.html('已选中 ' + $('.selected').length + ' 项');
        } else{
            delBtn.hide();
            iniBtn.hide();
            checkN.html('');
        }
    }
    if(ev.is('a') && ev.html() == '下载') {
        console.log(ev.closest('td'));
    }
});



$('.student').click(function () {
    $('.iden').html($(this).html());
    $('._clone1').show();
    $('._clone2').hide();
})
$('.teacher').click(function () {
    $('.iden').html($(this).html());
    $('._clone2').show();
    $('._clone1').hide();
})


//获取账号信息
// 账号，姓名
//学生，教师
$(function () {
    //学生   _clone1
    $.ajax({
        url:'../manager/selectUser',
        type:'POST',
        dataType:'json',
        contentType:'application/json',
        success:function (result) {
            if(result.status) {
                let n = result.student.length;
                let i = 0;
                for(i = 0; i < n; i++) {
                    let tem = result.student[i];
                    let clone1 = $('.clone1').clone(true);
                    let containt1 = $('.manage');
                    clone1.removeClass('clone1');
                    clone1.addClass('_clone1');
                    clone1.children('.account').html(tem.studentID);
                    clone1.children('.name').html(tem.name);
                    containt1.append(clone1);
                }
            } else {
                console.log('获取学生信息失败'+result.error);
            }
        },
        error:function () {
            console.log('error:获取学生信息失败');
        }
    })
    $('.student').click();


// 教师   _clone2
    $.ajax({
        url:'../manager/selectTeacher',
        type:'POST',
        dataType:'json',
        contentType:'application/json',
        success:function (result) {
            if(result.status) {
                let n = result.teacher.length;
                let i = 0;
                for(i = 0; i < n; i++) {
                    let tem = result.teacher[i];
                    let clone1 = $('.clone1').clone(true);
                    let containt1 = $('.manage');
                    clone1.removeClass('clone1');
                    clone1.addClass('_clone2');
                    clone1.children('.account').html(tem.workID);
                    clone1.children('.name').html(tem.name);
                    containt1.append(clone1);
                }
            } else {
                console.log('获取教师信息失败'+result.error);
            }
        },
        error:function () {
            console.log('error:获取教师信息失败');
        }
    })

})


$('.delete_btn').click(function () {
    let data = $('.selected');
    // console.log(data);
    // data.css('background-color','hotpink');
    // data.remove();
    $('.checkedNum').html('已选中 ' + $('.selected').length + ' 项');

})

$('.delete').click(function () {
    $('.checkedNum').html('已选中 ' + $('.selected').length + ' 项');
})

$('.initial').click(function () {
    let data = $(this).closest('tr');
    console.log(data);
})


//初始化
$(document).on('click','.initial',function () {
    // console.log('xxxxxxxxxxxxxxxxxx');
    let code = $(this).closest('tr').children('.account').html();
    let ob = $(this).closest('tr');
    let data = {
        id : code
    };
    let tem = {
        id:[data]
    }
    let a = JSON.stringify(tem);
    console.log(a);
    $.ajax({
        url:'../manager/updatePassword',
        dataType:'json',
        type:'post',
        data:a,
        contentType:'application/json',
        //下载文件
        success:function (result) {
            if (result.status) {
                confirm('初始化成功');
            } else {
                confirm('初始化失败');
            }
        },
        error:function () {
            console.log('error! 单项初始化');
        }
    })
})

// 删除
$(document).on('click','.delete',function () {
    // console.log('xxxxxxxxxxxxxxxxxx');
    let code = $(this).closest('tr').children('.account').html();
    let ob = $(this).closest('tr');
    let data = {
        id : code
    };
    let tem = {
        id:[data]
    }
    let a = JSON.stringify(tem);
    console.log(a);
    $.ajax({
        url:'../manager/delete',
        dataType:'json',
        type:'JSON',
        data:a,
        contentType:'application/json',
        //下载文件
        success:function (result) {
            if (result.status) {
                confirm('删除成功');
                ob.remove();
            } else {
                confirm('删除失败');
            }
        },
        error:function () {
            console.log('error! 单项删除');
        }
    })
})


//批量初始化
$('.initial_btn').click(function () {
    let ob = $('.selected');
    let n = ob.length;
    let allselected = new Array();
    // console.log(ob);
    for(let i = 0; i < n; i++) {
        allselected[i] = {
            id : $(ob[i]).children('.account').html()
        };
    }
    let tem = {
        id:allselected
    }
    let a = JSON.stringify(tem);
    console.log(a);
    $.ajax({
        url:'../manager/updatePassword',
        dataType:'JSON',
        type:'POST',
        data:a,
        contentType:'application/json',
        success:function (result) {
            confirm('初始化成功');
        },
        error:function () {
            console.log('error! 初始化失败');
        }
    })
})

// 批量删除
$('.delete_btn').click(function () {
    let ob = $('.selected');
    let n = ob.length;
    let allselected = new Array();
    // console.log(ob);
    for(let i = 0; i < n; i++) {
        allselected[i] = {
            id : $(ob[i]).children('.account').html()
        };
    }
    let tem = {
        id:allselected
    }
    let a = JSON.stringify(tem);
    console.log(a);
    $.ajax({
        url:'../manager/delete',
        dataType:'JSON',
        type:'POST',
        data:a,
        contentType:'application/json',
        success:function (result) {
            confirm('删除失败');
            ob.remove();
            $('.checkedNum').html('已选中 ' + $('.selected').length + ' 项');
        },
        error:function () {
            console.log('error! 删除失败');
        }
    })
})





























