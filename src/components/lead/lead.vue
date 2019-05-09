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
      <!--<div class="mini-program">-->
        <!--<span class="program" @click="returnMiniProgram()">返回小程序首页？</span>-->
      <!--</div>-->
    </div>
</template>

<script>
  export default {
    name: "lead",
    data(){
      return {
        // showMiniProgram: false
      }
    },
    created(){
      //防止后退
      // window.history.pushState(null, null, document.URL);
      // window.addEventListener('popstate', function () {
      //   history.pushState(null, null, document.URL);
      // });

      //判断该网页是否在在小程序内
      // if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
      //   document.addEventListener('WeixinJSBridgeReady', this.ready, false)
      // } else {
      //
      //   this.ready()
      // }
    },
    methods:{
      ready(){
        if(this.$route.params.isOut){
          this.returnMiniProgram();
          return;
        }
        // console.log(window.__wxjs_environment === 'miniprogram') // true
        // if(window.__wxjs_environment === 'miniprogram'){
        //   this.showMiniProgram = true
        // }else{
        //   this.showMiniProgram = false
        // }
      },
      guideHandle(){
        this.$router.push({path:'/guide/logincopy'})
      },
      travelHandle(){
        this.$router.push({path:'/travel/logincopy'})
      },
      returnMiniProgram(){

        wx.miniProgram.reLaunch({url: '/pages/home/home'})
      },
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
    .mini-program
      display block
      color #ffffff
      font-size 16px;
      text-align center
      .program
        /*display inline-block*/
        /*margin 0 auto*/
        border-bottom 1px solid #ffffff
        padding-bottom 1px;






</style>
