$.fn.extend({
    slider: function(obj) {
        var that = $(this);
        var $frame = $(".frame", that);
        var $ul = $(".slides", that);
        var $li = $(".slides>li", that);
        var liWidth = $li.width();
        var liLength = $li.length;
        var $next = $(".slide-next", that);
        var $prev = $(".slide-prev", that);
        var liHeight = $li.height();
        var $active,
            activeIndex,
            targetIndex;
        var $sliderNav = $(".slider-nav", that);
        var aniSpeed = 300;
        $(window).resize(function() {
            $frame = $(".frame", that);
            $ul = $(".slides", that);
            $li = $(".slides>li", that);
            liWidth = $li.width();
            liHeight = $li.height();
            console.log(liHeight)
            liLength = $li.length - 3;
            slider.reposition();
            //slider.buildNav();

        })


        function Slider(obj) {
            this.type = obj.type;
            this.pager = obj.pager;

        }
        var slider = new Slider(obj);

        Slider.prototype.duplicate = function() {
            if (liLength > 1) {
                var firstLi = $li.eq(0);
                var secondLi = $li.eq(1);
                var lastLi = $li.filter(":last-child");

                function createHtml(selector) {
                    var target = selector;
                    var liCode = "<li ";
                    var targetHtml = target.html();
                    var attrObj = target[0].attributes; //[0] means change jQuery element to html element
                    $.each(attrObj, function(i) {
                        var attr = attrObj[i];
                        var attrValue = target.attr(attr.name);
                        if (attr.name != "id") {
                            liCode += attr.name + "=\"" + attrValue + "\" ";
                        }
                    })
                    liCode += "data-copy=\"true\">" + targetHtml + "</li>"
                    d = true;
                    return liCode;
                }
                $ul.append(createHtml(firstLi));
                $ul.append(createHtml(secondLi));
                $ul.prepend(createHtml(lastLi))

                $li = $(".slides>li", that);
            }
        };
        Slider.prototype.reposition = function() {
            $active = $li.filter(".active");



            $frame.height(liHeight)
            var pos = -liWidth * 2;
            $li.each(function() {
                pos += liWidth;
                $(this).css("left", pos);
            })
            $ul.css({
                "left": -(parseInt($active.css("left"))),
                "position": "absolute"
            });
        };

        Slider.prototype.buildNav = function() {
            $active = $li.filter(".active");
            activeIndex = $active.data("index");

            var $nav = $("<div>");
            $nav.append(
                $("<a>").addClass("slide-prev").attr("href", "#").html("&lt;")
            ).append(
                $("<a>").addClass("slide-next").attr("href", "#").html("&gt;")
            )
            if (this.pager !== false) {
                var listHtml = "";
                for (var i = 0; i < liLength; i++) {
                    listHtml += "<a></a>"
                }
                $nav.append(
                    $("<div>").addClass("pager").append(listHtml)
                );
            }

            $sliderNav.html($nav.html());
            $sliderNav.find(".pager>a").eq(activeIndex).addClass("active");

        }
        Slider.prototype.change = function(obj) {

            var dragging;
            if (obj.e.type === "mouseup" || obj.e.type === "touchend") {
                dragging = true;
            }

            function sliding(obj) {
                var animating = $ul.is(":animated");
                console.log(animating+"DD")
                if (!animating) {}


                $active = $li.filter(".active");
                activeIndex = $active.data("index");

                var index = $active.index();
                var $prevSlide = $li.eq(index - 1);
                var $targetSlide;
                var movingPos;

                $(".active", that).removeClass("active");
                if (obj.direction == "next") {
                    targetIndex = activeIndex + 1;
                    $targetSlide = $li.eq(targetIndex + 1);
                    if (targetIndex == liLength) {
                        targetIndex = 0;
                    }
                    if (activeIndex == 0 && $active.data("copy") && !dragging) {
                        $ul.css("left", 0)
                    }
                } else if (obj.direction == "prev") {
                    targetIndex = activeIndex - 1;
                    $targetSlide = $li.eq(targetIndex + 1);
                    if (targetIndex < 0) {
                        targetIndex = liLength - 1;
                        $targetSlide = $li.eq(targetIndex + 1);
                    }
                    if (activeIndex == 0 && !dragging) {
                        $ul.css("left", -(liWidth * liLength))
                    }
                } else if (obj.direction == "pager") {
                    targetIndex = obj.$this.index();
                    $targetSlide = $li.eq(targetIndex + 1);
                }
                movingPos = -(parseInt($targetSlide.css("left")));
                $targetSlide.addClass("active");
                $sliderNav.find(".pager>a").eq(targetIndex).addClass("active"); //active pager
                $ul.animate({
                    "left": movingPos
                }, aniSpeed, function() {});

            }
            sliding(obj);
        }
        Slider.prototype.drag = function() {
            var startPos, //cursor offset of the slide
                startScrollPos,
                orgPos, //$ul left pos
                currentPos, //$ul left pos(moving)
                holding,
                direction,
                cursorX,
                cursorStartX,
                holdingTime,
                longHold, //indicate which index of slide will be shown after touch/mouse button released
                scrolling,
                dragging;

            $ul.on("touchstart touchmove touchend mousedown mousemove mouseup mouseout", function(e) {
                if (liLength > 1) {
                    var posX = $(this).offset().left; //position of target left win window;


                    if (e.type == "touchstart" || e.type == "mousedown") {
                        $active = $li.filter(".active");
                        activeIndex = $active.data("index");
                        holding = true;
                        if (e.type == "touchstart") {
                            cursorX = e.targetTouches[0].pageX;
                            cursorStartX = e.targetTouches[0].pageX;
                        }
                        if (e.type == "mousedown") {
                            cursorX = e.pageX;
                            cursorStartX = e.pageX;
                        }
                        startPos = cursorX - posX;
                        orgPos = parseInt($ul.css("left"));
                        startScrollPos = $(window).scrollTop();
                    }
                    if (e.type == "touchmove" || "mousemove") {
                        var currentPos = $(window).scrollTop();
                        if (holding && currentPos == startScrollPos) {
                            var dragged = cursorStartX - cursorX;
                            if (dragged >= 10 || dragged <= -10) {
                                dragging = true;
                            }
                            if (dragging) {
                                e.preventDefault()
                                console.log("dragging")
                            }
                            clearTimeout(holdingTime);
                            holdingTime = setTimeout(function() {
                                longHold = true;
                            }, 250)
                            if (e.type == "touchmove") {
                                cursorX = e.targetTouches[0].pageX;
                            }
                            if (e.type == "mousemove") {
                                cursorX = e.pageX;
                            }
                            currentPos = parseInt($(this).css("left"));
                            touchingPos = cursorX - posX; //touching left position of the ul;
                            currentPos += touchingPos - startPos;
                            $(this).css({
                                "left": currentPos
                            }); //start moving the slide
                            if (currentPos > 0) { //first element 
                                $(this).css({
                                    "left": -(liWidth * liLength) + 0
                                })
                                startPos = cursorX - posX;
                            }
                            if (currentPos < -(liWidth * liLength) - 0) { //last element
                                $(this).css({
                                    "left": -0
                                });
                                startPos = cursorX - posX;
                            }
                            targetIndex = -(parseInt((currentPos - liWidth / 2) / liWidth));


                        } else {
                            $ul.css("left", orgPos)
                        }
                    }
                    if (e.type == "touchend" || e.type == "mouseup") {
                        var movedeq = Math.abs(targetIndex - activeIndex);
                        if (movedeq === liLength) {
                            movedeq = 0
                        }

                        holding = false;
                        dragging = false;
                        // console.log("lastMove: " + lastMove + " movedPos: " +movedPos);
                        clearTimeout(holdingTime);
                        if (longHold != true && dragged > liWidth / 10 && movedeq < 1) {
                            slider.change({
                                e: e,
                                direction: "next"
                            });
                        } else if (longHold != true && dragged < -(liWidth / 10) && movedeq < 1) {
                            console.log("dasd")
                            slider.change({
                                e: e,
                                direction: "prev"
                            })
                        } else {

                            var target = $ul.find(">li").eq(targetIndex + 1);
                            $(".active", that).removeClass("active");
                            target.addClass("active");
                            targetIndex = targetIndex == liLength ? 0 : targetIndex;
                            $sliderNav.find(".pager>a").eq(targetIndex).addClass("active"); //active pager
                            var newPos = parseInt(target.css("left"));
                            $ul.animate({
                                "left": -newPos
                            }, aniSpeed);
                        }


                        longHold = false;



                    }
                }
            })
        }
        Slider.prototype.init = function() {
            var count = 0;
            $li.each(function() {
                $(this).attr("data-index", count);
                count++;
            })
            $li.eq(0).addClass("active");
            switch (this.type) {
                case "fade":

                    break;
                case "basic":



                    break;
                case "adv":

                    break;
                default:
                    slider.duplicate();
                    slider.buildNav();
                    slider.reposition();
                    slider.drag();
            }
        }
        slider.init();
        slider.reposition();
        $sliderNav.on("click", "a", function(e) {
            e.preventDefault();
            var $this = $(this);
            if ($(this).hasClass("slide-next") > 0) {
                slider.change({
                    e: e,
                    direction: "next"
                });
            } else if ($(this).hasClass("slide-prev") > 0) {
                slider.change({
                    e: e,
                    direction: "prev"
                });
            } else {
                slider.change({
                    e: e,
                    $this: $this,
                    direction: "pager"
                });
            }

        })


    }
});
