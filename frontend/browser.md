# 浏览器
## 刷新dns
浏览器打开`chrome://net-internals/#dns`
## 如何下载指定版本的chromium
[参考链接](https://www.chromium.org/getting-involved/download-chromium)
1. [在这个网页搜索](https://chromereleases.googleblog.com/search/label/Stable%20updates)，找到（最新的）准确的浏览器版本号，例如输入`79.`，进行搜索，
   在搜索结果中找到符合自己条件的浏览器准确版本号，我这里得到最新的79版本是`79.0.3945.93`

2. [这个网页](https://omahaproxy.appspot.com/)翻到下面，找到`Tools`->`Version Information`进行搜索position（lookup）`79.0.3945.93`，看到`Branch Base Position: 706915`这一行，最后6位数字`706915`
3. [这个网页](https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html)，选择你要下载的平台（linux/windows/mac），进去之后的网页里面，`Filter`输入框输入刚才找到的position,我这里是`706915`，输入并等待一段时间

4. 再点进刚才的搜索结果的目录中，我这里选择的`min_installer.exe`，得到的下载链接是[https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Win_x64%2F706915%2Fmini_installer.exe?generation=1571327351894666&alt=media](https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Win_x64%2F706915%2Fmini_installer.exe?generation=1571327351894666&alt=media)

## 淘宝千牛ide远程调试 2020-07-04
1. 安装`目录\runtime_v8_res\setting.json`修改 `context`为`2`
2. 重启千牛
3. chromium内核浏览器打开`devtools://devtools/bundled/inspector.html?ws=127.0.0.1:9225`进行调试
> 我猜chromium版本不能是80后的版本，当时用的最新`83.0.4103.116`版本,远程调试无输出,
> 所以我用79版本，发现可以
>> 一次只能调试一个千牛小程序