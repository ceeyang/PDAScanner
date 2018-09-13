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



### Bug 反馈文档
1. 科室报修
    1. [ ] 待报修：报修一条数据，状态已报修里面会有多条一样的数据。// 等待后台调试
    2. [x] 返回上一级点起没有反应
    3. [x] 引导条（消息、首页、我的）无法切换
    4. [x] 申请报修：里面的"报修信息"没有获取报修人员应该为当前登录人。
    5. [ ] 申请报修，报修成功后，已报修列表出现多条记录（注：PC端只有一条）// 等待后台调试
    6. [x] 科室报修新增没有其他用处，可以屏蔽按钮。
    7. [ ] 没有扫描报修功能
2. 消息列表
    1. [x] 日期格式保留年月日(YYYY.MM.DD)
    1. [x] 派工流程走不通
    1. [x] 接单流程走不通（实际操作是没有关闭页面，PC端显示接单完成）
    1. [ ] 显示全部里面有时候会出现一条无用的数据。点击会卡死。// 问题暂不明确
    1. [ ] 接完单，在待维修列表没有记录 // 等待后台调试
    1. [ ] 已完成的维修，在完成列表找不到记录 // 等待后台调试
    1. [ ] 全部有一条没有用的数据显示点击会卡死。 // 问题暂不明确
3. 维修管理
    1. [ ] 维修处理：维修人接完单，维修中里面查不到数据。 // 等待后台调试
    1. [x] 维修派单:名称显示不全。点击派工也没有任何反应。
4. 我的审批
    1. [ ] 维修详情：看不到维修审批流程。
    1. [x] 维修详情：进行审核会一直显示加载中。
5. 资产盘点
    1. [ ] 已完成盘点在盘点列表找不到记录。// 等待后台调试
