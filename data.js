var data={
	 x:["10月","11月","12月","1月","2月","3月"],
	 y:[0,50,100,150,200,250,300],
	 xUnit:"月",
	 yUnit:"万元/㎡",
	 data:[{hue:"red",da:[50,70,50,80,42,66]},
	       {hue:"blue",da:[50,130,67,150,85,130]}
	 ]
}
draw(data);
function draw(data) {
	var cvs=document.querySelector(".cvs"),//画布
		ctx=cvs.getContext("2d"),//上下文绘图环境
		size={
			w:cvs.width,//画布的尺寸
			h:cvs.height
		},

		padding={
			t:30/400*size.h,//上 距离画布的距离 30
			r:30/600*size.w,//右 距离画布的距离 30
			b:70/400*size.h,//下 距离画布的距离 30
			l:90/600*size.w //左 距离画布的距离 30
		},
		axel={//x轴线的宽和y轴线的高
			w:size.w-padding.l-padding.r,//宽=画布宽- 左-右 540
			h:size.h-padding.t-padding.b//高=画布高- 上-下 340
		}
		// console.log(padding.l)
		// console.log(axel.w);
		var len=data.y.length,
		//y轴平均分成数据的长度
			dis=axel.h/len;
		var xlen=data.x.length,
			xdis=axel.w/xlen;
			//console.log(dis);
		//主轴线
		ctx.lineWidth=1;
		// ctx.moveTo(padding.l,padding.t+dis);//左上角的点
		// ctx.lineTo(padding.l,padding.t+axel.h);//左下角的点 
		// ctx.lineTo(padding.l+axel.w,padding.t+axel.h);//右下角的点
		// ctx.lineTo(padding.l+axel.w,padding.t)//右上角的点
		// ctx.closePath();//闭合到起始位置
		// ctx.stroke();

		
		//画刻度
		//y轴
		for(var y=1;y<=len;y++){
			ctx.beginPath();
			ctx.lineTo(padding.l,padding.t+axel.h-dis*(y-1));//从第一个刻度开始画
			ctx.lineTo(padding.l+axel.w-xdis,padding.t+axel.h-dis*(y-1));
			ctx.stroke(); 
			//数字
			ctx.fillText(data.y[y-1],padding.l-25,padding.t+axel.h-dis*(y-1)+10);
		}
		//画刻度
		//x轴
		
		for(var x=1;x<=xlen;x++){
			ctx.beginPath();
			ctx.moveTo(padding.l+xdis*(x-1),padding.t+axel.h);
			ctx.lineTo(padding.l+xdis*(x-1),padding.t+dis);
			ctx.stroke();
			//文字
			ctx.fillText(data.x[x-1],padding.l+xdis*(x-1),padding.t+axel.h+12);
		}
		//数据 红色
		ctx.beginPath();
		var red=data.data[0].da;
		for(let j=0;j<red.length;j++){
				ctx.strokeStyle=data.data[0].hue;
				ctx.arc(padding.l+xdis*j,padding.l+axel.h-red[j]-dis-8,5,0,2*Math.PI)
				ctx.stroke();
		}
		//数据 蓝色
		ctx.beginPath();
		var blue=data.data[1].da;
		for(let k=0;k<blue.length;k++){
				ctx.strokeStyle=data.data[1].hue;
				ctx.arc(padding.l+xdis*k,padding.l+axel.h-blue[k]-dis,5,0,2*Math.PI)
				ctx.stroke();
		}
		
		//万元
		var text=data.yUnit;
		ctx.fillText(text,padding.l,padding.t+dis-10);

		
}