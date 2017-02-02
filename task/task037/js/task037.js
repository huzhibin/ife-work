var popDom = document.querySelector(".popupLayer");
var maskDom = document.createElement("div");
var viewWidth = window.innerWidth
				   	|| document.documentElement.clientWidth
				    || document.body.clientWidth;
var viewHeight = window.innerHeight
					|| document.documentElement.clientHeight
					|| document.body.clientHeight;
maskDom.style.width = "100%";
maskDom.style.height =  "100%";
maskDom.style.position = 'fixed';
maskDom.style.backgroundColor = 'rgba(108,108,108,0.7)';
maskDom.style.left = '0';
maskDom.style.top = '0';
// maskDom.style.transform = 'translate(-50%, -50%)';
document.body.appendChild(maskDom);
