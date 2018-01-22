var blog = {
	dataModal:{
		listDom:'',
		popupType:-1 //-1表示是增加新数据
	},
	init: function(){
		this.initData();
		this.addNew();
		this.editArticle();
		this.cancelPopup();
		this.savePopup();
	},
	initData: function(){	
		for(var i = 0; i < blogArticle.length; i++){
			this.bindData(i,blogArticle[i].imgUrl,blogArticle[i].title,blogArticle[i].content)
		}
		//$Q.$Class('blogs')[0].innerHTML = this.dataModal.listDom;
	},
	bindData:function(index,img,title,content){
			var newNode = null;
			newNode = document.createElement('li');
			newNode.innerHTML = this.bindListDom(img,title,content);
			newNode.setAttribute('data-index',index)
			$Q.$Class('blogs')[0].appendChild(newNode)
	},
	bindListDom:function(img,title,content){
		var str = ''
		str += 		'<a href="javascript:void(0);">'
		str += 			'<img width="100%" src="'+img+'" alt="图片路径错误，请修改"/>'
		str += 			'<div class="blogsInfo">'
		str += 				'<h5 class="title">'+title+'</h5>'
		str += 				'<p>'+content+'</p>'
		str += 			'</div>'
		str += 			'<span class="editBtn">Edit</span>'
		str += 		'</a>'
		return str;
	},
	editData: function(index,img,title,content){
		var liDom = $Q.$Id('blogDom').getElementsByTagName('li');
		for(var i = 0; i < liDom.length; i++){
			if(liDom[i].getAttribute('data-index') == index){
				liDom[i].innerHTML = this.bindListDom(img,title,content)
			}
		}
	},
	addNew:function(){
		var _this = this;
		$Q.$Id('addNew').onclick = function(){
			
			//判断popup是否隐藏
			if(!$Q.$hasClass($Q.$Class('popup')[0],'show')){
				//设置弹窗类型
				_this.dataModal.popupType = -1
				//添加类，显示弹窗,初始化弹窗内容
				$Q.$Class('popupTitle')[0].innerHTML = 'Add Article';
				$Q.$Class('imgUrlText')[0].value = '';
				$Q.$Class('titleText')[0].value = '';
				$Q.$Class('contentText')[0].value = '';
				$Q.$addClass($Q.$Class('popup')[0],'show')					
			}
			
		}
	
	},
	editArticle:function(){
		var index = 0;
		var _this = this;
		for(var i = 0; i < $Q.$Class('editBtn').length ; i++){
			$Q.$Id('blogDom').onclick =  function(e){
				if(e.target.className == 'editBtn'){
					
					index = e.target.parentNode.parentNode.getAttribute('data-index');
					console.log('index:'+index)
					//保存当前index值
					_this.dataModal.popupType = index;
					//改标题
					$Q.$Class('popupTitle')[0].innerHTML = 'Edit Article';
					console.log(blogArticle,index)
					//设置默认value值
					$Q.$Class('imgUrlText')[0].value = blogArticle[index].imgUrl;
					$Q.$Class('titleText')[0].value = blogArticle[index].title;
					$Q.$Class('contentText')[0].value = blogArticle[index].content;
					//判断popup是否隐藏
					if(!$Q.$hasClass($Q.$Class('popup')[0],'show')){
						//添加类，显示弹窗
						$Q.$addClass($Q.$Class('popup')[0],'show')					
					}
				}
			}
//			$Q.$Class('editBtn')[i].onclick = function(){
//				//获取当前点击的list的index值
//				index = this.parentNode.parentNode.getAttribute('data-index');
//				//保存当前index值
//				_this.dataModal.popupType = index;
//				//改标题
//				$Q.$Class('popupTitle')[0].innerHTML = 'Edit Article';
//				//设置默认value值
//				$Q.$Class('imgUrlText')[0].value = blogArticle[index].imgUrl;
//				$Q.$Class('titleText')[0].value = blogArticle[index].title;
//				$Q.$Class('contentText')[0].value = blogArticle[index].content;
//				//判断popup是否隐藏
//				if(!$Q.$hasClass($Q.$Class('popup')[0],'show')){
//					//添加类，显示弹窗
//					$Q.$addClass($Q.$Class('popup')[0],'show')					
//				}
//				
//			}
		}	
	},
	cancelPopup:function(){
		$Q.$Class('popup')[0].onclick = function(e){
			//点击黑背景隐藏弹窗，兼容该功能的浏览器适用
			if(e.target){
				if(e.target.className == 'popupCon'){
					 $Q.$removeClass($Q.$Class('popup')[0],'show')
					//红border都消失
					for(var i = 0; i < $Q.$Class('textBox').length; i++){
						$Q.$Class('textBox')[i].style.borderColor = '#ededed'
					}
				}
			}			
		}
		$Q.$Class('cancelBtn')[0].onclick = function(){
			$Q.$removeClass($Q.$Class('popup')[0],'show');
			//红border都消失
			for(var i = 0; i < $Q.$Class('textBox').length; i++){
				$Q.$Class('textBox')[i].style.borderColor = '#ededed'
			}
		}
		
	},
	savePopup:function(){
		var _this = this;
		var arrEmpty = [] , val = '';
		$Q.$Class('saveBtn')[0].onclick = function(){
			arrEmpty = [];
			for(var i = 0; i < $Q.$Class('textBox').length; i++){
				//过滤掉空格，再判断是否为空
				val = $Q.$Class('textBox')[i].value.replace(/\s+/g,'')
				if(val == ''){
					arrEmpty.push($Q.$Class('textBox')[i])
				}
				//获取焦点，警告红框消失
				$Q.$Class('textBox')[i].onfocus = function(){
					this.style.borderColor = '#ededed'
				}
			}
			if(arrEmpty.length>0){
				for(var i in arrEmpty){
					arrEmpty[i].style.borderColor = '#f00'
				}
			}else{
				if(_this.dataModal.popupType == -1){
					//新数据存入json
					blogArticle.push({
						imgUrl : $Q.$Class('imgUrlText')[0].value,
						title : $Q.$Class('titleText')[0].value,
						content : $Q.$Class('contentText')[0].value
					})
					//绑定新增数据
					_this.bindData(blogArticle.length-1,$Q.$Class('imgUrlText')[0].value,$Q.$Class('titleText')[0].value, $Q.$Class('contentText')[0].value)	
				}else{
					blogArticle[_this.dataModal.popupType].imgUrl = $Q.$Class('imgUrlText')[0].value;
					blogArticle[_this.dataModal.popupType].title = $Q.$Class('titleText')[0].value
					blogArticle[_this.dataModal.popupType].content = $Q.$Class('contentText')[0].value;
					_this.editData(_this.dataModal.popupType, $Q.$Class('imgUrlText')[0].value,$Q.$Class('titleText')[0].value,$Q.$Class('contentText')[0].value)
				}
				//重新绑定数据
				
				$Q.$removeClass($Q.$Class('popup')[0],'show')
			}			
		}
	}
	
	
}

//blogArticle：存放blog数据
var blogArticle = [
	{
		imgUrl:"img/blog_img1.jpg",
		title:"Article title goes here to introduce the content",
		content:"Clarity Leads to Power. When we're clear, we're more effective. Our clarity reduces our mistakes and enables us to enlist the help of others. We are more powerful when we are clear, and we are weaker when we are confused. You Can't Learn Less. We can only add to our knowledge. We don't have to give some of it up in exchange for new knowledge. Our ability to absorb and retain knowledge may just be unlimited."
	},
	{
		imgUrl:"img/blog_img2.jpg",
		title:"About Us",
		content:" We are about building meaningful and enduring programming for the young audiences craving it. We are about powerful brands based on that programming.Today, we create more than 75 bi-weekly/weekly series all scheduled like television. Day in, day out, our audiences know what shows are going to be on and at what time—they can set their watch to them."
	}
]
