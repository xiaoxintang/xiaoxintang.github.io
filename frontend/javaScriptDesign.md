# 设计模式
## 前言
很多设计模式其实已经深入到我们的代码中，可能我们这样写了但是不知道这是个设计模式
### 设计模式有什么用？
> 笑傲江湖令狐冲 -> 独孤九剑 -> 千变万化 -> 能不能有收获看悟性了

> 诶？那个啥框架好像就是用了这种设计模式！原来代码还可以这么写
## 干货一斤
1. 浏览器嗅探类的工作
```js
var pay = function({orderNum,price}){
	if (/MicroMessenger/.test(window.navigator.userAgent)) { 
		/**微信客户端*/
		pay = function({orderNum,price}){
			wxpay({orderWx:orderNum,orderPrice:price})
		}
	} else if (/AlipayClient/.test(window.navigator.userAgent)) { 
		/**支付宝客户端*/
		pay = function({orderNum,price}){
			alipay({ordNum:orderNum,orderCount:price})
		}
	} else {
		/**其他浏览器*/
		pay = function(){
			alert("请使用微信或者支付宝打开")
		}
	}
	pay({orderNum,price})
}
```
## what's this ?
```js
window.name = "window name"
var obj = {
	name:"objName",
	getName(){
		console.log(this.name)
	}
}
/** 1. 作为对象的方法调用，指向调用对象*/
obj.getName()//objName
var fn = obj.getName
/** 2. 作为普通函数调用，指向全局对象*/
fn()//window name
/** 3. 构造器调用，指向实例*/
class MyClass{
	constructor(){
		this.name = "实例name"
		/** return {} this总是指向return的{}*/
	}
}
var my = new MyClass()
console.log(my.name)
/** 4. call,apply调用*/
/** 5. 箭头函数*/
```
### 思考一下 this
```js
window.name = "win name"
var obj = {
	name:"obj name",
	age:22,
	getName:()=>{
		console.log(this.name)
	},
}
var obj1 = {
	name:"obj other name",
}
obj.getName()
obj.getName.call(obj1)
/**第二题*/
function makeDebounce(fn,timeout=1500){
	var timer = null;
	return function(...arg){
		/**timeout 里面 this 在这里*/
		if(timer){
			clearTimeout(timer)
		}
		timer = setTimeout(()=>{
			timer=null;
			/**this指向？*/
			// fn(arg)
			fn.apply(this,arg);
		},timeout)
	}
}
```
## 装饰器模式
> 应用场景：数据上报，表单校验
1. AOP(面向切面编程)，抽离与核心业务无关代码，再动态植入
```js
Function.prototype.before = function(fn){
	var _this = this;
	/** a */
	console.log('a',this)
	return function(...arg){
		fn.apply(this,arg)
		/** b */
		console.log('b',this)
		return _this.apply(this,arg)
	}
}
Function.prototype.after = function(fn){
	var _this = this;
	/** c */
	console.log('c',this)
	return function(...arg){
		var res = _this.apply(this,arg)
		fn.apply(this,arg)
		/** d */
		console.log('d',this)
		return res
	}
}
function fn(){
	console.log(2)
}
fn()//2
fn = fn.before(function(){console.log(this,1);})//a
fn = fn.after(function(){console.log(this,2)})//c
fn()//1,b,2,3,d
```

## 单例模式 single
1. 应用场景
> 登陆弹窗只需要创建一次append、window，nodejs global 只有一个且是同一个
> 音视频，js等资源只需要动态加载一次
```ts
/**通用单例*/
function getSingle(fn){
	var result = null;
	return function(){
		if(result){
			return result
		}
		result = fn.apply(this,arguments)
		return result
	}
}
function createLayout(){
	var  div = document.createElement("div");
	div.innerHTML="hello world"
	document.body.append(div);
	return div
}
var createSingleLayout = getSingle(createLayout);
```

## 策略模式 strategies
### 策略之前
```js
var formData= {
	name:"xiaoxt"
}
function onSubmit(){
	if(!formData.name){
		return "数据不能为空"
	}
	if(formData.name.length<1){
		return "最小长度不能小于1"
	}
	if(formData.name.length>10){
		return "最小大度不能大于10"
	}
	// 还有很多 if。。。
}

```
> `onSubmit`函数很庞大，缺乏弹性，修改校验规则需要深入`onSubmit`修改，无法复用代码
### 策略之后
```js
/**验证策略，可复用*/
var strategies={
	noEmpty({value,errMsg="数据不能为空"}){
		if(!value){
			return errMsg
		}
	},
	minLength({value,length=1,errMsg=`最小长度不能小于${length}`}){
		if(value.length<length){
			return errMsg
		}
	},
	maxLength({value,length=10,errMsg=`最大长度不能大于${length}`}){
		if(value.length>length){
			return errMsg
		}
	}
}
/**验证器对象*/
class Validator{
	constructor(){
		this.cache=[]
	}
	add({value,rules}){
		rules.forEach(
			({strategy,errMsg,...other})=>
				this.cache.push(
					strategies[strategy]({value,errMsg,...other})
				)
		)
	}
	validateFields(){
		for(var i=0,validateFunction;validateFunction=this.cache[i++];){
			var errMsg = validateFunction()
			if(errMsg){
				return errMsg
			}
		}
	}
}
/**验证器 实例*/
var formData   = {name:"xiaoxt"}
var validator = new Validator()
validator.add({
	value:formData.name,
	rules:[
		{strategy:"noEmpty",errMsg:"用户名不能为空"},
		{strategy:"minLength",length:3,errMsg:"用户名最少为3个字符"},
		{strategy:"maxLength",length:20,errMsg:"用户名最多为20个字符"},
	]
})
var errMsg = validator.validateFields()
if(errMsg){
	console.error(errMsg)
	return 
}
console.log('提交表单')
```
## 代理模式
1. 代理与本体拥有相同的接口
2. 代理掌握了访问本体的最佳时机
### 不用代理模式之前
```js
function createImg(){
	var imgNode = document.createElement("img");
	var imgLoader = new Image();
	document.body.appendChild(imgNode)
	img.onload = function(){
		imgNode.src = imgLoader.src;
	}
	return{
		setSrc(src){
			imgNode.src = "base64";
			img.src = src
		}
	}
}
```
> 随着网速变快，图片加载可能只是一瞬间的事情，我们以后可能就需要去修改`crateImg`对象

