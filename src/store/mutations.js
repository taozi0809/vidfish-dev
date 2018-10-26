import {RECORD_USERINFO,SAVE_GEOHASH} from "./mutation-type";


export default {

  // 记录用户信息
  [RECORD_USERINFO](state, info) {
    state.userInfo = info;
    state.login = true;
  },

  //保存geohash
  [SAVE_GEOHASH](state, geohash) {
    state.geohash = geohash;

  },



}
