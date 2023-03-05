import { DefaultOptions, Options, TrackerConfig } from "../type/index";
import { createHistoryEvent, getUUid } from "../util/pua";
import {
  onFCP,
  onFID,
  onLCP,
  onCLS,
  onTTFB,
  onINP,
  ReportCallback,
} from "web-vitals";
//鼠标事件
const MouseEventList: string[] = [
  "click",
  "dblclick",
  "contextmenu",
  "mousedown",
  "mouseup",
  "mouseenter",
  "mouseout",
  "mouseover",
];

export default class Tracker {
  public data: Options;
  constructor(options: Options) {
    //合并用户选项
    this.data = Object.assign(this.initDef(), options);
    this.installTracker();
  }
  //初始化默认选项
  private initDef(): DefaultOptions {
    window.history["pushState"] = createHistoryEvent("pushState");
    window.history["replaceState"] = createHistoryEvent("replaceState");
    return <DefaultOptions>{
      historyTracker: false,
      hashTracker: false,
      domTracker: false,
      jsError: false,
      sdkVersion: TrackerConfig.version,
      performanceTracker: false,
      uuid: getUUid(),
    };
  }
  //设置uuid
  public setUserId<T extends DefaultOptions["uuid"]>(uuid: T) {
    this.data.uuid = uuid;
  }

  public setExtra<T extends DefaultOptions["extra"]>(extra: T) {
    this.data.extra = extra;
  }

  //对history和hash分别进行监听
  private installTracker() {
    if (this.data.historyTracker) {
      this.captureEvents(
        ["pushState", "replaceState", "popstate"],
        "history-pv"
      );
    }
    if (this.data.hashTracker) {
      this.captureEvents(["hashChange"], "hash-pv");
    }
    if (this.data.domTracker) {
      this.targetKeyReport();
    }
    if (this.data.jsError) {
      this.jsError();
    }
    if (this.data.performanceTracker) {
      this.reportPerformance();
    }
  }

  //监听事件
  private captureEvents<T>(
    mouseEventList: string[],
    targetKey: string,
    data?: T
  ) {
    mouseEventList.forEach((event) => {
      window.addEventListener(event, () => {
        //监听事件自动上报
        this.reportTracker({
          event,
          targetKey,
          data,
        });
      });
    });
  }

  //dom上报,设置自定义属性target-key即可上报
  private targetKeyReport() {
    //监听鼠标事件
    MouseEventList.forEach((ev) => {
      window.addEventListener(ev, (e) => {
        const target = e.target as HTMLElement;
        const targetKey = target.getAttribute("target-key");
        if (targetKey) {
          this.reportTracker({
            event: ev,
            targetKey,
          });
        }
      });
    });
  }
  //js错误
  private errorEvent() {
    window.addEventListener("error", (ev) => {
        //防止错误打印到控制台
        ev.preventDefault()
      this.reportTracker({
        event: "error",
        targetKey: "message",
        message: ev.message,
        filename:`${ev.filename}(${ev.lineno}行,${ev.colno}列)`,
      });
    });
  }

  //promiseReject 错误
  private promiseReject() {
    window.addEventListener("unhandledrejection", (ev) => {
        ev.preventDefault()
      ev.promise.catch((error) => {
        this.reportTracker({
          event: "promiseError",
          targetKey: "message",
          message: error,
        });
      });
    });
  }

  //汇总js错误
  private jsError() {
    this.errorEvent();
    this.promiseReject();
  }

  //利用sendBeacon进行上报，注意使用blob格式
  private reportTracker<T>(data: T) {
    //保护this.data不被混乱
    const p = Object.assign({}, this.data);
    //组装数据
    const params = Object.assign(p, data, { 
        time: new Date().getTime(),
        pageName:this.getPageName()
     });
    let blob = new Blob([JSON.stringify(params)], {
      //指定格式
      type: "application/x-www-form-urlencoded",
    });
    navigator.sendBeacon(this.data.requestUrl, blob);
  }

  //手动上报
  public sendTracker<T>(data: T) {
    this.reportTracker(data);
  }

  //对性能的上报
  private reportPerformance() {
    //First Contentful Paint
    onFCP(this.ReportCallback);
    //largest-contentful-paint 
    onLCP(this.ReportCallback);
    //首次输入延迟时间
    onFID(this.ReportCallback);
    //累积布局偏移，测量视觉稳定性。为了提供良好的用户体验，页面的 CLS 应保持在 0.1. 或更少。
    onCLS(this.ReportCallback);
    //首包时间
    onTTFB(this.ReportCallback);
    onINP(this.ReportCallback);
  }

  private ReportCallback: ReportCallback = (metric) => {
    this.reportTracker({
      event: metric.name,
      targetKey: "performance",
      value: metric.value,
      rating: metric.rating,
    });
  };

  private getPageName(){
    return location.href.replace(location.origin,'')
  }
}
