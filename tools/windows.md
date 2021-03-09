# windows
1. windows安装`node-sass`报错如下
```
MSBUILD : error MSB3428: 未能加载 Visual C++ 组件“VCBuild.exe”。
要解决此问题，
1) 安装 .NET Framework 2.0 SDK；
2) 安装 Microsoft Visual Studio 2005；或 
3) 如果将该组件安装到了其他位置， 请将其位置添加到系统路径中
```

解决方法
```shell
npm install --global --production windows-build-tools
```