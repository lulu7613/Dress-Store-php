
//jQuery
$(document).ready(function () {


  // 定義目前所在的網址
  var html = location.origin + location.pathname;

  //點選主題館部分
  if ((location.href == html) || (location.href == html + '?cid=0') || (location.href == html + '?cid=1') || (location.href == html + '?cid=2') || (location.href == html + '?cid=3') || (location.href == html + '?cid=4')) {

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

        //定義判斷式 (顯示的種類)
        if ((location.href == html) || (location.href == html + '?cid=0')) {
          len = data.length;
          navContent('全部');
          updataContent(len);

        } else if (location.href == html + '?cid=1') { //文字
          data = data.filter(function (item) {
            return item.cid === '1';
          })
          len = data.length;
          navContent('文字');
          updataContent(len);

        } else if (location.href == html + '?cid=2') { //圖騰
          data = data.filter(function (item) {
            return item.cid === '2';
          })
          len = data.length;
          navContent('圖騰');
          updataContent(len);

        } else if (location.href == html + '?cid=3') { //搞怪
          data = data.filter(function (item) {
            return item.cid === '3';
          })
          len = data.length;
          navContent('搞怪');
          updataContent(len);

        } else if (location.href == html + '?cid=4') { //人物
          data = data.filter(function (item) {
            return item.cid === '4';
          })
          len = data.length;
          navContent('人物');
          updataContent(len);
        }

        // main 主題商品展示區
        function updataContent() {
          //清空內容
          $('#index-content').empty();
          //插入進HTML
          for (i = 0; i < len; i++) {
            $('#index-content').append('<div class="col-12 col-md-6 col-lg-3 mb-3"><div class="card"><img src="imgshirt/' + data[i].img + 'l.jpg" class="card-img-top pt-3 px-3 product-img" alt="' + data[i].img + '"><div class="card-body text-center"><h6 class="card-title mb-1 product-name">' + data[i].name + '</h6><small class="text-info product-color">顏色 / ' + data[i].color + '</small><div class="d-flex align-items-end px-2 mt-lg-3"><span class="h6 mr-auto text-danger product-price">$NT' + data[i].price + '</span><a href="/Dress/product.html?sid=' + data[i].sid + '" class="btn btn-sm main-btn-color">立即搶購</a>');
          }
          updateCart(); //更新購物車
        }
      },

      error: function () {
        //請求出錯處理
        console.log('ajax出錯');
      }
    })

  }

  //點選人氣精選
  else if (location.href == html + '?special=1') {
    // 提取AJAX
    var xhr = $.ajax({
      type: "GET",
      url: "json/json-product-special.php",
      data: "data",
      dataType: "json",

      success: function () {
        //獲取data
        var data = JSON.parse(xhr.responseText);

        //麵包屑分頁
        navContent('人氣精選')

        //main 商品展列
        function arr(data) {
          return data.filter(item => item.title == '男生最愛' || item.title == '新品推薦' || item.title == '女生最愛' || item.title == '孩子最愛')
        }

        data = arr(data)

        len = data.length;

        //插入HTML
        for (i = 0; i < len; i++) {
          $('#index-content').append('<div class="col-12 col-md-6 col-lg-3 mb-3"><div class="card hot-card"><span class="bg-danger text-light hot-mark">' + data[i].title + '</span><img src="imgshirt/' + data[i].img + 'l.jpg" title="' + data[i].story + '" class="card-img-top pt-3 px-3 product-img" alt="' + data[i].img + '"><div class="card-body text-center"><h6 class="card-title mb-1 product-name">' + data[i].name + '</h6><small class="text-info product-color">顏色 / ' + data[i].color + '</small><div class="d-flex align-items-end px-2 mt-lg-3"><span class="h6 mr-auto text-danger product-price">$NT' + data[i].price + '</span><a href="/Dress/product.html?sid=' + data[i].sid + '" class="btn btn-sm main-btn-color">立即搶購</a>');
        }
        updateCart(); //更新購物車

      },

      error: function () {
        //請求出錯處理
        console.log('ajax出錯');
      }
    });
  }

  //點選清倉特價
  else if (location.href == html + '?special=2') {
    // 提取AJAX
    var xhr = $.ajax({
      type: "GET",
      url: "json/json-product-special.php",
      data: "data",
      dataType: "json",
      success: function () {
        //獲取data
        var data = JSON.parse(xhr.responseText);

        //麵包屑分頁
        navContent('清倉特價')

        //main 商品展列
        data = data.filter(function (item) {
          return item.title === '清倉55 折';
        })
        len = data.length;

        //插入HTML
        for (i = 0; i < len; i++) {
          $('#index-content').append('<div class="col-12 col-md-6 col-lg-3 mb-3"><div class="card hot-card"><span class="bg-info text-light hot-mark">' + data[i].title + '</span><img src="imgshirt/' + data[i].img + 'l.jpg" title="' + data[i].story + '" class="card-img-top pt-3 px-3 product-img" alt="' + data[i].img + '"><div class="card-body text-center"><h6 class="card-title mb-1 product-name">' + data[i].name + '</h6><small class="text-info product-color">顏色 / ' + data[i].color + '</small><div class="d-flex align-items-end px-2 mt-lg-3"><span class="h6 mr-auto text-danger product-price">$NT' + data[i].price + '</span><a href="/Dress/product.html?sid=' + data[i].sid + '" class="btn btn-sm main-btn-color">立即搶購</a>');
        }
        updateCart(); //更新購物車

      },

      error: function () {
        //請求出錯處理
        console.log('ajax出錯');
      }
    });
  }

  //搜尋
  $('#btn-search').on('click', function (e) {

    //DOM
    var searchText = $('#search').val();

    if (searchText == '') {
      alert('請輸入關鍵字')
    } else {

      //ajax
      var xhr = $.ajax({
        type: "GET",
        url: "json/json-product-main.php",
        data: "data",
        dataType: "json",
        success: function () {
          //DOM
          var data = JSON.parse(xhr.responseText);
          var search = [];

          //比對關鍵字
          for (i = 0; i < data.length; i++) {
            if (data[i].name.match(searchText)) {
              search.push(data[i]);
            }
          }

          //放入麵包屑分頁
          navContent('搜尋');

          //清空內容
          $('#index-content').empty();

          //插入HTML
          for (i = 0; i < search.length; i++) {
            $('#index-content').append('<div class="col-12 col-md-6 col-lg-3 mb-3"><div class="card"><img src="imgshirt/' + search[i].img + 'l.jpg" class="card-img-top pt-3 px-3 product-img" alt="' + search[i].img + '"><div class="card-body text-center"><h6 class="card-title mb-1 product-name">' + search[i].name + '</h6><small class="text-info product-color">顏色 / ' + search[i].color + '</small><div class="d-flex align-items-end px-2 mt-lg-3"><span class="h6 mr-auto text-danger product-price">$NT' + search[i].price + '</span><a href="/Dress/product.html?sid=' + search[i].sid + '" class="btn btn-sm main-btn-color">立即搶購</a>');
          }
          updateCart(); //更新購物車

        }
      });
    }
  });



  //共通
  // 麵包屑分頁
  function navContent(text) {
    //清空內容
    $('.index-content-nav').empty();
    //插入內容
    $('.index-content-nav').text(text);
  }




  // index.html 與 product.html 的購物車
  // 建立DOM
  var cartContent = $('.cart-content'); //存放購物車清單
  var cart = JSON.parse(localStorage.getItem('cart')) || []; //購物清單


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



