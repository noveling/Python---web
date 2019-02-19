var jsbox = document.getElementById("box")
var jspic = document.getElementById("pic")
var jsleft = document.getElementById("left")
var jsright = document.getElementById("right")
var jslis = document.getElementsByTagName("li")

jslis[0].style.backgroundColor = "red"

//#启动定时器
var currentPage = 1
var timer = setInterval(startloop,1000)

function startloop(){
	currentPage++
	changePage()
	
}

function changePage(){
	if(currentPage==8){
		currentPage=1
	}
	if(currentPage==0){
		currentPage=7
	}
	jspic.src = "img/"+ currentPage+".jpg"
	for(var i=1;i<=jslis.length;i++)
	{
		jslis[i-1].style.backgroundColor="#aaa"
	}
	jslis[currentPage-1].style.backgroundColor="red"
}

jsbox.addEventListener("mouseover",overFunc,false)
function overFunc(){
	clearInterval(timer)
	jsleft.style.display = "block"
	jsright.style.display = "block"
}
jsbox.addEventListener("mouseout",outFunc,false)
function outFunc(){
	timer = setInterval(startloop,1000)
	jsleft.style.display = "none"
	jsright.style.display = "none"
}

jsleft.addEventListener("mouseover",deep,false)
jsleft.addEventListener("mouseout",shallow,false)
function deep(){
	this.style.backgroundColor = "rgba(0,0,0,0.8)"
}

function shallow(){
	this.style.backgroundColor = "rgba(0,0,0,0.2)"
}

jsright.addEventListener("mouseover",deep,false)
jsright.addEventListener("mouseout",shallow,false)
function deep(){
	this.style.backgroundColor = "rgba(0,0,0,0.8)"
}

function shallow(){
	this.style.backgroundColor = "rgba(0,0,0,0.2)"
}
jsright.addEventListener("click",function(){
	currentPage++
	changePage()
},false)

jsleft.addEventListener("click",function(){
	currentPage--
	changePage()
},false)


//进圆点
for(var i=0;i<jslis.length;i++){
	jslis[i].addEventListener("mouseover",function(){
		currentPage = parseInt(this.innerHTML)
		changePage()
	},false)
}
