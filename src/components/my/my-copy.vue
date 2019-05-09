<template>
    <div class="my-copy-container">
      <header class="header">
        <h1>我的</h1>
        <!--<i @click="back" class="cubeic-back"></i>-->
      </header>
      <div class="wrapper">
        <!--<div class="bg-main"></div>-->
        <div class="bg-main">
          <img src="./../../common/image/bg-my.png" class="bg-my-img" alt="">
        </div>

        <div class="info">
          <div class="name item clear-fix">
            <span class="text">姓名</span>
            <span class="value">{{guideInfo.name}}</span>
          </div>
          <div class="phone item clear-fix">
            <span class="text">手机号</span>
            <span class="value">{{guideInfo.mobile}}</span>
          </div>

          <div class="type item clear-fix">
            <span class="text">证件类型</span>
            <span class="value">{{guideInfo.certType=='106001'?'导游证': guideInfo.certType=='106002'? '身份证': guideInfo.certType=='106003'?'学生证':''}}</span>
          </div>
          <div class="cerNo item clear-fix">
            <span class="text">证件号</span>
            <span class="value">{{guideInfo.certNo}}</span>
          </div>
          <img src="./../../common/image/111.png" class="notice_float_copy" alt="">
        </div>
        <div class="handle">
          <span class="handle-item" @click="updatePassWord()">修改密码</span>
          <span class="handle-item" @click="loginOut()">退出登录</span>
        </div>
      </div>
      <tab-bar :selected="selectedTabBar"></tab-bar>
    </div>
</template>

<script>
  import {MessageBox} from 'mint-ui'
  import TabBar from '@/base/tabbar/tabbar'
  import {clearLoginInfo} from "../../utils";
  export default {
    name: "my-copy",
    data(){
      return {
        guideInfo:{},
        selectedTabBar:'my/copy',
      }
    },
    components:{
      TabBar,
    },
    created(){
      this.getUseInfo()
    },
    methods:{
      // scoreDetail(){
      //   this.$createToast({
      //     txt: '暂未开放',
      //     type: 'txt'
      //   }).show()
      // },
      getUseInfo(){
        this.$http.get(`/wap/guide/info`).then(({ data: res }) => {
          if(res.code !== '200'){
            this.$createToast({
              txt: res.msg,
              type: 'txt'
            }).show()
            return
          }

          this.guideInfo = res.data
          console.log(this.guideInfo)

        })
      },
      updatePassWord(){
        // this.$createToast({
        //   txt: '暂未开放',
        //   type: 'txt'
        // }).show()
        this.$router.push({path:'/reset-password'})
      },
      loginOut(){
        const that = this
        MessageBox({
          title: '提示',
          message: '确定退出登录?',
          showCancelButton: true
        }).then(action => {
          console.log(action)
          if(action =='confirm'){
            this.$http.post('/auth/logout').then(({ data: res }) => {
              if (res.code !== '200') {
                this.$createToast({
                  txt: res.msg,
                  type: 'txt'
                }).show()
              }
              sessionStorage.clear()
              clearLoginInfo()
              // this.$router.replace({ path: '/' })
              // this.$router.replace({  name: 'lead', params: { isOut: true }})

              // 判断是否在小程序内
              // wx.miniProgram.getEnv(function (res) {
              //   alert(12)
              //   console.log(res)
              //   // console.log(res.miniprogram) // true
              //   if(res.miniprogram){
              //     wx.miniProgram.reLaunch({url: '/pages/home/home'})
              //   }else{
              //     that.$router.replace({ path: '/' })
              //   }
              // })

              if(navigator.userAgent.toLowerCase().indexOf('miniprogram') != -1){
                wx.miniProgram.reLaunch({url: '/pages/home/home'})
              } else{
                that.$router.replace({ path: '/' });
              }
            }).catch(() => {})
          }
        })

      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .my-copy-container
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #efeff4
    .header
      position: relative;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #edf0f4;
      box-shadow: 0 1px 6px #ccc;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      z-index: 5;
      h1
        font-size: 16px
        font-weight: 700;
      .cubeic-back
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 15px;
        color: #1c9ae7;
        font-size: 16px
    .wrapper
      position: relative;
      height: calc(100% - 90px)
      overflow-x: hidden
      overflow-y: auto
      .bg-main
        position absolute
        left:0;
        top:0;
        width: 100%;
        height 7.8rem;
        z-index :1;
        .bg-my-img
          width 100%
          height 5.8rem;
      .info
        position absolute;
        top:2.8rem
        left:0;
        margin :0 .4rem
        padding:.8rem .9rem .425rem .9rem;
        width:calc(100% - .8rem)
        /*height 400px*/
        background-color #fff;
        font-size .7rem;
        box-sizing border-box
        border-radius :.5rem
        z-index:2
        /*color:#9b9b9b*/
        color:#656565
        .item
          line-height 1.8rem;
          .text
            float left
          .value
            float right
        .notice_float_copy
          width calc(100%+1.2rem)
          height: 2rem;
          position absolute
          bottom:-1.5rem;
          left:-.6rem;
      .handle
        position absolute
        top:12rem;
        left:0;
        width 100%
        .handle-item
          margin 1.5rem auto
          display block
          width 10rem
          height 2rem;
          line-height 2.1rem;
          text-align center
          font-weight bold
          border:1px solid #189ff0;
          color:#189ff0
          font-size:.7rem
          border-radius 20px;
          letter-spacing :1px;






</style>
