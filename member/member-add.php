<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="../css/bootstrap.css">
  <link rel="stylesheet" href="../css/bootstrap-reboot.css">
  <link rel="stylesheet" href="../css/member.css">
  <link rel="stylesheet" href="../css/all.css">

  <title>會員資料填寫</title>
</head>

<body>

  <?php
  //開啟session讀取註冊帳號
  session_start();
  $uAcc = $_SESSION['user-account'];


  //建立資料連接
  $link = mysqli_connect('localhost', 'admin', '123456');

  //開啟資料庫
  $select_db = mysqli_select_db($link, 'dress_store');

  //確認有無連接到資料庫
  if (!$select_db) {
    die("無法開啟資料庫<br>");
  }


  //按下"送出"，獲取值，送入mysql資料庫
  if (isset($_POST['submit'])) {

    //定義變數
    $uPass = $_POST['user-password']; //密碼
    $uName = $_POST['user-name']; //姓名
    $uNickName = $_POST['user-nickname']; //暱稱
    $uBirthday = $_POST['user-birthday']; //生日
    $uSex = $_POST['user-sex']; //性別
    $uId = $_POST['user-id']; //身分證字號
    $uEmail = $_POST['user-email']; //電子信箱
    $uTel = $_POST['user-tel']; //行動電話
    $uCountry = $_POST['user-country']; //國籍
    $uCity = $_POST['user-city']; //城市
    $uArea = $_POST['user-area']; //行政區
    $uAddr =  $_POST['user-address']; //地址


    //輸出內容含中文，需加入編碼
    $sql = mysqli_query($link, 'SET NAMES UTF8');

    //建立SQL指令
    $sql = "UPDATE `account` SET `Password`= '$uPass', `Name`= '$uName', `NickName`= '$uNickName', `Birthday`= '$uBirthday', `Sex`= '$uSex', `ID`= '$uId',`Email`='$uEmail', `Tel`='$uTel', `Country`= '$uCountry', `City`= '$uCity', `Area`= '$uArea', `Address`= '$uAddr' WHERE `Account` = '$uAcc'";

    //執行SQL指令 (資料輸入到member)
    $result = mysqli_query($link, $sql);

    //清空記憶體
    mysqli_free_result($result);

    //關閉資料連接
    mysqli_close($link);

    //傳送至註冊成功的畫面
    header("Location:member-ok.php");
  }

  ?>

<header class="container-fluid">
    <nav class="navbar navbar-expand-md navbar-dark">
      <a class="navbar-brand font-weight-bolder logo-name" href="/Dress/index.html">翠絲服飾</a>
      <button class="navbar-toggler bg-info" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown active">
            <a class="font-weight-bold nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              主題館
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <a class="dropdown-item" id="sclass-0" href="/Dress/index.html?cid=0">全部</a>
              <a class="dropdown-item" id="sclass-1" href="/Dress/index.html?cid=1">文字</a>
              <a class="dropdown-item" id="sclass-2" href="/Dress/index.html?cid=2">圖騰</a>
              <a class="dropdown-item" id="sclass-3" href="/Dress/index.html?cid=3">搞怪</a>
              <a class="dropdown-item" id="sclass-4" href="/Dress/index.html?cid=4">人物</a>
            </div>
          </li>
          <li class="nav-item active">
            <a class="nav-link font-weight-bold" href="/Dress/index.html?special=1">人氣精選 <span
                class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item active">
            <a class="nav-link font-weight-bold" href="/Dress/index.html?special=2">清倉特賣 <span
                class="sr-only">(current)</span></a>
          </li>
        </ul>
      </div>
    </nav>
  </header>

  <div class="container col-10 col-md-5 my-4 p-5 border login-border">
    <h1 class="h3 text-center font-weight-bold member-title mb-4">加入會員</h1>

    <form action="member-add.php" method="post">
      <div class="form-group">
        <label for="user-account">會員帳號<span class="text-danger">＊</span></label>
        <input type="text" class="form-control" name="user-account" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="<?php echo $uAcc ?>" readonly>
      </div>

      <div class="form-group">
        <label for="user-password">設定密碼<span class="text-danger">＊</span></label>
        <input type="password" name="user-password" class="form-control" id="user-password" placeholder="至少4碼" required>
      </div>

      <div class="form-group">
        <label for="user-pass-check">確認密碼<span class="text-danger">＊</span></label>
        <input type="password" name="user-pass-check" class="form-control" id="user-pass-check" placeholder="再次輸入密碼" required>
        <small id="passwordHelpBlock" class="form-text pass-check"></small>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="user-name">中文姓名<span class="text-danger">＊</span></label>
          <input type="text" name="user-name" class="form-control" id="user-name" placeholder="輸入姓名" required>
        </div>
        <div class="form-group col-md-6">
          <label for="user-nickname">暱稱</label>
          <input type="text" name="user-nickname" class="form-control" id="user-nickname" placeholder="輸入暱稱">
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="user-birthday">出生日期</label>
          <input type="date" name="user-birthday" class="form-control" id="user-birthday" placeholder="1911/01/01">
        </div>

        <div class="form-group col-md-6">
          <label for="user-sex">性別</label>
          <select name="user-sex" class="form-control" id="user-sex">
            <option value="F">女</option>
            <option value="M">男</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="user-id">身分證字號<span class="text-danger">＊</span></label>
        <input type="id" name="user-id" class="form-control" id="user-id" placeholder="輸入身分證字號" required>
        <small id="passwordHelpBlock" class="form-text id-check"></small>
      </div>

      <div class="form-group">
        <label for="user-email">電子信箱<span class="text-danger">＊</span></label>
        <input type="email" name="user-email" class="form-control" id="user-email" placeholder="未來密碼查詢均透過此電子郵件" required>
      </div>

      <div class="form-group">
        <label for="user-tel">行動電話<span class="text-danger">＊</span></label>
        <input type="tel" name="user-tel" class="form-control" id="user-tel" placeholder="輸入電話號碼" required>
      </div>

      <div class="form-row">
        <div class="form-group col-md-4">
          <label for="user-country">國籍<span class="text-danger">＊</span></label>
          <input type="text" name="user-country" class="form-control" id="user-country" placeholder="台灣" required>
        </div>
        <div class="form-group col-md-4">
          <label for="user-city">城市<span class="text-danger">＊</span></label>
          <input type="text" name="user-city" class="form-control" id="user-city" placeholder="台中市" required>
        </div>
        <div class="form-group col-md-4">
          <label for="user-area">行政區<span class="text-danger">＊</span></label>
          <input type="text" name="user-area" class="form-control" id="user-area" placeholder="西區" required>
        </div>
      </div>

      <div class="form-group">
        <label for="user-address">地址<span class="text-danger">＊</span></label>
        <input type="text" name="user-address" class="form-control" id="user-address" placeholder="輸入地址" required>
      </div>


      <button type="submit" id="btn-member-add" name="submit" class="btn btn-block btn-lg mt-4 text-light dress-color">送 出</button>
      <input type="hidden" name="uAcc" value="<?php echo $uAcc ?>">
    </form>

  </div>

  <script src="../js/jquery-3.3.1.js"></script>
  <script src="../js/member.js"></script>
  <script src="../js/bootstrap.js"></script>

</body>

</html>