function bit(selector) {
	var list = null;
	
	if (selector.charAt(0) == '<') {
		var i = selector.indexOf('>');
		var tagName = selector.substring(1, i);
		list = [document.createElement(tagName)];
	} else {
		list = document.querySelectorAll(selector);
	}
	
	list.on = function(eventName, listener) {
		for (var i = 0; i < this.length; i++) {
			if (this[i].addEventListener) {
				this[i].addEventListener(eventName, listener);
			} else { // <= IE 8
				this[i].attachEvent('on' + eventName, listener);
			}
		}
	};
	
	list.click = function(listener) {
		this.on('click', listener);
	};
	
	list.html = function(value) {
		for (var i = 0; i < this.length; i++) {
			this[i].innerHTML = value;
		}
	};
	
	list.text = function(value) {
		for (var i = 0; i < this.length; i++) {
			this[i].textContent = value;
		}
	};
	
	list.append = function(children) {
		for (var i = 0; i < this.length; i++) {
			for (var x = 0; x < children.length; x++) {
				this[i].appendChild(children[x]);
			}
		}
	};
	
	return list;
}


var $ = bit;














