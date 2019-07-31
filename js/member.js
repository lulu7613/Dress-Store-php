

$(document).ready(function () {

  //login.php
  //判斷帳號、密碼都有輸入，確認鍵替換成submit
  $('#btn-login').click(function (e) {
    var msgAcc = $('#user-account').val();
    var msgPass = $('#user-password').val();
    if ((msgAcc !== '') && (msgPass !== '')) {
      $('#btn-login').attr('type', 'submit');
    } else {
      $('#passwordHelpBlock').text('請輸入帳號或密碼');
    }
  });


  
  //signup.php
  //判斷帳號都有輸入，確認鍵替換成submit
  $('#btn-signup').click(function (e) {
    var msgAcc = $('#user-account').val();
    if (msgAcc !== '') {
      $('#btn-signup').attr('type', 'submit');
    } else {
      $('#passwordHelpBlock').text('請輸入帳號');
    }
  });



  //member-add.php

  //驗證二次密碼輸入是否一致
  //印出提示文字
  $('#user-pass-check').blur(function (e) {
    var msgPass = $('#user-password').val();
    var msgPassCheck = $('#user-pass-check').val();

    if (msgPassCheck !== msgPass) {
      $(this).parent().find('.pass-check').removeClass('text-success');
      $(this).parent().find('.pass-check').addClass('text-danger').text('兩次輸入密碼不一致，請重新輸入');
    } else {
      $(this).parent().find('.pass-check').removeClass('text-danger');
      $(this).parent().find('.pass-check').addClass('text-success').text('兩次輸入皆正確');
    }
  });

  //移除提示文字
  $('#user-pass-check').focus(function (e) {
    $(this).parent().find('#passwordHelpBlock').empty();
  });


  //身分字號驗證
  $('#user-id').blur(function (e) { 
    var msgId = $('#user-id').val(); 
    var ans = checkID(msgId);

    if (ans == true) {
      $('.id-check').removeClass('text-danger')
      $('.id-check').addClass('text-success').text('身分證輸入格是正確')
    } else {
      $('.id-check').removeClass('text-success')
      $('.id-check').addClass('text-danger').text('身分證輸入格不正確')
    }
  });
  
  function checkID(id) {
    tab = "ABCDEFGHJKLMNPQRSTUVXYWZIO"
    A1 = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3);
    A2 = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5);
    Mx = new Array(9, 8, 7, 6, 5, 4, 3, 2, 1, 1);

    var ans= true

    if (id.length != 10) return ans = false;
    i = tab.indexOf(id.charAt(0));
    if (i == -1) return false;
    sum = A1[i] + A2[i] * 9;

    for (i = 1; i < 10; i++) {
      v = parseInt(id.charAt(i));
      if (isNaN(v)) return  ans = false;
      sum = sum + v * Mx[i];
    }

    if (sum % 10 != 0) return  ans = false;
    return ans;
  }


});



