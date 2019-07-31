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
  <title>會員註冊</title>
</head>

<body>
  <?php
  //建立資料連接
  $link = mysqli_connect('localhost', 'admin', '123456');

  //開啟資料庫
  $select_db = mysqli_select_db($link, 'dress_store');

  //確認有無連接到資料庫
  if (!$select_db) {
    die("無法開啟資料庫<br>");
  }

  //內容含中文，需加入編碼
  mysqli_query($link, "SET NAMES UTF8");

  //建立SQL指令
  $sql = "SELECT `Account`, `Password` FROM `account`";

  $result = mysqli_query($link, $sql);

  //加入偵錯機制
  if (!$result) {
    printf("Error: %s\n", mysqli_error($link));
    exit();
  }

  //列成陣列
  $data = array();
  while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
  }

  // Array ( 
  //   [0] => Array ( [Account] => lulu7613 [Password] => 123456 ) 
  //   [1] => Array ( [Account] => lulu7618 [Password] => 123456 ) )

  // $data[0]['Account']; lulu7613

  //清空記憶體
  mysqli_free_result($result);

  //關閉資料連接
  mysqli_close($link);

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

  <div class="container col-12 col-md-8 col-xl-4 mt-3 mt-md-5 p-5 border login-border">
    <h1 class="h3 text-center font-weight-bold member-title mb-4">會員註冊</h1>
    <form action="signup.php" method="post">
      <div class="form-group">
        <label for="user-account">輸入帳號</label>
        <input type="text" name="user-account" class="form-control" id="user-account" aria-describedby="emailHelp" placeholder="輸入帳號">
        <small id="passwordHelpBlock" class="form-text text-danger">

          <?php

          if (isset($_POST['submit'])) {
            $uAcc = $_POST['user-account']; //帳號

            //確認輸入的帳號與資料庫有無重複
            $ans = 0;
            for ($i = 0; $i < count($data); $i++) {
              if ($uAcc == $data[$i]['Account']) {
                $ans = 1;
                break;
              }
            }

            if ($ans == 1) {
              echo '您輸入的帳號已有人使用，請重新輸入';
            } else {
              //確認ok，輸入到資料表裡
              $sql = "INSERT INTO `account`(`Account`) VALUES ('$uAcc')";
              $result = mysqli_query($link, $sql);

              //關閉資料連接
              mysqli_close($link);

              //開啟session紀錄註冊帳號
              session_start();
              $_SESSION['user-account'] = $uAcc;

              //連結至輸入 會員資料 頁面
              header("Location:member-add.php");
            }
          }

          ?>

        </small>
      </div>
      <button type="button" name="submit" id="btn-signup" value="<?php echo $uAcc ?>" class="btn btn-block text-light mt-4 dress-color">註 冊</button>
      <a class="btn btn-block member-link" href="login.php" role="button">登入帳號</a>


    </form>
  </div>



  <script src="../js/jquery-3.3.1.js"></script>
  <script src="../js/member.js"></script>
  <script src="../js/bootstrap.js"></script>

</body>

</html>