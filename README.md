# yexiyue_tracker

## 简介

**个人开发的简单sdk，功能不全面，谨慎使用**



## 功能包含

1. js错误上报
2. promise未捕获错误上报
3. dom事件上报
4. history和hash页面路由跳转上报
5. performance上报



## 使用说明

```typescript
/**
 * @requestUrl 接口地址
 * @historyTracker history上报
 * @hashTracker hash上报
 * @domTracker 携带Tracker-key 点击事件上报
 * @sdkVersionsdk 版本
 * @extra 透传字段
 * @jsError js 和 promise 报错异常上报
 * @performanceTracker 性能上报
 */

import Tracker from 'yexiyue_tracker'

new Tracker({
  requestUrl:'http://localhost:3000',
  hashTracker:true,
  jsError:true,
  performanceTracker:true
})
```

**使用domTracker时，需要为该dom添加自定义属性target-key**

```html
<button target-key="btn" >按钮</button>
```



## 后端接受数据

**以下是nest.js示例**

```typescript
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Post()
  getTracker(@Body() body: any) {
    console.log(JSON.parse(Object.keys(body)[0]));
    return 'ok';
  }
}

/** 打印结果
{
  historyTracker: true,
  hashTracker: false,
  domTracker: true,
  jsError: true,
  sdkVersion: '1.0.0',
  performanceTracker: true,
  uuid: 'e157e6e9',
  requestUrl: '/sdk',
  event: 'pushState',
  targetKey: 'history-pv',
  time: 1678017692980,
  pageName: '/#/news/8'
}
*/
```

