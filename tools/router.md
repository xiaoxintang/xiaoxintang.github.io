# 光猫路由
## 移动CM113-Z光猫修改为桥接模式
### 超级账户账号密码
```
账号：
CMCCAdmin
密码：
aDm8H%MdA
```
### 操作步骤
1. 移动光猫小A，登陆之后，网络->宽带设置
2. 连接名称选择：2_INTERNET_R_VID_41，当前模式默认为：Route,暂时先不改为Bridge
3. 翻到底部可以看到上网用户名和密码，当然现在密码是***这样的，作为前端审查一下元素修改一下input的type
4. 记下账号密码
5. 模式修改为Bridge,保存

6. 另外一个路由器小B,设置为拨号上网（PPPoE那个）,设置账号密码，保存就好了

##  天翼HG6201T
### 获取账号密码
1. 连接wifi或者插网线
2. 进入[http://192.168.1.1:8080/cgi-bin/baseinfoSet.cgi](http://192.168.1.1:8080/cgi-bin/baseinfoSet.cgi)
3. 找到`telecomadmin`
4. 使用下面的代码把密码翻译出来，获取到`telecomadmin`的密码，一般是`telecomadmin12345678`这种形式
```js
/**
 * 将ascii转换成字符
*/
function crack(str){
	return str.split("&").map(ele=>String.fromCharCode(ele>57?ele-4:ele)).join("")
}
```
5. 登陆之后一顿操作


