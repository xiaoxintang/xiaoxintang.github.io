# 兼容性

## 移动端
### js
1. ios `new Date()`不能使用`年-月-日`这种，推荐使用`年/月/日`
### 屏幕适配解决方案
#### flexible + rem布局
1. [flexible](https://github.com/amfe/lib-flexible)用来动态设置根元素字体大小
2. [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)插件用来将px单位转换为rem
#### viewport布局
##### 单位概念
1. vw 1vw 等于视口宽度的1%
2. vh 1vh 等于视口高度的1%
3. vmin 选取 vw 和 vh 中最小的那个
4. vmax 选取 vw 和 vh 中最大的那个
##### 使用方式
[postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)可以将px转换为vw或其他vieport单位
### 1px边框问题
#### 相关概念
1. css像素也就是px
```js
screen.width
screen.height
```
2. 设备像素硬件上实际存在的像素点
2. 设备像素比DPR(devicePixelRatio)是默认缩放为100%的情况下，设备像素和CSS像素的比值
```js
windowd.devicePixelRatio
```
#### 产生原因
在DPR为2的设备上2x2=4个设备像素点构成一个css像素，DPR为3的设备上9个设备像素点构成一个css像素,所以一个1px的边框，看起来可能会更粗一些
#### 解决方法
1. 伪元素定位+两倍大小+缩小到0.5倍
> input,textarea不支持伪元素，需要嵌套div或其他方式实现
2. 使用图片边框
3. 使用box-shadow设置4个阴影
4. 修改viewport
> 好像安卓不兼容小于1的所以[flexible](https://github.com/amfe/lib-flexible)只设置了ios上的viewport

