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
		return this;
	};
	
	list.click = function(listener) {
		this.on('click', listener);
		return this;
	};
	
	list.html = function(value) {
		for (var i = 0; i < this.length; i++) {
			this[i].innerHTML = value;
		}
		return this;
	};
	
	list.text = function(value) {
		for (var i = 0; i < this.length; i++) {
			this[i].textContent = value;
		}
		return this;
	};
	
	list.append = function(children) {
		for (var i = 0; i < this.length; i++) {
			for (var x = 0; x < children.length; x++) {
				this[i].appendChild(children[x]);
			}
		}
		return this;
	};
	
	list.appendTo = function(parents) {
		var list = parents;
		
		// 만약 파라미터 값이 엘리먼트 목록이 아니라면, bit() 함수를 이용하여 엘리먼트를 찾는다.
		if (typeof parents == 'string') {
			list = bit(parents);
		}
		
		for (var i = 0; i < list.length; i++) {
			for (var x = 0; x < this.length; x++) {
				list[i].appendChild(this[x]);
			}
		}
		return this;
	};
	
	return list;
}


var $ = bit;














