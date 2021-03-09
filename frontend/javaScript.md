# JavaScript

## js原型
### 	原型链
`__proto__`指向父级`prototype`的一种链式结构
```js
function Foo(){}
const f1 = new Foo()
const f2 = new Foo()
/**实例的隐式原型->构造函数的原型*/
console.log(f1.__proto__ === Foo.prototype)
/** 构造函数的原型的隐式原型 -> Object 的原型*/
console.log(Foo.prototype.__proto__ === Object.prototype)
/**Object对象的隐式原型->null*/
console.log(Object.prototype.__proto__ === null)
```

### 对象的原型的构造函数是它自己
```js
console.log(Foo.prototype.constructor === Foo)
console.log(Object.prototype.constructor === Object)
```

### 每个函数都有一个构造函数
```js
	/**构造函数的原型是函数的构造函数的原型*/
	console.log(Foo.__proto__ === Function.prototype)
	/** 函数的构造函数也是一个函数*/
	console.log(Function.__proto__ === Function.prototype)
	/**不要忘了 Object可以这么用 
	 * const obj = new Object({foo:"bar"})
	 * 所以Object也是一个函数
	*/
	console.log(Object.__proto__ === Function.prototype);
	/**原型链中构造函数的上一级是Object*/
	console.log(Function.prototype.__proto__ === Object.prototype)
```
### 传说中js原型的神图
![prototype](/assets/prototype.jpg)
## 对象
1. 对象字面量属性名可以是一个放在方括号里面的表达式
```js
let currentKey = "name"
let obj = {
    [currentKey]:"xiaoxt"
}
/**
{
    name:"xiaoxt"
}
*/
```
## 数组api
### 过滤
```ts
const words=["my","name","is","xiaoxt"]
/**filter() 方法创建一个新数组,返回满足条件的数据*/
const result = words.filter((ele?:any,index?:number,arr?:any[])=>ele.length>3)
```

### 查找
```ts

/**
 * find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined
 * */
arr.find((ele:any,index?:number,array?:any[]):boolean)
/**
 * findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1
 * */
arr.findIndex((ele:any,index?:number;array?:any[]):boolean)
/**
 * includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false
 * fromIndex:默认0，可以为负，如：-2，倒数第二个到数组最后一个
*/
arr.includes(valueToFind:any,fromIndex?:number)
/**
 * indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1
 * */
arr.indexOf(searchElement:any,fromIndex?:number)
/**
 * 与indexOf查找的方向相反，从fromIndex查到index===0
 * lastIndexOf() 方法返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。*/
arr.lastIndexOf(searchElement:any,fromIndex?:number)
```
### 测试
```ts
/**
 * every() 方法测试一个数组内的所有元素是否 都 能通过某个指定函数的测试。它返回一个布尔值。
 * 注意：若收到一个空数组，此方法在一切情况下都会返回 true
*/
arr.every((ele:any,index:number,array:any[]):boolean)
/**some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值*/
arr.some((ele:any,index:number,array:any[]):boolean)
```
### 遍历
```ts
/**
 * forEach() 方法对数组的每个元素执行一次提供的函数。
 * */
arr.forEach((currentValue:any,index:number,array:any[]):void)
/**
 * map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
 * */
arr.map((ele:any,index:number,array:any[]):any)
```


## 伪数组调用数组的api
### 什么是伪数组

据我所知有匿名参数数组arguments、document.querySelectorAll()等产生的dom列表

### 伪数组如何调用数组api

