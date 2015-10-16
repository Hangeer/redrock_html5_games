window.phone=null;
window.token=true;
$(function(){
	var oC=$('.container');
	var aPages=$('.container li');
	var oHolder=$('.container>ul');
	var oPlay=$('.play');
	var oCross=$('.cross');
	var oGame=$('.gamePage');
	var oMask=$('.mask');
	var oScoreBoard=$('.score-board');
	var oGuide=$('.guide');
	var oApply=$('.apply-btn');
	var oPhone=$('.phone-box');
	var oOpacity=$('.non-opacity');
	var oT = $('.personPhoto');
	oT.css({'height':$(window).width()*0.18,'width':$(window).width()*0.18,'left':25,'top':'30%'});
	oT.css('background-image',"url("+avatar+")");
	oCross.css('left',$(window).width()*0.1375);
	oPlay.bind('click',function(){
		oHolder.css('left',-100+'%');
		oMask.css('left',50+'%');
		oMask.css('z-index',100);
		oMask.click(function(){
			oMask.css('z-index',-100);
			var ogoal=$('.logoTuan');
			ogoal.remove();
			oCross[0].className='cross-bg cross';
			gameInit(oGame,center,oMask,oScoreBoard,oGuide,oCross);
			oMask.unbind("click");
			oOpacity.click(function(){
				// oApply.bind('click',function(){
					// sendAjax();
					// oApply.unbind('click');
				// });
				oMask.css('z-index',-100);
				var ogoal=$('.logoTuan');
				ogoal.remove();
				oCross[0].className='cross-bg cross';
				gameInit(oGame,center,oMask,oScoreBoard,oGuide,oCross);
			});
		});
	});
	oHolder.css('width',$(window).width()*2);
	aPages.css('height',$(window).height());
	oC.css('height',$(window).height());
	var center=($(window).height()*0.315);
});
function gameInit(obj,center,oMask,oScoreBoard,oGuide,oCross){
	var take=true;
	var r = 'xiaohui';
	deg=9;
	speed=5;
	function draw(){
		var time=1000/60;
		n+=deg;
		m+=speed;
		if(m>$(window).height()*0.52){
			ogoal.remove();
			take=false;
			return;
		}
		ogoal.css('top',m);
		ogoal.css('transform','rotate('+n+'deg)');
		timer=setTimeout(function(){
			draw();
		},time);
		var t=m+','+n;
		return t;
	}
	$('<img />',{
		class:'logoTuan',
		src:'./images/cqupt/'+r+'.png'
	}).appendTo(obj);
	var ogoal=$('.logoTuan');
	var oShut=$('.shut');
	ogoal.css('left',$(window).width()*0.58);
	m=-120;
	n=360*Math.random();
	var time=1000;
	var timer=null;
	timer=setTimeout(function(){
		draw();
	},time);
	oShut[0].addEventListener('touchstart', function (ev) {
		if(m<$(window).height()*0.115){
			return;
		}
		clearTimeout(timer);
		oCross.css({'-webkit-animation':'Scales 0.3s','-ms-animation':'Scales 0.3s','-moz-animation':'Scales 0.3s','animation':'Scales 0.3s'});
		setTimeout(function(){
			oCross.addClass('photo-box');
			oCross.removeClass('cross-bg');
		},400);
		b=n%360-180;
		if(b<0){
			b+=180;
		}else{
			b=180-b;
		}
		b=130/180*(180-b);
		p=(center-Math.abs(m-center+35))*70/center;
		sum=b+p;
		sum=Math.round(sum*1000)/1000;
		if(!take){
			sum=0;
		}
		var _data = {};
		_data.score = sum;
		$.post(rank_path,_data,function(data){
				$('.score-rank').html(data[0].list);
				title = '庆祝建校65周年，我和重邮合个影！我排在第'+data[0].list+'名，快来挑战我！';
			alert(title);
		});
		setTimeout(function(){
			$('.score-num').html(sum);
			oCross.css({'-webkit-animation':'null','-ms-animation':'null','-moz-animation':'null','animation':'null'});
			oMask.css('z-index',100);
			oGuide.css('display','none');
			oScoreBoard.css('display','block');
		},2000);
		ev.preventDefault();
	});
}