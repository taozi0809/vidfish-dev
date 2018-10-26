import {YXB} from "./YXB";

export default async(option,url=YXB.url.service+'/client.do') => {
  let requestConfig = {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    mode: "cors",
    cache: "force-cache"
  }

  let data = YXB.getBaseCtoInfo(option.method,option.data)
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  data = ret
  Object.defineProperty(requestConfig, 'body', {
    value: JSON.stringify(data)
  })
  try {
    const response = await fetch(url,requestConfig);
    const responseJson = await response.json();
    return responseJson
  } catch (err) {
    throw new Error(err)
  }

}