```JS
/**将伪数组转换为数组再调用数组的api*/
Array.prototype.slice.call(document.querySelectorAll("div")).map(()=>{})
/**感觉第一种比较好理解，但是有点多此一举，直接用数组的api*/
//(Array.prototype.map.bind(document.querySelectorAll("div"),(item,index)=>{}))()
Array.prototype.map.call(document.querySelectorAll("div"),(item,index)=>{})
Array.prototype.map.apply(document.querySelectorAll("div"),[(item,index)=>{}])
```
## observer观察者
### Intersection Observer 交叉观察者
1. 异步观察目标与指定元素（默认顶级文档视窗viewport）的交叉状态
2. IntersectionObserver对象创建后无法修改配置，可以监听一个或多个目标元素
3. [developer.mozilla.org链接](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)
4. [浏览器兼容(使用polyfill)](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)
#### IntersectionObserver 使用语法
```ts
const observer= new IntersectionObserver(
    /**当元素可见比例超过指定阈值后调用此函数*/
    callback:{
        /**
         * @entries :
         * @observer : 被调用的IntersectionObserver实例
        */
        (entries:IntersectionObserverEntry[],observer:IntersectionObserver):void
    },
    /*可选配置*/
    options?:{
        /**指定视图窗口（祖先元素）
         * default: viewport
        */
        root:Element,
        /**默认：0px 0px 0px 0px*/
        rootMargin:string;
        /**指定交叉比例达到多少触发callback
         * 可以是单一的number也可以是number数组
         * 取值为：0.0～1.0
         * 默认：0.0
        */
        threshold:number;
    }
):IntersectionObserver
```
#### IntersectionObserver实例属性(同配置)
1. root
2. rootMargin
3. thresholds

#### IntersectionObserver方法
1. disconnect()
> 使IntersectionObserver对象停止监听工作。
2. observer()
> 使IntersectionObserver开始监听一个目标元素
3. takeRecords()
> 返回所有观察目标的IntersectionObserverEntry对象数组。
4. unobserver()
> 使IntersectionObserver停止监听特定目标元素。
#### callback中 IntersectionObserverEntry属性
1. boundingClientRect
>元素大小和相对于视窗root的位置(同：getBoundingClientRect)
2. intersectionRatio
>相交区域的getBoundingClientRect/target的getBoundingClientRect
>当前IntersectionObserverEntry出现在root的面积比例 0～1 => threshold属性的由来？
3. intersectionRect
>相交区域的getBoundingClientRect
4. isIntersecting
>是否与根相交状态 true相交
5. rootBounds
>root元素的getBoundingClientRect
6. target
> 当前IntersectionObserverEntry的 Dom
7. time
>返回一个记录从 IntersectionObserver 的时间原点(time origin)到交叉被触发的时间的时间戳(DOMHighResTimeStamp).
#### 下拉加载示例
##### 思路
实例化IntersectionObserver对象，root为.container容器，监听.container的子元素.footer，.footer出现在.container的可视区域就会触发callback。
利用这个特性，我们下拉到底的时候，就会触发callback,实现下拉加载
>假如container里面只有一个footer，只会开始的时候触发一次，需要将列表插入到.footer之前
```html
<div class="container">
    <!-- 列表插入的位置 -->
    <footer class="footer">加载中或已加载完</footer>
</div>
```
```js
const observerObj = new IntersectionObserver((entries)=>{
        if (entries[0].intersectionRatio <= 0) return;
        /**加载数据*/
        loadItems();
    },
    {
        root:document.querySelector(".container")
    }
)
observerObj.observer(document.querySelector(".footer"))
```


## html5的拖拽操作
### 应用场景
例如：需要后台编辑前台的菜单顺序，如果拖拽的话，用户方便很多，可是苦了程序员了
### 要点
1. 需要添加对dragover事件的监听并preventDefault(),否则无法监听到drop




## DOM操作

1. 从页面上删除一个元素
```js
/**常规方法*/
dom.parentNode.removeChild(dom)
/**直接操作*/
dom.remove()
```
## 类型判断
1. typeof
```js 
typeof null // 'object'
typeof undefined; // "undefined"
typeof false; // "boolean"
typeof 1; // "number"
typeof '1'; // "string"
typeof {}; // "object" 
typeof []; // "object" 
typeof new Date(); // "object"

typeof Symbol(); // "Symbol"
typeof 123n // 'bigint'

```

2. instanceof

instanceof 用来比较一个对象是否为某一个构造函数的实例

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car('Honda', 'Accord', 1998);

console.log(auto instanceof Car);
// expected output: true

console.log(auto instanceof Object);
// expected output: true

```

3. Object.prototype.toString
```js
Object.prototype.toString.call(null)//"[object Null]"
```