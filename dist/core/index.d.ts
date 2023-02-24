import { DefaultOptions, Options } from "../type/index";
export default class Tracker {
    data: Options;
    constructor(options: Options);
    private initDef;
    setUserId<T extends DefaultOptions["uuid"]>(uuid: T): void;
    setExtra<T extends DefaultOptions["extra"]>(extra: T): void;
    private installTracker;
    private captureEvents;
    private targetKeyReport;
    private errorEvent;
    private promiseReject;
    private jsError;
    private reportTracker;
    sendTracker<T>(data: T): void;
    private reportPerformance;
    private ReportCallback;
    private getPageName;
}
