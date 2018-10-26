<template>
  <div class="page1">
    <p>这是page1页</p>

    <router-link to="/home">go home</router-link>

    <div>{{userInfo}}</div>
    <div>{{geohash}}</div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    data(){
      return{

      }
    },
    created:function(){},
    mounted:function(){
      console.log(this.user_info,this.geohash)
    },
    methods:{
      ...mapState(['geohash','userInfo'])
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
