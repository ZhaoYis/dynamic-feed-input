;
(function(global) {

	//开启严格模式，规范代码，提高浏览器运行效率
	"use strict";

	//存放控件ID的数据
	var idArr = new Array();

	//默认配置
	var config = {
		table: '', //table容器Id
		tbody: '', //tbody容器Id
		max: 5, //最多生成多少行
		row_total: 2, //每行控件个数
		type: [
			'text',
		], //生成控件类型，顺序即为生成后的顺序，至少一个.如果数组长度为1，则生成row_total个相同的控件，否则生成指定控件，但是数组长度必需和row_total相等
		id_prefix: 'input_', //Id前缀,默认为input__

	};

	var ready = {
		extend: function(obj) {
			var newobj = JSON.parse(JSON.stringify(config));
			for(var i in obj) {
				newobj[i] = obj[i];
			}
			return newobj;
		},
		timer: {},
		end: {}
	};

	//类
	var D = function(options) {
		var that = this;
		that.config = ready.extend(options);
		that.init();
	};

	//覆写原型链，给继承者提供方法
	D.prototype = {
		init: function() {
			console.log(this.config)
		},
		add: function() {
			var that = this;
			var arrlen = idArr.length + 1;
			if(arrlen <= that.config.max) {
				var html = ''; //模板字符串
				// 创建table 行标签tr
				var trObj = document.createElement("tr");

				html = that.template();

				// 设置行内容
				trObj.innerHTML = html;

				// 将行内容添加到表格中
				document.getElementById(that.config.tbody).appendChild(trObj);

				//that.add_event_listener(total, that.del(that));
			} else {
				alert("最多添加" + that.config.max + "个控件");
			}
		},
		del: function(obj) {
			//			$("body").on("click", ".removeclass", function(e) { //user click on remove text  
			//				var that = this;
			//				// 直接删除当前对象的父节点的父节点
			//				document.getElementById(that.config.tbody).removeChild(obj.parentNode.parentNode);
			//				var id = that.id;
			//				that.remove_by_value(idArr, id);
			//				return false;
			//			})

			var that = this;
			// 直接删除当前对象的父节点的父节点
			document.getElementById(that.config.tbody).removeChild(obj.parentNode.parentNode);
			var id = that.id;
			that.remove_by_value(idArr, id);
		},
		get_value: function() {

		},
		template: function() {
			var that = this;
			var html = '';
			var row_total = that.config.row_total;
			var typeArr = that.config.type;
			var id_prefix = that.config.id_prefix;
			var total = that.get_id();

			for(var i = 0; i < row_total; i++) {
				var type = typeArr.length == 1 ? typeArr[0] : typeArr[i];
				switch(type) {
					case "text":
						html += '<td><input type="text" id="' + id_prefix + i + '_' + total + '" /></td>';
						break;
					case "button":
						html += '<td><input type="button" id="' + id_prefix + i + '_' + total + '" /></td>';
						break;
					default:
						html = '';
						break;
				}
			}

			html += '<td><input type="button" value="X" id="' + id_prefix + 'btn_' + total + '"></td>';
			return html;
		},
		get_id: function() {
			var that = this;
			var id = 1;
			if(idArr.length != 0) {
				idArr.sort(that.sort_arr).reverse();
				id = idArr[0] + 1;
			}
			idArr.push(id);
			return id;
		},
		sort_arr: function(m, n) {
			return m > n ? 1 : (m < n ? -1 : 0);
		},
		remove_by_value: function(arr, val) {
			for(var i = 0; i < arr.length; i++) {
				if(arr[i] == val) {
					arr.splice(i, 1);
					break;
				}
			}
		},

	};

	//兼容CommonJs规范
	if(typeof module !== 'undefined' && module.exports) module.exports = D;

	//兼容AMD/CMD规范
	if(typeof define === 'function') define(function() {
		return D;
	});

	//注册全局变量，兼容直接使用script标签引入该插件
	global.Dynamic = D;

	//this，在浏览器环境指window，在nodejs环境指global
	//使用this而不直接用window/global是为了兼容浏览器端和服务端
	//将this传进函数体，使全局变量变为局部变量，可缩短函数访问全局变量的时间
})(this);