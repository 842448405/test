$(function() {
	$(document).scroll(function() {
		var scr = $(this).scrollTop()
		if(scr >= 50) {
			$(".nav2").css({
				position: "fixed",
				top: "0",
				zIndex:"999",
				background:"white"
			})
		} else if(scr <= 50) {
			$(".nav2").css({
				position: "static",
				top: "200"
			})
		}

	})
	$(document).scroll(function() {
		var scr = $(this).scrollTop()
		if(scr >= 400) {
			$(".shang").css({
				display:"block"
			})
		} else if(scr <= 400) {
			$(".shang").css({
				display:"none"
			})
		}

	})
	$(".shang").click(function(){
		$(document).scrollTop(0)
	})
	$.ajax({
		type: "get",
		url: "json/index.json",
		success: function(data) {
			$.each(data.nav.nav1.login, function(i, t) {
				var box;
				if(i === 0) {
					box = $('<li></li>').append($('<a class="account" href="#">' + t + '</a>'))
				} else if(i === 5) {
					box = $("<li style='margin:20px 0 10px'></li>").append($('<a  class="denglv" href="#"></a>').text(t))
				} else {
					box = $('<li></li>').append($('<a class="underline" href="#"></a>').text(t))
				}
				$(box).appendTo('.userLink ul')
			});
			$.each(data.nav.nav2.list, function(i, t) {
				var li = $('<li class="nav2_list_li"></li>'),
					box;
				if(i < 2) {
					$(li).css('cursor', 'pointer');
					box = $('<a class="bluea" href="#"></a>').html(t);
					var ul = $('<ul class="subMenu "></ul>');
					$.each(data.nav.nav2['childlist' + i], function(i, t) {
						$(ul).append($('<li></li>').html(t))
					});
					$(li).append(ul)
				} else {
					box = $('<a class="bluea" href="#"></a>').html(t)
				}
				$(li.append(box)).appendTo($('.nav2_list'))
			});
			$('.nav2_Right>a').html(data.nav.nav2.list2[0]);
			$('.nav2_Right>span').html(data.nav.nav2.list2[1]);
			$('.lunbo').width((data.images.length + 1) * 1180);

			//*轮播图
			$.each(data.images, function(i, t) {
				var img = $('<a href="#"></a>').append($('<img width="1180"/>').prop('src', t));
				var indexs = $('<span class="iconfont icon-yuanxuankuang1 index"></span>');
				$('<li></li>').append(img).appendTo('.lunbo');
				$('.indexs').append(indexs)
			});
			var lastimg = $('<a href="#"></a>').append($('<img width="1180"/>').prop('src', data.images[0]));
			$('.index:first').removeClass('icon-yuanxuankuang1').addClass('icon-yuanxuankuang2');
			$(lastimg).appendTo('.lunbo');
			$('.index').click(function() {
				$('.lunbo').stop();
				index($(this));
				$('.lunbo').animate({
					'left': $(this).index() * -1180
				});
				i = $(this).index()
			});
			//轮播图*

			//*产品广告
			//左列表
			$.each(data.sideNavInner, function(i, t) {
				var li = $('<li></li>').append($('<a href="#"></a>').html(t).addClass('whitea underline'));
				$(li).appendTo('.sideNavInner')
			});
			//右列表
			$.each(data.blockNav.blockNavImg, function(i, t) {
				var more = $('<span></span>').append($('<a class="bluea" href="#"></a>').html(data.blockNav.more[i]));
				var img = $('<a href="#"></a>').append($('<img width="265"/>').prop('src', data.blockNav.blockNavImg[i]));
				var p = $('<p class="description"></p>').html(data.blockNav.description[i]);
				var li = $('<li ></li>').append(img, p, more);
				$('.blockNavList').append(li)
			})
			//产品广告*
			//*店长推荐
			$.each(data.sliderList.images, function(i, t) {
				var img = $('<a href="#"></a>').append($('<img width="211"/>').prop('src', data.sliderList.images[i]));
				var h4 = $('<h4 class="Surface "></h4>').html(data.sliderList.title[i]);
				var p = $('<p class=""></p>').html(data.sliderList.description[i]);
				if(data.sliderList.Price[i]) {
					var Price = $('<div class="boxPrice">售价 : <span class="Price">' + data.sliderList.Price[i] + '</span>起 </div>');
					$('.listContainerInner').append($('<li></li>').append(img, h4, p, Price));
				} else {
					$('.listContainerInner').append($('<li></li>').append(img, h4, p));
				}
			})
			//店长推荐*
			//*各类列表
			$.each(data.productChannels, function(i, t) {
				var obj = this;
				var box = $('<div></div>').addClass('productChannel').appendTo($('.productChannels .Containerbox'))
				var title = $('<div></div>').html(this.channelTitle).addClass('channelTitle');
				var inner = $('<p></p>').html(this.inner);
				var a = $('<a href="#" class="viewmore underline"></a>').html('查看更多');
				var first = $('<li></li>').css({
					'backgroundImage': 'url(' + this.innerImg + ')',
					'background-size': 'cover',
					'background-position': 'center',
					'padding': '14px'
				}).append(inner, a);
				var ul = $('<ul></ul>').append(first);
				$.each(this.title, function(j, c) {
					var content, li;
					var img = $('<img width="254">').prop('src', obj.listImg[j]);
					var h3 = $('<h3></h3>').html(c);
					var p = $('<p></p>').html(obj.description[j]);
					var Price = $('<div class="boxPrice">售价 : <span class="Price">' + obj.Price[j] + '</span></div>');
					content = $('<a href="#"></a>').append(img, h3, p, Price);
					if(obj.tag) {
						if(obj.tag[j]) {
							var tag = $('<span></span>').html(obj.tag[j]).addClass('tag');
							li = $('<li></li>').append(tag, content);
						} else {
							li = $('<li></li>').append(content);
						}
					} else {
						li = $('<li></li>').append(content);
					}
					$(ul).append(li)
				});
				$(box).append(title, ul)
			})
			//各类列表*
			//*热门应用列表
			//大标题
			$('<div></div>').html(data.appsChannel.channelTitle).appendTo('.appsChannel .Containerbox').addClass('channelTitle')
			//游戏列表
			var appsChannel = $('<ul></ul>')
			$.each(data.appsChannel.appList, function(i, t) {
				var img = $('<img width="124"/>').prop('src', t.img);
				var name = $('<a href="#"></a>').html(t.name);
				var imgs = $('<img />').prop("src", t.imgs);
				var divstars = $("<div class='divstars'></div>").append(imgs, $('<div></div>').width(t.stars.progress))

				appList = $('<li></li>').append(img, name, divstars);
				appList.appendTo(appsChannel);
				appsChannel.appendTo(".appsChannel .Containerbox");
				$(".divstars:eq(1)").css("margin-top", "20px");
				$(".divstars:eq(3)").css("margin-top", "20px");
				$(".divstars:eq(5)").css("margin-top", "20px");
			})

			$.each(data.appsServe.appsServelest, function(i, t) {
				var icon = $("<a href='#'></a>").addClass("iconfont " + t.icon).css({
					display: "block",
					fontSize: "25px"
				});
				var p = $("<a href='#'></a>").html(t.p).css("display", "block")
				var appsServeli = $("<li></li>").append(icon, p);
				$(".appsServeul").append(appsServeli);
				$(".appsServe li:eq(5)").css("border", "white");
			})
			$.each(data.content.mainContainers, function(i, t) {
				var p = $("<span></span>").html(t.p);
				var inp = $("<input type='text' placeholder='请输入您的邮件地址'/>");
				var buttons = $("<button class='but'>订阅</button>")
				var span = $("<a href='#' class='span'></a>").html(t.span)
				$(".footer_signup").append(p, inp, buttons, span);
			})

			$.each(data.mainContainer.footer_lis, function(i, t) {
				var footer_blaspan = $("<span></span>").html(t.footer_span);
				var footer_blaspan2 = $("<span></span>").html(t.footer_block2span);
				var footer_blaspan3 = $("<span></span>").html(t.footer_block3span);
				var footer_blaspan4 = $("<span></span>").html(t.footer_block4span);
				var footer_blaspan5 = $("<span></span>").html(t.footer_block5span);
				var footer_blaspan6 = $("<span></span>").html(t.footer_block6span);
				console.log(t);
				var links = $("<ul class='links'></ul>");
				var links1 = $("<ul class='links'></ul>");
				var links2 = $("<ul class='links'></ul>");
				var links3 = $("<ul class='links'></ul>");
				var links4 = $("<ul class='links'></ul>");
				var links5 = $("<ul class='links'></ul>").css({
					display: " flex",
					height: "auto"
				});
				var links6 = $("<ul class='links'></ul>");
				var div1 = $("<div></div>").css({
					width: "100px",
					height: "100px",
					float: "left",
					marginTop: "20px"
				}).addClass("div2").appendTo(links5)
				var div2 = $("<div></div>").css({
					width: '110px',
					float: "left"

				}).addClass("div2").appendTo(links5)
				var img = $('<img width="110">').prop('src', t.footer_block5img);
				var icon = $("<a href='#'></a>").addClass("iconfont " + t.footer_block5ing).css({
					display: "block",
					fontSize: "40px",
					marginLeft: "15px",
					marginTop: "50px"
				});
				var icon2 = $("<a href='#'></a>").addClass("iconfont " + t.footer_block5icon).css({
					display: "block",
					fontSize: "20px",
				});
				div1.append(icon)
				div2.append(img)

				var spanicon = $("<span></span>").css('float', 'left');

				spanicon.append(icon2)
				$.each(t.footer_blalist, function(a, b) {
					var footer_blalist = $("<li><a href='#'>" + b + "</a></li>").appendTo(links);
				});
				$.each(t.footer_block2, function(a, b) {
					var footer_blalist = $("<li><a href='#'>" + b + "</a></li>").appendTo(links2);
				});
				$.each(t.footer_block3, function(a, b) {
					var footer_blalist = $("<li><a href='#'>" + b + "</a></li>").appendTo(links3);
				});
				$.each(t.footer_block4, function(a, b) {
					var footer_blalist = $("<li><a href='#'>" + b + "</a></li>").appendTo(links4);
				});
				$.each(t.footer_block5, function(a, b) {
					var footer_blalist = $("<p>" + b + "</p>").appendTo(div1);
				});
				$.each(t.footer_block5p, function(a, b) {
					var footer_blalist = $("<p>" + b + "</p>").appendTo(div2);
					if(a == 0) {
						$(footer_blalist).append(spanicon)
					}
				});
				$.each(t.footer_block6, function(a, b) {
					var footer_blalist = $("<li><a href='#'>" + b + "</a></li>").appendTo(links6);
				});
				var footer_blalist = $("<li><a href='#'>" + t.footer_block + "</a></li>").appendTo(links1);
				$(".footer_block:eq(0)").append(footer_blaspan, links);
				$(".footer_block:eq(1)").append(links1);
				$(".footer_block:eq(2)").append(footer_blaspan2, links2);
				$(".footer_block:eq(3)").append(footer_blaspan3, links3);
				$(".footer_block:eq(4)").append(footer_blaspan4, links4);
				$(".footer_block:eq(5)").append(footer_blaspan5, links5, );
				$(".footer_block:eq(6)").append(footer_blaspan6, links6, );
			})
			//热门应用列表*
		}
	});
	$('.login').hover(function() {
		$(this).css({
			border: '1px solid #e0e0e0',
			'border-bottom': '1px solid white',
			'background': 'white'
		});
		$('.userLink').show()
	}, function() {
		$(this).css({
			border: 0,
			'background': '#f5f5f5'
		});
		$('.userLink').hide()
	});
	$(document).on('click', '.nav2_list_li', function() {
		$(this).siblings().find('ul').slideUp();
		$(this).find('ul').slideToggle();
	});
	$(document).on('mouseenter', '.subMenu>li', function() {
		$(this).addClass('skyblue')
	}).on('mouseleave', '.subMenu>li', function() {
		$(this).removeClass('skyblue')
	});
	//*轮播图
	$('.jiant').click(function() {
		$(this).addClass('borderB')
	});

	function index(t) {
		$(t).siblings().removeClass('icon-yuanxuankuang2').addClass('icon-yuanxuankuang1');
		$(t).removeClass('icon-yuanxuankuang1').addClass('icon-yuanxuankuang2')
	}
	var i = 0,
		t;
	$('.icon-Right-').click(function() {
		$('.lunbo').stop();
		i += 1;
		if(i === $('.lunbo').find('img').length) {
			i = 1;
			$('.lunbo').css('left', 0)
		}
		$('.lunbo').animate({
			'left': i * -1180
		});
		t = i;
		if(t === 5) {
			t = 0
		}
		var dian = $('.index').eq(t);
		index(dian)
	});
	$('.icon-Left-').click(function() {
		$('.lunbo').stop();
		i--;
		if(i === -1) {
			$('.lunbo').css('left', ($('.lunbo').find('img').length - 1) * -1180);
			i = $('.lunbo').find('img').length - 2
		}
		$('.lunbo').animate({
			'left': i * -1180
		});
		t = i;
		if(t === 5) {
			t = 0
		}
		var dian = $('.index').eq(t);
		index(dian)
	});

	function time() {
		Time = setInterval(function() {
			$('.icon-Right-').click()
		}, 2000)
	}
	time()
	$('.mainContainer').hover(function() {
		clearInterval(Time)
	}, function() {
		time()
	})
	//轮播图*

});