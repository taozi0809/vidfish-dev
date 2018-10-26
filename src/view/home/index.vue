<template>
  <div class="home">
    <p>这是home页</p>

    <router-link to="/page1">go page1</router-link>
  </div>
</template>

<script>
  import {market_list,kline_chart_data,user_info} from "../../api.js";

  import {mapState, mapMutations} from 'vuex'

  export default {
    data(){
      return{

      }
    },
    created:function(){

    },
    mounted:function(){
      // 交易所列表
      market_list(null,null).then(res => {
        console.log('交易所列表:',res)
      })
      //k线图
      kline_chart_data('1','0').then(res=>{
        console.log('k线图',res)
      })
      //用户信息
      user_info('gggg').then(res=>{
        console.log('用户信息',res)
        this.RECORD_USERINFO(res.code);
      })

    },
    methods:{
      ...mapMutations(['RECORD_USERINFO']),
    },
  }

</script>

<style scoped type="text/scss" lang="scss">
  a{
    display: flex;
    align-items: center;
    justify-content: center;
    background: salmon;
    width: 100px;
    height: 30px;
    font-size: 14px;
    text-decoration: none;
    color:#333;
    margin-top: 20px;
    border-radius: 1px;
  }
  a:hover{
    color: #fff;
  }
</style>
