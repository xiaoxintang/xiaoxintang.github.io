# 协议
## http协议
### http协议过程
1. 建立tcp连接（三次握手）
2. 浏览器发送请求行
3. 浏览器发送请求头
4. 浏览器如果是post会继续发送请求体

![http请求报文格式](/assets/http_req.jpg)

5. 服务器发送应答状态行
6. 服务器发送应答响应头
7. 服务器发送应答以Content-Type应答头信息所描述的格式发送数据
8. 服务器关闭tcp(四次挥手),如果浏览器请求头有Connection:keep-alive则不会关闭

![http响应报文格式](/assets/http_res.jpg)
### http 1.1 2.0 3.0
#### 参考文章
1. [掘金](https://juejin.im/post/5dbe8eba5188254fe019dabb)
#### http1.1
1. 长连接
> 减少tcp连接和断开的次数，可发送多个http请求
> 一个域名最多支持6个长连接

2. 虚拟主机的支持
> 请求头中增加了Host字段表示当前的域名地址
> 所以nginx反向代理多个域名就是根据这个？

3. 对动态生成的内容提供了完美支持
> 引入Chunk transfer机制
> 服务器会将数据分割成若干个任意大小的数据 块，每个数据块发送时会附上上个数据块的⻓度，最后使用一个零⻓度的块作为发送数据完成的标志
4. 客戶端Cookie、安全机制

### http2.0
1. 多路复用技术
> 1. 首先，浏览器准备好请求数据，包括了请求行、请求头等信息，如果是POST方法，那么还要有请求体。
> 2. 这些数据经过二进制分帧层处理之后，会被转换为一个个带有请求ID编号的帧，通过协议栈将这些帧发送 给服务器。
> 3. 服务器接收到所有帧之后，会将所有相同ID的帧合并为一条完整的请求信息。
> 4. 然后服务器处理该条请求，并将处理的响应行、响应头和响应体分别发送至二进制分帧层。
> 5. 同样，二进制分帧层会将这些响应数据转换为一个个带有请求ID编号的帧，经过协议栈发送给浏览器。
> 6. 浏览器接收到响应帧之后，会根据ID编号将帧的数据提交给对应的请求。
2. 可以设置请求优先级
3. 服务器推送
4. 头部压缩

### http3.0
1. 基于udp
2. 多路复用，解决了队头阻塞问题