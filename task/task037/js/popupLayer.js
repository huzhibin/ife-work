function PopupLayer(options){
	// width, height, x, y
	// this.x = x,
	// this.y = y,
	// this.width = width;
	// this.height = height;
	
	var _options = {
		title: "title",
		content: "content",
		confirm: function(){},
		cancel: function(){},
	}
	for (prop in _options) {
		if (_options.hasOwnProperty(prop)) {
			if (!!options[prop]) {
				_options[prop] = options[prop];
			}
		}
	}
	this.left = null;
	this.top = null;
	this._maskDom = null;
	this._popDom = null;
	return PopupLayer.prototype.init(_options);
}

PopupLayer.prototype = {
	constructor: PopupLayer,
	_createMask: function(){
		var maskDom = document.createElement("div");
		maskDom.style.position = "fixed";
		maskDom.style.zIndex = "100";
		maskDom.style.top = "0";
		maskDom.style.right = "0";
		maskDom.style.left = "0";
		maskDom.style.bottom = "0";
		maskDom.style.background = "rgba(0, 0, 0, 0.6)";
		maskDom.style.display = "none";
		return maskDom;
	},
	show: function(){
		this._maskDom.style.display = "block";
		this._popDom.style.display = "block";
		return this;
	},
	hide: function(){
		this._maskDom.style.display = "none";
		this._popDom.style.display = "none";
		return this;
	},
	init: function(options){
		var popDom = document.querySelector("#popupLayer .js_popupLayer");
		var cancelDom = popDom.querySelector('.cancel');
		var confirmDom = popDom.querySelector('.confirm');
		popDom.querySelector('.title').innerHTML = options.title || "";
		popDom.querySelector('.content').innerHTML = options.content || "";
		this._popDom = popDom;
		this._maskDom = this._createMask();
		this._popDom.style.cursor = 'move';
		document.body.appendChild(this._maskDom);

		var self = this;
		//点击遮罩层关闭弹窗
		this._maskDom.addEventListener('click', function(){
			self.hide();
		});

		//为弹窗绑定拖动事件
		this._popDom.addEventListener('mousedown', _down);
		function _down(e){

			var left = self._popDom.offsetLeft;
			var top = self._popDom.offsetTop;
			var beginX = e.clientX;
			var beginY = e.clientY;
			var _move = function(e){
				var viewWidth = document.documentElement.clientWidth
							    || document.body.clientWidth;
				var viewHeight = document.documentElement.clientHeight
								|| document.body.clientHeight;
				var offsetLeft = left + e.clientX - beginX;
				var offsetTop = top + e.clientY - beginY;
				if(offsetLeft < self._popDom.offsetWidth/2){
					offsetLeft = self._popDom.offsetWidth/2;
				}
				if(offsetLeft > viewWidth - self._popDom.offsetWidth/2){
					offsetLeft = viewWidth - self._popDom.offsetWidth/2;
				}
				if(offsetTop < self._popDom.offsetHeight/2){
					offsetTop = self._popDom.offsetHeight/2;
				}
				if(offsetTop > viewHeight - self._popDom.offsetHeight/2){
					offsetTop = viewHeight - self._popDom.offsetHeight/2;
				}
				self._popDom.style.left = offsetLeft + 'px';
				self._popDom.style.top = offsetTop + 'px';
			}
			function _up(e){
				self._popDom.removeEventListener('mousemove', _move);
				window.removeEventListener('mouseup', _up);
				console.log('up');
			}
			self._popDom.addEventListener('mousemove', _move);
			window.addEventListener('mouseup', _up);
			console.log('down');
		}
		//为确认和取消按钮绑定事件
		if (!!confirmDom) {
			confirmDom.addEventListener('click', function(e) {
				if (!!options.confirm) {
					options.confirm();
				}
				self.hide();
			});
		}
		if (!!cancelDom) {
			cancelDom.addEventListener('click', function(e) {
				if (!!options.cancel) {
					options.cancel();
				}
				self.hide();
			});
		}
		return this;
	}
}