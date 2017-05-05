<!DOCTYPE html>
<html lang="en">
<?php
    $root = $_SERVER['DOCUMENT_ROOT'];
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>首頁 &gt; 年高家電管家</title>
    <link rel="stylesheet" href="/css/reset.css">
    <link rel="stylesheet" href="/css/core.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="/js/comm.js"></script>
</head>

<body>
    <div id="index" class="active">
        <header>
            <nav class="nav-main">
                <span class="figure"><img src="/img/icon/nav-figure.png" alt=""></span>
                <ul class="clearfix">
                    <li>
                        <a href=""><img src="/img/icon/nav1.png" alt=""></a>
                    </li>
                    <li>
                        <a href=""><img src="/img/icon/nav2.png" alt=""></a>
                    </li>
                    <li style="margin-left:40%;">
                        <a href=""><img src="/img/icon/nav3.png" alt=""></a>
                    </li>
                    <li>
                        <a href=""><img src="/img/icon/nav4.png" alt=""></a>
                    </li>
                </ul>
            </nav>
            <div class="weather clearfix">
                <div class="img">
                    <img src="/img/icon/weather-cloudy.png" alt="">
                </div>
                <div class="text">
                    <p class="date">2017/02/02</p>
                    <p class="location">桃園市</p>
                    <p class="temperature">16°</p>
                </div>
                <div class="atmosphere">
                    <ul>
                        <li class="air"><span class="icon"><img src="/img/icon/air.png" alt=""></span>
                            <h3>空氣品質</h3>
                            <p>中度汙染</p>
                        </li>
                        <li class="uv"><span class="icon"><img src="/img/icon/uv.png" alt=""></span>
                            <h3>紫外線</h3>
                            <p>低量級</p>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        <main>
            <div class="banner"><img src="/img/banner.jpg" alt=""></div>
            <div class="reservation section">
                <div class="top clearfix">
                    <div class="icon"><img src="/img/icon/reserve.png" alt=""></div>
                    <div class="text">
                        <h2>預約</h2>
                        <p>跟MURMUR熊預約您想要指定的服務時間與服務項目</p>
                    </div>
                </div>
                <ul class="menu clearfix">
                    <li>
                        <div class="icon">
                            <a href="index.html"><img style="left:-1px;top:-1px;" src="/img/icon/install.png" alt=""></a>
                        </div>
                        <div class="text">
                            <h3>安裝</h3>
                            <p>提供各式家電安裝服務</p>
                        </div>
                    </li>
                    <li>
                        <div class="icon">
                            <a href=""><img src="/img/icon/repair.png" alt=""></a>
                        </div>
                        <div class="text">
                            <h3>維修</h3>
                            <p>解決各類家電維修問題</p>
                        </div>
                    </li>
                    <li>
                        <div class="icon">
                            <a href=""><img style="left:-2px;" src="/img/icon/maintain.png" alt=""></a>
                        </div>
                        <div class="text">
                            <h3>保養</h3>
                            <p>室內外空調清洗與保養</p>
                        </div>
                    </li>
                    <li>
                        <div class="icon">
                            <a href=""><img src="/img/icon/others.png" alt=""></a>
                        </div>
                        <div class="text">
                            <h3>其他</h3>
                            <p>與各種家電相關的服務</p>
                        </div>
                    </li>
                </ul>
                <!-- /.menu -->
            </div>
            <!-- /.reservation -->
            <div class="prod-list">
                <ul class="clearfix">
                    <li>
                        <a href=""><img src="/img/prods/p1.png" alt=""></a>
                    </li>
                    <li>
                        <a href=""><img src="/img/prods/p2.png" alt=""></a>
                    </li>
                    <li>
                        <a href=""><img src="/img/prods/p3.png" alt=""></a>
                    </li>
                    <li>
                        <a href=""><img src="/img/prods/p4.png" alt=""></a>
                    </li>
                </ul>
            </div>
            <div class="ads section">
                <ul>
                    <li class="clearfix">
                        <div class="img">
                            <img src="/img/ad.jpg" alt="">
                        </div>
                        <div class="text">
                            <p>輪胎行大火黑煙有毒　醫師建議： 民眾遠離、緊閉門窗</p>
                            <span>蘋果即時新聞 www.appledaily.com.tw</span>
                        </div>
                    </li>
                </ul>
            </div>
        </main>
    </div>
</body>

</html>
