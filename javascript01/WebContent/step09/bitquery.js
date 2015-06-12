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

	list.attr = function(name, value) {
		for (var i = 0; i < list.length; i++) {
			list[i].setAttribute(name, value);
		}
		return this;
	}

	list.css = function(name, value) {
		for (var i = 0; i < list.length; i++) {
			list[i].style[name] = value;
		}
		return this;
	}

	list.val = function(value) {
		if (arguments.length == 0) {
			if (list.length > 0) {
				return list[0].value;
			} else {
				return undefined;
			}
		} else {
			for (var i = 0; i < list.length; i++) {
				list[i].value = value;
			}
			return this;
		}
	}

	return list;
}


bit.ajax = function(url, settings) {
	var xhr;

	if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
		xhr = new XMLHttpRequest();

	} else {// code for IE6, IE5
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (settings.success) {
				if (settings.dataType == "json") {
					settings.success(JSON.parse(xhr.responseText));
				} else {
					settings.success(xhr.responseText);
				}
			}
		}
	};
	xhr.open(settings.method, url, true); 

	if (settings.method == "GET") {
		xhr.send();

	} else { //POST 라면,
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

		var queryString = "";
		for (var propName in settings.data) {
			if (queryString.length > 0) {
				queryString += "&";
			}
			queryString += propName + "=" + encodeURIComponent(settings.data[propName]) 
		}
		console.log("서버에 보내는 문자열:" + queryString);
		xhr.send(queryString);
	}
};

var $ = bit;
