# 前端性能

## 重绘和回流
1. 重绘指部分（单个）元素的重新绘制
2. 回流指整个dom树的重新绘制
> 所以肯定是重绘性能更好了
### 什么情况下会回流
1. 添加或者删除可见的DOM元素；
2. 元素位置改变；
3. 元素尺寸改变——边距、填充、边框、宽度和高度
4. 内容改变——比如文本改变或者图片大小改变而引起的计算值宽度和高度改变；
5. 页面渲染初始化；
6. 浏览器窗口尺寸改变——resize事件发生时；
> 会影响布局的就会引起回流
### 什么情况下会重绘
1. 元素需要更新属性，而这些属性只是影响元素的外观，风格，而`不会影响布局`的，比如`background-color`

### 函数防抖
1. 什么是防抖？
> 例子：上电梯，规定时间内只要有人继续上（不考虑上满的情况），电梯就会开门等着
2. 应用场景
> 搜索框访问后端接口
> 领优惠券、登陆
```ts
/**创造防抖函数*/
function makeDebounce(fn,timeout:number=1500){
	let timer:any = null;
	return function(){
		/**timeout 里面 this 在这里*/
		if(timer){
			/*又有人要进电梯，关闭上次要延迟关门的任务，下面重开一个*/
			clearTimeout(timer)
		}
		timer = setTimeout(()=>{
			timer=null;
			fn.apply(this,arguments);
		},timeout)
	}
}
let timer:any = null;
function onSearch(keyWord){
	console.log(keyWord)
}
const onInput = makeDebounce((keyWord:string)=>onSearch(keyWord),2000)

```
### 函数节流
1. 什么是节流？
> 例子：水坝发电站只打开部分闸门->规定时间周期内放行一次->限制频率
2. 应用场景
> 频繁触发的事件监听，例如滚动onScroll（滚动可以使用[交叉观察者](/Observer.html#intersection-observer-交叉观察者)）
```ts
function makeThrottle(fn,delay:number=200){
	let now = Date.now();
	return function(){
		let current = Date.now()
		if(current - now > delay){
			now = Date.now();
			fn.apply(this,arguments)
		}
	}
}
const onScroll = makeThrottle((e)=>{
	console.log(e)
},100)
```
### 惰性加载
1. 场景
> 为兼容不同浏览器，一些浏览器嗅探工作不得不进行
> 涉及到某个函数每次执行都要if else消耗性能
> 如果可以第一次执行的时候判断一下，以后都不用判断就好了
2. 思路
> 首次执行->判断->覆盖函数定义->执行
> 第二次及以后都只需要执行函数就好了
```ts
let addEvent = function(ele,type,handle){
	if(window.addEventListener){
		addEvent = function(ele,type,handle){
			ele.addEventListener(type,handle,false)
		}
	}else if(window.attachEvent){
		addEvent = function(ele,type,handle){
			ele.attachEvent(`on${type}`,handle)
		}
	}
	addEvent(ele,type,handle)
}
```