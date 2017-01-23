/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var cityReg = /^([\u4e00-\u9fa5a-zA-Z]+)$/gi;
	var aqiReg = /^(0|[1-9][0-9]*)$/g;
	var city = document.getElementById('aqi-city-input');
	var aqi = document.getElementById('aqi-value-input');
	if(!cityReg.test(city.value.trim())){
		alert("城市名必须为中英文字符");
		return;
	}
	if(!aqiReg.test(aqi.value.trim())){
		alert("空气质量指数必须为整数");
		return;
	}
	aqiData[city.value.trim()] = aqi.value.trim();
	renderAqiList();
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById("aqi-table");
	// var trLength = table.childNodes.length;
 //  	for (var j = 1; j < trLength; j++) {
 //   		table.removeChild(table.childNodes[1]);
 //  	}
 	table.innerHTML = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
	for (city in aqiData) {
		if (aqiData.hasOwnProperty(city)) {
			var tr = document.createElement("tr");
			tr.innerHTML = '<td>' + city + '</td><td>' + aqiData[city] + 
					'</td><td><button>删除</button></td>';
			table.appendChild(tr);
		}
	}
	
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
  	if(e.target.nodeName == "button"){
	  	var cityName = e.target.parentNode.parentNode.parentNode.
	  		getElementsByTagName("tr")[1].getElementsByTagName("td")[0].innerHTML;
	  	delete aqiData[cityName];
	  	renderAqiList();
  	}
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  	var add_btn = document.getElementById("add-btn");
  	add_btn.addEventListener('click', addBtnHandle, false);

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	var table = document.getElementById("aqi-table");
  	table.addEventListener('click', delBtnHandle, false);	  	
}

init();