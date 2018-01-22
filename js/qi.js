function Qi(){
	
}
Qi.prototype.$Id = function(id){	
	return document.getElementById(id)
}
Qi.prototype.$Class = function(className){
	if(document.getElementsByClassName) return document.getElementsByClassName(className);
	var arr = [] , dom = document.getElementsByTagName('*'),classArr = [];
	for(var i = 0; i <  dom.length; i++){
		//获取到的所有class需要过滤空格(多空格合成一个)，然后拆分，与需要的classname 作比对
		classArr = dom[i].className.replace(/\s+/g,' ').split(' ');
		for(var j = 0; j < classArr.length; j++){
			if(classArr[j] == className){
				arr.push(dom[i]);
				break;
			}
		}
	}
	return arr
	
}
Qi.prototype.$hasClass = function(ele,className){
//	console.log(ele.className,className)
	className = className || '';
	//替换掉空格如果是空则没有任何class
	if (className.replace(/\s+/g, '').length == 0) return false;
	//判断ele元素的类名中是否包含参数className
	return new RegExp(' ' + className + ' ').test(' ' + ele.className + ' ');
}
Qi.prototype.$addClass = function (ele, className) {
	//ele中没有这个class,则新增
   if (!this.$hasClass(ele, className))  ele.className = ele.className == '' ? className : ele.className + ' ' + className;
}
Qi.prototype.$removeClass = function (ele, className){
  var obj_class = ' ' + ele.className + ' ';//获取 class 内容, 并在首尾各加一个空格，方便替换.
  obj_class = obj_class.replace(/(\s+)/gi, ' '),//将多余的空字符替换成一个空格
  removed = obj_class.replace(' ' + className + ' ', ' ');//在原来的 class 替换掉,首尾加了空格的 需要移除的class.
  removed = removed.replace(/(^\s+)|(\s+$)/g, '');
  ele.className = removed;
}
var $Q = new Qi()
