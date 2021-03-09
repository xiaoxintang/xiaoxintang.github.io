# docker
## docker-compose
直接放上我的[掘金链接](https://juejin.im/post/5e0abc565188253ab849c852)
## desktop版本nginx反向代理问题
desktop版本的实现方式不同，host模式无效，只能使用bridge模式，当某些项目需要使用nginx正向代理跨域时
```shell
proxy_pass http://localhost:8080
```
其实代理的是容器内部localhost,所以nginx将会502.
解决方法就是`指定宿主机的IP代替localhost`， 然而宿主机ip很可能会变化
> [docker](https://docs.docker.com/docker-for-mac/networking/)提供了 `host.docker.internal`来代表`宿主机ip`

于是可以这样解决
```shell
proxy_pass http://host.docker.internal:8080
```

## zerossl/client
> 2020-09-20
### 如何使用
1. 拉取镜像（非必须）
> 如果不先拉取镜像的话，默认拉取`latest`
```shell
docker pull zerossl/client
```
2. 确定两个目录
> a. 容器内部`/data`是保存生成的`ssl`证书和`key`的

> b. 容器内部的`/webroot`需要用当前需要申请的域名html目录下的`.well-known/acme-challenge`目录去映射它，用来验证域名所有权的

3. 直接运行容器
```shell
docker run -it -v /root/keys_and_certs:/data -v /root/gfw/html/xiaoxt/.well-known/acme-challenge:/webroot -u $(id -u) --rm zerossl/client
```

4. 合法参数

|参数|作用|
|:----:|:----:|
| --key file.key|账号key|
| --csr file.csr|CSR文件|
| --csr-key file.key|CSR文件的key|
| --crt file.crt|certificate文件|
| --domains list|需要授权的域名列表，可以是通配符|
| --path absolute path|可以对应domains的多个绝对路径|
| --handle-as http|dns|tls|验证方式，默认http|
| --config file|指定配置文件|
| --unlink|自动移除验证文件|
| --revoke|撤销一个certificate|
| --live|是否正式创建|
| --generate-missing|创建缺少的文件(key, csr and csr-key)|
| --generate-only|生成文件后退出|