<template>
    <!--<div class="lead-container">-->
      <!--<span class="guide type" @click="guideHandle()">导游</span>-->
      <!--<span class="travel type" @click="travelHandle()">旅行社</span>-->
    <!--</div>-->
    <div class="lead-container">
      <div class="logo-container">
        <img class="login"  src="./../../common/image/logo.png" alt="">
      </div>
      <div class="name">团队预定系统</div>

      <span class="guide type" @click="guideHandle()">导游</span>
      <span class="travel type" @click="travelHandle()">旅行社</span>
    </div>
</template>

<script>
  export default {
    name: "lead",
    methods:{
      guideHandle(){
        this.$router.push({path:'/guide/logincopy'})
      },
      travelHandle(){
        this.$router.push({path:'/travel/logincopy'})
      }
    }

  };
</script>

<style lang="stylus"  rel="stylesheet/stylus">
  .lead-container
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    /*background: #efeff4*/
    background:url("./../../common/image/lead.jpg") no-repeat #000;
    background-size: 100% auto;
    .logo-container
      /*width 80px;*/
      width 3.77rem;
      /*height 80px*/
      height 3.4rem
      margin 2.05rem auto .6rem auto;
      .login
        //width 80px;
        //height 80px;
        width 3.77rem;
        height 3.4rem
        background-size: 100% auto;
    .name
      margin-bottom:1.95rem
      text-align center
      font-size 20px;
      letter-spacing :2px;
      color:#fff;
    .type
      display: block
      margin 0 auto 1.4rem auto
      width 75%
      text-align center
      height 3.34rem
      line-height 3.34rem
      background-color:#1c9ae7
      color:#fff;
      font-size 20px
      border-radius :15px
    .travel
      background-color:#f07800





</style>
