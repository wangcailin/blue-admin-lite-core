/*
 adit by jyh 2016/9/6;
 */
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());
$(function(){
	//用在第一页即loading页的js
	var canvas = document.getElementById('canvas');
	var canvasBox=document.getElementById('canvasBox');
	var ctx = canvas.getContext('2d');
	var ret01={x:5,y:170,w:70,h:70};
	var ret02={x:245,y:325,w:70,h:70};
	var ret03={x:335,y:130,w:70,h:70};
	var ret04={x:695,y:280,w:70,h:70};
	var ret05={x:775,y:10,w:70,h:70};
	var ret06={x:1025,y:170,w:70,h:70};
	var raf;
	var pageIndex=0;
	var leave=1;
	var change=0;
	var active=0;
	var tof=1;
	var abc=1;
	var page2NUM=1;
	var bannerTab=null;
	var ball = {
	  x: 30,
	  y: 205,
	  vx: 0.1,
	  vy: 0.1,
	  radius: 0,
	  color: 'hsl(196,14%,'+93+'%)',
	  shadow:'rgba(27,137,199,0)',
	  vr:2.5,
	  active:0,
	  draw: function() {
	  	ctx.save();
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
//	    ctx.fillRect(ret01.x,ret01.y,ret01.w,ret01.h);
		ctx.shadowColor = this.shadow;
		ctx.shadowOffsetX = 8;
		ctx.shadowOffsetY = 8;
		ctx.shadowBlur = 30;
	    ctx.closePath();
	    ctx.fillStyle = this.color;
	    ctx.fill();
	    ctx.restore();
	  }
	};
	var ball01 = {
	  x: 270,
	  y: 360,
	  vx: 0.1,
	  vy: 0.1,
	  radius: 0,
	  color: 'hsl(196,14%,'+93+'%)',
	  shadow:'rgba(27,137,199,0)',
	  vr:2.5,
	  active:0,
	  draw: function() {
	  	ctx.save();
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
//	    ctx.fillRect(ret02.x,ret02.y,ret02.w,ret02.h);
        ctx.shadowColor = this.shadow;
		ctx.shadowOffsetX = 8;
		ctx.shadowOffsetY = 8;
		ctx.shadowBlur = 30;
	    ctx.closePath();
	    ctx.fillStyle = this.color;
	    ctx.fill();
	    ctx.restore();
	  }
	};
	var ball02 = {
	  x: 360,
	  y: 165,
	  vx: 0.1,
	  vy: 0.1,
	  radius: 0 ,
	  color: 'hsl(196,14%,'+93+'%)',
	  shadow:'rgba(27,137,199,0)',
	   vr:2.5,
	  active:0,
	  draw: function() {
	  	ctx.save();
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
//	    ctx.fillRect(ret03.x,ret03.y,ret03.w,ret03.h);
        ctx.shadowColor = this.shadow;
		ctx.shadowOffsetX = 8;
		ctx.shadowOffsetY = 8;
		ctx.shadowBlur = 30;
	    ctx.closePath();  
	    ctx.fillStyle = this.color;
	    ctx.fill();
	    ctx.restore();
	  }
	};
	
	var ball03 = {
	  x: 477,
	  y: 175,
	  vx: 0.1,
	  vy: 0.1,
	  radius: 1,
	  color: 'hsl(196,14%,93%)',
	  draw: function() {
	  	ctx.save();
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	    ctx.closePath();
	    ctx.fillStyle = this.color;
	    ctx.fill();
	    ctx.restore();
	  }
	};
	var ball04  = {
	  x: 600,
	  y: 225,
	  vx: 0.1,
	  vy: 0.1,
	  radius: 1,
	  color: 'hsl(196,14%,93%)',
	  draw: function() {
	  	ctx.save();
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	    ctx.closePath();
	    ctx.fillStyle = this.color;
	    ctx.fill();
	    ctx.restore();
	  }
	};
	var ball05  = {
	  x: 720,
	  y: 315,
	  vx: 0.1,
	  vy: 0.1,
	  radius: 0,
	  shadow:'rgba(27,137,199,0)',
	  color: 'hsl(196,14%,93%)',
	  active:0,
	  vr:2.5,
	  draw: function() {
	  	ctx.save();
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
//	    ctx.fillRect(ret04.x,ret04.y,ret04.w,ret04.h);
		ctx.shadowColor = this.shadow;
		ctx.shadowOffsetX = 8;
		ctx.shadowOffsetY = 8;
		ctx.shadowBlur = 30;
	    ctx.closePath();
	    ctx.fillStyle = this.color;
	    ctx.fill();
	    ctx.restore();
	  }
	};
	var ball06  = {
	  x: 800,
	  y: 45,
	  vx: 0.1,
	  vy: 0.1,
	  radius: 0,
	  shadow:'rgba(27,137,199,0)',
	  color: 'hsl(196,14%,93%)',
	  active:0,
	  vr:2.5,
	  draw: function() {
	  	ctx.save();
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
//	    ctx.fillRect(ret05.x,ret05.y,ret05.w,ret05.h);
		ctx.shadowColor = this.shadow;
		ctx.shadowOffsetX = 8;
		ctx.shadowOffsetY = 8;
		ctx.shadowBlur = 30;
	    ctx.closePath();
	    ctx.fillStyle = this.color;
	    ctx.fill();
	    ctx.restore();
	  }
	};
	var ball07  = {
	  x: 1050,
	  y: 205,
	  vx: 0.1,
	  vy: 0.1,
	  radius: 0,
	  shadow:'rgba(27,137,199,0)',
	  color: 'hsl(196,14%,93%)',
	  active:0,
	  vr:2.5,
	  draw: function() {
	  	ctx.save();
	    ctx.beginPath();
	    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
//	    ctx.fillRect(ret06.x,ret06.y,ret06.w,ret06.h);
		ctx.shadowColor = this.shadow;
		ctx.shadowOffsetX = 8;
		ctx.shadowOffsetY = 8;
		ctx.shadowBlur = 30;
	    ctx.closePath();
	    ctx.fillStyle = this.color;
	    ctx.fill();
	    ctx.restore();
	  }
	};
	var text01={
	  x: 30,
	  y: 205,
	  vx: 0.1,
	  vy: 0.1,
	  color:'rgba(0,0,0,0)',
	  draw: function() {
	  	ctx.save();
	    ctx.beginPath();
	    ctx.font="12px Arial";
	    ctx.textAlign="center";
	    ctx.textBaseline="middle";
	    ctx.fillStyle = this.color;
		ctx.fillText("首页",this.x,this.y);
	    ctx.closePath();  
	    ctx.fill();
	    ctx.restore();
	  }
	}
	var text01={
	  x: 30,
	  y: 205,
	  vx: 0.1,
	  vy: 0.1,
	  radius: 0,
//	  color: 'rgb(54,175,202)',
	  color:'rgba(0,0,0,0)',
	  draw: function() {
	  	ctx.save();
	    ctx.beginPath();
//	    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	    ctx.font="12px Arial";
	    ctx.textAlign="center";
	    ctx.textBaseline="middle";
	    ctx.fillStyle = this.color;
		ctx.fillText("首页",this.x,this.y);
	    ctx.closePath();  
	    ctx.fill();
	    ctx.restore();
	  }
	}
	var text02={
	  x: 270,
	  y: 360,
	  vx: 0.1,
	  vy: 0.1,
	  radius: 0,
	  color:'rgba(0,0,0,0)',
	  draw: function() {
	  	ctx.save();
	    ctx.beginPath();
	    ctx.font="12px Arial";
	    ctx.textAlign="center";
	    ctx.textBaseline="middle";
	    ctx.fillStyle = this.color;
		ctx.fillText("理念",this.x,this.y);
	    ctx.closePath();  
	    ctx.fill();
	    ctx.restore();
	  }
	}
	var text03={
	  x: 360,
	  y: 165,
	  vx: 0.1,
	  vy: 0.1,
	  radius: 0,
	  color:'rgba(0,0,0,0)',
	  draw: function() {
	  	ctx.save();
	    ctx.beginPath();
	    ctx.font="12px Arial";
	    ctx.textAlign="center";
	    ctx.textBaseline="middle";
	    ctx.fillStyle = this.color;
		ctx.fillText("方案",this.x,this.y);
	    ctx.closePath();  
	    ctx.fill();
	    ctx.restore();
	  }
	}
	var text04={
	  x: 720,
	  y: 315,
	  vx: 0.1,
	  vy: 0.1,
	  radius: 0,
	  color:'rgba(0,0,0,0)',
	  draw: function() {
	  	ctx.save();
	    ctx.beginPath();
	    ctx.font="12px Arial";
	    ctx.textAlign="center";
	    ctx.textBaseline="middle";
	    ctx.fillStyle = this.color;
		ctx.fillText("平台",this.x,this.y);
	    ctx.closePath();  
	    ctx.fill();
	    ctx.restore();
	  }
	}
	var text05={
	 x: 800,
	  y: 45,
	  vx: 0.1,
	  vy: 0.1,
	  radius: 0,
	  color:'rgba(0,0,0,0)',
	  draw: function() {
	  	ctx.save();
	    ctx.beginPath();
	    ctx.font="12px Arial";
	    ctx.textAlign="center";
	    ctx.textBaseline="middle";
	    ctx.fillStyle = this.color;
		ctx.fillText("案例",this.x,this.y);
	    ctx.closePath();  
	    ctx.fill();
	    ctx.restore();
	  }
	}
	var text06={
	  x: 1050,
	  y: 205,
	  vx: 0.1,
	  vy: 0.1,
	  radius: 0,
	  color:'rgba(0,0,0,0)',
	  draw: function() {
	  	ctx.save();
	    ctx.beginPath();
	    ctx.font="12px Arial";
	    ctx.textAlign="center";
	    ctx.textBaseline="middle";
	    ctx.fillStyle = this.color;
		ctx.fillText("客户",this.x,this.y);
	    ctx.closePath();  
	    ctx.fill();
	    ctx.restore();
	  }
	}
	var line01={
		x:ball01.x,
		y:ball01.y,
		vx:-3.84,
		vy:-2.48,
		draw:function(){
		   ctx.save();
		   ctx.strokeStyle ='hsl(196,14%,93%)';
		   ctx.lineWidth = 0.5;
		   ctx.shadowColor = "rgba(46,157,193,1)";
		   ctx.shadowOffsetX = 8;
		   ctx.shadowOffsetY = 8;
		   ctx.shadowBlur = 3;
		   ctx.beginPath();
		   ctx.moveTo(ball01.x,ball01.y);
		   ctx.lineTo(this.x,this.y);
		   ctx.closePath();
		   ctx.stroke();
		   ctx.restore();
		}
	}
	var line02={
		x:ball02.x,
		y:ball02.y,
		vx:-3.6,
		vy:7.8,
		draw:function(){
		   ctx.save();
		   ctx.strokeStyle ='hsl(196,14%,93%)';
		   ctx.lineWidth = 0.5;
		   ctx.shadowColor = "rgba(46,157,193,1)";
		   ctx.shadowOffsetX = 4;
		   ctx.shadowOffsetY = 4;
		   ctx.shadowBlur = 3;
		   ctx.beginPath();
		   ctx.moveTo(ball02.x,ball02.y);
		   ctx.lineTo(this.x,this.y);
		   ctx.closePath();
		   ctx.stroke();
		   ctx.restore();
		}
	}
	var line03={
		x:ball03.x,
		y:ball03.y,
		vx:-5.85,
		vy:-0.5,
		draw:function(){
		   ctx.save();
		   ctx.strokeStyle ='hsl(196,14%,93%)';
		   ctx.lineWidth = 0.5;
		   ctx.shadowColor = "rgba(46,157,193,1)";
		   ctx.shadowOffsetX = 3;
		   ctx.shadowOffsetY = 3;
		   ctx.shadowBlur = 3;
		   ctx.beginPath();
		   ctx.moveTo(ball03.x,ball03.y);
		   ctx.lineTo(this.x,this.y);
		   ctx.closePath();
		   ctx.stroke();
		   ctx.restore();
		}
	}
	var line04={
		x:ball04.x,
		y:ball04.y,
		vx:6,
		vy:4.5,
		draw:function(){
		   ctx.save();
		   ctx.strokeStyle ='hsl(196,14%,93%)';
		   ctx.lineWidth = 0.5;
		   ctx.shadowColor = "rgba(46,157,193,1)";
		   ctx.shadowOffsetX = 2;
		   ctx.shadowOffsetY = 4;
		   ctx.shadowBlur = 3;
		   ctx.beginPath();
		   ctx.moveTo(ball04.x,ball04.y);
		   ctx.lineTo(this.x,this.y);
		   ctx.closePath();
		   ctx.stroke();
		   ctx.restore();
		}
	}
	var line05={
		x:ball05.x,
		y:ball05.y,
		vx:3.2,
		vy:-10.8,
		draw:function(){
		   ctx.save();
		   ctx.strokeStyle ='hsl(196,14%,93%)';
		   ctx.lineWidth = 0.5;
		   ctx.shadowColor = "rgba(46,157,193,1)";
		   ctx.shadowOffsetX = 2;
		   ctx.shadowOffsetY = 4;
		   ctx.shadowBlur = 3;
		   ctx.beginPath();
		   ctx.moveTo(ball05.x,ball05.y);
		   ctx.lineTo(this.x,this.y);
		   ctx.closePath();
		   ctx.stroke();
		   ctx.restore();
		}
	}
	var line06={
		x:ball06.x,
		y:ball06.y,
		vx:3.75,
		vy:2.4,
		draw:function(){
		   ctx.save();
		   ctx.strokeStyle ='hsl(196,14%,93%)';
		   ctx.lineWidth = 0.5;
		   ctx.shadowColor = "rgba(46,157,193,1)";
		   ctx.shadowOffsetX = 2;
		   ctx.shadowOffsetY = 4;
		   ctx.shadowBlur = 3;
		   ctx.beginPath();
		   ctx.moveTo(ball06.x,ball06.y);
		   ctx.lineTo(this.x,this.y);
		   ctx.closePath();
		   ctx.stroke();
		   ctx.restore();
		}
	}
	function animate(){
	  ctx.clearRect(0,0, canvas.width, canvas.height); 
	  line01.draw();
	  line02.draw();
	  line03.draw();
	  line04.draw();
	  line05.draw();
	  line06.draw();
	  ball.draw();
	  ball01.draw();
	  ball02.draw();
	  ball03.draw();
	  ball04.draw();
	  ball05.draw();
	  ball06.draw();
	  ball07.draw();
	  text01.draw();
	  text02.draw();
	  text03.draw();
	  text04.draw();
	  text05.draw();
	  text06.draw();
	  if(change==0){
		  if (line03.x<=ball02.x) {
			  line03.vx=0;
			  line03.vy=0;
			  line03.x=ball02.x;
			  line03.y=ball02.y;
			  if(ball02.radius<=25){
			  	ball02.radius+=ball02.vr;
			  	if(ball02.radius==25){
			  		text03.color="rgb(54,175,202)";
			  	}
			  }
			  if(line02.x<=ball01.x){
			  	 line02.vx=0;
			  	 line02.vy=0;
			  	 line02.x=ball01.x;
			 	 line02.y=ball01.y;
			 	 if(ball01.radius<=25){
				  	ball01.radius+=ball01.vr;
				  	if(ball01.radius==25){
				  		text02.color="rgb(54,175,202)";
				  	}
				  }
			 	 if(line01.x<=ball.x){
				  	 line01.vx=0;
				  	 line01.vy=0;
				  	 line01.x=ball.x;
				 	 line01.y=ball.y;
				 	 change=1;
				  }else{
				  	line01.x+=line01.vx;
			  		line01.y+=line01.vy;
				  } 
			  }else{
			  	line02.x+=line02.vx;
		  		line02.y+=line02.vy;
			  } 				  
			}else{
				line03.x+=line03.vx;
		  		line03.y+=line03.vy;
			};
			if (line04.x>=ball05.x) {
				line04.vx=0;
			    line04.vy=0;
			    line04.x=ball05.x;
			    line04.y=ball05.y;
			    if(ball05.radius<=25){
				  	ball05.radius+=ball02.vr;
				  	if(ball05.radius==25){
				  		text04.color="rgb(54,175,202)";
				  	}
				  }
			    if (line05.x>=ball06.x) {
					line05.vx=0;
				    line05.vy=0;
				    line05.x=ball06.x;
				    line05.y=ball06.y;
				    if(ball06.radius<=25){
					  	ball06.radius+=ball02.vr;
					  	if(ball06.radius==25){
					  		text05.color="rgb(54,175,202)";
					  	}
					  }
				    if (line06.x>=ball07.x) {
						line06.vx=0;
					    line06.vy=0;
					    line06.x=ball07.x;
					    line06.y=ball07.y; 	 
					    }else{
					line06.x+=line06.vx;
			  		line06.y+=line06.vy;
					};
				}else{
					line05.x+=line05.vx;
			  		line05.y+=line05.vy;
				};
			}else{
				line04.x+=line04.vx;
		  		line04.y+=line04.vy;
			}
		}	
		if(change==1){
			if(ball.radius<=25){
			  	ball.radius+=ball.vr;
			  	if(ball.radius==25){
			  		text01.color="rgb(54,175,202)";
			  	}
			  }
			if(ball07.radius<=25){
			  	ball07.radius+=ball02.vr;
			  	if(ball07.radius==25){
			  		text06.color="rgb(54,175,202)";
			  	}
			}       
			line01.x=ball.x;
	 	 	line01.y=ball.y;
			line02.x=ball01.x;
			line02.y=ball01.y;
			line03.x=ball02.x;
			line03.y=ball02.y;
			line06.x=ball07.x;
			line06.y=ball07.y;
			line05.x=ball06.x;
			line05.y=ball06.y;
			line04.x=ball05.x;
			line04.y=ball05.y;
			if(leave==1){
			 	 if (ball.y > 205 || ball.y < 195) {
					  ball.vy = -ball.vy; 
					}
				  ball.y += ball.vy;
				  if (ball.x > 55 || ball.x < 35) {
					  ball.vx = -ball.vx;
					}
				  ball.x += ball.vx;
				 if (ball01.y > 370 || ball01.y< 350) {
					  ball01.vy =  -ball01.vy;
					}
				  ball01.y -= ball01.vy;
				  if (ball01.x > 285 || ball01.x < 265) {
					  ball01.vx = -ball01.vx;
					}
				  ball01.x += ball01.vx;
				  if (ball02.y > 175 || ball02.y< 155) {
					  ball02.vy =  -ball02.vy;
					}
				  ball02.y += ball02.vy;
				  if (ball02.x > 370 || ball02.x< 350) {
					  ball02.vx =  -ball02.vx;
					}
				  ball02.x -= ball02.vx;
				  if (text01.y > 205 || text01.y< 195) {
					  text01.vy =  -text01.vy;
					}
				  text01.y += text01.vy;
				  if (text01.x > 55 || text01.x< 35) {
					  text01.vx =  -text01.vx;
					}
				  text01.x += text01.vx;
				  if (text02.y > 370 || text02.y< 350) {
					  text02.vy =  -text02.vy;
					}
				  text02.y -= text02.vy;
				  if (text02.x > 285 || text02.x< 265) {
					  text02.vx =  -text02.vx;
					}
				  text02.x += text02.vx;
				  if (text03.y > 175 || text03.y< 155) {
					  text03.vy =  -text03.vy;
					}
				  text03.y += text03.vy;
				  if (text03.x > 370 || text03.x< 350) {
					  text03.vx =  -text03.vx;
					}
				  text03.x -= text03.vx;
				  if (ball05.y > 325 || ball05.y < 305) {
					  ball05.vy = -ball05.vy; 
					}
				    ball05.y += ball05.vy;
				    if (ball05.x > 730 || ball05.x < 710) {
					  ball05.vx = -ball05.vx; 
					}
				    ball05.x += ball05.vx;
				    if (ball06.y > 55 || ball06.y< 35) {
					   ball06.vy =  -ball06.vy;
					 }
				    ball06.y -= ball06.vy;
				    if (ball06.x > 810 || ball06.x< 790) {
					   ball06.vx =  -ball06.vx;
					 }
				    ball06.x -= ball06.vx;
				    if (ball07.y > 215 || ball07.y< 195) {
					   ball07.vy =  -ball07.vy;
					 }
				    ball07.y += ball07.vy;
				    if (ball07.x > 1050 || ball07.x< 1035) {
					   ball07.vx =  -ball07.vx;
					 }
				    ball07.x -= ball07.vx;
				    if (text04.y > 325 || text04.y< 305) {
					  text04.vy =  -text04.vy;
					}
				    text04.y += text04.vy;
				    if (text04.x> 730 || text04.x< 710) {
					  text04.vx =  -text04.vx;
					}
				    text04.x += text04.vx;
				    if (text05.y > 55 || text05.y< 35) {
					  text05.vy =  -text05.vy;
					}
				    text05.y -= text05.vy;
				    if (text05.x > 810 || text05.x< 790) {
					  text05.vx =  -text05.vx;
					}
				    text05.x -= text05.vx;
				   if (text06.y > 215 || text06.y< 195) {
					  text06.vy =  -text06.vy;
					}
				  	 text06.y += text06.vy;
				  	 if (text06.x > 1050 || text06.x< 1035) {
					  text06.vx =  -text06.vx;
					}
				  	 text06.x -= text06.vx;
			  }else if(leave==0){
			  	if (ball.y <=175) {
					  ball.vy = 0; 
					}
				  ball.y -= Math.abs(ball.vy)*10;
				 if (ball01.y <=175) {
					  ball01.vy = 0;
					}
				  ball01.y -= Math.abs(ball01.vy)*50;
				  if (ball02.y >=175) {
					  ball02.vy = 0;
					}
				  ball02.y += Math.abs(ball02.vy)*5;
				  if (ball05.y <=225) {
					  ball05.vy = 0; 
					}
				    ball05.y -= Math.abs(ball05.vy)*30;
				    if (ball06.y >=225) {
					   ball06.vy = 0;
					 }
				    ball06.y += Math.abs(ball06.vy)*50;
				    if (ball07.y >=225) {
					   ball07.vy = 0;
					 }
				    ball07.y += Math.abs(ball07.vy)*5;
				  if (text01.y <=175) {
					  text01.vy = 0;
					}
				  text01.y -= Math.abs(text01.vy)*10;
				  if (text02.y <=175) {
					  text02.vy = 0;
					}
				  text02.y -= Math.abs(text02.vy)*50;
				  if (text03.y >=175) {
					  text03.vy = 0;
					}
				  text03.y += Math.abs(text03.vy)*5;
				    if (text04.y <=225) {
					  text04.vy = 0;
					}
				    text04.y -= Math.abs(text04.vy)*30;
				    if (text05.y >=225) {
					  text05.vy = 0;
					}
				    text05.y += Math.abs(text05.vy)*50;
				   if (text06.y >=225) {
					  text06.vy = 0;
					}
				  	 text06.y += Math.abs(text06.vy)*5;
				  setTimeout(function(){
					  ball.vy = 0.15;
					  ball.y = 205;
					  ball.vx =0.15;
					  ball.x = 30;
					  ball01.vy = 0.15;
					  ball01.y = 360;
					  ball01.vx = 0.15;
					  ball01.x = 270;
					  ball02.vy = 0.15;
					  ball02.y = 165;
					  ball02.vx = 0.15;
					  ball02.x = 360;
					  ball05.vy = 0.15; 
					  ball05.y = 315;
					  ball05.vx = 0.15;
					  ball05.x = 720;
					  ball06.vy = 0.15;
					  ball06.y = 45;
					  ball06.vx = 0.15;
					  ball06.x = 800;
					  ball07.vy = 0.15;
					  ball07.y = 205;
					  ball07.vx = 0.15;
					  ball07.x = 1050;
					  text01.vy = 0.15;
					  text01.y = 205;
					  text01.vx = 0.15;
					  text01.x = 30;
					  text02.vy = 0.15;
					  text02.y = 360;
					  text02.vx = 0.15;
					  text02.x = 270;
					  text03.vy = 0.15;
					  text03.y = 165;
					  text03.vx = 0.15;
					  text03.x = 360;
					  text04.vy = 0.15;
					  text04.y = 315;
					  text04.vx = 0.15;
					  text04.x = 720;
					  text05.vy = 0.15;
					  text05.y = 45;
					  text05.vx= 0.15;
					  text05.x = 800;
					  text06.vy = 0.15;
					  text06.y = 205;
					  text06.vx = 0.15;
					  text06.x = 1050;
					  setTimeout(function(){
					  	window.cancelAnimationFrame(raf);
					  },100)
				    },1200)
			  }
		}
		 if(ball.active==1){
	  		ball.shadow='rgba(27,137,199,0.8)';
	  		ball.color='hsl(196,14%,'+100+'%)';
		  }
		  if(ball.active==0){
	  	    ball.shadow='rgba(27,137,199,0)';
	  		ball.color='hsl(196,14%,'+93+'%)';
		  }
		  if(ball01.active==1){
	  		ball01.shadow='rgba(27,137,199,0.8)';
	  		ball01.color='hsl(196,14%,'+100+'%)';
		  }
		  if(ball01.active==0){
	  	    ball01.shadow='rgba(27,137,199,0)';
	  		ball01.color='hsl(196,14%,'+93+'%)';
		  }
		  if(ball02.active==1){
	  		ball02.shadow='rgba(27,137,199,0.8)';
	  		ball02.color='hsl(196,14%,'+100+'%)';
		  }
		  if(ball02.active==0){
	  	    ball02.shadow='rgba(27,137,199,0)';
	  		ball02.color='hsl(196,14%,'+93+'%)';
		  }
		  if(ball05.active==1){
	  		ball05.shadow='rgba(27,137,199,0.8)';
	  		ball05.color='hsl(196,14%,'+100+'%)';
		  }
		  if(ball05.active==0){
	  	    ball05.shadow='rgba(27,137,199,0)';
	  		ball05.color='hsl(196,14%,'+93+'%)';
		  }
		  if(ball06.active==1){
	  		ball06.shadow='rgba(27,137,199,0.8)';
	  		ball06.color='hsl(196,14%,'+100+'%)';
		  }
		  if(ball06.active==0){
	  	    ball06.shadow='rgba(27,137,199,0)';
	  		ball06.color='hsl(196,14%,'+93+'%)';
		  }
		  if(ball07.active==1){
	  		ball07.shadow='rgba(27,137,199,0.8)';
	  		ball07.color='hsl(196,14%,'+100+'%)';
		  }
		  if(ball07.active==0){
	  	    ball07.shadow='rgba(27,137,199,0)';
	  		ball07.color='hsl(196,14%,'+93+'%)';
		  }
		  raf = window.requestAnimationFrame(animate);	
}
	
	canvas.addEventListener("mousemove",function(e){
	    var e=e||event;
	    var x=e.clientX-canvasBox.offsetLeft;
	    var y=e.clientY-canvasBox.offsetTop;
	    if(change==1){
		    if(x>=ret01.x&&x<=ret01.x+ret01.w&&y>=ret01.y&&y<=ret01.y+ret01.h){
		      ball.active=1;
		    }else{
		      ball.active=0;
		    }
		    if(x>=ret02.x&&x<=ret02.x+ret02.w&&y>=ret02.y&&y<=ret02.y+ret02.h){
		      ball01.active=1;
		    }else{
		      ball01.active=0;
		    }
		    if(x>=ret03.x&&x<=ret03.x+ret03.w&&y>=ret03.y&&y<=ret03.y+ret03.h){
		      ball02.active=1;
		    }else{
		      ball02.active=0;
		    }
		    if(x>=ret04.x&&x<=ret04.x+ret04.w&&y>=ret04.y&&y<=ret04.y+ret04.h){
		      ball05.active=1;
		    }else{
		      ball05.active=0;
		    }
		    if(x>=ret05.x&&x<=ret05.x+ret05.w&&y>=ret05.y&&y<=ret05.y+ret05.h){
		      ball06.active=1;
		    }else{
		      ball06.active=0;
		    }
		    if(x>=ret06.x&&x<=ret06.x+ret06.w&&y>=ret06.y&&y<=ret06.y+ret06.h){
		      ball07.active=1;
		    }else{
		      ball07.active=0;
		    }
	    }
	})
	canvas.addEventListener("click",function(e){
	    var e=e||event;
	    var x=e.clientX-canvasBox.offsetLeft;
	    var y=e.clientY-canvasBox.offsetTop;
	    if(change==1){
		    if(x>=ret01.x&&x<=ret01.x+ret01.w&&y>=ret01.y&&y<=ret01.y+ret01.h){
		      $.fn.fullpage.moveTo(2)
		    }
		    if(x>=ret02.x&&x<=ret02.x+ret02.w&&y>=ret02.y&&y<=ret02.y+ret02.h){
		      $.fn.fullpage.moveTo(3)
		    }
		    if(x>=ret03.x&&x<=ret03.x+ret03.w&&y>=ret03.y&&y<=ret03.y+ret03.h){
		      $.fn.fullpage.moveTo(4)
		    }
		    if(x>=ret04.x&&x<=ret04.x+ret04.w&&y>=ret04.y&&y<=ret04.y+ret04.h){
		      $.fn.fullpage.moveTo(5)
		    }
		    if(x>=ret05.x&&x<=ret05.x+ret05.w&&y>=ret05.y&&y<=ret05.y+ret05.h){
		      $.fn.fullpage.moveTo(6)
		    }
		    if(x>=ret06.x&&x<=ret06.x+ret06.w&&y>=ret06.y&&y<=ret06.y+ret06.h){
		      $.fn.fullpage.moveTo(7)
		    }
		 }   
	})
	$("#fullpage").fullpage({
		scrollingSpeed:1200,
		scrollOverflow:true,
		afterLoad:function(anchorLink,index){
			if(tof==0){
				$(".headerBox").animate({"top":0},500)
			}
			if(index!=1){
				abc=0;
			}
			switch (index){
				case 1:
				if(pageIndex==0){
					setTimeout(function(){
						animate();
					},1000)
				}else if(pageIndex==1){
					animate();
				};
				break;
				case 2:
				animatePage1B();	
				$(".page1Arrow img").addClass("fadeInLeftBig");
				$(".shou").addClass("shouActive");
				break;
				case 3:
				bannerTab=setInterval(function(){
					if(page2NUM>2){
						page2NUM=0;
					}
					page2NUM+=1;
					animatePage2B();
				},7000);
				animatePage2B();
				break;
				case 4:
				$(".circleA").animate({"bottom":"-80px","opacity":1},300,"linear");
				setTimeout(function(){
					$(".circleB").animate({"top":"20px","opacity":1},300,"linear");
				},200);
				setTimeout(function(){
					$(".circleC").animate({"bottom":"-250px","opacity":1},300,"linear",function(){
						$(".circleD").animate({"bottom":"150px","opacity":1},300,"linear");
						$(".circleE").animate({"bottom":"-186px","opacity":1},300,"linear",function(){
							$(".circleE").addClass("rotate");
						});
					});
				},400);
				
				break;
				case 5:
				$(".page4DivLeft").addClass("page4ActLeft");
				$(".page4DivRight").addClass("page4ActRight");
				break;
				default:
				break;
			}
		},
		onLeave:function(index,nextIndex){
			if(nextIndex!=1){
				$(".headLi").removeClass("headLiAct");
				$(".headLi").eq(nextIndex-2).addClass("headLiAct");
			}
			switch (nextIndex){
				case 1:
				tof=1;
				abc=1;
				pageIndex=1;
				$(".headerBox").animate({"top":"-100px"},300);
				
				$(".qiou").show().animate({"opacity":1},100,"linear",function(){
					
					$(".qiou").find(".qiouCircle").addClass("qiouCircleActive")
				})
				$(".contactBox").animate({"top":"40px","opacity":0},200,function(){
					$(this).hide();
				});
				$(".contactUs").attr("tab",0);
				case 2:
				animatepage1A();
				
				break;
				case 3:
				page2NUM=1;
				clearInterval(bannerTab)
				$(".pageTab").removeClass("pageTabActive");
				animatePage2A();
				break;
				case 4:
				$(".circleE").removeClass("rotate");
				$(".circleD").css({"bottom":"110px","opacity":0});
				$(".circleE").css({"bottom":"-226px","opacity":0});
				$(".circleC").css({"bottom":"-290px","opacity":0});
				$(".circleB").css({"top":"60px","opacity":0})
				$(".circleA").css({"bottom":"-120px","opacity":0});
				break;
				case 5:
				$(".page4DivLeft").removeClass("page4ActLeft");
				$(".page4DivRight").removeClass("page4ActRight");
				break;
				default:
				break;
			}
			switch (index){
				case 1:
				leave=0;
				active=1;
				tof=0;
				$(".canvasBox").animate({'bottom':-30+"%"},800,function(){
//					setTimeout(function(){
						$(".canvasBox").css("bottom",0+"%");
						leave=1;
//					},100)
				});
				$(".qiou").animate({"opacity":0},100,"linear",function(){
					$(".qiou").find(".qiouCircle").removeClass("qiouCircleActive")
				})
			    break;
				case 2:
				$(".page1Arrow img").removeClass("fadeInLeftBig");
				$(".shou").removeClass("shouActive");
				window.cancelAnimationFrame(rafPage1);
				break;
				case 3:
//				page2NUM=1;
				clearInterval(bannerTab);
				window.cancelAnimationFrame(rafPage2);
				break;
				
				default:
					break;
			}	
		}
	});
	
	$.fn.fullpage.setAllowScrolling(false,"down");

	$(".b").animate({"opacity":1},1000,"linear",function(){
		$(".c").animate({"opacity":1},1800,"linear",function(){
			$.fn.fullpage.setAllowScrolling(true,"down");
			$(".qiou").animate({"opacity":1},200,"linear",function(){
				$(this).find(".qiouCircle").addClass("qiouCircleActive")
			})
		})
	})
	$(".headLi").on("mouseenter",function(){
		$(this).addClass("headLiActA");
	})
	$(".headLi").on("mouseleave",function(){
		$(this).removeClass("headLiActA")
	})
	$(".headLi").on("click",function(){
		var num=$(this).data("num");
		$.fn.fullpage.moveTo(num);
	})
	$(".headLiDot").on("click",function(){
		$.fn.fullpage.moveTo(1);
	})
	var setTimeA;
	$(".contactUs").on("click",function(){
		var that = $(this)
		var tab = that.attr("tab");
		var contactBox = $(".contactBox");
		if(tab == 0){
			contactBox.show().animate({"top":"60px","opacity":1},300);
			that.attr("tab",1);
			setTimeA=setTimeout(function(){
				contactBox.animate({"top":"40px","opacity":0},200,function(){
					contactBox.hide();
				});
				that.attr("tab",0);
			},7000)
		}
		if(tab == 1){
			clearTimeout(setTimeA);
			contactBox.animate({"top":"40px","opacity":0},200,function(){
				contactBox.hide();
			});
			that.attr("tab",0);
		}
		
	})
	
//**************************************************************************************************************	
	
	//用在第二页即首页的js
	var page1 = document.getElementById("page1");
	var pg1 = page1.getContext("2d");
	var full = document.getElementById("fullpage");
	var rafPage1;
	var pageWidth = full.offsetWidth;
	var pageHeight = 900;
	var img=document.getElementById("img");
	var imgOffsetWidth=(pageWidth-760)/2
	var pageBall1 = {
	  x: pageWidth*0.104712,
	  y: pageHeight*0.2552381,
	  radius: 56,
	  max:pageWidth*0.13,
	  min:pageWidth*0.08,
	  vx:0.3,
	  color: 'rgba(244,249,250,1)',
	  draw: function() {
	  	pg1.save();
	    pg1.beginPath();
	    pg1.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	    pg1.closePath();
	    pg1.fillStyle = this.color;
	    pg1.fill();
	    pg1.restore();
	  }
	};
	var pageBall2 = {
	  x: pageWidth*0.48585387,
	  y: pageHeight*0.08190476,
	  radius: 56,
	  max:pageWidth*0.52,
	  min:pageWidth*0.46,
	  vx:0.3,
	  color: 'rgba(244,249,250,1)',
	  draw: function() {
	  	pg1.save();
	    pg1.beginPath();
	    pg1.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	    pg1.closePath();
	    pg1.fillStyle = this.color;
	    pg1.fill();
	    pg1.restore();
	  }
	};
	var pageBall3 = {
	  x: pageWidth*0.97172775,
	  y: pageHeight*0.25142857,
	  radius: 56,
	  max:pageWidth*1,
	  min:pageWidth*0.95,
	  vx:0.3,
	  color: 'rgba(244,249,250,1)',
	  draw: function() {
	  	pg1.save();
	    pg1.beginPath();
	    pg1.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	    pg1.closePath();
	    pg1.fillStyle = this.color;
	    pg1.fill();
	    pg1.restore();
	  }
	};
	var pageBall4 = {
	  x: pageWidth*0.14826754,
	  y: pageHeight*0.92761905,
	  radius: 56,
	  max:pageWidth*0.168,
	  min:pageWidth*0.128,
	  vx:0.3,
	  color: 'rgba(244,249,250,1)',
	  draw: function() {
	  	pg1.save();
	    pg1.beginPath();
	    pg1.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	    pg1.closePath();
	    pg1.fillStyle = this.color;
	    pg1.fill();
	    pg1.restore();
	  }
	};
	var pageBall5 = {
	  x: pageWidth*0.33298429,
	  y: pageHeight*0.91761905,
	  radius: 56,
	  max:pageWidth*0.35,
	  min:pageWidth*0.31,
	  vx:0.3,
	  color: 'rgba(244,249,250,1)',
	  draw: function() {
	  	pg1.save();
	    pg1.beginPath();
	    pg1.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	    pg1.closePath();
	    pg1.fillStyle = this.color;
	    pg1.fill();
	    pg1.restore();
	  }
	};
	var pageBall6 = {
	  x: pageWidth*0.44764398,
	  y: pageHeight*0.81904762,
	  radius: 56,
	  max:pageWidth*0.467,
	  min:pageWidth*0.427,
	  vx:0.3,
	  color: 'rgba(244,249,250,1)',
	  draw: function() {
	  	pg1.save();
	    pg1.beginPath();
	    pg1.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	    pg1.closePath();
	    pg1.fillStyle = this.color;
	    pg1.fill();
	    pg1.restore();
	  }
	};
	var pageBall7 = {
	  x: pageWidth*0.66492147,
	  y: pageHeight*0.54571429,
	  radius: 56,
	  max:pageWidth*0.684,
	  min:pageWidth*0.644,
	  vx:0.3,
	  color: 'rgba(244,249,250,1)',
	  draw: function() {
	  	pg1.save();
	    pg1.beginPath();
	    pg1.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	    pg1.closePath();
	    pg1.fillStyle = this.color;
	    pg1.fill();
	    pg1.restore();
	  }
	};
	var pageBall8 = {
	  x: pageWidth*0.73507853,
	  y: pageHeight*0.91904762,
	  radius: 56,
	  max:pageWidth*0.755,
	  min:pageWidth*0.715,
	  vx:0.3,
	  color: 'rgba(244,249,250,1)',
	  draw: function() {
	  	pg1.save();
	    pg1.beginPath();
	    pg1.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
	    pg1.closePath();
	    pg1.fillStyle = this.color;
	    pg1.fill();
	    pg1.restore();
	  }
	};
	var pageLine01={
		draw:function(){
		   pg1.save();
		   pg1.strokeStyle ='rgba(244,249,250,1)';
		   pg1.lineWidth = 15;
		   pg1.beginPath();
		   pg1.moveTo(pageBall1.x,pageBall1.y);
		   pg1.lineTo(pageBall2.x,pageBall2.y);
		   pg1.moveTo(pageBall2.x,pageBall2.y);
		   pg1.lineTo(pageBall6.x,pageBall6.y);
		   pg1.moveTo(pageBall2.x,pageBall2.y);
		   pg1.lineTo(pageBall7.x,pageBall7.y);
		   pg1.moveTo(pageBall1.x,pageBall1.y);
		   pg1.lineTo(pageBall4.x,pageBall4.y);
		   pg1.moveTo(pageBall1.x,pageBall1.y);
		   pg1.lineTo(pageBall6.x,pageBall6.y);
		   pg1.moveTo(pageBall4.x,pageBall4.y);
		   pg1.lineTo(pageBall5.x,pageBall5.y);
		   pg1.moveTo(pageBall5.x,pageBall5.y);
		   pg1.lineTo(pageBall6.x,pageBall6.y);
		   pg1.moveTo(pageBall6.x,pageBall6.y);
		   pg1.lineTo(pageBall7.x,pageBall7.y);
		   pg1.moveTo(pageBall6.x,pageBall6.y);
		   pg1.lineTo(pageBall8.x,pageBall8.y);
		   pg1.moveTo(pageBall7.x,pageBall7.y);
		   pg1.lineTo(pageBall8.x,pageBall8.y);
		   pg1.moveTo(pageBall3.x,pageBall3.y);
		   pg1.lineTo(pageBall8.x,pageBall8.y);
		   pg1.moveTo(pageBall3.x,pageBall3.y);
		   pg1.lineTo(pageBall7.x,pageBall7.y);
		   pg1.moveTo(pageBall1.x,pageBall1.y);
		   pg1.lineTo(pageWidth*0.08376963,0);
		   pg1.moveTo(pageBall1.x,pageBall1.y);
		   pg1.lineTo(pageWidth*0.20314136,0);
		   pg1.moveTo(pageBall2.x,pageBall2.y);
		   pg1.lineTo(pageWidth*0.47277487,0);
		   pg1.moveTo(pageBall3.x,pageBall3.y);
		   pg1.lineTo(pageWidth*0.84816754,0);
		   pg1.moveTo(pageBall3.x,pageBall3.y);
		   pg1.lineTo(pageWidth*0.9591623,0);
		   pg1.closePath();
		   pg1.stroke();
		   pg1.restore();
		}
	}
	page1.width = full.offsetWidth;
	page1.height = 900;
	window.onresize=function(){
		pageWidth = full.offsetWidth;
		pageHeight = 900;
		page1.width = full.offsetWidth;
		page1.height = 900;
		imgOffsetWidth=(pageWidth-760)/2;
		
	}
	function animatepage1A(){
	  pg1.clearRect(0,0, page1.width, page1.height);
      pageBall1.draw();
      pageBall2.draw();
      pageBall3.draw();
      pageBall4.draw();
      pageBall5.draw();
      pageBall6.draw();
      pageBall7.draw();
      pageBall8.draw();
      pageLine01.draw();
      pg1.drawImage(img,imgOffsetWidth,330,760,375);
	}
	function animatePage1B(){
	  pg1.clearRect(0,0, page1.width, page1.height);
      pageBall1.draw();
      pageBall2.draw();
      pageBall3.draw();
      pageBall4.draw();
      pageBall5.draw();
      pageBall6.draw();
      pageBall7.draw();
      pageBall8.draw();
      pageLine01.draw();
      pg1.drawImage(img,imgOffsetWidth,330,760,375);
	  if (pageBall1.x>=pageBall1.max||pageBall1.x<=pageBall1.min) {
	  	pageBall1.vx=-pageBall1.vx
	  }
	  pageBall1.x+=pageBall1.vx;
	  if (pageBall2.x>=pageBall2.max||pageBall2.x<=pageBall2.min) {
	  	pageBall2.vx=-pageBall2.vx
	  }
	  pageBall2.x+=pageBall2.vx;
	  if (pageBall3.x>=pageBall3.max||pageBall3.x<=pageBall3.min) {
	  	pageBall3.vx=-pageBall3.vx
	  }
	  pageBall3.x+=pageBall3.vx;
	  if (pageBall4.x>=pageBall4.max||pageBall4.x<=pageBall4.min) {
	  	pageBall4.vx=-pageBall4.vx
	  }
	  pageBall4.x+=pageBall4.vx;
	  if (pageBall5.x>=pageBall5.max||pageBall5.x<=pageBall5.min) {
	  	pageBall5.vx=-pageBall5.vx
	  }
	  pageBall5.x+=pageBall5.vx;
	  if (pageBall6.x>=pageBall6.max||pageBall6.x<=pageBall6.min) {
	  	pageBall6.vx=-pageBall6.vx
	  }
	  pageBall6.x+=pageBall6.vx;
	  if (pageBall7.x>=pageBall7.max||pageBall7.x<=pageBall7.min) {
	  	pageBall7.vx=-pageBall7.vx
	  }
	  pageBall7.x+=pageBall7.vx;
	  if (pageBall8.x>=pageBall8.max||pageBall8.x<=pageBall8.min) {
	  	pageBall8.vx=-pageBall8.vx
	  }
	  pageBall8.x+=pageBall8.vx;
	  rafPage1 = window.requestAnimationFrame(animatePage1B);	  
	}
	
	  
	var swiper = new Swiper('.swiper-containerA', {
	        loop: true
	    });
	    
//*****************************************************************************************************
	//用在第三页的js
	var page2 = document.getElementById("page2");
	var pg2 = page2.getContext("2d");
	var full = document.getElementById("fullpage");
	var imgBg = document.getElementById("imgBG");
	var round=0;
	var rafPage2;
	page2.width=1070;
	page2.height=565;
	var level1={
	  opacity:1,
	  draw: function() {
	  	pg2.save();
	  	pg2.font="16px 微软雅黑";
	    pg2.textAlign="center";
	    pg2.textBaseline="middle";
	    pg2.shadowColor = "rgba(173,173,176,"+this.opacity/2+")";
	    pg2.shadowOffsetX = 5;
	    pg2.shadowOffsetY = 3;
	    pg2.shadowBlur = 10;
	    pg2.fillStyle = "rgba(98,183,219,"+this.opacity+")";
	    pg2.beginPath();
	    pg2.moveTo(0,0);
	    pg2.arc(85, 340, 40, 0, Math.PI*2, true);
	    pg2.closePath();
	    pg2.fill();
	    pg2.fillStyle = "rgba(67,176,200,"+this.opacity+")";
	    pg2.beginPath();
	    pg2.moveTo(0,0);
	    pg2.arc(240, 225, 56, 0, Math.PI*2, true);
	    pg2.closePath();
	    pg2.fill();
	    pg2.fillStyle = "rgba(45,201,228,"+this.opacity+")";
	    pg2.beginPath();
	    pg2.moveTo(0,0);
	    pg2.arc(482, 268, 56, 0, Math.PI*2, true);
	    pg2.closePath();
	    pg2.fill();
	    pg2.fillStyle = "rgba(91,182,220,"+this.opacity+")";
	    pg2.beginPath();
	    pg2.moveTo(0,0);
	    pg2.arc(725, 117, 62, 0, Math.PI*2, true);
	    pg2.closePath();
	    pg2.fill();
	    pg2.fillStyle = "rgba(137,225,240,"+this.opacity+")";
	    pg2.beginPath();
	    pg2.moveTo(0,0);
	    pg2.arc(858, 265, 50, 0, Math.PI*2, true);
	    pg2.closePath();
	    pg2.fill();
	    pg2.fillStyle = "rgba(97,184,221,"+this.opacity+")";
	    pg2.beginPath();
	    pg2.moveTo(0,0);
	    pg2.arc(975, 414, 40, 0, Math.PI*2, true);
	    pg2.closePath();
	    pg2.fill();
	    pg2.fillStyle = "rgba(96,182,219,"+this.opacity+")";
	    pg2.beginPath();
	    pg2.moveTo(0,0);
	    pg2.arc(680, 446, 54, 0, Math.PI*2, true);
	    pg2.closePath();
	    pg2.fill();
	    pg2.fillStyle = "rgba(255,255,255,"+this.opacity+")";
	    pg2.font = "16px 微软雅黑"; 
	    pg2.shadowColor = "transparent";
	    pg2.shadowOffsetX = 0;
	    pg2.shadowOffsetY = 0;
	    pg2.shadowBlur = 0;
	    pg2.beginPath();
		pg2.fillText("DSP推广",85,340);
		pg2.fillText("管家式",240, 215);
		pg2.fillText("官微运营",240, 235);
		pg2.fillText("爆发式H5",482, 258);
		pg2.fillText("微信传播",482, 278);
		pg2.fillText("精准用户",725, 107);
		pg2.fillText("画像追踪",725, 127);
		pg2.fillText("超1000款",858, 255);
		pg2.fillText("H5游戏库",858, 275);
		pg2.fillText("微客服",975, 404);
		pg2.fillText("系统",975, 424);
		pg2.fillText("微信",680, 436);
		pg2.fillText("会议系统",680, 456);
		pg2.closePath();
	    pg2.fill();
	    pg2.restore();
	  }
	}
	
	var level2={
	  opacity:1,
	  draw: function() {
	  	pg2.save();
	    pg2.lineWidth = 1;
	    pg2.shadowColor = "rgba(173,173,176,"+this.opacity+")";
	    pg2.shadowOffsetX = 3;
	    pg2.shadowOffsetY = 3;
	    pg2.shadowBlur = 6;
	  	pg2.font="16px 微软雅黑";
	    pg2.textAlign="center";
	    pg2.textBaseline="middle";
	    pg2.shadowColor = "rgba(173,173,176,"+this.opacity/2+")";
	    pg2.shadowOffsetX = 5;
	    pg2.shadowOffsetY = 3;
	    pg2.shadowBlur = 10;
	    pg2.fillStyle = "rgba(97,183,220,"+this.opacity+")";
	    pg2.beginPath();
	    pg2.moveTo(0,0);
	    pg2.arc(156, 226, 45, 0, Math.PI*2, true);
	    pg2.closePath();
	    pg2.fill();
	    pg2.fillStyle = "rgba(71,180,204,"+this.opacity+")";
	    pg2.beginPath();
	    pg2.moveTo(0,0);
	    pg2.arc(430, 166, 56, 0, Math.PI*2, true);
	    pg2.closePath();
	    pg2.fill();
	    pg2.fillStyle = "rgba(100,186,223,"+this.opacity+")";
	    pg2.beginPath();
	    pg2.moveTo(0,0);
	    pg2.arc(629, 277, 66, 0, Math.PI*2, true);
	    pg2.closePath();
	    pg2.fill();
	    pg2.fillStyle = "rgba(136,224,239,"+this.opacity+")";
	    pg2.beginPath();
	    pg2.moveTo(0,0);
	    pg2.arc(972, 302, 45, 0, Math.PI*2, true);
	    pg2.closePath();
	    pg2.fill();
	    pg2.fillStyle = "rgba(136,225,240,"+this.opacity+")";
	    pg2.beginPath();
	    pg2.moveTo(0,0);
	    pg2.arc(352, 421, 56, 0, Math.PI*2, true);
	    pg2.closePath();
	    pg2.fill();
	    pg2.fillStyle = "rgba(255,255,255,"+this.opacity+")";
	    pg2.font="bold 16px Arial";
	    pg2.shadowColor = "transparent";
	    pg2.shadowOffsetX = 0;
	    pg2.shadowOffsetY = 0;
	    pg2.shadowBlur = 0;
	    pg2.beginPath();
		pg2.fillText("增强客户",156,216);
		pg2.fillText("忠诚度",156, 235);
		pg2.fillText("提高用户",430, 156);
		pg2.fillText("消费频次",430, 176);
		pg2.fillText("迅速提升",629, 267);
		pg2.fillText("品牌知名度",629, 287);
		pg2.fillText("提升客单价",972, 302);
		pg2.fillText("挖掘销售线索",352, 421);
		pg2.closePath();
	    pg2.fill();
	    pg2.restore();
	  }
	}
	var level3={
	  opacity:1,
	  draw: function() {
	  	pg2.save();
	    pg2.lineWidth = 1;
	    pg2.shadowColor = "rgba(173,173,176,"+this.opacity+")";
	    pg2.shadowOffsetX = 3;
	    pg2.shadowOffsetY = 3;
	    pg2.shadowBlur = 6;
	  	pg2.font="16px 微软雅黑";
	    pg2.textAlign="center";
	    pg2.textBaseline="middle";
	    pg2.shadowColor = "rgba(173,173,176,"+this.opacity/2+")";
	    pg2.shadowOffsetX = 5;
	    pg2.shadowOffsetY = 3;
	    pg2.shadowBlur = 10;
	    pg2.fillStyle = "rgba(71,180,204,"+this.opacity+")";
	    pg2.beginPath();
	    pg2.moveTo(0,0);
	    pg2.arc(408,300, 66, 0, Math.PI*2, true);
	    pg2.closePath();
	    pg2.fill();
	    pg2.fillStyle = "rgba(48,205,232,"+this.opacity+")";
	    pg2.beginPath();
	    pg2.moveTo(0,0);
	    pg2.arc(647, 136, 56, 0, Math.PI*2, true);
	    pg2.closePath();
	    pg2.fill();
	    pg2.fillStyle = "rgba(97,183,220,"+this.opacity+")";
	    pg2.beginPath();
	    pg2.moveTo(0,0);
	    pg2.arc(920, 427, 52, 0, Math.PI*2, true);
	    pg2.closePath();
	    pg2.fill();
	    pg2.fillStyle = "rgba(255,255,255,"+this.opacity+")";
	    pg2.font="16px 微软雅黑";
	    pg2.shadowColor = "transparent";
	    pg2.shadowOffsetX = 0;
	    pg2.shadowOffsetY = 0;
	    pg2.shadowBlur = 0;
	    pg2.beginPath();
		pg2.fillText("不断创新的",408,290);
		pg2.fillText("技术团队",408,310);
		pg2.fillText("4A背景",647, 126);
		pg2.fillText("创意团队",647, 146);
		pg2.fillText("业界领先的",920, 417);
		pg2.fillText("数据产品",920, 437);
		pg2.closePath();
	    pg2.fill();
	    pg2.restore();
	  }
	}
	var animateLineA = {
		a:0,
		draw:function(){
		pg2.save();
		pg2.shadowOffsetX = 3;
	    pg2.shadowOffsetY = 3;
	    pg2.shadowBlur = 6;
	    pg2.lineWidth = 0.5;
	  	pg2.strokeStyle = "rgba(46,202,228,"+this.a+")";
	    pg2.shadowColor = "rgba(173,173,176,"+this.a+")";
	    pg2.beginPath();
	    pg2.moveTo(85, 340);
	    pg2.lineTo(240, 225);
	    pg2.moveTo(85, 340);
	    pg2.lineTo(482, 268);
	    pg2.moveTo(482, 268);
	    pg2.lineTo(725, 117);
	    pg2.moveTo(482, 268);
	    pg2.lineTo(858, 265);
	    pg2.moveTo(482, 268);
	    pg2.lineTo(975, 414);
	    pg2.moveTo(482, 268);
	    pg2.lineTo(680, 446);
	    pg2.moveTo(482, 268);
	    pg2.lineTo(240, 225);
	    pg2.moveTo(725, 117);
	    pg2.lineTo(240, 225);
	    pg2.moveTo(725, 117);
	    pg2.lineTo(858, 265);
	    pg2.moveTo(725, 117);
	    pg2.lineTo(680, 446);
	    pg2.moveTo(858, 265);
	    pg2.lineTo(975, 414);
	    pg2.moveTo(858, 265);
	    pg2.lineTo(680, 446);
	    pg2.moveTo(975, 414);
	    pg2.lineTo(680, 446);
	    pg2.closePath();
	    pg2.stroke();
	    pg2.restore();
	 }
	}
	var animateLineB = {
		b:0,
		draw:function(){
		pg2.save();
		pg2.shadowOffsetX = 3;
	    pg2.shadowOffsetY = 3;
	    pg2.shadowBlur = 6;
	    pg2.lineWidth = 0.5;
	    pg2.strokeStyle ="rgba(46,202,228,"+this.b+")";
	    pg2.shadowColor = "rgba(173,173,176,"+this.b+")";
	    pg2.beginPath();
	    pg2.moveTo(156,226);
	    pg2.lineTo(430,166);
	    pg2.moveTo(156,226);
	    pg2.lineTo(629,277);
	    pg2.moveTo(156,226);
	    pg2.lineTo(352,421);
	    pg2.moveTo(430,166);
	    pg2.lineTo(629,277);
	    pg2.moveTo(430,166);
	    pg2.lineTo(352,421);
	    pg2.moveTo(629,277);
	    pg2.lineTo(352,421);
	    pg2.moveTo(972,302);
	    pg2.lineTo(352,421);
	    pg2.moveTo(972,302);
	    pg2.lineTo(629,277);
	    pg2.closePath();
	    pg2.stroke();
	    pg2.restore();
	 }
	}
	var animateLineC = {
		c:0,
		draw:function(){
		pg2.save();
		pg2.shadowOffsetX = 3;
	    pg2.shadowOffsetY = 3;
	    pg2.shadowBlur = 6;
	    pg2.lineWidth = 1;
	    pg2.strokeStyle ="rgba(46,202,228,"+this.c+")";
	    pg2.shadowColor = "rgba(173,173,176,"+this.c+")";
	    pg2.beginPath();
	    pg2.moveTo(408,300); 
	    pg2.lineTo(647,136);
	    pg2.moveTo(647,136);
	    pg2.lineTo(920,427);
	    pg2.moveTo(920,427);
	    pg2.lineTo(408,300);
	    pg2.closePath();
	    pg2.stroke();
	    pg2.restore();
	 }
	}
	function animatePage2A(){
		pg2.clearRect(0,0, page2.width, page2.height);
//		pg2.drawImage(imgBG,0,0,page2.width,page2.height);
		level1.opacity = 0.6;
		level2.opacity = 0.6;
		level3.opacity = 0.6;
		animateLineA.a=0.6;
		animateLineB.b=0.6;
		animateLineC.c=0.6;
		level2.draw();
		level1.draw();
		level3.draw();
		animateLineA.draw();
		animateLineB.draw();
		animateLineC.draw();
	}
	function animatePage2B(){
		console.log(1);
	  	pg2.clearRect(0,0, page2.width, page2.height);   
        $(".pageTab").removeClass("pageTabActive");
	 	$(".pageTab").eq(page2NUM-1).addClass("pageTabActive");
		 if(page2NUM==1){
		 	if(level2.opacity<=0.1||level1.opacity<=0.1){
		 		level2.opacity=0.1;
		 		level1.opacity=0.1;
		 		animateLineA.a=0.1;
		     	animateLineB.b=0.1;
		     	animateLineA.draw();
		     	animateLineB.draw();
		     	window.cancelAnimationFrame(rafPage2);
		 	}else{
		 		level2.opacity-=0.01;
		 		level1.opacity-=0.01;
		 		animateLineA.a-=0.01;
		     	animateLineB.b-=0.01;
		     	animateLineA.draw();
		     	animateLineB.draw();
		 	}
		 	if(level3.opacity>=1){
		 		level3.opacity=1;
		 		animateLineC.c=1;
		 		animateLineC.draw();
		 		
		 	}else{
		 		level3.opacity+=0.02;
		 		animateLineC.c+=0.02;
		 		animateLineC.draw();
		 	}	 	
	    } 
	    if(page2NUM==2){
	    	if(level2.opacity<=0.1||level3.opacity<=0.1){
		 		level2.opacity=0.1;
		 		level3.opacity=0.1;
		 		animateLineC.c=0.1;
		     	animateLineB.b=0.1;
		     	animateLineC.draw();
		     	animateLineB.draw();
		     	window.cancelAnimationFrame(rafPage2);
		 	}else{
		 		level2.opacity-=0.01;
		 		level3.opacity-=0.01;
		 		animateLineC.c-=0.01;
		     	animateLineB.b-=0.01;
		     	animateLineC.draw();
		     	animateLineB.draw();
		 	}
		 	if(level1.opacity>=1){
		 		level1.opacity=1;
		 		animateLineA.a=1;
		 		animateLineA.draw();
		 	}else{
		 		level1.opacity+=0.02;
		 		animateLineA.a+=0.02;
		 		animateLineA.draw();
		 	}
	    }
	    if(page2NUM==3){
	    	if(level1.opacity<=0.1||level3.opacity<=0.1){
		 		level1.opacity=0.1;
		 		level3.opacity=0.1;
		 		animateLineC.c=0.1;
		     	animateLineA.a=0.1;
		     	animateLineC.draw();
		     	animateLineA.draw();
		     	window.cancelAnimationFrame(rafPage2);
		 	}else{
		 		level1.opacity-=0.01;
		 		level3.opacity-=0.01;
		 		animateLineC.c-=0.01;
		     	animateLineA.a-=0.01;
		     	animateLineC.draw();
		     	animateLineA.draw();
		 	}
		 	if(level2.opacity>=1){
		 		level2.opacity=1;
		 		animateLineB.b=1;
		 		animateLineB.draw();
		 	}else{
		 		level2.opacity+=0.02;
		 		animateLineB.b+=0.02;
		 		animateLineB.draw();
		 	}
	   }
	    level2.draw();
		level1.draw();
		level3.draw();
	  	rafPage2 = window.requestAnimationFrame(animatePage2B);
	} 
	 $(".rightArrowA").on("click",function(){
	 	
	 	if(page2NUM==3){
	 		page2NUM=0;
	 	}
	 	page2NUM++;
	 	$(".pageTab").removeClass("pageTabActive");
	 	$(".pageTab").eq(page2NUM-1).addClass("pageTabActive");
	 	clearInterval(bannerTab)
		bannerTab=setInterval(function(){
			if(page2NUM>2){
				page2NUM=0;
			}
			page2NUM+=1;
		},7000);
	 	animatePage2B();
	 });
	 $(".leftArrowA").on("click",function(){
	 	if(page2NUM==1||page2NUM==0){
	 		page2NUM=4;
	 	}
	 	page2NUM--;
	 	$(".pageTab").removeClass("pageTabActive");
	 	$(".pageTab").eq(page2NUM-1).addClass("pageTabActive");
	 	clearInterval(bannerTab)
		bannerTab=setInterval(function(){
			if(page2NUM>2){
				page2NUM=0;
			}
			page2NUM+=1;
		},7000);
		animatePage2B();
	 });
	 $(".pageTab").on("click",function(){
	 	var index=$(this).index();
	 	page2NUM=index+1;
	 	$(".pageTab").removeClass("pageTabActive");
	 	$(".pageTab").eq(page2NUM-1).addClass("pageTabActive");
	 	clearInterval(bannerTab)
		bannerTab=setInterval(function(){
			if(page2NUM>2){
				page2NUM=0;
			}
			page2NUM+=1;
		},7000);
		animatePage2B();
	 })
	 
	 
//**************************************************************************************************	 
	 
//	用在第四页的js 
    $(".page4Wrap").on("mouseenter",function(){
    	$(this).stop().animate({"top":"-20px"},200,"linear");
    });
	$(".page4Wrap").on("mouseleave",function(){
    	$(this).stop().animate({"top":0},200,"linear");
    });
	 
//	alert(!!(1&1))
//***************************************************************************************************


// 用在第五页的js
	 var swiperB = new Swiper('.swiper-containerB', {
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 27,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        loop: true
    });
	 
	 $(".canvasPage5Box .swiper-slide").on("mouseenter",function(){
	 	var that=$(this);
	 	var content=that.find(".swiperContent");
//	 	that.find(".imgHead").find(".page5Img").css("transform","scale(1.1)");
//	 	that.find(".imgHead").find(".imgHeadYing").show();
	 	content.css({"background": "rgb(29, 198, 230)",
	"background": "-moz-linear-gradient(0deg, rgb(29, 198, 230) 0%, rgb(43, 142, 201) 70%)",
	"background": "-webkit-linear-gradient(0deg, rgb(29, 198, 230) 0%, rgb(43, 142, 201) 70%)",
	"background": "-o-linear-gradient(0deg, rgb(29, 198, 230) 0%, rgb(43, 142, 201) 70%)",
	"background": "-ms-linear-gradient(0deg, rgb(29, 198, 230) 0%, rgb(43, 142, 201) 70%)",
	"background": "linear-gradient(90deg, rgb(29, 198, 230) 0%, rgb(43, 142, 201) 70%)",
	"border-bottom-width":"0"
	 	}).stop().animate({"top":"-250px"},400)
	 	content.find("h3").css("color","#fff");
	    content.find("p").css("color","#fff");
	    content.find("a").css({"color":"#fff"});
//	    that.find(".page5Ying").css("opacity",0);
	 });
	 $(".canvasPage5Box .swiper-slide").on("mouseleave",function(){
	 	var that=$(this);
	 	var content=that.find(".swiperContent");
//	 	that.find(".imgHead").find(".page5Img").css("transform","scale(1)");
//	 	that.find(".imgHead").find(".imgHeadYing").hide();
	 	content.css({"background": "rgb(29, 198, 230)",
	"background": "#fff","border-bottom-width":"1px"}).stop().animate({"top":0},200)
	 	content.find("h3").css("color","#36afca");
	    content.find("p").css("color","#999");
	    content.find("a").css({"color":"#19c8e6"});
//	    that.find(".page5Ying").css("opacity",0.3);
	 });
	
	

	 
//*********************************************************************************************************

// 用在第6页的js
	$(".businessIcon").on("mouseenter",function(){
		$(this).find(".iconB").animate({"opacity":1},300)
	}) 
	 $(".businessIcon").on("mouseleave",function(){
	 	$(this).find(".iconB").animate({"opacity":0},100)
	}) 
	
	
	
	
})






