var json;
$.fn.extend({
    beforeAll: function() {
        var $this = $(this);
        var $parent = $this.parent();
        var $all = $parent.find(">*");
        var $after = $this.find("~*");
        var $target = $all.not($after).not($this);
        return $target;
    },
    sortElement: function() {
        var $parent = $(this).parent();
        var len = $(this).length - 1;
        for (i = len; i > -1; i--) {
            var $target = $("[data-id=\"" + i + "\"]", $parent);
            $target.prependTo($parent);
        }
    },
    selectionSort: function() {
        var that = $(this);
        var $parent = that.parent();
        var len = that.length;
        var $max;
        that.addClass("selectionSorting");

        function sort() {
            var max = 0;
            for (i = 0; i < len; i++) {
                var $this = $parent.find(".selectionSorting").eq(i);
                var val = $parent.find(".selectionSorting").eq(i).data("id");
                if (val > max) {
                    max = val;
                    $max = $parent.find(".selectionSorting").filter("[data-id=\"" + max + "\"]");
                }
            }
            len--;
            $max.insertAfter($(".selectionSorting").eq(len));
            if (len > 1) {
                sort()
            } else {
                $(".selectionSorting").removeClass("selectionSorting")
            }
        }
        sort();
    },
    bubbleSort: function() {
        var $target = $(this);
        var $parent = $target.parent();
        $target.addClass("bubbleSorting");

        var len = $target.length;
        var start = -1;
        var ok = false;

        function sort() {
            len--;
            ok = true;
            for (i = 0; i < len; i++) {
                var $a = $parent.find(".bubbleSorting").eq(i);
                var $b = $parent.find(".bubbleSorting").eq(i + 1)
                var a = $a.data("id");
                var b = $b.data("id");
                if (a > b) {
                    ok = false;
                    $a.insertAfter($b);
                }
            }
            $target = $(".total2 .item-list");
            if (len > 0 && !ok) {
                sort()
            } else {
                $target.removeClass("bubbleSorting")
            }
        }
        sort();
    }
})

