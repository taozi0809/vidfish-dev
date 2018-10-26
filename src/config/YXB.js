import {hex_md5} from "./md5";

export const YXB = {
  partnerKey: "youxibi_shenzhouxing_exchange",
  secretkey: "38F9E7333A61745253D175E370D238B3",
  versionCode: 100,
  versionName: "1.0",
  lang: "CN",
  // --------------------------------------------------------
  url : {
    // ws : "ws://192.168.1.55:9000",
    // user : "http://192.168.1.55:8000",
    // wallet : "http://192.168.1.55:8000",
    // sms : "http://192.168.1.55:8000",
    // chat : "http://192.168.1.55:8000",
    // coin : "http://192.168.1.55:8000",
    // service : "http://192.168.1.55:7000",
    // upload : "http://192.168.1.55:8000",

    // ws : "ws://118.25.116.25:9000",
    // user : "http://118.25.116.25:8000",
    // wallet : "http://118.25.116.25:8000",
    // sms : "http://118.25.116.25:8000",
    // chat : "http://118.25.116.25:8000",
    // coin : "http://118.25.116.25:8000",
    // service : "http://118.25.116.25:7006"
    // upload : "http://118.25.116.25:8000",

    ws : "ws://api.center.gamecointoken.com",
    user : "http://api.core.gamecointoken.com",
    wallet : "http://api.core.gamecointoken.com",
    sms : "http://api.core.gamecointoken.com",
    chat : "http://api.core.gamecointoken.com",
    coin : "http://api.core.gamecointoken.com",
    service : "http://api.app.exchange.link",
    upload : "http://api.upload.exchange.link",
  },
  dataBase : {
    tableSet : new Map(),
    table : {
      obj : function() {
        return {
          find : function(index) {
            return this.data.get(index);
          },
          set : function(index, data) {
            this.data.set(index, data);
          },
          data : new Map()
        }
      },
      create : function(tableName) {
        YXB.dataBase.tableSet.set(tableName, new YXB.dataBase.table.obj());
      },
      get : function(tableName) {
        var table = YXB.dataBase.tableSet.get(tableName);
        if (!table) {
          table = new YXB.dataBase.table.obj();
          YXB.dataBase.tableSet.set(tableName, table);
        }
        return table;
      }
    }
  },
  wsMessageIdSet : new Set(),
  websocket : function(action) {
    var websocket;
    if (action.url) {
      websocket = new WebSocket(action.url);
    } else {
      websocket = new WebSocket(YXB.url.ws);
    }
    websocket.onopen = function(evt) {
      var registObj = {
        userName : action.userName,
        token : action.token,
        notifyUrl : action.notifyUrl
      }
      websocket.send(JSON.stringify(YXB.getBaseCtoInfo("youxibi.center.websocket.regist", registObj)));
      setInterval(function() {
        websocket.send(JSON.stringify(YXB.getBaseCtoInfo("youxibi.center.websocket.ping", {})));
      }, 3000);
      if (action.open) {
        action.open(evt);
      }
    };
    websocket.onclose = function(evt) {
      action.close(evt)
    };
    websocket.onmessage = function(evt) {
      var jdata = JSON.parse(evt.data);
      if ("0" == jdata.code) {
        if (null != jdata.id) {
          if (!YXB.wsMessageIdSet.has(jdata.id)) {
            YXB.wsMessageIdSet.add(jdata.id);
            if (YXB.wsMessageIdSet.size > 1000) {
              YXB.wsMessageIdSet = new Set();
            }
            var checkObj = {
              id : jdata.id
            }
            websocket.send(JSON.stringify(YXB.getBaseCtoInfo("youxibi.center.websocket.message.check", checkObj)));
            action.message(jdata.model, jdata.data);
          }
        }
      } else {
        action.error(jdata.code);
      }
    };
    websocket.onerror = function(evt) {
      action.error(-100);
    };
    return {
      doSend : function(message) {
        console.log("send:" + message.method);
        websocket.send(JSON.stringify(message));
      }
    }
  }
}
YXB.getBaseCtoInfo = function getBaseCtoInfo(method, data) {
  let obj = {}
  if(data==undefined || data==null || data==""){
    obj = {
      device : "ANDROID",
      deviceId : "none",
      lang : YXB.lang,
      method : method,
      partnerKey : YXB.partnerKey,
      secretKey : YXB.secretkey,
      sendTime : new Date().getTime(),
      signType : "NORMAL",
      versionCode : YXB.versionCode,
      versionName : YXB.versionName
    }
  }else{
    obj = {
      device : "ANDROID",
      deviceId : "none",
      lang : YXB.lang,
      method : method,
      params : JSON.stringify(data),
      partnerKey : YXB.partnerKey,
      secretKey : YXB.secretkey,
      sendTime : new Date().getTime(),
      signType : "NORMAL",
      versionCode : YXB.versionCode,
      versionName : YXB.versionName
    }
  }
  var content = "";
  for ( var o in obj) {
    content = content + o + "=" + obj[o] + "&";
  }
  obj.sign = hex_md5(content.substring(0, content.length - 1));
  return obj;
}
