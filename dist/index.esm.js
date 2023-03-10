//版本
var TrackerConfig;
(function (TrackerConfig) {
    TrackerConfig["version"] = "1.0.0";
})(TrackerConfig || (TrackerConfig = {}));

const createHistoryEvent = (key) => {
    const origin = history[key];
    return function () {
        const res = origin.apply(this, arguments);
        //发布订阅者模式
        const e = new Event(key);
        dispatchEvent(e);
        return res;
    };
};
function bin2hex(s) {
    let i, l, o = "", n;
    s += "";
    for (i = 0, l = s.length; i < l; i++) {
        n = s.charCodeAt(i).toString(16);
        o += n.length < 2 ? "0" + n : n;
    }
    return o;
}
const getUUid = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = 'red';
    ctx.fillRect(100, 100, 100, 100);
    ctx.fillText("text", 10, 10);
    let base64 = canvas.toDataURL().replace("data:image/png;base64,", "");
    let bin = window.atob(base64);
    //crc校验码总是不变的
    let crc = bin2hex(bin.slice(-16, -12));
    return crc;
};

var e,n,t,r,i,a=-1,o=function(e){addEventListener("pageshow",(function(n){n.persisted&&(a=n.timeStamp,e(n));}),!0);},c=function(){return window.performance&&performance.getEntriesByType&&performance.getEntriesByType("navigation")[0]},u=function(){var e=c();return e&&e.activationStart||0},f=function(e,n){var t=c(),r="navigate";return a>=0?r="back-forward-cache":t&&(r=document.prerendering||u()>0?"prerender":document.wasDiscarded?"restore":t.type.replace(/_/g,"-")),{name:e,value:void 0===n?-1:n,rating:"good",delta:0,entries:[],id:"v3-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12),navigationType:r}},s=function(e,n,t){try{if(PerformanceObserver.supportedEntryTypes.includes(e)){var r=new PerformanceObserver((function(e){Promise.resolve().then((function(){n(e.getEntries());}));}));return r.observe(Object.assign({type:e,buffered:!0},t||{})),r}}catch(e){}},d=function(e,n,t,r){var i,a;return function(o){n.value>=0&&(o||r)&&((a=n.value-(i||0))||void 0===i)&&(i=n.value,n.delta=a,n.rating=function(e,n){return e>n[1]?"poor":e>n[0]?"needs-improvement":"good"}(n.value,t),e(n));}},l=function(e){requestAnimationFrame((function(){return requestAnimationFrame((function(){return e()}))}));},v=function(e){var n=function(n){"pagehide"!==n.type&&"hidden"!==document.visibilityState||e(n);};addEventListener("visibilitychange",n,!0),addEventListener("pagehide",n,!0);},p=function(e){var n=!1;return function(t){n||(e(t),n=!0);}},m=-1,h=function(){return "hidden"!==document.visibilityState||document.prerendering?1/0:0},g=function(e){"hidden"===document.visibilityState&&m>-1&&(m="visibilitychange"===e.type?e.timeStamp:0,T());},y=function(){addEventListener("visibilitychange",g,!0),addEventListener("prerenderingchange",g,!0);},T=function(){removeEventListener("visibilitychange",g,!0),removeEventListener("prerenderingchange",g,!0);},E=function(){return m<0&&(m=h(),y(),o((function(){setTimeout((function(){m=h(),y();}),0);}))),{get firstHiddenTime(){return m}}},C=function(e){document.prerendering?addEventListener("prerenderingchange",(function(){return e()}),!0):e();},L=function(e,n){n=n||{},C((function(){var t,r=[1800,3e3],i=E(),a=f("FCP"),c=s("paint",(function(e){e.forEach((function(e){"first-contentful-paint"===e.name&&(c.disconnect(),e.startTime<i.firstHiddenTime&&(a.value=Math.max(e.startTime-u(),0),a.entries.push(e),t(!0)));}));}));c&&(t=d(e,a,r,n.reportAllChanges),o((function(i){a=f("FCP"),t=d(e,a,r,n.reportAllChanges),l((function(){a.value=performance.now()-i.timeStamp,t(!0);}));})));}));},b=function(e,n){n=n||{},L(p((function(){var t,r=[.1,.25],i=f("CLS",0),a=0,c=[],u=function(e){e.forEach((function(e){if(!e.hadRecentInput){var n=c[0],t=c[c.length-1];a&&e.startTime-t.startTime<1e3&&e.startTime-n.startTime<5e3?(a+=e.value,c.push(e)):(a=e.value,c=[e]);}})),a>i.value&&(i.value=a,i.entries=c,t());},p=s("layout-shift",u);p&&(t=d(e,i,r,n.reportAllChanges),v((function(){u(p.takeRecords()),t(!0);})),o((function(){a=0,i=f("CLS",0),t=d(e,i,r,n.reportAllChanges),l((function(){return t()}));})),setTimeout(t,0));})));},w={passive:!0,capture:!0},S=new Date,A=function(r,i){e||(e=i,n=r,t=new Date,F(removeEventListener),I());},I=function(){if(n>=0&&n<t-S){var i={entryType:"first-input",name:e.type,target:e.target,cancelable:e.cancelable,startTime:e.timeStamp,processingStart:e.timeStamp+n};r.forEach((function(e){e(i);})),r=[];}},P=function(e){if(e.cancelable){var n=(e.timeStamp>1e12?new Date:performance.now())-e.timeStamp;"pointerdown"==e.type?function(e,n){var t=function(){A(e,n),i();},r=function(){i();},i=function(){removeEventListener("pointerup",t,w),removeEventListener("pointercancel",r,w);};addEventListener("pointerup",t,w),addEventListener("pointercancel",r,w);}(n,e):A(n,e);}},F=function(e){["mousedown","keydown","touchstart","pointerdown"].forEach((function(n){return e(n,P,w)}));},M=function(t,i){i=i||{},C((function(){var a,c=[100,300],u=E(),l=f("FID"),m=function(e){e.startTime<u.firstHiddenTime&&(l.value=e.processingStart-e.startTime,l.entries.push(e),a(!0));},h=function(e){e.forEach(m);},g=s("first-input",h);a=d(t,l,c,i.reportAllChanges),g&&v(p((function(){h(g.takeRecords()),g.disconnect();}))),g&&o((function(){var o;l=f("FID"),a=d(t,l,c,i.reportAllChanges),r=[],n=-1,e=null,F(addEventListener),o=m,r.push(o),I();}));}));},k=0,D=1/0,x=0,B=function(e){e.forEach((function(e){e.interactionId&&(D=Math.min(D,e.interactionId),x=Math.max(x,e.interactionId),k=x?(x-D)/7+1:0);}));},R=function(){return i?k:performance.interactionCount||0},H=function(){"interactionCount"in performance||i||(i=s("event",B,{type:"event",buffered:!0,durationThreshold:0}));},N=0,O=function(){return R()-N},q=[],j={},_=function(e){var n=q[q.length-1],t=j[e.interactionId];if(t||q.length<10||e.duration>n.latency){if(t)t.entries.push(e),t.latency=Math.max(t.latency,e.duration);else {var r={id:e.interactionId,latency:e.duration,entries:[e]};j[r.id]=r,q.push(r);}q.sort((function(e,n){return n.latency-e.latency})),q.splice(10).forEach((function(e){delete j[e.id];}));}},z=function(e,n){n=n||{},C((function(){var t=[200,500];H();var r,i=f("INP"),a=function(e){e.forEach((function(e){(e.interactionId&&_(e),"first-input"===e.entryType)&&(!q.some((function(n){return n.entries.some((function(n){return e.duration===n.duration&&e.startTime===n.startTime}))}))&&_(e));}));var n,t=(n=Math.min(q.length-1,Math.floor(O()/50)),q[n]);t&&t.latency!==i.value&&(i.value=t.latency,i.entries=t.entries,r());},c=s("event",a,{durationThreshold:n.durationThreshold||40});r=d(e,i,t,n.reportAllChanges),c&&(c.observe({type:"first-input",buffered:!0}),v((function(){a(c.takeRecords()),i.value<0&&O()>0&&(i.value=0,i.entries=[]),r(!0);})),o((function(){q=[],N=R(),i=f("INP"),r=d(e,i,t,n.reportAllChanges);})));}));},G={},J=function(e,n){n=n||{},C((function(){var t,r=[2500,4e3],i=E(),a=f("LCP"),c=function(e){var n=e[e.length-1];if(n){var r=Math.max(n.startTime-u(),0);r<i.firstHiddenTime&&(a.value=r,a.entries=[n],t());}},m=s("largest-contentful-paint",c);if(m){t=d(e,a,r,n.reportAllChanges);var h=p((function(){G[a.id]||(c(m.takeRecords()),m.disconnect(),G[a.id]=!0,t(!0));}));["keydown","click"].forEach((function(e){addEventListener(e,h,!0);})),v(h),o((function(i){a=f("LCP"),t=d(e,a,r,n.reportAllChanges),l((function(){a.value=performance.now()-i.timeStamp,G[a.id]=!0,t(!0);}));}));}}));},K=function e(n){document.prerendering?C((function(){return e(n)})):"complete"!==document.readyState?addEventListener("load",(function(){return e(n)}),!0):setTimeout(n,0);},Q=function(e,n){n=n||{};var t=[800,1800],r=f("TTFB"),i=d(e,r,t,n.reportAllChanges);K((function(){var a=c();if(a){var s=a.responseStart;if(s<=0||s>performance.now())return;r.value=Math.max(s-u(),0),r.entries=[a],i(!0),o((function(){r=f("TTFB",0),(i=d(e,r,t,n.reportAllChanges))(!0);}));}}));};

//鼠标事件
const MouseEventList = [
    "click",
    "dblclick",
    "contextmenu",
    "mousedown",
    "mouseup",
    "mouseenter",
    "mouseout",
    "mouseover",
];
class Tracker {
    constructor(options) {
        this.ReportCallback = (metric) => {
            this.reportTracker({
                event: metric.name,
                targetKey: "performance",
                value: metric.value,
                rating: metric.rating,
            });
        };
        //合并用户选项
        this.data = Object.assign(this.initDef(), options);
        this.installTracker();
    }
    //初始化默认选项
    initDef() {
        window.history["pushState"] = createHistoryEvent("pushState");
        window.history["replaceState"] = createHistoryEvent("replaceState");
        return {
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
    setUserId(uuid) {
        this.data.uuid = uuid;
    }
    setExtra(extra) {
        this.data.extra = extra;
    }
    //对history和hash分别进行监听
    installTracker() {
        if (this.data.historyTracker) {
            this.captureEvents(["pushState", "replaceState", "popstate"], "history-pv");
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
    captureEvents(mouseEventList, targetKey, data) {
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
    targetKeyReport() {
        //监听鼠标事件
        MouseEventList.forEach((ev) => {
            window.addEventListener(ev, (e) => {
                const target = e.target;
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
    errorEvent() {
        window.addEventListener("error", (ev) => {
            //防止错误打印到控制台
            ev.preventDefault();
            this.reportTracker({
                event: "error",
                targetKey: "message",
                message: ev.message,
                filename: `${ev.filename}(${ev.lineno}行,${ev.colno}列)`,
            });
        });
    }
    //promiseReject 错误
    promiseReject() {
        window.addEventListener("unhandledrejection", (ev) => {
            ev.preventDefault();
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
    jsError() {
        this.errorEvent();
        this.promiseReject();
    }
    //利用sendBeacon进行上报，注意使用blob格式
    reportTracker(data) {
        //保护this.data不被混乱
        const p = Object.assign({}, this.data);
        //组装数据
        const params = Object.assign(p, data, {
            time: new Date().getTime(),
            pageName: this.getPageName()
        });
        let blob = new Blob([JSON.stringify(params)], {
            //指定格式
            type: "application/x-www-form-urlencoded",
        });
        navigator.sendBeacon(this.data.requestUrl, blob);
    }
    //手动上报
    sendTracker(data) {
        this.reportTracker(data);
    }
    //对性能的上报
    reportPerformance() {
        //First Contentful Paint
        L(this.ReportCallback);
        //largest-contentful-paint 
        J(this.ReportCallback);
        //首次输入延迟时间
        M(this.ReportCallback);
        //累积布局偏移，测量视觉稳定性。为了提供良好的用户体验，页面的 CLS 应保持在 0.1. 或更少。
        b(this.ReportCallback);
        //首包时间
        Q(this.ReportCallback);
        z(this.ReportCallback);
    }
    getPageName() {
        return location.href.replace(location.origin, '');
    }
}

export { Tracker as default };
