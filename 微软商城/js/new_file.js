$(function() {
	var globalNav = $("<ul class='globalMenu'></ul>").appendTo(".HeaderContainer");
	var menuList = $("<li class='menuList'></li>").appendTo(globalNav);
	var menuListspan = $("<span></span>").appendTo(menuList);
	var menuListicon = $("<a></a>").prop("class", "iconfont icon-home").appendTo(menuListspan);
	var links = $("<a></a>").addClass("gun").html("商务首页").appendTo(menuListspan);
	var cartBoxA = $("<a href='#'></a>").prop("class", "iconfont icon-gouwuche").appendTo(".cartBox");
	$(cartBoxA).mouseenter(function() {
		$(this).css("color", "#337ab7")
	})
	$(cartBoxA).mouseleave(function() {
		$(this).css("color", "black")
	})
	var loginBoxA = $("<a href='#'></a>").addClass("gun").html("登录∨").appendTo(".loginBox");

	$(loginBoxA).mouseenter(function() {
		$(this).css("color", "#0078D7")
		$(this).html("登录∧").css("background", "#fff")
		$(".loginContentactive").css("display", "block")
	})
	$(loginBoxA).mouseleave(function() {
		$(this).css("color", "black")
	})
	$(".loginContentactive").mouseleave(function() {
		$(".loginContentactive").css("display", "none")
		$(loginBoxA).html("登录∨").css("background", "none")
	})
	$(loginBoxA).click(function() {
		$(".loginContentactive").css("display", "none")
		$(loginBoxA).html("登录∨").css("background", "none")
	})
	var userLinksH4 = $("<h4></h4>").html("我的账号").appendTo(".userLinks");
	var userLinksUL = $("<ul></ul>").appendTo(".userLinks");

	$.ajax({
		type: "get",
		url: "json/new_file.json",
		success: function(data) {
			$.each(data.userLinks, function(i, t) {
				$.each(this.userLinksLI, function(j, c) {
					var userLinksLI = $("<li><a href='#'>" + c + "</a></li>").addClass("gun").addClass('userLinksLI').appendTo(userLinksUL);
					$(".userLinksLI a").mouseenter(function() {
						$(this).css("text-decoration", "underline")
					})
					$(".userLinksLI a").mouseleave(function() {
						$(this).css("text-decoration", "none")
					})
				})
			});

			var loginBtn = $("<a href='denglu.html'></a>").addClass("gun").html("登录").appendTo(".userFns");
			$(loginBtn).mouseenter(function() {
				$(loginBtn).css("background", "#006CC2")
			})
			$(loginBtn).mouseleave(function() {
				$(loginBtn).css("background", "#0078d7")
			})
			var breadcrumbsContent = $("<ul></ul>").appendTo(".breadcrumbs");
			$.each(data.breadcrumbs, function(i, t) {
				$.each(this.crumb, function(j, c) {
					var crumb = $("<li><a href='#'>" + c + "</a></li>").addClass("gun").addClass('crumb').appendTo(breadcrumbsContent);
					$(".crumb:eq(1)").mouseenter(function() {
						$(".crumb:eq(1) a").css("cursor", "auto")
					})
					$(".crumb:eq(2)").mouseenter(function() {
						$(".crumb:eq(2) a").css("cursor", "auto")
						$(".crumb:eq(2)").css("text-decoration", "underline")
					})
					$(".crumb:eq(0)").mouseenter(function() {
						$(".crumb:eq(0)").css("text-decoration", "underline")
					})
					$(".crumb:eq(2)").mouseleave(function() {
						$(".crumb:eq(2)").css("text-decoration", "none")
					})
					$(".crumb:eq(0)").mouseleave(function() {
						$(".crumb:eq(0)").css("text-decoration", "none")
					})
				})
			});

			var swiperwrapper = $("<ul></ul>").addClass("swiperwrapper").appendTo(".slider")
			var buta = $("<a href='#'></a>").appendTo(".slider").addClass("buta")
			var butali = $("<div><</div>").addClass("butali").appendTo(buta)
			var buta2 = $("<a href='#'></a>").appendTo(".slider").addClass("buta2")
			var butali2 = $("<div>></div>").addClass("butali2").appendTo(buta2)
			$.each(data.slider, function(i, t) {
				$.each(this.swiperslide, function(j, c) {
					var img = $('<a href="#"></a>').append($('<img width=""/>').addClass("swiperslide").prop('src', c));
					img.appendTo(swiperwrapper)
					console.log(c)

				});
			});
			var l = 0;
			$(buta).click(function() {
				l--
				if(l == -1) {
					l = 9
					$(swiperwrapper).css({
						left: 950 * -l
					})
				}
				$(swiperwrapper).animate({
					left: 950 * -l
				})
			})
			$(buta2).click(function() {
				l++
				if(l == 10) {
					l = 1
					$(swiperwrapper).css("left", 0)
				}
				$(swiperwrapper).animate({
					left: -950 * l
				})
			})
			//*轮播图
			$.each(data.images, function(i, t) {
				var img = $('<a href="#"></a>').append($('<img width="1180"/>').prop('src', t));
				var indexs = $('<span class="iconfont icon-yuanxuankuang1 index"></span>');
				$('<li></li>').append(img).addClass("gun").appendTo('.lunbo');
				$('.indexs').append(indexs)
			});
			var lastimg = $('<a href="#"></a>').addClass("gun").append($('<img width="1180"/>').prop('src', data.images[0]));
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
			var welcome = $("<div></div>").addClass("gun").addClass("welcome").appendTo(".info");
			var texts = $("<div></div>").addClass("texts").appendTo(welcome);
			var btns = $("<div></div>").addClass("btns").appendTo(welcome);
			
			var listt = $("<ul></ul>").addClass("list").appendTo(".info");
			var lia1 = $("<li></li>").appendTo(listt)
			var lia2 = $("<li></li>").appendTo(listt)
			var lia3 = $("<li></li>").appendTo(listt)
			var lia4 = $("<li></li>").appendTo(listt)
			var iconWrapper1 = $("<div></div>").addClass("gun").addClass("iconWrapper").appendTo(lia1);
			var content1 = $("<div></div>").addClass("content").appendTo(lia1);
			var iconWrapper2 = $("<div></div>").addClass("iconWrapper").appendTo(lia2);
			var content2 = $("<div></div>").addClass("content").appendTo(lia2);
			var iconWrapper3 = $("<div></div>").addClass("iconWrapper").appendTo(lia3);
			var content3 = $("<div></div>").addClass("content").appendTo(lia3);
			var iconWrapper4 = $("<div></div>").addClass("iconWrapper").appendTo(lia4);
			var content4 = $("<div></div>").addClass("content").appendTo(lia4);
			
			$.each(data.listt, function(j, c) {	
					var icon = $("<a></a>").prop("class","iconfont icon-tubiao-").appendTo(iconWrapper1);
					$.each(this.content.spana, function(i, t) {
					var spana = $("<span></span>").html(t).appendTo(content1);
				});
			});		
			$.each(data.listta, function(j, c) {	
					var icon = $("<a></a>").prop("class","iconfont icon-xiaozhu").appendTo(iconWrapper2);
					$.each(this.content.spana, function(i, t) {
					var spana = $("<span></span>").html(t).appendTo(content2);
				});
			});	
			$.each(data.listtb, function(j, c) {	
					var icon = $("<a></a>").prop("class","iconfont icon-huoche").addClass("gun").appendTo(iconWrapper3);
					$.each(this.content.spana, function(i, t) {
					var spana = $("<span></span>").html(t).appendTo(content3);
				});
			});	
			$.each(data.listtc, function(j, c) {	
					var icon = $("<a></a>").prop("class","iconfont icon-phone").appendTo(iconWrapper4);
					$.each(this.content.spana, function(i, t) {
					var spana = $("<span></span>").html(t).appendTo(content4);
				});
			});	
			
			$.each(data.info, function(j, c) {	
				$.each(this.texts, function(i, t) {	
					var textsa = $("<p></p>").html(t).appendTo(texts);
				});
			});
			var btnsa = $("<a href='#'></a>").addClass("gun").html("立即登录 >").addClass("login").appendTo(btns);
			var btnss = $("<a href='#'></a>").addClass("gun").html("注册").addClass("red").appendTo(btns);
			
			
		   var tel = $("<div></div>").addClass("gun").addClass("tel").appendTo(".info");
		   var iconWrappera = $("<div></div>").addClass("gun").addClass("iconWrappera").appendTo(tel);
		   var contents = $("<div></div>").addClass("gun").addClass("contents").appendTo(tel);		   
		   $.each(data.tel, function(j, c) {	
					var phone = $("<span></span>").prop("class","iconfont icon-phone").appendTo(iconWrappera);
					console.log(c)
			});
			$.each(data.content.span, function(i, t) {	
					var textsa = $("<span></span>").html(t).appendTo(contents);
					console.log(t)
			});
			$.each(data.content.a, function(i, t) {	
					var a = $("<a href='#'></a>").html(t).appendTo(contents);
					console.log(t)
			});
			
			
			var reactid = $("<ul></ul>").addClass("gun").appendTo(".msSMBListSlider");
			//H1
			var swiperslidew = $("<div></div>").addClass("swiperslidew").appendTo(reactid);
			var titlef = $("<div></div>").addClass("titlef").appendTo(swiperslidew);
			var titlefH1 = $("<h1></h1>").html("Surface").addClass("titlefH1").appendTo(titlef);
			var btnss = $("<div></div>").addClass("btnss").appendTo(titlef);
			var btnssa = $("<a href='#'></a>").html("更多商品>").addClass("btnssa").appendTo(btnss);
			
			//电脑图片
			
			var items = $("<div></div>").addClass("items").appendTo(swiperslidew);
			var bannerImg = $("<div></div>").css("background-image","url("+data.items.bannerImg+")").addClass(" item bannerImg").appendTo(items)
			var h2 = $("<h2></h2>").appendTo(bannerImg).html(data.items.bannerh4)
			$.each(data.items.item, function(i1, t1) {			
			    var item = $("<div></div>").addClass("item").appendTo(items)	    	    
			    var img = $('<img>').prop('src',t1.img).appendTo(item)
			    var h3 = $("<h3></h3>").html(t1.h3).appendTo(item)
			    var h4 = $("<h4></h4>").html(t1.h4).appendTo(item)
			    var del = $("<del></del>").html(t1.del).appendTo(item)
			    var bPrice = $("<p></p>").html(t1.bPrice).appendTo(item)
			    var button = $("<a href='#'></a>").html(t1.button).appendTo(item)
			    var active = $("<div></div>").addClass("active").append(del,bPrice,button).appendTo(item)
			});
			
			//h1
			var swiperslidew = $("<div></div>").addClass("swiperslidew").appendTo(reactid);
			var titlef = $("<div></div>").addClass("titlef").appendTo(swiperslidew);
			var titlefH1 = $("<h1></h1>").html("Office").addClass("titlefH1").appendTo(titlef);
			var btnss = $("<div></div>").addClass("btnss").appendTo(titlef);
			var btnssa = $("<a href='#'></a>").html("更多商品>").addClass("btnssa").appendTo(btnss);		
			
			var items = $("<div></div>").addClass("items").appendTo(swiperslidew);
			var bannerImg = $("<div></div>").css("background-image","url("+data.items1.bannerImg+")").addClass(" item bannerImg").appendTo(items)
			var h2 = $("<h2></h2>").appendTo(bannerImg).html(data.items.bannerh4)
			$.each(data.items1.item, function(i1, t1) {			
			    var item = $("<div></div>").addClass("item").appendTo(items)	    	    
			    var img = $('<img>').prop('src',t1.img).appendTo(item)
			    var h3 = $("<h3></h3>").html(t1.h3).appendTo(item)
			    var h4 = $("<h4></h4>").html(t1.h4).appendTo(item)
			    var del = $("<del></del>").html(t1.del).appendTo(item)
			    var bPrice = $("<p></p>").html(t1.bPrice).appendTo(item)
			    var button = $("<a href='#'></a>").html(t1.button).appendTo(item)
			    var active = $("<div></div>").addClass("active").append(del,bPrice,button).appendTo(item)	
			});
			
			
			//h1
			var swiperslidew = $("<div></div>").addClass("swiperslidew").appendTo(reactid);
			var titlef = $("<div></div>").addClass("titlef").appendTo(swiperslidew);
			var titlefH1 = $("<h1></h1>").html("混合现实").addClass("titlefH1").appendTo(titlef);
			var btnss = $("<div></div>").addClass("btnss").appendTo(titlef);
			var btnssa = $("<a href='#'></a>").html("更多商品>").addClass("btnssa").appendTo(btnss);		
			
			var items = $("<div></div>").addClass("items").appendTo(swiperslidew);
			var bannerImg = $("<div></div>").css("background-image","url("+data.items2.bannerImg+")").addClass(" item bannerImg").appendTo(items)
			var h2 = $("<h2></h2>").appendTo(bannerImg).html(data.items.bannerh4)
			$.each(data.items2.item, function(i1, t1) {			
			    var item = $("<div></div>").addClass("item").appendTo(items)	    	    
			    var img = $('<img>').prop('src',t1.img).appendTo(item)
			    var h3 = $("<h3></h3>").html(t1.h3).appendTo(item)
			    var h4 = $("<h4></h4>").html(t1.h4).appendTo(item)
			    var del = $("<del></del>").html(t1.del).appendTo(item)
			    var bPrice = $("<p></p>").html(t1.bPrice).appendTo(item)
			    var button = $("<a href='#'></a>").html(t1.button).appendTo(item)
			    var active = $("<div></div>").addClass("active").append(del,bPrice,button).appendTo(item)	
			});
			
			//h1
			var swiperslidew = $("<div></div>").addClass("swiperslidew").appendTo(reactid);
			var titlef = $("<div></div>").addClass("titlef").appendTo(swiperslidew);
			var titlefH1 = $("<h1></h1>").html("软件及服务").addClass("titlefH1").appendTo(titlef);
			var btnss = $("<div></div>").addClass("btnss").appendTo(titlef);
			var btnssa = $("<a href='#'></a>").html("更多商品>").addClass("btnssa").appendTo(btnss);		
			
			var items = $("<div></div>").addClass("items").appendTo(swiperslidew);
			var bannerImg = $("<div></div>").css("background-image","url("+data.items3.bannerImg+")").addClass(" item bannerImg").appendTo(items)
			var h2 = $("<h2></h2>").appendTo(bannerImg).html(data.items.bannerh4)
			$.each(data.items3.item, function(i1, t1) {			
			    var item = $("<div></div>").addClass("item").appendTo(items)	    	    
			    var img = $('<img>').prop('src',t1.img).appendTo(item)
			    var h3 = $("<h3></h3>").html(t1.h3).appendTo(item)
			    var h4 = $("<h4></h4>").html(t1.h4).appendTo(item)
			    var del = $("<del></del>").html(t1.del).appendTo(item)
			    var bPrice = $("<p></p>").html(t1.bPrice).appendTo(item)
			    var button = $("<a href='#'></a>").html(t1.button).appendTo(item)
			    var active = $("<div></div>").addClass("active").append(del,bPrice,button).appendTo(item)	
			});
			
			//h1
			var swiperslidew = $("<div></div>").addClass("swiperslidew").appendTo(reactid);
			var titlef = $("<div></div>").addClass("titlef").appendTo(swiperslidew);
			var titlefH1 = $("<h1></h1>").html("配件").addClass("titlefH1").appendTo(titlef);
			var btnss = $("<div></div>").addClass("btnss").appendTo(titlef);
			var btnssa = $("<a href='#'></a>").html("更多商品>").addClass("btnssa").appendTo(btnss);		
			
			var items = $("<div></div>").addClass("items").appendTo(swiperslidew);
			var bannerImg = $("<div></div>").css("background-image","url("+data.items4.bannerImg+")").addClass(" item bannerImg").appendTo(items)
			var h2 = $("<h2></h2>").appendTo(bannerImg).html(data.items.bannerh4)
			$.each(data.items4.item, function(i1, t1) {			
			    var item = $("<div></div>").addClass("item").appendTo(items)	    	    
			    var img = $('<img>').prop('src',t1.img).appendTo(item)
			    var h3 = $("<h3></h3>").html(t1.h3).appendTo(item)
			    var h4 = $("<h4></h4>").html(t1.h4).appendTo(item)
			    var del = $("<del></del>").html(t1.del).appendTo(item)
			    var bPrice = $("<p></p>").html(t1.bPrice).appendTo(item)
			    var button = $("<a href='#'></a>").html(t1.button).appendTo(item)
			    var active = $("<div></div>").addClass("active").append(del,bPrice,button).appendTo(item)	
			});
			
			//h1
			var swiperslidew = $("<div></div>").addClass("swiperslidew").appendTo(reactid);
			var titlef = $("<div></div>").addClass("titlef").appendTo(swiperslidew);
			var titlefH1 = $("<h1></h1>").html("礼品采购").addClass("titlefH1").appendTo(titlef);
			var btnss = $("<div></div>").addClass("btnss").appendTo(titlef);
			var btnssa = $("<a href='#'></a>").html("更多商品>").addClass("btnssa").appendTo(btnss);		
			
			var items = $("<div></div>").addClass("items").appendTo(swiperslidew);
			var bannerImg = $("<div></div>").css("background-image","url("+data.items5.bannerImg+")").addClass(" item bannerImg").appendTo(items)
			var h2 = $("<h2></h2>").appendTo(bannerImg).html(data.items.bannerh4)
			$.each(data.items5.item, function(i1, t1) {			
			    var item = $("<div></div>").addClass("item").appendTo(items)	    	    
			    var img = $('<img>').prop('src',t1.img).appendTo(item)
			    var h3 = $("<h3></h3>").html(t1.h3).appendTo(item)
			    var h4 = $("<h4></h4>").html(t1.h4).appendTo(item)
			    var del = $("<del></del>").html(t1.del).appendTo(item)
			    var bPrice = $("<p></p>").html(t1.bPrice).appendTo(item)
			    var button = $("<a href='#'></a>").html(t1.button).appendTo(item)
			    var active = $("<div></div>").addClass("active").append(del,bPrice,button).appendTo(item)	
			});
			
			var footerbar = $("<div></div>").addClass("footerbar").appendTo(".GlobalFOOTER")
			var copyrightinfo = $("<div></div>").addClass("copyrightinfo").appendTo(footerbar)
			var mainContainer = $("<div></div>").addClass("mainContainer").appendTo(copyrightinfo)
			var language = $("<a href='#'></a>").addClass("language").appendTo(mainContainer)
			var icon = $("<span></span>").prop("class", "iconfont icon-diqiu").appendTo(language).addClass("icons")
			var country = $("<span></span>").html("中国 - 简体中文").appendTo(language).addClass("country")
			var copyright = $("<div></div>").addClass("copyright").appendTo(mainContainer)
			var copyrightaa = $("<a href='#'></a>").appendTo(copyright).html("使用与销售")
			var copyrightaa = $("<a href='#'></a>").appendTo(copyright).html("隐私权声明")
			var copyrightaa = $("<a href='#'></a>").appendTo(copyright).html("商标")
			var copyrightspan = $("<span></span>").appendTo(copyright).html("沪ICP备12038052号-4")
			var copyrightspan = $("<span></span>").appendTo(copyright).html("© 2017 Microsoft")
			
			
			
			$(".gun").click(function(){
				alert("没效果")
			})
		}
         
	});

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
})