function createSwiper(swiperId, $swiper, mode) {
    if ($swiper.length > 0) {
        if (!window[swiperId]) {

            switch (mode) {
                case "free":
                    window[swiperId] = new Swiper($swiper, {
                        paginationClickable: true,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        spaceBetween: 1,
                        freeMode: true,
                        freeModeMomentumRatio: 0.5,
                        freeModeMomentumVelocityRatio: 0.5,
                        slidesPerView: 4.5,
                    });
                    break;
                default:
                    window[swiperId] = new Swiper($swiper, {
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev'
                    });
            }

        }
    }
}
$(function() {
    function System(data) {
        this.sys = data;
        this.sysLen = data.length;
        this.itemsLen = "0";

    }

    function SystemItem(name, price, itemClass, systemName, tabName, shortName, systemClass) {
        this.name = name;
        this.price = price;
        this.itemClass = itemClass;
        this.systemName = systemName;
        this.tabName = tabName;
        this.shortName = shortName;
        this.systemClass = systemClass;
    };

    System.prototype.render = function() {
        for (var i = 0; i < this.sysLen; i++) {
            var item = this.sys[i].item;
            var itemLen = item.length;
            for (var g = 0; g < itemLen; g++) {
                this.itemsLen++;
            }
        }
    }
    System.prototype.createSystemItems = function(data) {
        var that = this;
        this.sysLen = this.sys.length;
        var id = -1;
        for (var i = 0; i < this.sysLen; i++) {
            var systemName = this.sys[i].name;
            var tabName = this.sys[i].tabName;
            var shortName = this.sys[i].shortName;
            var systemClass = this.sys[i].class;
            var item = this.sys[i].item;
            var itemLen = item.length; //1, 3, 3, 2, 2, 2
            for (var g = 0; g < itemLen; g++) {
                id++;
                this.itemsLen++;
                var itemObjName = "sysItem" + id;
                var name = item[g].name;
                var price = item[g].price;
                var itemClass = item[g].class;

                this[itemObjName] = new SystemItem(name, price, itemClass, systemName, tabName, shortName, systemClass);
                //sysItem*
            }
        }
    };
    System.prototype.buildHtmlSystem = function() {
        var $tabs = $(".home .tabs");
        var $prods = $(".home .prods");
        var $newProd = $("<li>");
        var newProdHTML = "";
        var $swiperWrap = $(".systems .swiper-wrapper");
        var $totalUl = $(".count .total>ul");
        var $swiperSlide;
        var id = -1;

        //buildSystems
        for (var i = 0; i < this.sysLen; i++) {
            var systemName = this.sys[i].name;
            var tabName = this.sys[i].tabName;
            var systemClass = this.sys[i].class;
            var shortName = this.sys[i].shortName;
            var item = this.sys[i].item;
            var noteCost = this.sys[i].noteCost
            var noteTime = this.sys[i].noteTime
            var _banner = "img/systems/banner-" + this.sys[i].class + ".jpg";
            var _icon = "img/systems/icon-" + this.sys[i].class + ".png";
            var itemLen = this.sys[i].item.length;
            var $bannerArea = $("<div>").addClass("banner");
            var $selectionArea = $("<div>").addClass("selection");

            $swiperSlide = $("<div>").addClass("swiper-slide system");

            $bannerArea.append(
                $("<div>").addClass("bg").append(
                    $("<img>").attr("src", _banner)
                ).append(
                    $("<div>").addClass("intro").append(
                        $("<img>").attr("src", _icon)
                    ).append(
                        $("<h4>").append(
                            this.sys[i].name
                        )
                    )
                )
            );
            $selectionArea.append(
                $("<div>").addClass("tabs").append(
                    $("<ul>").addClass("tab-btn").attr("data-tab-target", "system")
                )
            )

            //build tabs
            $tabs.append(
                $("<li>").append(
                    $("<span>").append(tabName)
                )
            );

            // build home, build system / items in prods
            var $prodsTemplate = $("li", $prods);
            $newProd.html($prodsTemplate.html())

            $newProd.find(".prod-banner").attr("src", _banner);
            $newProd.find(".prod-icon").attr("src", _icon);
            $newProd.find(".prod-name").html(systemName);
            var $noteCost = $newProd.find(".note-cost")
            var $noteTime = $newProd.find(".note-time")
            if (noteCost) {
                noteCost.forEach(v => {
                    $noteCost.append($("<span>").append(v));
                })
            } else {
                $noteCost.remove();
            }
            if (noteTime) {
                noteTime.forEach(v => {
                    $noteTime.append($("<span>").append(v));
                })
            } else {
                $noteTime.remove();
            }

            //build items
            for (var g = 0; g < itemLen; g++) {
                var itemObjName = "sysItem" + id;
                var name = item[g].name;
                var price = item[g].price;
                var itemClass = item[g].class;
                var time = item[g].time;
                id++;

                //build items in home

                $newProd.find(".prod-cost>dl").append(
                    $("<dt>").html(name)
                ).append(
                    $("<dd>").html(price)
                )
                $newProd.find(".prod-time>dl").append(
                    $("<dt>").html(name)
                ).append(
                    $("<dd>").html(time)
                )

                //build count.form tab selection area
                $selectionArea.find("ul").append(
                    $("<li>").append(name).attr("data-name", systemClass + "-" + itemClass)
                )

                //build all items list
                $totalUl.append(
                    $("<li>").addClass("item-list clearfix").attr({
                        "data-name": systemClass + "-" + itemClass,
                        "data-id": id
                    }).append(
                        $("<h4>").addClass("title").append(
                            $("<span>").append(shortName)
                        ).append(
                            $("<span>").append(name + "：")
                        )
                    ).append(
                        $("<div>").addClass("quantity").append(
                            $("<button>").addClass("btn-add changeNum").append("+")
                        ).append(
                            $("<input>").attr({
                                "type": "input",
                                "value": "0",
                                "data-price": price,
                                "data-name": "count-" + systemClass + "-" + itemClass
                            })
                        ).append(
                            $("<button>").addClass("btn-minus changeNum").append("-")
                        ).append(
                            $("<span>").addClass("quantifier").append("台")
                        )
                    ).append(
                        $("<p>").addClass("price").append(
                            $("<span>").addClass("title").append("金額：")
                        ).append(
                            $("<span>").addClass("digit").html("0")
                        )
                    )
                )
            }
            //build items end
            $swiperWrap.append(
                    $swiperSlide.append(
                        $bannerArea
                    ).append(
                        $selectionArea
                    ).attr("data-name", this.sys[i].class)
                )
                // console.log($newProd.prop("outerHTML"))
                // $prods.append($newProd.prop("outerHTML"))
            newProdHTML += $newProd.prop("outerHTML")

        }
        //buildSystemEnd (for loop end)

        $prods.html(newProdHTML)
        $tabs.find(">li").eq(0).addClass("active");
        $("li", $prods).eq(0).addClass("active");
        $swiperSlide = $(".swiper-slide");

        //build bonus and total price
        $totalUl.append(
            $("<li>").addClass("bonus clearfix").append(
                $("<span>").addClass("title").append("紅利點數：")
            ).append(
                $("<span>").addClass("digit").append(
                    $("<input>").addClass("bonus")
                )
            )
        ).append(
            $("<li>").addClass("total-price clearfix").append(
                $("<span>").addClass("title").append("金額總計：")
            ).append(
                $("<span>").addClass("digit").append("$0")
            )
        )
    }

    //buildHtmlSystem end




    System.prototype.buildHtmlItemList = function() {
        $totalUl = $(".total>ul");
        for (var i = 0; i < this.itemsLen; i++) {
            var item = this["sysItem" + i];
            var name = item.name;
            var price = item.price;
            var itemClass = item.itemClass;
            var sysClass = item.systemClass;
            var shortName = item.shortName ? item.shortName : "";

        }

    };
    System.prototype.init = function() {
        system.createSystemItems(system.data); //all items object created.
        system.buildHtmlSystem();
        system.buildHtmlItemList();
        var $swiper = $(".home .swiper-container");
        var swiper = "swiper" + $swiper.data("id");
        createSwiper(swiper, $swiper);
    };

    function week(v) {
        switch (v) {
            case 0:
                v = "日";
                break;
            case 1:
                v = "一";
                break;
            case 2:
                v = "二";
                break;
            case 3:
                v = "三";
                break;
            case 4:
                v = "四";
                break;
            case 5:
                v = "五";
                break;
            case 6:
                v = "六";
        }
        return v;
    }

    function RepairDate(data) {
        this.date = data;
        this.len = this.date.length;
    }
    RepairDate.prototype.buildHtml = function() {

        var $dateTemplate = $(".date .swiper-slide", ".appointment");
        var $timeTemplate = $(".time>div", ".appointment");
        var $wrap = $dateTemplate.parent();
        var $newDate;
        var $newTime;
        var newDateHTML = "";
        var newTimeHTML = "";
        $.each(this.date, function(k, v) {
            $newDate = $("<div>");
            $newDate.html($dateTemplate.html());
            $newDate.addClass("swiper-slide date-list");
            $newDate.find(".day").html(v.m + "/" + v.d);
            $newDate.find(".week").html("星期" + v.w)
            if (v.w === "六" || v.w === "日") {
                $newDate.addClass("unavailable")
            }
            newDateHTML += $newDate.prop("outerHTML");

            $newTime = $("<div>");
            $newTime.html($timeTemplate.html());
            $newTime.addClass("time-list date" + k);
            $.each(v.t, function(k, v) {
                $newTime.find("ul").append($("<li>").html(v));
                // console.log(v)
            })
            newTimeHTML += $newTime.prop("outerHTML");
        });
        $wrap.html(newDateHTML);
        $timeTemplate.parent().html(newTimeHTML)
    }

    $.getJSON("inc/data.json", function(data) {
        json = data;
        console.time("init System");
        // var test = new System({ "system": "" });

        system = new System(data["system"]);
        system.init();

        repairDate = new RepairDate(data["date"]);
        repairDate.buildHtml();
        console.timeEnd("init System");
        screenRenderComplete();

    });
});

