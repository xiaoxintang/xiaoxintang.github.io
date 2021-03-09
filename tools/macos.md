# macos
## 刷新dns缓存
```shell
sudo killall -HUP mDNSResponder
```
## 任何来源不见了？
```shell
sudo spctl --master-disable
```
## 重装macos
1. 重启
2. 在 Mac 重新启动时立即执行以下一项操作：
> + 从互联网安装最新版本的 macOS：按住 Option-Command-R 直到旋转地球出现，然后松开按键。
>> 此选项将安装与您电脑兼容的 macOS 最新版本。
> + 从互联网重新安装您电脑原始版本的 macOS：按住 Shift-Option-Command-R 直到旋转地球出现，然后松开按键。
>> 此选项将重新安装您电脑自带的最新版本的 macOS 以及该版本的任何可用更新。
> + 从电脑上的内建恢复磁盘中重新安装 macOS：按住 Command-R 直到“实用工具”窗口出现。
>> 此选项将重新安装储存在您电脑内建恢复磁盘中的 macOS 版本以及您已安装的任何更新。
3. 选择“重新安装 macOS”，然后点按“继续”。
4. 请按照屏幕指示进行操作。在您选择磁盘的面板中，选择您当前的 macOS 磁盘（大多数情况下，它是唯一可用的磁盘）。