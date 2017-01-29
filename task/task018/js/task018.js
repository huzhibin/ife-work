var boxNum = [];
var regNum = /^(0|[1-9][0-9]*)$/;
// var inputBtn = document.getElementsByClassName("inputBtn");
var inputWrapper = document.getElementById("inputWrapper");
var boxWrapper = document.getElementById("boxWrapper");
inputWrapper.addEventListener("click", inputBtnHandler, "false");
boxWrapper.addEventListener("click", boxNumHandler, "false");

function checkInput(inputNum){
	//检查输入
	if(!regNum.test(inputNum)){
		alert("请输入数字");
		return false;
	}
	return true;
}
function inputBtnHandler(e){

	if(e.target && "button" == e.target.nodeName.toLowerCase()){
		var inputNum = document.getElementById("inputNum").value.trim();

		if("leftIn" == e.target.id){
			if(checkInput(inputNum)){
				boxNum.unshift(parseInt(inputNum));
			}
		}else if("rightIn" == e.target.id){
			if(checkInput(inputNum)){
				boxNum.push(parseInt(inputNum));
			}
		}else if("leftOut" == e.target.id){
			boxNum.shift(parseInt(inputNum));
		}else if("rightOut" == e.target.id){
			boxNum.pop(parseInt(inputNum));
		}

		renderBox();
	}
}

function boxNumHandler(e){

	if(e.target && "div" == e.target.nodeName.toLowerCase()){
		
		if("boxNum" == e.target.className){
			boxNum.splice(e.target.dataset.id, 1);
		}

		renderBox();
	}
}

//渲染数字块
function renderBox(){
	var boxWrapper = document.getElementById("boxWrapper");
	boxWrapper.innerHTML = "";
	for (var i = 0; i < boxNum.length; i++) {
		var boxDiv = document.createElement("div");
		boxDiv.className = "boxNum";
		boxDiv.dataset.id = i;
		boxDiv.innerHTML = boxNum[i];
		boxWrapper.appendChild(boxDiv);
	}
}