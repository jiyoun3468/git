$(function() {
    window.commonFunction = function () {
        console.log('common.js loaded');
      };

    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    $('html, nav#nav').addClass('ready');

    window.addEventListener('resize', ScrollTrigger.update)

    setTimeout(function() {
        ScrollTrigger.refresh();
    },300)

    if (!sessionStorage.viewed) {
        // 세션스토리지의 값 없음
        sessionStorage.viewed = 1;
        if($('body').hasClass('main')) {
            var t1 = 2700, //visual 보이는 시기
                t2 = 3900, //web intro duration
                t3 = 1800 //visual intro duration

            // lenis.stop();
            mainIntro()
            popupAct()
        }
    } else {
        // 세션스토리지의 값 있음
        if($('body').hasClass('main')) {
            var t1 = 2700, //visual 보이는 시기
                t2 = 3900, //web intro duration
                t3 = 1800 //visual intro duration

            $('.main .wrap, .main header#header, .main footer#footer').css('opacity', '1');
            $('html').addClass('visual-intro');
            visualMotion();
            popupAct()

            setTimeout(function() {
                $('html').removeClass('visual-intro hidden');
            }, t3);
        }
    }

	fnGnbCnt();
    headerMotion();
    fnIntegratedSearchList();
    topBtnMotion();

    $('footer#footer .topbtn').on('click',function() {
        $('html, body').stop().animate({scrollTop: 0}, 1000);
    })

    if($(document).width() > 768) {
        var searchSPos = 'top center'
        var searchEPos = 'bottom center'
    } else {
        var searchSPos = '50px bottom'
        var searchEPos = '50px top'
    }

    $(window).on('resize',function() {
        if($(document).width() > 768) {
            var searchSPos = 'top center'
            var searchEPos = 'bottom center'
        } else {
            var searchSPos = '50px bottom'
            var searchEPos = '50px top'
        }
    })

    // search dark mode
    $('[data-htheme="dark"]').each(function(index, item) {
        ScrollTrigger.create({
            trigger: item,
            start: searchSPos,
            end: searchEPos,
            toggleClass: {
                targets: '.float-search, .float-scdown',
                className: 'dark-mode',
            },
            // markers: true,
        });
    })

    if($('.content-wrap').attr('data-ftheme') == 'dark') {
        ScrollTrigger.create({
            trigger: 'footer#footer',
            start: 'top center',
            end: 'bottom top',
            toggleClass: {
                targets: '.float-scdown',
                className: 'dark-mode',
            },
            // markers: true,
        });
    }

    // footer 테마
    if ($('.content-wrap').data('ftheme') == 'light') $('html').addClass('f-light');
    else if ($('.content-wrap').data('ftheme') == 'dark') $('html').addClass('f-dark');

    // footer 위 섹션 r값 추가
    if($('footer#footer').length > 0) {
        gsap.to('.content-wrap', {
            scrollTrigger: {
                trigger: 'footer#footer',
                start: 'top bottom',
                end: 'bottom center',
                scrub: true,
                // markers: true,
            },
            borderRadius: 40,
            scaleX: 0.965,
        });

        gsap.from('footer#footer .footer-inner', {
            scrollTrigger: {
                trigger: 'footer#footer',
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: true,
                // markers: true,
            },
            y: '-50%',
        });
    }

    // 푸터 그룹사 드롭다운
    $('footer#footer .footer-family-wrap .footer-family > button').on('click',function() {
        $(this).parents('.footer-family').toggleClass('is-open');
        $(this).siblings().stop().slideToggle();
    })

    // 배경색 변경
    $('[data-backTheme]').each(function(index) {
        var color = $(this).attr('data-backTheme');
        var v = 'bottom center'

        if ($(this).index() == $(this).siblings().length) v = '+=9999';

        ScrollTrigger.create({
            trigger: this,
            start: 'top center',
            end: v,
            toggleClass: {
                targets: '.content-wrap',
                className: color,
            },
            onEnter: headChangeIn,
            onEnterBack: headChangeIn,
            onLeave: headChangeOut,
            onLeaveBack: headChangeOut,
            // markers: true,
        });

        function headChangeIn() {
            if(color == 'blue') {$('header').addClass('dark-mode');$('.cover-intro .text-fill-wrap').addClass('wh');}
            if(color == 'black') $('.cover-intro[data-backTheme="black"] .text-fill-wrap').addClass('wh');
        }
        function headChangeOut() {
            if(color == 'blue') {$('header').removeClass('dark-mode');$('.cover-intro .text-fill-wrap').removeClass('wh');}
            if(color == 'black') $('.cover-intro[data-backTheme="black"] .text-fill-wrap').removeClass('wh');
        }
    })

    // typo fill 모션
    let sec = document.querySelectorAll('.text-fill-wrap')

    sec.forEach((element) => {
        let text = element.querySelector('.text-fill')
        let split = new SplitText(text, {type:'lines',linesClass:'text-line'})

        let tl = gsap.timeline().to(split.lines, {
            backgroundSize: '200% 100%',
            duration: 0.5,
            stagger: 0.5
        }, 0)

        ScrollTrigger.matchMedia({
            "(min-width: 1024px)": () => {
                ScrollTrigger.create({
                    trigger: element,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    animation: tl,
                    scrub: true,
                    // markers: true,
                })
            }
        })

        $(split.lines).each(function() {
            if($(this).find('span').length) $(this).addClass('sm')
        })
    })

    // slide control
    $('.slide-btn.pause').on('click',function() {
        $(this).parents('.slide-wrap').find('.slide').slick('slickPause');
        $(this).parents('.slide-wrap').find('.slide-dot-wrap').find('.slick-active').removeClass('slick-active').addClass('slick-stop');
        $(this).hide();
        $(this).siblings('.slide-btn.play').show();
    })

    $('.slide-btn.play').on('click',function() {
        $(this).parents('.slide-wrap').find('.slide').slick('slickPlay');
        $(this).parents('.slide-wrap').find('.slide-dot-wrap').find('.slick-stop').removeClass('slick-stop').addClass('slick-active');
        $(this).hide();
        $(this).siblings('.slide-btn.pause').show();
    })

    $('.slide-btn.prev, .slide-btn.next').on('click',function() {
        $(this).parents('.slide-wrap').find('.slide').slick('slickPlay');
        $(this).parents('.slide-wrap').find('.slide-control').find('.slide-btn.pause').show();
        $(this).parents('.slide-wrap').find('.slide-control').find('.slide-btn.play').hide();
        $(this).parents('.slide-wrap').find('.slide-dot-wrap').find('.slick-stop').removeClass('slick-stop');
    })

    // 검색
    $('.search-wrap input').keyup(function() {
        if($(this).val() != '') {
            $(this).parent().addClass('is-active');
        } else {
            $(this).parent().removeClass('is-active');
        }
    })

    $('.search-wrap .btn-delete').on('click',function() {
        $(this).parent().removeClass('is-active');
    })

    // 팝업
    $(document).on('click','.btn-layer', function() {
        var $href = $(this).attr('href');
        popup_open($href);
    });

    $(window).on('scroll',function() {
        topBtnMotion();
    })
})

