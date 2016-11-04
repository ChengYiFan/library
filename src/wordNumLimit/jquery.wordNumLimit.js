/**
* 文本域输入长度限制插件
* @author: Cynthia.Cheng
* Last update date: 2016-11-04
* Copyright(c) 2016 by Cynthia.Cheng
* 要求jQuery 1.9+以上
*/

var wordNumLimit = (function($){
	var options = {
		$container : null,  //编辑框的顶层父对象
		maxnum: 200,        //限制输入长度
		isSlice: false,     //超过限制输入长度后是否截取文本域
		limitByLen: false,  //是否依照文本域内容长度为限制标准，true的话选择包含中文只能输入200个，全ASCII码能够输入400个的限制标准。
		isDisableBtn:true   //超过限制输入长度后是否使提交按钮不可用
	},
	classes = {
		editorCls : 'editor',//编辑框
		hintCls   : 'hint', //操作提示区域含提交按钮
		hintTxt   : 'hint-txt' //操作提示文字
	},
	wordNumLimitFun, 
	wordSliceFun,
	hintTxt,
	eBind, 
	initModule;

	//输入字符个数限制
	wordNumLimitFun = function(element, hint){
		var strLen;
		if(options.limitByLen){
			strLen = element.val().length;
			strLen > options.maxnum ? overflow(element, ~~(strLen-options.maxnum), hint) : normal(~~(options.maxnum - strLen), hint);
		}else{
			//正则表达式/[^\x00-\xff]/g匹配汉字汉字符号
			var strnum = (element.val().replace(/[^\x00-\xff]/g,"")).length,
				abcnum =  element.val().length - strnum;
			strLen = abcnum * 2 + strnum; //字符串的长度
			strLen > options.maxnum * 2 ? overflow(element, ~~((strLen-options.maxnum*2)/2), hint) : normal(~~((options.maxnum*2-strLen)/2), hint);
		}
	};
	//溢出时执行的操作
	overflow = function(){
		wordSliceFun(arguments[0]);
		if(options.isDisableBtn){
			arguments[2].find('input[type=submit]').attr('disabled',true);
			hintTxt('已超出<em>'+arguments[1]+'</em>字',arguments[2]);
		}
	};
	//正常操作
	normal = function(){
		hintTxt('还能输入<em>'+arguments[0]+'</em>字',arguments[1]);
		if(options.isDisableBtn){
			arguments[1].find('input[type=submit]').removeAttr('disabled');
		}
	};
	//截取文本域
	wordSliceFun = function(element){
		if(options.isSlice)
			element.val(element.val().slice(0,options.maxnum));
	};
	//提示信息
	hintTxt = function(){
		arguments[1].find('.hint-txt').html(arguments[0]);
	};
	//绑定事件
	eBind = function(){
		var editor = options.$container.find('.'+classes.editorCls);
		//$(document).on()
		editor.each(function(i){
			var that = $(this), hint = that.parent().find('.'+classes.hintCls);
			that.on({
				keyup:function(){
					console.log("event keyup");
					wordNumLimitFun(that, hint);
				},
				mouseout:function(){
					console.log("event mouseout");
					wordNumLimitFun(that, hint);
				},
				input:function(){
					console.log("event input");
					wordNumLimitFun(that, hint);
				}
			});
		});
	};
	//初始化
	initModule = function(opts){
		options = $.extend(options, opts);
		eBind();	
	};
	return {initModule:initModule};
})(jQuery);