/**
 * Created by truemenhale on 15/5/14.
 */
//1.爱国;2.诚信;3.敬业;4.友善
function setCenter(obj,m,c){
	obj.css('left',m*c);
}
function ballInit(){
	this.type;
	this.src;
}
ballInit.prototype.setType=function(a){
		this.type=a;
};
ballInit.prototype.setSrc=function(src){
	this.src=src;
};
ballInit.prototype.checkType=function(obj){
	var result=null;
	this.type==obj.type?result = true:result = false;
	return result;
};
function boxInit(){
	ballInit.call(this);
}
for(x in ballInit.prototype){
	boxInit.prototype[x]=ballInit.prototype[x];
}
function gameInit(balls,boxs){
	for(var i=1 ; i<5 ; i++){
		switch (i){
			case 1:
				for(var j=1 ; j<10 ; j++){
					var a=new ballInit();
					a.setType(i);
					a.setSrc('../../images/goodcitizen/'+i+'/'+j+'.png');
					balls.push(a);
				}
				break;
			case 2:
				for(var j=1 ; j<12 ; j++){
					var a=new ballInit();
					a.setType(i);
					a.setSrc('../../images/goodcitizen/'+i+'/'+j+'.png');
					balls.push(a);
				}
				break;
			case 3:
				for(var j=1 ; j<14 ; j++){
					var a=new ballInit();
					a.setType(i);
					a.setSrc('../../images/goodcitizen/'+i+'/'+j+'.png');
					balls.push(a);
				}
				break;
			case 4:
				for(var j=1 ; j<12 ; j++){
					var a=new ballInit();
					a.setType(i);
					a.setSrc('../../images/goodcitizen/'+i+'/'+j+'.png');
					balls.push(a);
				}
				break;
			default:
				alert('我要报警了！');
		}
	}
	balls.sort(function(){ return 0.5 - Math.random() });
	balls.sort(function(){ return 0.5 - Math.random() });
	balls.sort(function(){ return 0.5 - Math.random() });
	balls.sort(function(){ return 0.5 - Math.random() });
	balls.sort(function(){ return 0.5 - Math.random() });
	for(var i = 1;i<5;i++){
		var b=new boxInit();
		b.setSrc('../../images/goodcitizen/'+i+'.png');
		b.setType(i);
		boxs.push(b);
	}
}
var balls=[];
var boxs=[];
$(function(){
	var W=$(window).width();
	var H=$(window).height();
	var startBtn=$('.game_start');
	var guideBtn=$('.game_guide');
	var oHolder=$('.game_holder');
	$('.container').css('height',H);
	setCenter($('.game_title'),W,0.178);
	setCenter($('.back_words'),W,0.1531375);
	setCenter(startBtn,W,0.23125);
	setCenter(guideBtn,W,0.23125);
	startBtn.click(function(){
		oHolder.animate({'top':-H},400);
	});
	gameInit(balls,boxs);
});