function headerMotion() {
    let lastScroll = 0;

    if($(window).scrollTop() <= 0) {
        $('header#header').removeClass('is-scroll');
    } else {
        $('header#header').addClass('is-scroll');
    }

    $(window).on('scroll',function() {
        if ($(window).scrollTop() <= 0) {
            $('header#header').removeClass('is-scroll');
        } else {
            $('header#header').addClass('is-scroll');
        }

        if($(document).width()<1024) {
            let nowScroll = $(this).scrollTop();
            if (lastScroll >= nowScroll || lastScroll < 0){
                $('header#header').removeClass('hide');
            } else {
                $('header#header').addClass('hide');
            };
            lastScroll = nowScroll;
        }
    })

    $(window).on('resize',function() {
        $('nav#nav').removeClass('ready');
        $('header#header').removeClass('hide');
        setTimeout(function() {
            $('nav#nav').addClass('ready');
        },100)

        $('header#header .header-link').removeClass('is-hover');
        $('header#header').removeClass('slide-open');
        $('header#header').removeClass('is-scroll');
        $('header#header .header-link-toggle, header#header .header-link-wrap button, header#header .header-btn').removeClass('is-active');
        $('nav#nav, nav#nav .nav-depth1-wrap .nav-depth1-item').removeClass('is-open');
        $('nav#nav .nav-depth1-wrap .nav-depth1').removeClass('plus-open');

        if ($(document).width() < 1024) {
            $('nav#nav .nav-depth2-wrap').hide();
        }
    })

    // header dark mode
    $('[data-htheme="dark"]').each(function(index, item) {
        if($(this).hasClass('space')) {
            var introH = $(this).prev('.cover-intro').outerHeight() + 100
            var startPos = '+=' + introH;
        } else {
            var startPos = 'top 50px'
        }

        ScrollTrigger.create({
            trigger: item,
            start: startPos,
            end: 'bottom 50px',
            toggleClass: {
                targets: 'header',
                className: 'dark-mode',
            },
            // markers: true,
        });
    })

    // nav
    // min width 1024px
    $('header#header .header-link').mouseenter(function() {
        if($(document).width() > 1024) {
            $(this).addClass('is-hover');
        }
    })

    $('header#header').mouseleave(function() {
        if($(document).width() > 1024) {
            $('header#header .header-link').removeClass('is-hover');

            $('nav#nav').removeClass('is-open');
            $('header#header .header-btn, header#header .header-link-wrap button').removeClass('is-active');
            $('nav#nav .nav-depth1-wrap .nav-depth1-item').removeClass('is-open');
        }
    })

    // 메뉴 밖 클릭하면 닫힘
    $('html').click(function(e){
        if($(document).width() > 1024) {
            if($('nav#nav').hasClass('is-open')) {
                if($(e.target).parents('header#header').length < 1){
                    $('nav#nav, .nav-depth1-item').removeClass('is-open');
                    $('header#header .header-link-wrap button, header#header .header-btn').removeClass('is-active');
                }
            }
        }

        if($('.footer-family').hasClass('is-open')) {
            if($(e.target).parents('.footer-family').length < 1){
                $('.footer-family').removeClass('is-open');
                $('.footer-family .family-list').slideUp();
            }
        }
    });

    // 푸터 클로즈
    $('footer#footer .footer-family-wrap .family-list .family-close').on('click',function() {
        $('.footer-family').removeClass('is-open');
        $('.footer-family .family-list').slideUp();
    })

    // 1뎁스
    $('header#header .header-link-wrap button').mouseenter(function() {
        if($(document).width() > 1024) {
            var i = $(this).index();

            $('nav#nav .nav-depth2-wrap').show();

            if($('nav#nav').hasClass('is-open')) { //2뎁스 open 상태
                // if($(this).hasClass('is-active')) { //활성화 된 버튼 선택
                //     $('nav#nav').removeClass('is-open');
                //     $(this).removeClass('is-active');
                //     $('nav#nav .nav-depth1-wrap .nav-depth1-item').removeClass('is-open');
                // } else { //활성화 안된 버튼 선택
                    $('header#header .header-btn').removeClass('is-active');
                    $(this).siblings('button').removeClass('is-active');
                    $(this).addClass('is-active');
                    $('nav#nav .nav-depth1-wrap .nav-depth1-item').removeClass('is-open');
                    $('nav#nav .nav-depth1-wrap .nav-depth1-item').eq(i).addClass('is-open');
                // }
            } else { //2뎁스 no open 상태
                $(this).addClass('is-active');
                $('nav#nav').addClass('is-open');
                $('nav#nav .nav-depth1-wrap .nav-depth1-item').eq(i).addClass('is-open');
            }
        }
    })

    //support
    $('header#header .header-btn').mouseenter(function() {

        $('nav#nav .nav-depth2-wrap').show();

        if($(document).width() > 1024) {
            if($('nav#nav').hasClass('is-open')) { //2뎁스 open 상태
                // if($(this).hasClass('is-active')) { //활성화 된 버튼 선택
                //     $('nav#nav').removeClass('is-open');
                //     $(this).removeClass('is-active');
                //     $('nav#nav .nav-depth1-wrap .nav-depth1-item').removeClass('is-open');
                // } else { //활성화 안된 버튼 선택
                    $('header#header .header-link-wrap button').removeClass('is-active');
                    $(this).addClass('is-active');
                    $('nav#nav .nav-depth1-wrap .nav-depth1-item').removeClass('is-open');
                    $('nav#nav .nav-depth1-wrap .nav-depth1-item:last-child').addClass('is-open');
                // }
            } else { //2뎁스 no open 상태
                $(this).addClass('is-active');
                $('nav#nav').addClass('is-open');
                $('nav#nav .nav-depth1-wrap .nav-depth1-item:last-child').addClass('is-open');
            }
        }
    })

    // max width 1024px
    $('header#header .header-link-toggle').on('click',function() {
        if($(document).width() < 1024) {

            $('html').toggleClass('hidden')

            if($('header#header').hasClass('slide-open')) {
                $(this).removeClass('is-active');
                $('header#header').removeClass('slide-open');
            } else {
                $(this).addClass('is-active');
                $('header#header').addClass('slide-open');
            }
        }
    })

    $('nav#nav .nav-depth1-wrap .nav-depth1-item').on('click',function() {
        if($(document).width() < 1024) {
            $(this).siblings('.nav-depth1-item').find('.nav-depth1').removeClass('plus-open');
            $(this).siblings('.nav-depth1-item').find('.nav-depth2-wrap').stop().slideUp();
            $(this).find('.nav-depth1').toggleClass('plus-open')
            $(this).find('.nav-depth2-wrap').stop().slideToggle();
        }
    })
}

