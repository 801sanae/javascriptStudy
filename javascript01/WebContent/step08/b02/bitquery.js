function bit(selector) {
	var list = document.querySelectorAll(selector);
	
	list.on = function(eventName, listener) {
		for (var i = 0; i < this.length; i++) {
			if (list[i].addEventListener) {
				list[i].addEventListener(eventName, listener);
			} else { // <= IE 8
				list[i].attachEvent('on' + eventName, listener);
			}
		}
	};
	
	return list;
}


var $ = bit;
