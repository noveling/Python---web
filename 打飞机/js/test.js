var jsbg1 = document.getElementById("bg1")
var jsbg2 = document.getElementById("bg2")
var mainscreen = document.getElementById("mainscreen")
var score = 0
var scoreinfo = document.getElementById("score")
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

var boomitem = Array()

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
	bullent.style.left = airplane.offsetLeft + 30 + "px"
	bullent.style.top = airplane.offsetTop - 10 + "px"
	mainscreen.appendChild(bullent)
	
	var timebullentfly = setInterval(function(){
		bullent.style.top = bullent.offsetTop-5+"px"
		if(bullent.offsetTop < 20){
			clearInterval(timebullentfly);
			mainscreen.removeChild(bullent);
		}
	},10)
	bullent.timer = timebullentfly
},350)

//杂鱼出现
var timertrash = setInterval(function(){
	var trash = document.createElement("div")
	trash.className = "trash"
	trash.style.left = parseInt(Math.random()*286) + 17 + "px";
	trash.style.top = 0 + "px"
	mainscreen.appendChild(trash)

	var trashfly = setInterval(function(){
		trash.style.top = trash.offsetTop + 3 + "px";
		if(trash.style.top > 500){
			clearInterval(trashfly);
			mainscreen.removeChild(enemy);
		}
	},20)
	trash.timer = timertrash
},1000)



//敌人出现
var timerenemy = setInterval(function(){
	var enemy = document.createElement("div")
	enemy.className="enemy"
	enemy.setAttribute("life",2);
	enemy.style.left = parseInt(Math.random()*270)+23+"px"
	enemy.style.top = 0 + "px"
	mainscreen.appendChild(enemy)
	
	var timebullentfly = setInterval(function(){
		enemy.style.top = enemy.offsetTop+5+"px"
		if(enemy.offsetTop > 500){
			clearInterval(timebullentfly);
			mainscreen.removeChild(enemy);
		}
	},50)
	enemy.timer = timebullentfly
},1000)

//生成大飞机
var timerbossplane = setInterval(function(){
	var bossplane = document.createElement("div");
	bossplane.className = "bossplane";
	bossplane.setAttribute("life",6);
	bossplane.style.left = parseInt(Math.random()*200)+60+"px";
	bossplane.style.top = 0 + "px";
	mainscreen.appendChild(bossplane);
	var timebullentfly = setInterval(function(){
		bossplane.style.top = bossplane.offsetTop+2+"px";
		if(bossplane.offsetTop > 500){
			clearInterval(timebullentfly);
			mainscreen.removeChild(bossplane);
		}
	},100)
	bossplane.timer = timebullentfly
},13000)


//生成爆炸效果
for(var i = 0; i < 20; i++){
	boomitem.push(document.createElement("div"))
}

//击中杂鱼
var trashpzjc = setInterval(function(){
	var alltanks = document.getElementsByClassName("trash")
	var allbullents = document.getElementsByClassName("bullent")
	for(var i = 0;i < allbullents.length;i++)
	{
		for(var j=0;j<alltanks.length;j++)
		{
			var b = allbullents[i]
			var t = alltanks[j]
			if(pzjcfunc(b,t)){
				clearInterval(b.timer)
				mainscreen.removeChild(b)
				score +=5
				console.log("得分:"+scoreinfo.innerHTML)
				console.log(t.style.background)
				scoreinfo.innerHTML=score.toString()
				clearInterval(t.timer)
				mainscreen.removeChild(t)
				var boom = boomitem.pop()
				boom.style.display = "block"
				boom.className = "trashboom"
				boom.style.left = t.style.left
				boom.style.top = t.style.top
				mainscreen.appendChild(boom)
				var boomflight = setTimeout(function(){
					console.log(boom.style.background)
					mainscreen.removeChild(boom)
					boomitem.push(boom)
				},150);
				boom.timer = boomflight
					break
			}
		}
	}
},50)


//击中普通敌机
var enemypzjc = setInterval(function(){
	var alltanks = document.getElementsByClassName("enemy")
	var allbullents = document.getElementsByClassName("bullent")
	for(var i = 0;i < allbullents.length;i++)
	{
		
		for(var j=0;j<alltanks.length;j++)
		{
			var b = allbullents[i]
			var t = alltanks[j]
			var life = parseInt(t.getAttribute("life"));
			if(pzjcfunc(b,t)){
				life --;
				t.setAttribute("life",life);
				scoreinfo.innerHTML=score.toString()
				clearInterval(b.timer)
				mainscreen.removeChild(b)
				if(life == 1){
					t.style.backgroundImage = "url('img/中飞机挨打.png')"
				}
				if(life == 0){
					score +=10
					console.log("得分:"+scoreinfo.innerHTML)
					console.log(t.style.background)
					scoreinfo.innerHTML=score.toString()
					clearInterval(t.timer)
					mainscreen.removeChild(t)
					var boom = boomitem.pop()
					boom.style.display = "block"
					boom.className = "boom"
					boom.style.left = t.style.left
					boom.style.top = t.style.top
					mainscreen.appendChild(boom)
					var boomflight = setTimeout(function(){
						console.log(boom.style.background)
						mainscreen.removeChild(boom)
						boomitem.push(boom)
					},120);
					boom.timer = boomflight
				}
				break
			}
		}
	}
},50)

