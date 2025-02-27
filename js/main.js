$(function() {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof window.commonFunction === 'function') {
          window.commonFunction();
        }
      });
    abousSlide();
    busiSlide();

    // quick theme change
    $('[data-htheme="dark"]').each(function(index, item) {
        ScrollTrigger.create({
            trigger: item,
            start: 'top center',
            end: 'bottom center',
            toggleClass: {
                targets: '.quick-wrap',
                className: 'dark-mode',
            },
            // markers: true,
        });
    })

    // quick menu motion
    $('.quick-wrap button').on('click',function() {
        if ($(this).hasClass('quick-home')) {
            $('html, body').stop().animate({scrollTop: 0}, 1000);
        } else {
            var i = $(this).parent().index() + 1;
            $('html, body').stop().animate({scrollTop: $('.content-wrap section').eq(i).offset().top}, 1000);
        }
    })

    $('.float-scdown').on('click',function() {
        if($(this).hasClass('is-scroll')) {
            $('html, body').stop().animate({scrollTop: 0}, 1000);
        } else {
            $('html, body').stop().animate({scrollTop: $(window).innerHeight()}, 1000);
        }
    })

    ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
            gsap.to('.main-visual .visual-back', {
                scrollTrigger: {
                    trigger: '.main-visual',
                    start: 'top conter',
                    end: 'bottom bottom',
                    scrub: true,
                    // markers: true,
                },
                borderRadius: 40,
                scaleX: 0.965,
            });
        }, "(max-width: 1024px)": () => {
            gsap.to('.main-visual .visual-back', {
                scrollTrigger: {
                    trigger: '.main-visual',
                    start: 'top top',
                    end: 'bottom center',
                    scrub: true,
                    // markers: true,
                },
                borderRadius: 20,
                scaleX: 0.965,
            });
        }
    })

    gsap.to('.main-visual .visual-back *', {
        scrollTrigger: {
            trigger: '.main-visual',
            start: 'top top',
            end: 'bottom center',
            scrub: true,
            // markers: true,
        },
        y: 150,
    });

    if($('.visual-slide-item').length < 2) {
        $('.main-visual .slide-control, .main-visual .slide-dot-wrap').hide();
    }

    // main about motion
    ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
            gsap.from('.main-about ul li:nth-child(1) img', {
                scrollTrigger: {
                    trigger: '.main-about .about-intro',
                    start: 'top top',
                    end: 'bottom center',
                    scrub: true,
                    // markers: true,
                },
                scale: 1.05,
            });

            const tl02 = gsap.timeline({
                scrollTrigger: {
                    trigger: '.main-about .about-intro',
                    scrub: true,
                    start: 'bottom top',
                    end: '+=' + (window.innerHeight * 2),
                    // markers: true,
                }
            });

            tl02.to('.main-about ul li:nth-child(2) .img-wrap', {y: 0,},'about01')
            tl02.from('.main-about ul li:nth-child(2) img', {scale: 1.2,},'about01')
            tl02.to('.main-about ul li:nth-child(3) .img-wrap', {y: 0,},'about02')
            tl02.from('.main-about ul li:nth-child(3) img', {scale: 1.2,},'about02')


            gsap.to('.main-about ul li:nth-child(2) .about-txt', {
                scrollTrigger: {
                    trigger: '.main-about .about-motion',
                    toggleActions: 'play none none reverse',
                    start: '+=' + (window.innerHeight * 1.4),
                    end: '+=' + (window.innerHeight * 2.4),
                    scrub: false,
                    onEnter: () => $('.main-about .about-motion').removeClass('index01 index03').addClass('index02'),
                    onLeaveBack: () => $('.main-about .about-motion').removeClass('index02').addClass('index01'),
                    // markers: true,
                },
                opacity: 1,
                duration: 0.1,
            });

            gsap.to('.main-about ul li:nth-child(3) .about-txt', {
                scrollTrigger: {
                    trigger: '.main-about .about-motion',
                    toggleActions: 'play none none reverse',
                    start: '+=' + (window.innerHeight * 2.4),
                    end: '+=' + (window.innerHeight * 3.4),
                    scrub: false,
                    onEnter: () => $('.main-about .about-motion').removeClass('index01 index02').addClass('index03'),
                    onLeaveBack: () => $('.main-about .about-motion').removeClass('index03').addClass('index02'),
                    // markers: true,
                },
                opacity: 1,
                duration: 0.1,
            });
        }
    })

    gsap.to('.main-busi .busi-motion', {
        scrollTrigger: {
            trigger: '.main-busi .busi-motion',
            start: 'top center',
            end: 'top top',
            scrub: true,
            // markers: true,
        },
        borderRadius: 0,
        scaleX: 1,
    });

    ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
            const ani1 = gsap.timeline();
    
            ani1.from('.busi-contents-wrap .busi02', { x: '100%' }, 'fir');
    
            let st = ScrollTrigger.create({
                animation: ani1,
                trigger: '.main-busi .busi-motion',
                start: 'top top',
                end: '+=1500', // 스크롤 가동 범위를 늘림
                scrub: true,
                // markers: true,
            });
    
            $('.busi-menu-wrap button').on('click', function () {
                var i = $(this).parent().index();
    
                if (i == 0) {
                    $('html, body').stop().animate({ scrollTop: $('.busi-motion').offset().top }, 1000);
                } else if (i == 1) {
                    gsap.to(window, { duration: 1, scrollTo: st.end });
                }
            });
        }
    });

    $(window).on('resize',function() {
        abousSlide()
        busiSlide()
        popupDotPos()

        if($(document).width() < 1024) {
            $('.main-busi .busi-motion').css('height','auto');
        }

        $('.busi-motion .busi-con .busi-menu-wrap li').removeClass('is-active');
        $('.busi-motion .busi-con .busi-menu-wrap li').eq(0).addClass('is-active');
    })

    $(window).on('scroll',function() {
        secSep();
        busiSc();

        if($(window).scrollTop() > $(window).height() / 1) {
            $('.quick-wrap').addClass('is-scroll');
        } else {
            $('.quick-wrap').removeClass('is-scroll');
        }
    })
})

