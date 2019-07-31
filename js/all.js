

$(document).ready(function () {

  //ajax連結子網頁 (main)
  $(function () {
    $.get("main.html", function (data) {
      $("#iframe-content").html(data);//初始化載入介面
    });
  });

  //範例
  // $('#indexMenu h2').click(function () {//點選會員登入
  //   var current = $(this),
  //     target = current.find('a').attr('target'); // 找到連結a中的targer的值
  //   $.get(target, function (data) {
  //     $("#iframe-content").html(data);
  //   });
  // });


  //判斷帳號(密碼)都有輸入，才能按確認
  //login
  $('#btn-login').click(function (e) { 
    var msgAcc = $('#user-account').val();
    var msgPass = $('#user-password').val();
    if ( (msgAcc !=='') && (msgPass !=='') ) {
      $('#btn-login').attr('type', 'submit');
    } else {
      $('#passwordHelpBlock').text('請輸入帳號或密碼');
    }
  });

  //signup
    $('#btn-signup').click(function (e) { 
      var msgAcc = $('#user-account').val();
      if(msgAcc !=='') {
        $('#btn-signup').attr('type', 'submit');
      } else {
        $('#passwordHelpBlock').text('請輸入帳號');
      }
    });

    
  });



