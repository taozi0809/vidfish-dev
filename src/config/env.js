

let baseUrl = 'http://api.app.exchange.link/client.do';
let routerMode = 'hash';
let imgBaseUrl = '';

if (process.env.NODE_ENV == 'development') {
  imgBaseUrl = '/img/';
}else if(process.env.NODE_ENV == 'production'){
  baseUrl = '//elm.cangdu.org';
  imgBaseUrl = '//elm.cangdu.org/img/';
}

export {
  baseUrl,
  routerMode,
  imgBaseUrl,
}