//击中boss敌机
var bosspzjc = setInterval(function(){
	var alltanks = document.getElementsByClassName("bossplane")
	var allbullents = document.getElementsByClassName("bullent")
	for(var i = 0;i < allbullents.length;i++)
	{
		
		for(var j=0;j<alltanks.length;j++)
		{
			var b = allbullents[i]
			var t = alltanks[j]
			var life = parseInt(t.getAttribute('life'))
			if(pzjcfunc(b,t)){
				if(life > 1){
					score += 1
					scoreinfo.innerHTML=score.toString()
				}
				life --;
				t.setAttribute("life",life)
				console.log("boss生命值：" + t.getAttribute('life'))
				scoreinfo.innerHTML=score.toString()
				console.log("得分:"+scoreinfo.innerHTML)
				console.log(t.style.background)
				clearInterval(b.timer)
				mainscreen.removeChild(b)
				if(life ==4){
					t.style.backgroundImage = "url('img/大飞机挨打.png')"
				}
				if(life == 0){
					score +=30
					scoreinfo.innerHTML=score.toString()
					clearInterval(t.timer);
					mainscreen.removeChild(t);
					var boom = boomitem.pop();
					boom.style.display = "block";
					boom.className = "bossboom";
					boom.style.left = t.style.left;
					boom.style.top = t.style.top;
					mainscreen.appendChild(boom);
					var boomflight = setTimeout(function(){
						console.log(boom.style.background);
						mainscreen.removeChild(boom);
						boomitem.push(boom);
					},400);
					boom.timer = boomflight;
				}
				break;
			}
		}
	}
},50)

var timerdied = setInterval(function(){
	var alltanks = document.getElementsByClassName("enemy")
	var alltrashes = document.getElementsByClassName("trash")
	var allbossplane = document.getElementsByClassName("bossplane")
	for(var i=0;i<alltrashes.length;i++)
	{
		if(pzjcfunc(alltrashes[i],airplane)){
			for(var j=0;j<1000;j++)
			{
				clearInterval(j)
			}
			clearInterval(timerenemy)
			clearInterval(timerbossplane)
			clearInterval(timertrash)
			clearInterval(timerbullent)
			while(mainscreen.hasChildNodes()){
				mainscreen.removeChild(mainscreen.firstChild);
			}
			var bg = document.createElement("div")
			bg.className = "funbg"
			mainscreen.appendChild(bg)
			var reframe = document.createElement("div")
			reframe.className = "firstbutton"
			bg.appendChild(reframe)
			var rebutton = document.createElement("button")
			rebutton.innerHTML="重新开始"
			rebutton.addEventListener("click",function(){
				window.location.reload()
			})
			reframe.appendChild(rebutton)
			var scoretext = document.createElement("p")
			scoretext.className = "content-text"
			scoretext.id = "js_addscore"
			scoretext.innerHTML = "得分："+ score;
			mainscreen.appendChild(scoretext);
		}
	}
	for(var i=0;i<allbossplane.length;i++)
	{
		if(pzjcfunc(allbossplane[i],airplane)){
			for(var j=0;j<1000;j++)
			{
				clearInterval(j)
			}
			clearInterval(timerenemy)
			clearInterval(timerbossplane)
			clearInterval(timertrash)
			clearInterval(timerbullent)
			while(mainscreen.hasChildNodes()){
				mainscreen.removeChild(mainscreen.firstChild);
			}
			var bg = document.createElement("div")
			bg.className = "funbg"
			mainscreen.appendChild(bg)
			var reframe = document.createElement("div")
			reframe.className = "firstbutton"
			bg.appendChild(reframe)
			var rebutton = document.createElement("button")
			rebutton.innerHTML="重新开始"
			rebutton.addEventListener("click",function(){
				window.location.reload()
			})
			reframe.appendChild(rebutton)
			var scoretext = document.createElement("p")
			scoretext.className = "content-text"
			scoretext.id = "js_addscore"
			scoretext.innerHTML = "得分："+ score;
			mainscreen.appendChild(scoretext);
		}
	}
	for(var i=0;i<alltanks.length;i++)
	{
		if(pzjcfunc(alltanks[i],airplane)){
			for(var j=0;j<1000;j++)
			{
				clearInterval(j)
			}
			clearInterval(timerenemy)
			clearInterval(timerbossplane)
			clearInterval(timertrash)
			clearInterval(timerbullent)
			while(mainscreen.hasChildNodes()){
				mainscreen.removeChild(mainscreen.firstChild);
			}
			// var removeenemy = document.getElementsByClassName("enemy");
			// for(var i = 0; i < removeenemy.length;i++){
			// 	removeenemy[i].parentNode.removeChild(removeenemy[i]);
			// }
			var bg = document.createElement("div")
			bg.className = "funbg"
			mainscreen.appendChild(bg)
			var reframe = document.createElement("div")
			reframe.className = "firstbutton"
			bg.appendChild(reframe)
			var rebutton = document.createElement("button")
			rebutton.innerHTML="重新开始"
			rebutton.addEventListener("click",function(){
				window.location.reload()
			})
			reframe.appendChild(rebutton)
			var scoretext = document.createElement("p")
			scoretext.className = "content-text"
			scoretext.id = "js_addscore"
			scoretext.innerHTML = "得分："+ score;
			mainscreen.appendChild(scoretext);
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

function sleep(d){
	for(var t = Date.now();Date.now() - t <= d;);
  }