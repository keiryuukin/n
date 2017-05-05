<!DOCTYPE html>
<html lang="en">
<?php
    $city = [""]
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>預約 保養服務 &gt; 年高家電管家</title>
    <link rel="stylesheet" href="/css/reset.css">
    <link rel="stylesheet" href="/css/core.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="/js/comm.js"></script>
</head>

<body>
    <div id="form" class="page-inner">
        <header class="b-center">
            <h2>預約 保養服務</h2>
            <a class="btn-back" href="javascript:window.history.back();"><span></span></a>
            <nav class="nav-form">
                <ul>
                    <li><span class="icon"></span><span class="text">基本資料</span></li>
                    <li><span class="icon"></span><span class="text">服務地址</span></li>
                    <li><span class="icon"></span><span class="text">清洗數量</span></li>
                    <li><span class="icon"></span><span class="text">預約時間</span></li>
                    <li><span class="icon"></span><span class="text">上傳照片</span></li>
                    <li><span class="icon"></span><span class="text">其他服務</span></li>
                </ul>
            </nav>
        </header>
        <main>
            <section class="basic" style="display:none;">
                <form action="">
                    <ul class="form-text">
                        <li>
                            <input type="text" value="請填寫聯絡人姓名">
                        </li>
                        <li>
                            <input type="text" value="請填寫聯絡人電話">
                        </li>
                        <li>
                            <input type="text" value="請填寫聯絡人地址">
                        </li>
                        <li>
                            <input type="text" value="請填寫聯絡人信箱">
                        </li>
                    </ul>
                    
                </form>
            </section>
            <!-- /.reservation -->
            <section class="address">
                <form action="">
                    <ul class="form-box">
                        <li class="clearfix">
                            <input type="checkbox" id="" />
                            <label for="">
                                <p>同基本資料地址</p>
                            </label>
                        </li>
                        <li class="clearfix">
                            <input type="checkbox" id="" />
                            <label for="">
                                <p>常用服務地址<span class="small">(請先登入)</span></p>
                            </label>
                        </li>
                    </ul>
                    <ul class="form-select">
                        <li>
                            <select name="" id="">
                            <option value="autodetection">AAA</option>
                            <option value="staticIPv6">BBB</option>
                            </select>
                        </li>
                    </ul>
                </form>
            </section>
        </main>
    </div>
</body>

</html>
