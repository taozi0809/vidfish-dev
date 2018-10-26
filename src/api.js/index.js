import fetch from '../config/fetch'
import {YXB} from "../config/YXB";

export const market_list = (token,userName) => fetch({
  method:'shenzhouxing.exchange.market.list',
  data:{
    token:token,
    userName:userName,
  }
});

export const kline_chart_data = (tradingPairId,period) => fetch({
  method:'shenzhouxing.exchange.kline.chart.data',
  data:{
    tradingPairId: tradingPairId,
    startTime:null,
    endTime: null,
    period :period
  }
});


export const user_info = (account) => fetch({
  method:'youxibi.user.info',
  data:{
    account: account,
    idCode: account,
    userName: account,
    phoneNumber: account,
    email: account,
    nickName: account,

  }
},YXB.url.user+'/client.do');

