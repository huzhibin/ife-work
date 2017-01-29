var boxNum = [];
var regNum = /^(0|[1-9][0-9]*)$/;
var barWidth = 10;
var barSpacing = 1;
// var inputBtn = document.getElementsByClassName("inputBtn");
var inputWrapper = document.getElementById("inputWrapper");
var boxWrapper = document.getElementById("boxWrapper");
inputWrapper.addEventListener("click", inputBtnHandler, "false");
boxWrapper.addEventListener("click", boxNumHandler, "false");

function checkInput(inputNum){
	//检查输入
	if(!regNum.test(inputNum) || inputNum < 10 || inputNum > 100){
		alert("请输入10-100之间的数字");
		return false;
	}
	if(boxNum.length > 60){
		alert("队列元素个数超出限制");
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
		}else if("sortBtn" == e.target.id){
			renderSort();
			return;
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
	if(undefined != arguments[0] && null != arguments[0]){
		boxNum = arguments[0];
	}
	var wrapper = document.getElementById("boxWrapper"); 
	wrapper.innerHTML = "";
	var boxLen = boxNum.length;
	var beginX = parseInt((
			(wrapper.clientWidth - (barWidth + barSpacing) * boxLen) 
			/ 2).toFixed(0));

	for (var i = 0; i < boxLen; i++) {
		var boxDiv = document.createElement("div");
		var beginPos = parseInt(beginX + i * (barWidth + barSpacing));
		boxDiv.className = "boxNum";
		boxDiv.title = boxNum[i];
		boxDiv.dataset.id = i;

		/**
		 * 为什么task017设置style.height不需要加px,而这里需要。。。
		 * 因为这个搞了一个小时，-_-
		 */
		boxDiv.style.height = boxNum[i] + 'px';
		boxDiv.style.left = beginPos + 'px';
		wrapper.appendChild(boxDiv);
	}
}

function renderSort(){
	var length = boxNum.length;
	var count = 0;
	for (var i = 0; i < length; i++) {
		for (var j = i + 1; j < length; j++) {
			if(boxNum[i] > boxNum[j]){
				var temp = boxNum[i];
				boxNum[i] = boxNum[j];
				boxNum[j] = temp;
				count++;
				/**
				 * 方法一
				 * @return {[type]} [description]
				 */
				(function(){
					var numTemp = boxNum.concat();
					setTimeout(  function(){
							console.log(numTemp);
							renderBox(numTemp);
						}
						, 700*count);						
				})();
			}
		}
	}
}