
//jQuery
$(document).ready(function () {

  //提取ajax
  var xhr = $.ajax({
    url: "json/json-product-main.php", //請求的url地址
    dataType: "json", //返回格式為json
    async: true, //請求是否非同步，預設為非同步，這也是ajax重要特性
    data: { "id": "value" }, //引數值
    type: "GET", //請求方式

    success: function () {
      //請求成功時處理
      var data = JSON.parse(xhr.responseText)

    },

    error: function () {
      //請求出錯處理
      console.log('ajax出錯');
    }
  });



  //共通
  // index.html 與 product.html 的購物車
  // 建立DOM
  var cartContent = $('.cart-content'); //存放購物車清單
  var cart = JSON.parse(localStorage.getItem('cart')) || []; //購物清單
  updateCart(); //更新購物車


  //更新購物車數字與寫入cart-content
  function updateCart() {
    //定義出入數字的DOM
    var addCartNum = $('.add-cart-num');
    //取出localstorage的資料並轉成陣列
    JSON.parse(localStorage.getItem('cart'))

    //計算長度
    var len = cart.length;
    //印出
    if (len == 0) {
      addCartNum.text('');
    } else {
      addCartNum.text(len);
    }

    //將資料寫入至cart-content
    var mainStr = ''
    var countStr = ''
    var total = 0
    cartContent.empty(); //清空內容
    for (var i = 0; i < cart.length; i++) {

      //建立 購買商品資訊 的字串
      mainStr += '<tr class="text-center"><td class="text-left"><a href="#" class="mr-3" data-nm="' + i + '">刪除</a>' + cart[i].name + '</td><td>' + cart[i].color + '</td><td>' + cart[i].buySize + '</td><td>' + cart[i].buyNum + '</td><td class="text-right">NT$ ' + cart[i].buyNum * cart[i].price + '</td></tr>';

      //計算購買總金額
      total += cart[i].buyNum * cart[i].price;

      //建立 總金額 的字串
      var countStr = '<tr class="text-right"><th colspan="4" class="text-right" scope="col">合計</th><th scope="col">NT$ ' + total + '</th></tr>'

    }
    //插入字串到HTML
    cartContent.append(mainStr + countStr);
  }


  //刪除購物車 
  cartContent.on('click', function (e) {
    e.preventDefault();

    //限定點 A 才有回應
    var trA = e.target.nodeName;
    if (trA != 'A') { return }

    //點擊 A 刪除父層 td
    var trDelete = e.target.dataset;
    cart.splice(trDelete, 1);

    //將刪除後的 cart 存進 localstorage
    localStorage.setItem('cart', JSON.stringify(cart));

    //更新購物車
    updateCart();

  });




  //提示工具tooltip
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })


  //回頂部go-top
  $('.go-top').click(function (e) {
    e.preventDefault();
    $('html,body').animate({
      scrollTop: 0 //回到頁面的0
    }, 700) //秒數
  });

});



