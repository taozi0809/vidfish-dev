import {user_info} from "../api.js";
import {GET_USERINFO,SAVE_GEOHASH} from "./mutation-type";

export default {
  async get_user_info({commit,state}){
    let res = await user_info('gggg')
    commit(GET_USERINFO,res)
  }

}
