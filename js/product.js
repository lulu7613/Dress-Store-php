$(document).ready(function () {

  // 定義目前所在的網址
  var html = location.search;

  // 取出網址中的sid值
  var arr = html.split('=');
  var sid = arr[1];


  //讀取AJAX
  var xhr = $.ajax({
    type: "GET",
    url: "json/json-product-main.php",
    data: "data",
    dataType: "json",
    success: function () {
      //請求成功時處理
      var data = JSON.parse(xhr.responseText);

      //透過sid讀取data的資料
      dataOne = data.filter(function (item) {
        return item.sid === sid;
      })

      // 麵包屑分頁
      $('#product-content-nav2').attr('href', '/Dress/index.html?cid=' + dataOne[0].cid).text(dataOne[0].cname);
      $('#product-content-nav3').text(dataOne[0].name);


      //插入HTML
      $('#product-content-main').before('<div class="col-lg-6 text-center product-img mb-5"><img src="imgshirt/' + dataOne[0].img + 'l.jpg" alt="' + dataOne[0].img + 'l.jpg" class="img-fluid">');

      $('#product-content-main p').before('<div class="d-flex align-items-baseline"><h1 class="h3 font-weight-bolder">' + dataOne[0].name + '</h1><span class="text-muted ml-2">( 編號: ' + dataOne[0].sid + ' )</span>')


      $('#product-content-main p').after('<div class="d-flex justify-content-end align-items-end"><span class="h6 bg-info text-light rounded p-1">顏色 / ' + dataOne[0].color + '</span><div class="h3 ml-auto text-danger"><small class="font-weight-bold">售價 $NT</small><strong>' + dataOne[0].price + '</strong>')


      //插入同款樣式T-shirt
      //篩選同款式(相同name)的資料
      dataOther = data.filter(function (item) {
        return item.name === dataOne[0].name;
      })
      len = dataOther.length;

      //插入HTML
      for (i = 0; i < len; i++) {
        if (dataOne[0].sid !== dataOther[i].sid) { //不顯示 product-main 的商品
          $('#product-content-other').append('<div class="col-12 col-md-6 col-lg-3 mb-3"><div class="card"><img src="imgshirt/' + dataOther[i].img + 'l.jpg" class="card-img-top pt-3 px-3 product-img" alt="' + dataOther[i].img + '"><div class="card-body text-center"><h6 class="card-title mb-1 product-name">' + dataOther[i].name + '</h6><small class="text-info product-color">顏色 / ' + dataOther[i].color + '</small><div class="d-flex align-items-end px-2 mt-lg-3"><span class="h6 mr-auto text-danger product-price">$NT' + dataOther[i].price + '</span><a href="/Dress/product.html?sid=' + dataOther[i].sid + '" class="btn btn-sm main-btn-color">立即搶購</a>');
        }
      }


      // index.html 與 product.html 的購物車 
      // 建立DOM
      var addCart = $('.add-cart'); //btn-加入購物車
      var cartContent = $('.cart-content'); //存放購物車清單
      var cartIcon = $('.cart-icon');
      var cart = JSON.parse(localStorage.getItem('cart')) || []; //購物清單
      updateCart(); //更新購物車數量


      // 點擊 product.html 的 "加入購物車" 
      addCart.click(function (e) {
        e.preventDefault();
        //購買尺寸 與 購買數量
        var buyNum = $('#buy-num').val();
        var buySize = $("input[name=buy-size]:checked").val();

        //判斷有無輸入資料
        if ((buyNum != '') && (buySize != '')) {
          //篩選要得資料
          var object = {
            'name': dataOne[0].name,
            'sid': dataOne[0].sid,
            'cid': dataOne[0].cid,
            'price': dataOne[0].price,
            'color': dataOne[0].color,
            'cname': dataOne[0].cname,
            'img': dataOne[0].img,
            'buyNum': buyNum,
            'buySize': buySize,
          }

          //將值存進物件，新增至dataArr ( 對應dataset以物件取值 )
          cart.push(object);

          //將dataArr存進localstroage
          localStorage.setItem('cart', JSON.stringify(cart));

          updateCart(); //更新購物車

          //通知加入成功
          alert('已將商品放入購物車！')

        } else {
          alert('請輸入尺寸或購買數量');
        }
      });


      //更新購物車
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
        var Delete = e.target.dataset.nm;
        console.log(Delete);

        cart.splice(Delete, 1);

        //將刪除後的 cart 存進 localstorage
        localStorage.setItem('cart', JSON.stringify(cart));

        //更新購物車
        updateCart();

      });


    },

    error: function () {
      //請求出錯處理
      console.log('ajax出錯');
    }

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