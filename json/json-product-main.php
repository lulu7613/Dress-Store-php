<?php

//字元編碼設定
header("content-Type: text/html; charset=utf-8");

//連接MySQL
$link = mysqli_connect('localhost', 'admin', '123456');

//連接資料庫
$select_db = mysqli_select_db($link, 'dress_store');

//UTF8
mysqli_query($link, "SET NAMES UTF8");

//指令
//搜尋 shirt & sclass
$sql = "SELECT * FROM `shirt`, `sclass` WHERE shirt.cid = sclass.cid ORDER BY `shirt`.`sid` DESC";
$result = mysqli_query($link, $sql);


// shirt & sclass
$data = array();
while ($row = mysqli_fetch_assoc($result)) {
  $data[] = $row;
  }

echo json_encode($data, JSON_UNESCAPED_UNICODE);

mysqli_close($link);
?>