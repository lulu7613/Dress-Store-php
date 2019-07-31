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
  <title>註冊成功</title>
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

  mysqli_query($link, 'SET NAMES UTF8');

  //SQL指令
  $sql = "SELECT `Account`,`Password`,`Name` FROM `account` WHERE `Account`= '$uAcc'";
  $result = mysqli_query($link, $sql);

  //加入偵錯機制
  if (!$result) {
    printf("Error: %s\n", mysqli_error($link));
    exit();
  }

  //列成陣列
  $data = array();
  while ($row = mysqli_fetch_array($result, MYSQL_BOTH)) {
    $data[] = $row;
  }

  /*Array ( 
    [0] => Array ( 
      [0] => lulu7620 [Account] => lulu7620 
      [1] => 123456 [Password] => 123456 
      [2] => 鐘小玲 [Name] => 鐘小玲 */

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

  <div class="container col-10 col-md-5 mt-5 p-5 border login-border">
    <h1 class="h3 text-center font-weight-bold member-title mb-4">註冊成功</h1>


    <p class="h6">親愛的 <strong class="h5"><?php echo $data[0]["Name"] ?></strong> 先生/小姐 您好：</p>
    <p class="h6">恭喜您加入會員，以下是您申請的帳號資料，請妥善保存，謝謝。</p>

    <div class="mb-4 container">
      <div class="row">
        <div class="col-12 col-xl-2 border rounded-left py-2 pl-2 member-ok-title">
          帳號
        </div>
        <div class="col-12 col-xl-10 border rounded-right py-2">
          <?php echo $uAcc ?>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-12 col-xl-2 border rounded-left py-2 pl-2 member-ok-title">
          密碼
        </div>
        <div class="col-12 col-xl-10 border rounded-right py-2">
          <?php echo $data[0]["Password"] ?>
        </div>
      </div>
    </div>


    <a class="btn btn-block dress-color text-light" href="../index.html" role="button">登入帳號</a>
  </div>

  <?php
  //關閉資料連接
  mysqli_close($link);
  ?>


  <script src="../js/jquery-3.3.1.js"></script>
  <script src="../js/.js"></script>
  <script src="../js/bootstrap.js"></script>

</body>

</html>