> 实际上我们需要的只是给`imgNode`设置`src`的功能，图片懒加载只是一个锦上添花的功能，如果把它放到另一个对象里面的话应该会更好
### 使用代理模式之后
```js
function createImage (){
	var imgNode = document.createElement("img");
	document.body.appendChild(imgNode)
	return{
		setSrc(src){
			imgNode.src = src
		}
	}
}

function createProxyImage(myImg){
	var img = new Image();
	img.onload = function(){
		myImg.setSrc(this.src)
	}
	return {
		setSrc(src){
			myImg.setSrc("base64字符串或其他")
			img.src = src;
		}
	}
}
var myImg = createImage();
var proxyImg = createProxyImage(myImg)
proxyImg.setSrc("实际图片地址")
```
### 其他代理模式
1. 虚拟代理
> 合并网络请求
2. 缓存代理
> 复杂计算
```js
function mult(...arg){
	var a= 1;
	for(var i=0;i<arg.length;i++){
		a = a * arg[i]
	}
	return a
}
functio createProxyMult(fn){
	var cache = {};
	return function(...arg){
		var argStr = Array.prototype.join.call(arg,",");
		if(argStr in cache){
			return cache[argStr]
		}
		return cache[argStr] = fn.apply(this,arg)
	}
}
var proxyMult = createProxyMult(mult);
proxyMult(1,2,3,4)//24
proxyMult(1,2,3,4)//24
```
## 发布订阅模式(观察者模式)
1. addEventListener
2. evenBus
3. [redux.js](https://github.com/reduxjs/redux/blob/master/src/createStore.ts#L160)
## 中介者模式


## 职责链模式
> 不用知道要将东西交给谁，交给入口，职责链内部会进行传递直到遇到那个对的人
1. [koa洋葱模型](//xiaoxt.mosby.top/frame.html#koajs)
2.
```js
Function.prototype.after = function(fn){
	var _this = this;
	return function(...arg){
		var res = _this.apply(this,arg)
		if(res !== 'next'){
			return res
		}
		return fn.apply(this,arg)
	}
}
fuction order500(orderType,pay,stock){
	if(orderType===1&&pay){
		console.log('500得100')
	}else{
		return 'next'
	}
}
fuction order200(orderType,pay,stock){
	if(orderType===2&&pay){
		console.log('200得50')
	}else{
		return 'next'
	}
}
fuction orderNormal(orderType,pay,stock){
	if(stock>0){
		console.log('乞丐版')
	}else{
		console.log('其他')
	}
}
var order = order500.after(order200).after(orderNormal);
order(1,true,500)
order(2,true,500)
order(1,false,500)
```
## 状态模式
>  文件上传
```js
class State{
	constructor(light){
		this.light = light
	}
	onPress(){
		throw new Error("父类的 onPress 必须重写")
	}
}
class OffLightState extends State{
	onPress(){
		console.log("变弱光")
		this.light.setState(this.light.weakLightState)
	}
}
class WeakLightState extends State{
	onPress(){
		console.log("变强光")
		this.light.setState(this.light.strongLightState)
	}
}
class StrongLightState extends State{
	onPress(){
		console.log("变没光")
		this.light.setState(this.light.offLightState)
	}
}
class Light{
	constructor(){
		this.offLightState = new OffLightState(this)
		this.weakLightState = new WeakLightState(this)
		this.strongLightState = new StrongLightState(this)
		this.init();
	}
	setState(nextState){
		this.currentState = nextState;
	}
	init(){
		this.currentState = this.offLightState;
	}
	onClick(){
		this.currentState.onPress()
	}
}
var light = new Light();
light.onClick();
```
## 适配器模式
> 对外保持接口一致性
```js
var googleMap = {
	show(){}
}
var baiduMap={
	display(){}
}
/** 适配器*/
var baiduMapAdapt={
	show(){
		return baiduMap.display()
	}
}
function renderMap(map){
	if(map.show instanceof Function){
		map.show()
	}
}
renderMap(googleMap)
renderMap(baiduMapAdapt)
```
## 工厂模式
> 复杂逻辑的简单封装

> [React.createElement](https://github.com/facebook/react/blob/master/packages/react/src/ReactElement.js#L348)

## 模板方法模式
> React组件
```js
class Animal{
	eat(){
		throw new Error("子类必须重写 eat 方法")
	}
	talk(){
		throw new Error("子类必须重写 talk 方法")
	}
}
class Cat{}
class Dog{}
```

## 享元模式
1. 某些可进行性能优化的场景->模特假人穿衣服
## 命令模式
js中函数可以作为参数传递，js中的命令模式可以很容易实现
## 迭代器模式
1. Array.prototype.forEach((value,index)=>{})
2. $.each(arr,fn(index,value))

## 组合模式