function mainIntro() {
    var t1 = 2700, //visual 보이는 시기
        t2 = 3900, //web intro duration
        t3 = 1800 //visual intro duration

    $('.intro-wrap').show();
    $('html').addClass('web-intro hidden');

    $('.main .wrap, .main header#header, .main footer#footer').css('opacity', '1');
    // popupAct();

    visualMotion();

    $('#mainVisual video').each(function() {
        $(this).get(0).pause();
    })

    $('#mainVisual .slide').slick('slickPause');
    $('#mainVisual .slide-dot-wrap li').removeClass('slick-active');
    $('#mainVisual .slide-dot-wrap li:nth-child(1)').addClass('slick-stop');

    setTimeout(function() {
        $('#mainVisual video').each(function() {
            $(this).get(0).play();
        })

        $('html').addClass('visual-intro');
        $('#mainVisual .slide').slick('slickPlay');
        $('#mainVisual .slide').slick('slickGoTo', 0);
        $('#mainVisual .slide-dot-wrap li:nth-child(1)').addClass('slick-active');
        $('#mainVisual .slide-dot-wrap li:nth-child(1)').removeClass('slick-stop');
    }, t1);

    setTimeout(function() {
        $('.intro-wrap').fadeOut();
    }, t2);

    setTimeout(function() {
        $('html').removeClass('web-intro visual-intro');
        if($('.layer-wrap.main-popup').length == 0) {
            $('html').removeClass('hidden');
        }
    }, t2+t3);
}

function popupAct() {
    if(getCookie('mainPopup') != 'Y'){
        $('#mainPopup').fadeIn();
        $('html').addClass('hidden');

        var popOption = {
            arrows: true,
            dots: true,
            swipeToSlide: true,
            draggable: true,
            touchThreshold: 5000,
            infinite: false,
            pauseOnHover: false,
            pauseOnFocus: false,
            autoplay: false,
            adaptiveHeight: true,
            // variableWidth: true,
            appendDots: $('#mainPopup .slide-dot-wrap'),
            prevArrow: $('#mainPopup .prev'),
            nextArrow: $('#mainPopup .next'),
            responsive: [{
                breakpoint: 1024,
                settings: {
                    arrows: false,
                }
            }]
        };

        popupDotPos();

        if($('.layer-wrap.main-popup .layer-cont li').length >= 2) {
            $('.layer-wrap.main-popup .layer-cont').not('.slick-initialized').slick(popOption);
        } else {
            $('.layer-wrap.main-popup .layer-cont').filter('.slick-initialized').slick('unslick');
            $('.layer-wrap.main-popup .slide-control, .layer-wrap.main-popup .slide-dot-wrap').hide();
        }
    }
}

