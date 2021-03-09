# 框架
## Electron
### 安装
1. 由于某些原因国内可能无法安装，甚至用梯子都不行
2. 看了官网的安装教程，由于是用nvm安装的node不知如何设置镜像
3. 记得之前是可以下载安装包放到某个目录的，现在不知道为啥搜不到了，网上全是和官网一样的，要么就是用cnpm
4. 话不多说，上命令，要按照官网给的镜像[官网链接](https://electronjs.org/docs/tutorial/installation)
```shell
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/" npm install electron -D
```

## koajs
### 洋葱模型
koa框架给我印象最深的就是洋葱模型的设计了
#### 什么是洋葱模型
> 通过将中间件（函数）通过next分为上下两部分，执行到next的时候将代码执行权限转交给下一个中间件，一直到最后一个中间件，倒数第一个
> 倒数第二个。。。
#### 如何实现？
> 利用async await 或者 generator yield,其实就是相当于回调函数嵌套一样，不过将一些异步变为同步
#### 思路
1. 中间件的参数是一样的(ctx,next)
2. 将中间件按顺序拼接起来->next代表下一个中间件[参考1](https://juejin.im/post/5db7eaf7f265da4cee4d61b9#heading-8)
   [参考2](https://juejin.im/post/5db7af846fb9a0202b5ee13c#heading-7)
3. 实现
```ts
function connect(middleWare,ctx,next){
	return async()=>{
		await middleWare(ctx,next)
	}
}
function buildUp(middleWareList){
	return async(ctx)=>{
		let next = async()=>Promise.resolve()
		middleWareList.reverse().forEach(middleWare=>{
			next = connect(middleWare,ctx,next)
		})
		await next()
	}
}
buildUp([
	async(ctx,next)=>{
		console.log(1)
		await next()
		console.log(2)
	},
	async(ctx,next)=>{
		console.log(3)
		await next()
		console.log(4)
	},
	async(ctx,next)=>{
		console.log(5)
		await next()
		console.log(6)
	},
])//1,3,5,6,4,2
```

## React
### Context
[react官网](https://zh-hans.reactjs.org/docs/context.html#consuming-multiple-contexts)
#### 使用场景
1. 当需要跨(多)级传递props时使用
#### 考虑一下
1. 可能会使得组件的复用性变差
#### 注意
1. 上层组件中没有`Provider`的时候`React.createContext`的默认值才会生效，所以我们一般使用的时候需要重新提供`Provider`的`value`
2. 下面这种写法，当`value`是一个对象类型，数组类型，每次父组件渲染的时候可能会触发订阅组件的重新渲染，因为`value`属性总是被赋值为新的对象
```tsx
class App extends React.Component {
  render() {
    return (
      <MyContext.Provider value={{something: 'something'}}>
        <Toolbar />
      </MyContext.Provider>
    );
  }
}
/*将value状态提升到渲染函数之外就好了*/
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {something: 'something'},
    };
  }

  render() {
    return (
      <Provider value={this.state.value}>
        <Toolbar />
      </Provider>
    );
  }
}
```
#### 用法
##### api
1. React.createContext
2. ContextName.Provider 使用的时候需要传递`value`
3. Class.contextType class中订阅的方式，可以在任何生命周期中通过`this.context`获得值
```tsx
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* 基于这个值进行渲染工作 */
  }
}
//或，这俩是同一种写法，看阮一峰的es6教程
class MyClass extends React.Component {
	render() {
    let value = this.context;
    /* 基于这个值进行渲染工作 */
  }
}
MyClass.contextType = MyContext;
//class需要订阅多个值的话，需要自定义渲染函数，通过props传递进去
function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme} />
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
```
4. ContextName.Consumer 函数组件中订阅context的方法
```tsx
<ConfigContext.Consumer>
{
	value=>/**基于value进行渲染*/
}
</ConfigContext.Consumer>
```
5. ContextName.displayName 类型为字符串。React DevTools 使用该字符串来确定 context 要显示的内容
   直接看看[codesandbox.io](https://codesandbox.io/s/angry-ives-pq20y?file=/src/App.js)如何使用吧
6. useContext
```tsx
function ThemedButton() {
	/**直接获取value*/
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```






### Fiber
React Fiber是react@16出现的概念，主要是为了解决大型应用中js长期占用浏览器资源导致点击无反馈或页面渲染的问题
> 简而言之就是js执行一下，再把资源权限交回给浏览器，然后再执行js,再交出权限，如此循环往复

## 路由
各大spa框架都有路由，一般都是history模式与hash模式
### hash模式
1. 监听浏览器hash改变
```js
window.onhashchange=function(){}
/**或*/
window.addEventListener("hashchange", funcRef, false);
```
2. 调用路由api后进行更新视图
### history模式
利用`History`对象`History.pushState()`,`History.replaceState()`

1. 监听用户按前进后退使用`popstate`事件
2. 调用`pushState`,`replaceState`后进行更新视图