/*-------------------------------------------------screenRenderComplete-------------------------------------------------*/
/*-------------------------------------------------screenRenderComplete-------------------------------------------------*/


function screenRenderComplete() {
    var curScrlTop = $(window).scrollTop();
    var page = $(">div", "body").attr("id");
    var curSectNum = 0;
    var $section = $("main>section");
    var $inputForm = $section.find(">div").eq(0);

    switch (page) {
        case "login":
            var $inputWrap = $(".input-wrap");
            var currentVal;
            $("input", ".form").on("focus blur", function(e) {
                var type = e.type;
                var that = $(this);
                var $thisWrap = that.parents(".input-wrap");
                switch (type) {
                    case "focus":
                        $inputWrap.removeClass("focus");
                        $thisWrap.addClass("focus");
                        currentVal = that.val();
                        that.val("");
                        break;
                    case "blur":
                        $inputWrap.removeClass("focus");
                        if (that.val() == "") {
                            that.val(currentVal);
                        }
                }
            });
            break;
        case "index":
            var $reserveMenu = $(".reservation .menu li");
            $reserveMenu.on("click", function() {
                var thisHref = $(this).find("a").attr("href");
                window.location = thisHref;
            });
            break;
        case "maintain":



            break;
        case "repair":


            break;
    };
    $(".overlay").click(function(e) {
        $(this).fadeOut()
    });
    $(".overlay .frame").click(function(e) {
        e.stopPropagation();
    });
    $(".overlay a").click(function() {
        $(".overlay").fadeOut();
    })
    $("[data-optn]").click(function() {
        var $parent = $(this).parent();
        var t = $(this).data("optn");
        $t = $("[data-optn=" + t + "]")
        if ($parent.hasClass("tab-btn")) {
            $t.not($(this)).toggleClass("active");
        } else {
            $t.toggleClass("active");
        }
        if($parent.hasClass("always-on")){
            $t.addClass("active").siblings().removeClass("active");
        }
    });
    var sectionLength = $section.length;
    var $nav = $(".nav-maintain");
    var $navLi = $(".nav-maintain li");
    var windowHeight = $(window).height();
    $navLi.click(function(e) {
        $this = $(this);
        // navClick(e, $this);
        stepHandler(e, $this, "nav")

        // $(window).resize();
    });
    $(".go-next").click(function(e) {
        e.preventDefault();
        var $this = $(this);
        stepHandler(e, $this, "next");
        $(window).resize();
    })
    $(".btn-back").click(function(e) {
        var $this = $(this);
        stepHandler(e, $this, "prev");
    });
    //init home

    var homeTtlHt = $(".home h3").height();
    var homeTabHt = $(".home .tabs").height() + parseInt($(".home .tabs").css("paddingTop"));
    var homeProdPosArr = [];
    var createHomeProdPosArr = function() {
        homeProdPosArr = [];
        var bannerHeight = $(".banner", ".prods").height() + parseInt($(".banner", ".prods").css("marginBottom"));
        $(".prods li").each(function(i) {
            var offsetTop = $(this).offset().top

            homeProdPosArr.push(parseInt(offsetTop - (60 + homeTabHt) - 1) - bannerHeight)
        }).eq(0).addClass("active");
        setTimeout(function() {
            createHomeProdPosArr = function() {}
        }, 2000)
    }



    //start scroll
    function windowScroll() {

        curScrlTop = $(window).scrollTop();

        if (curScrlTop > homeTtlHt) {
            // homeProdPosArr = [];
            $(".home .tabs").css({
                "position": "fixed"
            });
            $(".prods").css({ "marginTop": homeTabHt });
            createHomeProdPosArr();
            detectActiveProd();
        } else if (curScrlTop < homeTtlHt) {
            $(".home .tabs").css("position", "static");
            $(".prods").css({ "marginTop": 0 });
        }

    }
    $(window).bind("scroll", windowScroll)
    console.log(homeTtlHt)


    function detectActiveProd() {
        // console.log(curScrlTop)
        // console.log(homeProdPosArr)
        switch (true) {
            case curScrlTop > homeProdPosArr[1] && curScrlTop <= homeProdPosArr[2]:
                $(".home .tabs li").eq(1).addClass("active").siblings().removeClass("active")
                break;
            case curScrlTop > homeProdPosArr[2] && curScrlTop <= homeProdPosArr[3]:
                $(".home .tabs li").eq(2).addClass("active").siblings().removeClass("active")
                break;
            case curScrlTop > homeProdPosArr[3] && curScrlTop <= homeProdPosArr[4]:
                $(".home .tabs li").eq(3).addClass("active").siblings().removeClass("active")
                break;
            case curScrlTop > homeProdPosArr[4] && curScrlTop <= homeProdPosArr[5]:
                $(".home .tabs li").eq(4).addClass("active").siblings().removeClass("active")
                break;
            case curScrlTop > homeProdPosArr[5]:
                $(".home .tabs li").eq(5).addClass("active").siblings().removeClass("active")
                break;
            default:
                $(".home .tabs li").eq(0).addClass("active").siblings().removeClass("active")
        }
    }
    $(".home .tabs li").on("click", function() {
        if (!$("body", "html").is(":animated")) {
            $(window).unbind("scroll");
            var $this = $(this);
            var i = $this.index();
            var $target = $(".prods>li").eq(i);
            var offset = Math.floor($(".prods>li").eq(i).offset().top - (60 + homeTabHt));
            var pos = $target.offset().top;

            $(".home .tabs").css({
                "position": "fixed"
            });
            $target.addClass("active").siblings().removeClass("active");
            $(this).addClass("active").siblings().removeClass("active");
            $("body", "html").animate({ "scrollTop": offset }, function() {
                $(window).scroll(windowScroll)
            })
        }
    })







    $(".btn-back").click(function(e) {
        var $this = $(this);
        stepHandler(e, $this, "prev");
    });

    function navClick(e, $this) {
        var thisId = $this.attr("id");
        var $target = $("main>section." + thisId);


        $inputForm.addClass("active");
        $navLi.removeClass("active");
        $this.addClass("active");
        $section.removeClass('active');
        $target.addClass('active');
        var targetScrollTop = $target.offset().top;
        var $activeSect = $section.filter(".form.active");
        $activeSect.find(">div").eq(0).addClass("active");
        $activeSect.find(".confirm").removeClass("active");
        $("body", "html").animate({ "scrollTop": targetScrollTop - 60 })
    }

    function checkRequired() {
        var $activeSect = $section.filter(".form.active");
        var $parent = $activeSect.parents(".form");
        var $required = $(".confirm", $activeSect).find(".required")
        var reqLen = $required.length;
        if (reqLen < 1) {
            $activeSect.addClass("ok");
            return reqLen < 1;
        } else {
            $activeSect.removeClass("ok");
        }



    }

    //target = $section.eq(?)
    function goSection($target) {
        var targetName = $target.data("name");
        $section.removeClass("active");
        $target.addClass("active").removeClass("ok complete");
        console.log("goSection $target" + $target)
        var $confirm = $(".confirm", $target);
        $confirm.removeClass("active");
        if ($section.filter(".active").hasClass("count")) {
            var $swiper = $(".count .swiper-container");
            var swiperId = "swiper" + $swiper.data("id");
            createSwiper(swiperId, $swiper);
        }
        if ($section.filter(".active").hasClass("appointment")) {
            var $swiper = $(".date.swiper-container");
            var swiperId = "swiper" + $swiper.data("id");
            createSwiper(swiperId, $swiper, "free");
        }
        if ($target.hasClass("form")) {
            var firstFormIndex = $section.filter(".form").index();
            var formIndex = $target.index() - firstFormIndex;
            $nav.show();
            $navLi.removeClass("active");
            $navLi.eq(formIndex).addClass("active");

        } else {
            $nav.hide();
        }
    };

    function goScrollTop($target) {
        var pos = $target.offset().top;
        $(window).scrollTop(pos - 104);
    }

    function stepHandler(e, $this, target) {
        var $firstForm = $section.filter(".form");
        var $curSect = $section.filter(".active");
        var firstFormIndex = $firstForm.index();
        var curSectNum = $curSect.index();
        var $target;
        var $activeSect = $section.filter(".form.active");
        var $confirm = $(".confirm", $activeSect);
        var $block = $(".block", $activeSect);
        var $input = $activeSect.find("input");
        reset();

        function reset() {
            $(".oops").removeClass("oops");
            $(".warning").remove();
        }

        function oops() {
            $activeSect.addClass("oops");
            $block.find(".warning").remove();
            $block.append($("<p>").addClass("warning").html("*尚未完成資料填寫"));
            $navLi.filter(".active").addClass("oops");
            $confirm.removeClass("active");
            $block.addClass("active");
        }

        if (target === "next") {
            e.preventDefault();
            $target = $section.eq(curSectNum + 1);
            if (checkRequired()) {
                if ($confirm.is("div")) {
                    if ($confirm.hasClass("active")) {
                        goSection($target);
                    }
                    $block.removeClass('active');
                    $confirm.addClass("active");

                } else {
                    $activeSect.addClass("complete")
                    $target = $section.eq(curSectNum + 1);
                    // $confirm.removeClass("active");
                    $confirm.addClass("ok");
                    goSection($target);
                }
            } else {
                oops();
            }
        }
        if (target === "prev") {
            if ($activeSect.index() > 0) {
                e.preventDefault()
                goSection($(".home"));
                if (page == "maintain") {
                    goScrollTop($(".home .prods .active"));
                }
            }

            //exception
            /*if ($confirm.hasClass("active")) {
                $activeSect.removeClass("ok");
                $confirm.removeClass("active")
            } else {
                $target = $section.eq(curSectNum - 1);
                goSection($target);
            }*/
        }
        if (target === "nav") {
            var curFormIndex = $navLi.filter(".active").index();;
            var targetFormIndex = $this.index();
            var targetName = $this.attr("id");
            $target = $section.filter("[data-name=\"" + targetName + "\"]");
            if (checkRequired() || targetFormIndex - curFormIndex < 1) {
                console.log($target)
                goSection($target)
            } else {
                console.log("$navLi clicked")
                oops();
                goSection($target);

            }
            $target.beforeAll().addClass("complete");
        }
        if (curSectNum < sectionLength) {

        }
        if (curSectNum > 0) {
            $nav.addClass("active");
        } else {
            $nav.removeClass("active");
        }
    }
    //initial form

    $("h3", ".form-select").click(function() {
        var $this = $(this);
        var $thisParent = $this.parent();
        var $othParent = $thisParent.siblings();
        $(".opt", $othParent).removeClass("active");
        $("h3", $othParent).removeClass("active");
        $this.toggleClass("active");
        $(".opt", $thisParent).toggleClass("active");
    });

    $(".opt li").click(function() {
        var $this = $(this);
        var $thisParent = $this.parents(".form-select>li");
        var $thisSect = $this.parents("section");
        var $title = $thisParent.find("h3");
        var id = $thisParent.attr("id");
        $title.html($this.html());
        $("h3", $thisParent).removeClass("active");
        $(".opt", $thisParent).removeClass("active");
        $(".confirm ." + id, $thisSect).html($("h3", "#" + id).html()).removeClass("required")
    })

    function writeForm($this) {
        var $target = $("." + $this.data("target")); //data target
        var $parent = $this.parents(".form");
        var $block = $this.parents(".block");
        var id = $this.attr("id");
        var type = $this.attr("type");
        var value = $this.val();
        var required = $this.attr("required");
        console.log(value)
        var defVal = $this.data("default"); //default value
        var isLabel = $this.prop("tagName").toLowerCase() === "label";
        $(".oops").removeClass("oops");
        $(".warning").remove();
        $this.toggleClass("active");
        if (value) {
            $target.html(value).removeClass("required");
        } else {
            if (required)
                $target.html(defVal).addClass("required");
            else
                $target.html("")
        }
        if (isLabel) {
            $(".form-select>li", $parent).toggleClass("disabled");
            $this.siblings("input").click();
            if ($this.hasClass("active")) { //if checked

                if (id == "form-same-address") { // checkbox = same as form-address
                    var $alter = $("#form-service-address");
                    var src = $this.data("src");
                    $target.removeClass(
                        id + " required" //"form-same-address"
                    ).addClass(
                        src //"form-address"
                    ).html(
                        $("." + src).html()
                    ).siblings().removeClass("required").css("display", "none");
                    $alter.attr("disabled", true);
                }
            } else { //if not checked
                var $alter = $("#form-service-address");
                var targetValue = $alter.val() ? $alter.val() : $alter.data("default")
                $target.removeClass(
                    "form-address"
                ).addClass(
                    "form-same-address"
                )
                if ($alter.val()) {
                    console.log("Asd")


                } else {
                    $target.addClass("required");
                }
                $target.html(targetValue).siblings().css("display", "inline");
                $alter.attr("disabled", false);
            }
        }
    };
    $("*[data-type*='input']").on("click change keyup keydown", function(e) {
        if (e.type == "keydown") {

        }
        var $this = $(this);
        writeForm($this);
    })

    //initial form
    $("*[data-type*='input']").each(function() {
        var targetName = $(this).data("target");
        var defVal = $(this).data("default");
        var $target = $("." + targetName);
        $target.not(".optional").html(defVal).addClass("required");
    })



    //give each swiper a id (swiperId);
    $('.swiper-container').each(function(i) {
        $(this).attr("data-id", i)
        window.systemSwiper = "";
        window["systemSwiper" + i] = "";
    })
    if( page == "index"){
        createSwiper(systemSwiper0, $(".swiper-container"))
    }








    //click on the tab; click tab-btn
    var ovCount = 0;
    $(".tab-btn li").click(function() {
        var $this = $(this);
        var name = $this.data("name") ? $this.data("name") : "";
        var target = $(this).parent().data("tab-target");
        var $target = $(".tab-" + target).find("[data-name=" + name + "]");
        if (name.indexOf("icecooler") > 0 && ovCount < 1) {
            ovCount++;
            $(".overlay.notice").fadeIn();
        }
        tabHandler($this, $target);
    })

    function tabHandler($this, $target) {
        var isActive = $this.hasClass("active");
        var $ul = $target.parent();
        console.log($target.attr("class"))
        var animating = $target.is(":animated");
        if (!animating) {
            $this.toggleClass("active");
            if (!isActive) {
                $target.siblings().removeClass("active");
                $target.slideDown(200).addClass("active")
            } else {
                $target.slideUp(200, function() {
                    $target.removeClass("active").find(".quantity input").val("0").change();
                })
            }
        }
        var isSystem = $this.parents(".systems").hasClass("systems");
        if (isSystem) {
            if (!isActive) {
                $target.prependTo($ul).find(".quantity input").val("1").change();
            } else {
                $target.find(".quantity input").val("0").change();
            }
        }
    }

    $(".changeNum").click(function() {
        var $this = $(this);
        console.log("btn-add / btn-minus clicked");
        var $parent = $this.parents(".item-list");
        var $target = $("input", $parent);
        var name = $target.data("name");
        // console.log(name)
        var val = $target.val();
        if ($this.hasClass("btn-add")) {
            val++;
            if (val > 5) {
                $(".numerous").click();
                $(".overlay.numerous").show();
            }
        } else {
            val--
            if (val < 1) {
                console.log("AS")
                $(".tab-btn").find("[data-name=" + name + "]").click();
            }
        }
        $target.val(val).change();
    });

    $(".total").on("click", "li", function() {
        var $this = $(this);
        $this.addClass("active").siblings().removeClass("active");
    })
    $("input", ".total").on("keydown keyup click focusout", function(e) {

        var $this = $(this);
        var $parent = $this.parents(".item-list");
        var $total = $(".total");
        var sysClass = $parent.data("system");
        var itemClass = $this.data("name");
        $this.change();

        if (e.type == "click") {
            $this.select();
        }
        if (e.type == "focusout") {
            if (!$this.val() || $this.val() == 0 && !$total.hasClass("adv")) {
                $this.val("0");
                $(".system[data-name*=" + sysClass + "]").find("[data-name*=" + itemClass + "]").click();

            }
        }
        if (e.type == "keyup" || e.type == "keydown") {
            if ($this.val().length > 1 && $this.val().substr(0, 1) == 0) {
                $this.val(parseInt($this.val()))
            }
            if ($this.val().substr(0) == 0) {

            }
        }

    })
    $("input", ".total").change(function() {
        var $this = $(this);
        var $parent = $this.parents(".item-list");
        var $price = $(".price .digit", $parent);
        var name = $this.data("name");
        var $count = $(".total-room ." + name);
        var $totalPrice = $(".total-price .digit");
        var itemClass = $this.data("name");
        var sysClass = $parent.data("system");
        var price = $this.data("price");
        var count = $this.val();
        var bonus = $("input.bonus", $this.parents(".total")).val();
        //calculate price
        var p = 0;
        if ($.isNumeric(price)) {
            $price.html(price * count);
        } else {
            $price.html(price);
        }
        $count.html(count)
        $(".item-list", ".total").each(function() {
            p += parseInt($(this).find(".price .digit").html())
        })
        p -= bonus;
        $totalPrice.html(p)
        if ($this.val() == 0 && $parent.is(":visible")) {
            console.log("asd")
                // $(".system[data-name*=" + sysClass + "]").find("[data-name*=" + itemClass + "]").click();
        }
        updateItemsConfirm();
        return $this.val();
    })

    function updateItemsConfirm() {
        var $li = $(".total li");
        var $activeItem = $li.filter(".item-list:visible")
        var $confirm = $(".form.count .confirm");
        var $info = $("<div>");
        ($activeItem.length > 0) ? $li.filter(".bonus").show(): $li.filter(".bonus").hide();
        $activeItem.each(function() {
            var $this = $(this);
            var title = $("h4", $this).text();
            var count = $(".quantity input", $this).val();
            var price = $(".price .digit", $this).html();
            if (count > 0)
                $info.append($("<p>").append(title + "" + count + "台" + " " + price))

            // html+=
        });
        $(".info", $confirm).html($info);
    }
    $(".form.count .numerous").click(function(e) {
        e.preventDefault();
        $(this).hide();
        $(".systems").hide();
        // sort();
        console.time("sort");
        $(".item-list").selectionSort();
        console.timeEnd("sort")
        $(".item-list.active input").click();
        $(".total").addClass("adv")
        console.log()

        if ($(".item-list").hasClass("active")) {
            var activeItemTop = $(".item-list.active input").offset().top;
            console.log(activeItemTop)
            if (curScrlTop + windowHeight < activeItemTop) {

                $(window).scrollTop($(".item-list.active input").offset().top)
            }
        }
    });

    $(".issue-statement").click(function() {
        $(".figure", this).fadeOut();
    });
    //appointment
    {
        let $section = $(".appointment");
        let $dateList = $(".date-list", $section);
        let $timeList = $(".time-list", $section);
        let $activeDateList = $dateList.filter(".active");
        let $activeTimeList = $timeList.filter(".active")
        let $cDate = $(".confirm .date", $section);
        let $cTime = $(".confirm .time", $section);
        let $timeUl = $(".time ul", $section);
        let $timeLi = $timeList.find("li");
        let $confirm = $(".confirm", $section);
        $confirm.addClass("JJ")

        function updateDateConfirm(t, v) {
            t.html(v);
        }
        $dateList.not(".unavailable").click(function() {
            var i = $(this).index();
            $(this).toggleClass("active").siblings().removeClass("active");
            $timeList.eq(i).addClass("active").slideToggle(200).siblings().hide();
            updateDateConfirm($cDate, $(this).text())
        });
        $timeLi.click(function() {
            $timeLi.removeClass("active");
            $(this).addClass("active");
            updateDateConfirm($cTime, $(this).text())

        })

        function timeClickHandler() {
            $(this).toggleClass("selected");
            updateDateConfirm($cTime, $(this).text())
        }
    }
    //install home
    $(".home .menu-services li").click(function() {
        goSection($section.eq(1));
    })



}