function popupDotPos() {
    setTimeout(function() {
        var imgH = $('.layer-wrap.main-popup .layer-body li:nth-child(1) .popImg').height() - 30;
        $('.layer-wrap.main-popup .layer-body .slide-dot-wrap').css('top',imgH);
    }, 100)
}

function setCookie(name, value, expiredays) {
    var today = new Date();
    today.setDate(today.getDate() + expiredays);
    document.cookie = name + '=' + escape(value) + '; path=/; expires = '+ today.toGMTString() + ';';
}

function getCookie(name){
    var obj = name + '=';
    var x = 0;
    while (x <= document.cookie.length ) {
        var y = (x+obj.length);
        if(document.cookie.substring(x,y) == obj) {
            if((endOfCookie = document.cookie.indexOf(";",y)) == -1)
                endOfCookie = document.cookie.length;
            return unescape(document.cookie.substring(y,endOfCookie));
        }
        x = document.cookie.indexOf(" ",x)+1;
        if(x == 0) break;
    }
    return "";
}

function closeMainPop(obj) {
    if($(obj).hasClass('todayno')) {
        setCookie('mainPopup', 'Y', 1);
    }
    $('#mainPopup').fadeOut();
    $('html').removeClass('hidden');
}

function visualMotion() {
    //main visual
    // $('#mainVisual .slide').slick({
    //     arrows: true,
    //     dots: true,
    //     speed: 1000,
    //     infinite: true,
    //     touchMove: false,
    //     swipe: false,
    //     draggable: false,
    //     pauseOnHover: false,
    //     pauseOnFocus: false,
    //     autoplay: true,
    //     autoplaySpeed: 5500,
    //     appendDots: $('#mainVisual .slide-dot-wrap .main-inner'),
    //     prevArrow: $('#mainVisual .prev'),
    //     nextArrow: $('#mainVisual .next'),
    // });

    $('#mainVisual .slide').on('beforeChange', function(){
        $('#mainVisual video').each(function() {
            $(this).get(0).pause();
            $(this).get(0).currentTime = 0;
            $(this).get(0).play();
        })
    });

    let sec = document.querySelectorAll('.visual-slide-item')

    sec.forEach((element) => {
        let text = element.querySelector('.visual-typo')
        let split = new SplitText(text, {type:'lines',linesClass:'typo-line'})

        let tl = gsap.timeline().to(split.lines, {
            backgroundSize: '200% 100%',
            duration: 2,
            stagger: 1.4,
            delay: 1.2,
        }, 0)

        $('#mainVisual .slide').on('beforeChange', function(){
            tl.restart()
        });
    })
}

function secSep() {
    $('section').each(function(i) {
        if ($(window).scrollTop() + $(window).height() > $('section').eq(i).offset().top + $(window).height() / 2) {
            $('html').removeClass('sec01 sec02 sec03 sec04 sec05 sec06 sec07');
            $('html').addClass('sec0' + (i + 1));

            $('.quick-menu li').removeClass('is-active');
            $('.quick-sec li').removeClass('is-active');

            if(i == 0) return

            $('.quick-menu li').eq(i-1).addClass('is-active');
            $('.quick-sec li').eq(i-1).addClass('is-active');
        }
    })
}

function abousSlide() {
    var aboutOptions = {
        swipeToSlide: true,
        draggable: true,
        pauseOnHover: false,
        pauseOnFocus: false,
        touchThreshold: 5000,
        infinite: true,
        arrows: false,
        dots: true,
        appendDots: $('.main-about .slide-dot-wrap'),
    };
}

function busiSlide() {
    var busiOptions = {
        swipeToSlide: true,
        draggable: true,
        pauseOnHover: false,
        pauseOnFocus: false,
        touchThreshold: 5000,
        infinite: false,
        arrows: false,
        dots: true,
        appendDots: $('.busi-con .slide-dot-wrap'),
    };
}

function busiSc() {
    if($(document).width()>1024) {
        $('.busi-contents-wrap .busi-content').each(function(i) {
            if ($(window).scrollTop() + $(window).height() > $('.busi-contents-wrap .busi-content').eq(i).offset().left + $(window).scrollTop()) {
                $('.busi-motion .busi-con .busi-menu-wrap li').removeClass('is-active');
                $('.busi-motion .busi-con .busi-menu-wrap li').eq(i).addClass('is-active');
            }
        })
    }
}

