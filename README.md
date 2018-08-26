## 项目介绍
本项目由脚手架 [F7+Vue2.0+Cordova+WebPack][0] 搭建


## 启动项目:

```
    // 安装 phonegap
    npm install -g phonegap

    // 安装依赖
    npm/cnpm install

    // 创建 www 文件夹
    mkdir www

    // 添加平台
    phonegap platform add browser android ios

    // 运行项目
    phonegap run browser
    phonegap run browser -d -- --lr --live-reload

```


[0]:https://github.com/caiobiodere/cordova-template-framework7-vue-webpack


## 项目测试 PC 地址
http://120.78.92.212:8066/BLadmin/
登录账号: 999999 密码: 123456


1. 维修派工接口校验失败:  `/api/Dispatch/Assign`
2. 维修接单接口校验失败: `/api/PickOrder/CheckOrder`
3. 忽略订单接口校验失败: `/api/Dispatch/Ignore`
4. 维修中接口:
  - 获取当前维修列表接口校验失败: `/api/RepairHandle/RepairHandleList`
  - 新增维修人员
    + 接口校验失败: `api/RepairHandle/AddRepairUser`
    + 添加的时候跳转到第二个页面, 在第二个页面就保存, 还是返回保存?
  - 新增配件信息
    + 接口校验失败: `api/RepairHandle/AddRepairParts`
    + 疑点同上
5. 审批
  - 未找到入口.
  - 接口校验失败
