/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
var fillColor = ['red', 'black', 'purple', 'green', 'blue'];

// 获取对象中的最大值
function getMaxNum(obj){
  var maxNum;
  for (var attr in obj) {
    if ((undefined == maxNum || maxNum < obj[attr]) && attr != "length") {
      maxNum = obj[attr];
    }
  }
  return maxNum;
}

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
// chartData = {
//  "北京" : {
//      "day" : {
//        "2016-01-01" : "",
//        "2016-01-01" : "",
//        ...
//        "2016-01-01" : "",
//        length : 91
//      },
//      "week" : {},
//      "month" : {}
//  }
// }
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

function canvasRender() {
  var c = document.getElementById("myCanvas");
  var cxt = c.getContext("2d");
  c.height = c.height;

  cxt.translate(c.width, c.height);
  cxt.rotate(Math.PI);
 
  var barWidth; //柱状图宽度
  var barSpacing = 1; //柱状图间隔
  var beginX; //x轴起点坐标
  var maxHeight = getMaxNum(chartData[pageState.nowSelectCity][pageState.nowGraTime]);

  if("day" == pageState.nowGraTime){
    barWidth = 5;
    beginX = parseInt(((c.width - 
      (barWidth + barSpacing)*chartData[pageState.nowSelectCity].day.length)/2).
      toFixed(0));
  }else if("week" == pageState.nowGraTime){
    barWidth = 15;
    beginX = parseInt(((c.width - 
      (barWidth + barSpacing)*chartData[pageState.nowSelectCity].week.length)/2).
      toFixed(0));
  }else if("month" == pageState.nowGraTime){
    barWidth = 35;
    beginX = parseInt(((c.width - 
      (barWidth + barSpacing)*chartData[pageState.nowSelectCity].month.length)/2).
      toFixed(0));
  }
  for (var i = 0; i < chartData[pageState.nowSelectCity][pageState.nowGraTime].length; 
      i++) {
    cxt.fillStyle = fillColor[i%5];
    var beginPos = (parseInt(beginX) + 
          (chartData[pageState.nowSelectCity][pageState.nowGraTime].length - i - 1) * 
          (barWidth + barSpacing));
    var height = parseInt(chartData[pageState.nowSelectCity][pageState.nowGraTime][i]) *
          ((0.9 * c.height)/ maxHeight);
    cxt.fillRect( beginPos, 0, barWidth, height);
  }
}

function domRender(){
  var chart = document.getElementById("aqi-chart-wrap");
  chart.innerHTML = "";
  var chartWidth = chart.clientWidth;

  var barWidth; //柱状图宽度
  var barSpacing = 1; //柱状图间隔
  var beginX; //x轴起点坐标

  if("day" == pageState.nowGraTime){
    barWidth = 5;
    beginX = parseInt(((chartWidth - 
      (barWidth + barSpacing)*chartData[pageState.nowSelectCity].day.length)/2).
      toFixed(0));
  }else if("week" == pageState.nowGraTime){
    barWidth = 15;
    beginX = parseInt(((chartWidth - 
      (barWidth + barSpacing)*chartData[pageState.nowSelectCity].week.length)/2).
      toFixed(0));
  }else if("month" == pageState.nowGraTime){
    barWidth = 35;
    beginX = parseInt(((chartWidth - 
      (barWidth + barSpacing)*chartData[pageState.nowSelectCity].month.length)/2).
      toFixed(0));
  }

  var i = 0;
  for (var attr in chartData[pageState.nowSelectCity][pageState.nowGraTime]) {
    var beginPos = parseInt(beginX + i * (barWidth + barSpacing));
    var height = parseInt(chartData[pageState.nowSelectCity][pageState.nowGraTime][attr]);
    var domDiv = document.createElement("div");
    domDiv.className = "domBar";
    domDiv.title = attr + "\n" + height;
    domDiv.style.backgroundColor = fillColor[i%5];
    domDiv.style.width = barWidth;
    domDiv.style.height = height;
    domDiv.style.left = beginPos;
    chart.appendChild(domDiv);
    i++;
  }
}
/**
 * 渲染图表
 */
function renderChart() {
  // canvasRender(); //用canvas绘制柱状图
  domRender(); //用dom绘制柱状图
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var formGraTime = document.getElementById("form-gra-time");
  var graTime = formGraTime.getElementsByTagName("input");
  var nowGraTime;
  for (var i = 0; i < graTime.length; i++) {
    if(graTime[i].checked){
      nowGraTime = graTime[i].value;
    }
  }
  if(nowGraTime == pageState.nowGraTime){
    return;
  }

  // 设置对应数据
  pageState.nowGraTime = nowGraTime;

  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var citySelect = document.getElementById("city-select");
  var nowSelectCity = citySelect.options[citySelect.selectedIndex].value;
  if(nowSelectCity == pageState.nowSelectCity){
    return;
  }

  // 设置对应数据
  pageState.nowSelectCity = nowSelectCity;
  
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var formGraTime = document.getElementById("form-gra-time");
  pageState.nowGraTime = "day";
  formGraTime.addEventListener('click', function(e){
    if(e.target.nodeName.toLowerCase() == "input"){
      graTimeChange();
    }
  }, false);

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect = document.getElementById("city-select");
  var nowSelectCity = citySelect.options[0].value;
  pageState.nowSelectCity = nowSelectCity;
  var tempHtml = '';
  for (var city in aqiSourceData) {
    if (aqiSourceData.hasOwnProperty(city)) {
      tempHtml += '<option value="' + city + '">' + city + '</option>';
    }
  }
  citySelect.innerHTML = tempHtml;

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.addEventListener('click', citySelectChange, false);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var dat = new Date("2016-01-01");
  var weekSum = 0; //本周数据之和
  var monthSum = 0; //本月数据之和
  var weekCount = 0; // 本周天数
  var monthCount = 0; // 本月天数
  var i = 0;
  var j = 0; // 本年第几周
  var k = 0; // 本年第几月
  for (var city in aqiSourceData) {
    if (aqiSourceData.hasOwnProperty(city)) {
      chartData[city] = {};
      chartData[city]["day"] = {};
      chartData[city]["week"] = {};
      chartData[city]["month"] = {};
      dat = new Date("2016-01-01");
      weekSum = 0; //本周数据之和
      monthSum = 0; //本月数据之和
      weekCount = 0; // 本周天数
      monthCount = 0; // 本月天数
      i = 0;
      j = 0; // 本年第几周
      k = 0; // 本年第几月

      // 处理日数据
      chartData[city]["day"] = aqiSourceData[city];
      for (i = 0; i < 91; i++) {

        //处理周数据
        weekSum += aqiSourceData[city][getDateStr(dat)];
        weekCount += 1;          
        if (0 == dat.getDay()) {
          chartData[city]["week"][j++] = parseInt((weekSum/weekCount).toFixed(0));
          weekSum = 0;
          weekCount = 0;
        }

        // 处理月数据
        monthSum += aqiSourceData[city][getDateStr(dat)];
        monthCount += 1;
        var tempDate = new Date(dat);
        dat.setDate(dat.getDate() + 1); //日期加一天
        if (1 == dat.getDate()) {
          chartData[city]["month"][(getDateStr(tempDate)).substring(0, 7)] = 
            parseInt((monthSum/monthCount).toFixed(0));
          monthSum = 0;
          monthCount = 0;
        }       

      }
      chartData[city]["day"].length = i;
      chartData[city]["week"].length = j;
      chartData[city]["month"].length = k;
    }
  }
  renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();