$(document).ready(function() {
    hoverEffect(); // 초기화
    $(window).resize(function() {
        hoverEffect(); // 리사이즈 이벤트
    });
});

function hoverEffect() {
    if ($(window).width() >= 1200) {
        $(".sec3 .conwrap .boxwrap .box").hover(
            function() {
                $(this).addClass("active").removeClass("not-active");
                $(".sec3 .conwrap .boxwrap .box").not($(this)).addClass("not-active").removeClass("active");
            },
            function() {
                // 필요 시 추가
            }
        );
    } else {
        $(".sec3 .conwrap .boxwrap .box").removeClass("active not-active");
    }
}

$(document).ready(function () {
    let currentIndex = 0; // 현재 활성화된 인덱스
    const $images = $(".all_img figure"); // 큰 이미지 그룹
    const $texts = $(".all_text > div"); // 텍스트 그룹
    const $smallImages = $(".sm-img figure"); // 작은 이미지 그룹
    const totalItems = $images.length; // 총 아이템 개수
    let interval; // 자동 슬라이드 인터벌 변수
    let startX = 0; // 스와이프 시작 X 좌표
    let endX = 0; // 스와이프 종료 X 좌표
  
    function updateContent(newIndex) {
      if (newIndex < 0) newIndex = totalItems - 1;
      if (newIndex >= totalItems) newIndex = 0;
  
      // 기존 요소 숨기기 (fade 효과)
      $images.stop(true, true).fadeOut(500).removeClass("on");
      $texts.stop(true, true).fadeOut(500).removeClass("on");
      $smallImages.stop(true, true).fadeOut(500).removeClass("on");
  
      // 새로운 요소 보여주기
      $images.eq(newIndex).stop(true, true).fadeIn(500).addClass("on");
      $texts.eq(newIndex).stop(true, true).fadeIn(500).addClass("on");
  
      // 작은 이미지는 다음 이미지가 보이도록 설정
      let nextIndex = (newIndex + 1) % totalItems;
      $smallImages.removeClass("on").fadeOut(500);
      $smallImages.eq(nextIndex).fadeIn(500).addClass("on");
  
      currentIndex = newIndex;
    }
  
    // 자동 슬라이드 (10초마다 변경)
    function startAutoSlide() {
      interval = setInterval(function () {
        updateContent(currentIndex + 1);
      }, 10000); // 10초 설정
    }
  
    startAutoSlide(); // 자동 슬라이드 시작
  
    // 버튼 클릭 이벤트
    $(".btn button").eq(0).click(function () {
      updateContent(currentIndex - 1);
      resetAutoSlide();
    });
  
    $(".btn button").eq(1).click(function () {
      updateContent(currentIndex + 1);
      resetAutoSlide();
    });
  
    // 작은 이미지 클릭 시 다음 이미지로 변경
    $smallImages.click(function () {
      updateContent(currentIndex + 1);
      resetAutoSlide();
    });
  
    // **PC 및 모바일 스와이프 이벤트 추가**
    $(".all_img").on("mousedown touchstart", function (e) {
      startX = e.pageX || e.originalEvent.touches[0].pageX; // 터치 또는 마우스 X 좌표 저장
    });
  
    $(".all_img").on("mouseup touchend", function (e) {
      endX = e.pageX || e.originalEvent.changedTouches[0].pageX; // 터치 또는 마우스 X 좌표 저장
      let diff = startX - endX;
  
      if (Math.abs(diff) > 50) { // 50px 이상 이동하면 동작
        if (diff > 0) {
          updateContent(currentIndex + 1); // 왼쪽 스와이프 → 다음 이미지
        } else {
          updateContent(currentIndex - 1); // 오른쪽 스와이프 → 이전 이미지
        }
        resetAutoSlide(); // 자동 슬라이드 리셋
      }
    });
  
    // **터치 이벤트 방지 (모바일에서 기본 동작 방해 방지)**
    $(".all_img").on("touchmove", function (e) {
      e.preventDefault();
    });
  
    // 자동 슬라이드 리셋 (사용자가 조작하면 다시 10초 후 시작)
    function resetAutoSlide() {
      clearInterval(interval);
      startAutoSlide();
    }
  });