function topBtnMotion() {
    if ($(document).width() > 768) {
        var val = $(document).height() - ($(window).height() / 2) - $('footer#footer').outerHeight() + 80;

        if($(window).scrollTop() > $(window).height() / 2 - 250) {
            $('#floating .float-search, #floating .float-scdown').addClass('is-scroll');
        } else {
            $('#floating .float-search, #floating .float-scdown').removeClass('is-scroll');
        }
    } else {
        var val = $(document).height() - ($(window).height() / 2) - $('footer#footer').outerHeight() - 150;
        var h = $(document).height() - $('footer#footer').outerHeight() + 250;

        if($(window).scrollTop() > $(window).height() / 2 - 250) {
            $('#floating .float-search, #floating .float-scdown').addClass('is-scroll');
        } else {
            $('#floating .float-search, #floating .float-scdown').removeClass('is-scroll');
        }

        if($(window).scrollTop() >= $('.content-wrap').height() - $(window).height() - 200){
            $('#floating').fadeOut();
        } else {
            $('#floating').fadeIn();
        }
    }
}

function popup_open(el) {
    var $el = $(el);
    var isDim = $el.find('.layer-back');

    // 오른쪽에서 나오는 팝업일 경우
    if($el.hasClass('right')) {
        $el.addClass('show');
        $('html').addClass('hidden');

        $el.find('button.layer-close').on('click', function() {
            $el.removeClass('show');
            $('html').removeClass('hidden');
            return false;
        });

        isDim.on('click', function() {
            $el.removeClass('show');
            $('html').removeClass('hidden');
            return false;
        });
    } else {
        // 가운데서 페이드인 되는 팝업일 경우
        $el.fadeIn();
        $('html').addClass('hidden');

        $el.find('button.layer-close').on('click', function() {
            $el.fadeOut();
            $('html').removeClass('hidden');
            return false;
        });

        isDim.on('click', function() {
            $el.fadeOut();
            $('html').removeClass('hidden');
            return false;
        });
    }
}

