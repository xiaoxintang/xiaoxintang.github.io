# 开发环境相关
## 版本控制
## git
### 参考
1. [git官网](https://git-scm.com/book/zh/v2)
2. [廖雪峰](https://www.liaoxuefeng.com/wiki/896043488029600)
### 安装
1. [下载地址](https://git-scm.com/downloads)
2. 基本配置
```shell
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```
3. 生成公钥私钥
```shell
ssh-keygen -t rsa -C "你的邮箱"
```
4. 将公钥放到github或者gitee或者你自己搭建的服务器

### 克隆远程代码
1. 基础版：git clone 远程地址
2. 自定义
```SHELL
# 协议://用户@ip或域名:端口（非22需要指定 :端口）/路径 重命名
# 如果指定了rename，project 就会变成 rename,不指定默认project
git clone ssh://git@www.b.com:1234/srv/project.git rename

# 如果是22端口简写为
git clone git@www.b.com/路径
```
### 缓存工作目录
```shell
# 缓存当前所有文件，没有版本的文件需要先 git add
git stash
# 将缓存应用出来，并删除缓存栈里的当前内容
git stash pop
```
### 代码 message 提交规范
1. feat：新功能（feature）
2. fix：修补bug
3. docs：文档（documentation）
4. style： 格式（不影响代码运行的变动）
5. refactor：重构（即不是新增功能，也不是修改bug的代码变动）
6. test：增加测试
7. chore：构建过程或辅助工具的变动

### 个人git服务器
1. push报错 error: remote unpack failed: unable to create temporary object directory
> 这是由于没有权限引起的，需要赋予文件（包含子文件）权限
```shell
#递归一下才行
chmod 777 -R project.git
```

## nvm
nvm是管理nodejs版本的工具
### install v0.35.3
直接使用curl或者wget的方式可能被墙了，所以我们选择直接复制脚本，并在本地执行，其实和curl、wget的原理是一样的

1. [复制](https://github.com/nvm-sh/nvm/blob/v0.35.3/install.sh)并保存为shell脚本
2. 修改文件的权限为可执行
3. 执行脚本，自动进行安装
4. 在对应shell的rc配置文件里面添加镜像(公司网络的情况下，太实用了)，并source加载一下
```shell
export NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node
```
## nrm
nrm是npm源管理器
### 安装
```shell
npm install nrm -g
```
```shell script
Usage: nrm [options] [command]

Options:

  -V, --version                输出版本号
  -h, --help                   输出使用信息

Commands:

  ls                           列出所有registry
  current                      输出当前registry名字
  use <registry1>              修改 registry 为 registry1
  add <registry> <url> [home]  添加一个自定义的 registry
  del <registry>               删除一个自定义 registry
  home <registry> [browser]    Open the homepage of registry with optional browser
  test [registry]              展示 指定registry或所有registry的响应时间
  help                         输出这个帮助信息
```
## yrm
[yrm](https://www.npmjs.com/package/yrm) 是yarn源管理器，使用方法与`nrm`类似

[github地址](https://github.com/i5ting/yrm)

## node-sass
### npm 安装
```shell script
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
```
### yarn 安装
```shell script
yarn config set sass_binary_site https://npm.taobao.org/mirrors/node-sass
```
## homebrew
[homebrew](https://brew.sh/)是macos上面常用的软件包管理器
### 安装
1. 下载 [安装脚本](https://raw.githubusercontent.com/Homebrew/install/master/install.sh)
2. 修改脚本
```shell script
BREW_REPO="https://github.com/Homebrew/brew"
# 变成：
BREW_REPO="http://mirrors.ustc.edu.cn/brew.git"
# export的地方下面添加
export HOMEBREW_CORE_GIT_REMOTE=http://mirrors.ustc.edu.cn/homebrew-core.git
```
3. chmod +x 赋予shell文件可执行权限
4. 运行脚本进行安装


## parallels desktop
1. 网络问题
```shell
cd /Library/Preferences/Parallels
sudo vim network.desktop.xml
# 或者直接
sudo vim /Library/Preferences/Parallels/network.desktop.xml
# 大概第五行
# <UseKextless>-1</UseKextless>
# 改成
# <UseKextless>0</UseKextless>
```

## idea
### 安装参数
```
LFq51qqupnaiTNn39w6zATiOTxZI2JYuRJEBlzmUDv4zeeNlXhMgJZVb0q5QkLr+CIUrSuNB7ucifrGXawLB4qswPOXYG7+ItDNUR/9UkLTUWlnHLX07hnR1USOrWIjTmbytcIKEdaI6x0RskyotuItj84xxoSBP/iRBW2EHpOc
```
### 参考
[这个](https://justcode.ikeepstudying.com/2020/09/2020-09-09-%e4%ba%b2%e6%b5%8b%e6%9c%89%e6%95%88%ef%bc%9aintellij-idea-2020-2-%e6%9c%80%e6%96%b0%e5%85%a8%e5%ae%b6%e6%a1%b6%e7%b3%bb%e5%88%97%e4%ba%a7%e5%93%81%e6%bf%80%e6%b4%bb%e7%a0%b4%e8%a7%a3/)