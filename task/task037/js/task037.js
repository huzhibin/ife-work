var popupLayer1 = new PopupLayer({
	title: "popupLayer1",
	confirm: function(){
		alert("popupLayer1");
	}
});

var showBtn = document.querySelector('.showPopupWrapper input');
showBtn.addEventListener('click', function(){
	popupLayer1.show();
}, 'false');

// document.addEventListener('click', function(e) {
// 	if (e.target) {
// 		expression
// 	}
// });