function fnGnbCnt() {
	let path = window.location.pathname;
	path = path.includes('/kor/') ? 'kor' : 'eng';
	$.ajax({
		type: "GET",
		url: `/${path}/selectGnbCnt`,
		dataType: "json",
		success:function(data) {
			$('#irCnt').text(data.irCnt);
			$('#agencyCnt').text(data.agencyCnt);
			$('#updateCnt').text(data.updateCnt);
			$('#downloadCnt').text(data.downloadCnt);
			$('#productCnt').text(data.productCnt);
            $('#mediaCnt').text(data.mediaCnt);
            $('#recruCnt').text(data.recruitCnt);
			$('.supportSum').text(data.supportSum).show();
		},error:function(xhr, textStatus) {
			alert(textStatus);
		}
	});
}

function fnIntegratedSearchList() {
	$.ajax({
		type: "GET",
		url: "/kor/keywordList",
		success:function(data) {
			let list = data.keywordList;
			let html = ``;
			for(let li of list) {
				html += `<li value='${li.keyword}'><button>#${li.keyword}</button></li>`;
			}
			$('#keyList').html(html);

			$('#keyList > li').on('click', function() {
		    	$('#integratedSearch').val($(this).attr('value'));
		    	fnIntegratedSearch();
		    });
		},error:function(xhr, textStatus) {
			alert(textStatus);
		}
	});
}

