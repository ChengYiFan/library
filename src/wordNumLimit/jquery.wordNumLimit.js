/**
* 文本域输入长度限制插件
* @author: Cynthia.Cheng
* Last update date: 2016-11-02
* Copyright(c) 2016 by Cynthia.Cheng
*/

var wordNumLimit = (function($){
	var options = {
		$container : null,  //编辑框的顶层父对象
		maxnum: 100,        //限制输入长度
		isSlice: false,     //超过限制输入长度后是否截取文本域
		limitByLen: false,  //是否依照文本域内容长度为限制标准，true的话选择包含中文只能输入100个，全ASCII码能够输入200个的限制标准。
	},
	classes = {
		editorCls : 'editor',//编辑框
		hintCls   : 'hint', //操作提示
	},
	wordNumLimitFun, eBind, initModule;

	//输入字符个数限制
	wordNumLimitFun = function(element){
		var strLen;
		if(options.limitByLen){
			strLen = element.text().length;
			if(strLen > options.maxnum){

			}
		}else{
			var strnum = (element.text().replace(/\w/g,"")).length,
				abcnum =  element.text().length - strnum;
			strLen = strnum * 2 + abcnum; //字符串的长度
			if(strLen > options.maxnum * 2){
				
			}
		}
	};

	//绑定事件
	eBind = function(){
		var con = options.$container,
			editor = con.find(classes.editorCls),
			hint = con.find(classes.hintCls);
		editor.live({
			keyup:function(){

			},
			mouseout:function(){

			}
		});
	};
	//初始化
	initModule = function(opts){
		options = $.extend(options, opts);
		options.$editor = options.$container.find(classes.editorCls);
		options.$hint = options.$container.find(classes.hintCls);
		eBind();	
	};
	return {initModule:initModule};
})(jQuery);