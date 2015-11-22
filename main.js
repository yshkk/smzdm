// var search_bar = document.querySelector('input'),
// 	icon_remove=document.querySelector('.icon-remove');
// search_bar.onkeyup=function(){
// 		if(this.value){
// 		icon_remove.style.display='inline-block';
// 		} else icon_remove.style.display='none';
// 	};
// icon_remove.onclick=function(){
// 	search_bar.value='';
// 	this.style.display='none';
// }

// =====jQuery=========================================================

$(function(){
	//搜索框
	var search_bar=$('#searchbar'),
		icon_remove=$('.icon-remove'),
		icon_search=$('.icon-search');
	search_bar.keyup(function(){
		if($(this).val()){
		icon_remove.show();
		} else icon_remove.hide();
	});
	icon_remove.click(function () {
		search_bar.val('');
		$(this).hide();
	});
	icon_search.click(function(){
		var url='http://search.smzdm.com/?c=home&s='+search_bar.val();
		if(search_bar.val()){
			window.open(url);
		}else return;

	})
	//登录弹窗
	var loginBtn=[$('#login'),$('.login')];
	for (var i in loginBtn){
		loginBtn[i].click(function(){
			login_mask.css('display','block');
			login_area.css('display','block');
		})
	}
	var login_mask=$('.login-mask'),
		login_area=$('.login-area'),
		login__remove=$('.login-area .login-right i');
	login__remove.click(function(){
		login_mask.css('display','none');
		login_area.css('display','none');
	})

	//nav固定,热门优惠券固定
	function couponFix() {
	var coupon = $('.coupon');
	if ($(document).scrollTop() > 1495) {

		if (!coupon.hasClass('coupon-fixed')) {
			coupon.addClass("coupon-fixed");
		}
		if ($(document).scrollTop() > 1945) {
			coupon.removeClass('coupon-fixed');
			if (!coupon.hasClass('coupon-fixed-complete')) {
				coupon.addClass("coupon-fixed-complete");
			}
		} else {
			coupon.removeClass('coupon-fixed-complete');
		};

	} else {
		coupon.removeClass('coupon-fixed');
	};
}
function navFix() {
	var nav = $('nav');
	if ($(document).scrollTop() > 74) {
		if (!nav.hasClass('nav-fixed')) {
			nav.addClass("nav-fixed");
		}
	} else {
		nav.removeClass('nav-fixed');
	};
}
$(document).scroll(function () { navFix(); couponFix() });

//右侧 返回顶部/反馈 按钮
	$('#feedback').click(function(){
		window.open('http://www.smzdm.com/feedback');
	});
	var topBtn=$('#back-to-top');
	topBtn.click(function(){
		$('body,html').animate({scrollTop:0},500);//火狐需为$('html')
	});
	function topFade() {
		if ($(document).scrollTop() > 300) {
			topBtn.fadeIn(10);
		} else {
			topBtn.fadeOut(10);
		};
	}
	function fixBottom() {
		var rightBtn = $('.right-btn');
		if ($(document).scrollTop() > 1800) {
			rightBtn.addClass('right-btn-active');
		} else {
			rightBtn.removeClass('right-btn-active');
		}
	}
	$(document).scroll(function () { topFade(); fixBottom() });

//右侧选项卡效果
function tab(tab1,tab2,tab1content,tab2content){
	tab1.mouseover(function(){
		if(tab1content.css('display')=='none'){
			tab1content.css('display','block');
			tab2content.css('display','none');
		}
	});
	tab2.mouseover(function(){
		if(tab2content.css('display')=='none'){
			tab2content.css('display','block');
			tab1content.css('display','none');
		}
	});
}
tab($('#catogory'),$('#merchant'),$('.catogory-guide'),$('.merchant-guide'));
tab($('#new-found'),$('#hot-found'),$('#new-found-area'),$('#hot-found-area'))
//轮播图
var cArea=$('.carousel-area:first'),
			 cBox=$('.carousel-box:first'),
			 tArea=$('#topic-carousel'),
			 tBox=$('#topic-carousel .carousel-box'),
			 cPointers=$('.pointer li'),
			 cPrev=$('#carousel-left-arrow'),
			 cNext=$('#carousel-right-arrow'),
			 tPrev=$('#topic-carousel-left-arrow'),
			 tNext=$('#topic-carousel-right-arrow'),
			 timer1,timer2,
			 index=1;
			 
			 
			 carousel(cBox,cArea,5,534,timer1,index,cPrev,cNext,cPointers);
			 carousel(tBox,tArea,3,300,timer2,index,tPrev,tNext);
// (container,list,timer,prev,next,buttons,len,index)
			 function carousel(box,area,len,picWidth,timer,index,prev,next,pointers){
				 var interval=3000;
			 		 
				 function animate(offset){
				 				var left=parseInt(box.css('left'))+offset;
				 				if(offset>0){
				 					offset='+='+offset;
				 				}else {
				 					offset='-='+Math.abs(offset);
				 				}
				 				box.animate({'left':offset},300,function(){
				 					if(left>-200){
				 						box.css('left',-picWidth*len);
				 					}
				 					if(left<(-picWidth*len)){
				 						box.css('left',-picWidth);
				 					}

				 				});
				 }
				 function showBtn(){
					 if(typeof pointers ==='undefined') {
						 return;
					}else{
				 	pointers.eq(index-1).addClass('active').siblings().removeClass('active');
						 
					 }
				 }
				 function play(){
				 	timer=setTimeout(function(){
				 		next.trigger('click');
				     play();
				 	},interval);
				 }
				 function stop(){
				 	clearTimeout(timer);
				 }

				 next.bind('click',function(){
				 	if(box.is(':animated')){
				 		return;
				 	}
				 	if(index==len){
				 		index=1;
				 	}else {
				 		index++;
				 	}
				 	animate(-picWidth);
				 	showBtn();
				 })
				 prev.bind('click',function(){
				 	if(box.is(':animated')){
				 		return;
				 	}
				 	if(index==1){
				 		index=len;
				 	}else {
				 		index--;
				 	}
				 	animate(picWidth);
				 	showBtn();
				 })
				if(typeof pointers === 'undefined'){
					return;
				}else{
					 pointers.each(function() {
				 	$(this).bind('click', function() {
				 			if(box.is(':animated')||$(this).attr('class')=='active'){
				 				return;
				 			}

				 		var currentIndex=parseInt($(this).attr('index'));
				 		var offset=-picWidth*(currentIndex-index);
				 		animate(offset);
				 		index=currentIndex;
				 		showBtn();
				 	});
				 });
				}
				 area.hover(stop,play);
				 
				 play();




			 }

	
		
//优惠券hover领取效果


	$('.coupon-list>li').each(function(){
		$(this).hover(function(){
			$(this).addClass('active').siblings().removeClass('active');
		})
	})

//热门发现 缩略图hover后逐渐变宽效果======不行了不会了 最后那个效果不会做======
// $(".last-item").hover(
// 	function(){$(this).children('.newhot-content-item-container')
					  
// 					  .animate({width:"196px"})},
// 	function(){$(this).children('.newhot-content-item-container').css('width',"96px")}
// )















})