function fnIntegratedSearch() {
	let integratedSearch = $('#integratedSearch').val();
	if($.trim(integratedSearch) == "") {
		alert("검색어를 입력하세요.");
		return;
	}
	
	var inteSearchRegex = /^[가-힣a-zA-Z0-9]+$/;

    // 허용된 문자가 아니면 입력 방지
    if (!inteSearchRegex.test(integratedSearch)) {
        alert("한글, 영문, 숫자만 입력가능합니다.");
        return;
    }
	
	location.href= "/kor/util_integratedSearch?search=" + integratedSearch;
}

function fnShareSns(sns) {
	var thisUrl = document.URL;
	var url = "";
	var title = $('#tit').text();

	if(sns == 'facebook') {
		var url = "http://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(thisUrl)+"&title="+encodeURIComponent(title);
        window.open(url, "facebook", "width=800, height=700");
	}else if(sns == 'twitter') {
		var url = "http://twitter.com/share?url="+encodeURIComponent(thisUrl)+"&text="+encodeURIComponent(title);
        window.open(url, "tweetPop", "width=800, height=700,scrollbars=yes");
	}else if(sns == 'naver') {
		url = 'http://blog.naver.com/openapi/share?url=' + thisUrl + '&title=' + title;
        window.open(url, 'naver', "width=800, height=700, toolbar=no, menubar=no, scrollbars=no, resizable=yes");
	}else if(sns == 'kakao') {
		Kakao.Link.sendDefault({
                objectType: 'feed',
                content: {
                    title: title, // 보여질 제목
                    imageUrl: $('#ogImg').attr('content'),
                    link: {
                        mobileWebUrl: thisUrl,
                        webUrl: thisUrl
                    }
                }
            });
	}else{
		var textarea = document.createElement("textarea");
		document.body.appendChild(textarea);
		url = window.document.location.href;
		textarea.value = url;
		textarea.select();
		document.execCommand("copy");
		document.body.removeChild(textarea);
		alert("URL이 복사되었습니다.")
	}
}
