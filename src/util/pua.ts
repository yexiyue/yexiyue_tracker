export const createHistoryEvent = <T extends keyof History>(key: T) => {
  const origin = history[key];
  return function (this: any) {
    const res = origin.apply(this, arguments);
    //发布订阅者模式
    const e = new Event(key);
    dispatchEvent(e);
    return res;
  };
};

function bin2hex(s: string) {
  let i,
    l,
    o = "",
    n;

  s += "";

  for (i = 0, l = s.length; i < l; i++) {
    n = s.charCodeAt(i).toString(16);
    o += n.length < 2 ? "0" + n : n;
  }

  return o;
}

export const getUUid = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle='red'
  ctx.fillRect(100,100,100,100)
  ctx.fillText("text", 10, 10);
  let base64 = canvas.toDataURL().replace("data:image/png;base64,", "");
  let bin = window.atob(base64);
  //crc校验码总是不变的
  let crc = bin2hex(bin.slice(-16, -12));

  return crc;
};


