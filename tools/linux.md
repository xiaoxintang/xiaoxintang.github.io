# linux
## 权限
> r==4
> w==2
> x==1
>> 权限数字 是否目录，拥有者，群组，其他组
## 时区
+ 检查时区 `timedatectl`
+ 列出时区 `timedatectl list-timezones`
+ 修改时区 `timedatectl set-timezone Asia/Shanghai`
## 查看是哪个发行版
```shell
# 只适合Redhat系的Linux
cat /etc/redhat-release
# 适用于所有的Linux发行版
cat /etc/issue
```
## 切换用户
```shell
su username
```
## 修改用户密码
```shell
password userName
```
## 用户 is not in the sudoers file
使用root用户进行如下操作
```shell
vim /etc/sudoers
```
在root下面将当前用户添加进去
```shell
longan ALL=(ALL:ALL) ALL
```
强制保存退出
```shell
:wq!
```
## shell脚本异常
1. /bin/sh^M: bad interpreter: No such file or directory
> 这是由于文件在windows里的编码格式不同引起的
>> windows里的是dos linux里需要变成unix
```shell
#利用如下命令在vim查看或设置文件格式
:set ff
:set fileformat
#设置
:set ff=unix
#或
:set fileformat=unix
#保存
```