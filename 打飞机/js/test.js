var jsbg1 = document.getElementById("bg1")
var jsbg2 = document.getElementById("bg2")
var mainscreen = document.getElementById("mainscreen")
var timerBg = setInterval(function(){
	jsbg1.style.top = jsbg1.offsetTop + 1+"px"
	jsbg2.style.top = jsbg2.offsetTop + 1 +"px"
	
	if(jsbg1.offsetTop>=568){
		jsbg1.style.top = "-568px"
	}
	if(jsbg2.offsetTop>=568){
		jsbg2.style.top = "-568px"
	}
})

var airplane = document.getElementById("airplane")
airplane.addEventListener("mousedown",function(e){
	var ev = e
	basex = ev.pageX
	basey = ev.pageY
	movex = 0
	movey = 0
	console.log("点击事件")
	
  	mainscreen.addEventListener(
		"mousemove",function(e){
			var ee = e
			movex=ee.pageX-basex
			basex = ee.pageX
			movey = ee.pageY-basey
			basey = ee.pageY
			
			airplane.style.left = airplane.offsetLeft + movex +"px"
			airplane.style.top = airplane.offsetTop + movey + "px"
		
		}
	)
},false)

//发射子弹
var timerbullent = setInterval(function(){
	var bullent = document.createElement("div")
	bullent.className="bullent"
	bullent.style.left = airplane.offsetLeft+30+"px"
	bullent.style.top = airplane.offsetTop - 10 + "px"
	mainscreen.appendChild(bullent)
	
	var timebullentfly = setInterval(function(){
		bullent.style.top = bullent.offsetTop-5+"px"
		if(bullent.offsetTop < 20){
			clearInterval(timebullentfly)
			mainscreen.removeChild(bullent)
		}
	},15)
	bullent.timer = timebullentfly
},350)



//敌人出现
var timerenemy = setInterval(function(){
	var enemy = document.createElement("div")
	enemy.className="enemy"
	enemy.style.left = parseInt(Math.random()*270)+"px"
	enemy.style.top = 0 + "px"
	mainscreen.appendChild(enemy)
	
	var timebullentfly = setInterval(function(){
		enemy.style.top = enemy.offsetTop+5+"px"
		if(enemy.offsetTop > 500){
			clearInterval(timebullentfly)
			mainscreen.removeChild(enemy)
		}
	},50)
	enemy.timer = timebullentfly
},1000)


var timerpzjc = setInterval(function(){
	var alltanks = document.getElementsByClassName("enemy")
	var allbullents = document.getElementsByClassName("bullent")
	for(var i = 0;i < allbullents.length;i++)
	{
		
		for(var j=0;j<alltanks.length;j++)
		{
			var b = allbullents[i]
			var t = alltanks[j]
			if(pzjcfunc(b,t)){
				clearInterval(b.timer)
				clearInterval(t.timer)
				
				mainscreen.removeChild(b)
				mainscreen.removeChild(t)
				break
			}
			
		}
}
},50)

var timerdied = setInterval(function(){
	var alltanks = document.getElementsByClassName("enemy")

		for(var i=0;i<alltanks.length;i++)
		{
			if(pzjcfunc(alltanks[i],airplane)){
				for(var j=0;j<100;j++)
				{
					clearInterval(j)
				}
				mainscreen.removeChild(airplane)
			}
		}
},50)

//碰撞检测
function pzjcfunc(obj1,obj2){
	var obj1left = obj1.offsetLeft;
	var obj1width = obj1left+obj1.offsetWidth;
	var obj1top = obj1.offsetTop;
	var obj1height = obj1top+obj1.offsetHeight;
	
	var obj2left = obj2.offsetLeft;
	var obj2width = obj2left+obj2.offsetWidth;
	var obj2top = obj2.offsetTop;
	var obj2height = obj2top + obj2.offsetHeight;
	
	if(!(obj1left>obj2width||obj1width<obj2left
	||obj1top>obj2height||obj1height<obj2top))
	{
		return true;
	}
	else{
		return false;
	}
}
