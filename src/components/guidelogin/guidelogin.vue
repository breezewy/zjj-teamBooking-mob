<template>
  <div class="login-container">
    <div class="v-header">
      <!--<img class="icon" src="./login.png" alt="">-->
      <span class="icon iconfont icon-daoyou"></span>
    </div>
    <div class="tab">
      <div class="tab-item" @click="selectMenu('userPwd')" :class="{active:loginStatus === 'userPwd'}">
            <span class="tab-link">
              账号密码登录
              <span class="line"></span>
            </span>
      </div>
      <div class="tab-item" @click="selectMenu('code')" :class="{active:loginStatus === 'code'}">
             <span class="tab-link">
               手机验证码登录
               <span class="line"></span>
             </span>
      </div>
    </div>
    <div class="content" v-if="loginStatus==='userPwd'">
      <div>

        <div class="field-content">
          <input class="field-input" v-model="username" placeholder="用户名" type="text">
          <span @click="clear()" v-show="username" class="clear iconfont icon-chahao"></span>
        </div>
        <div class="field-content">
          <input class="field-input" v-model="password" placeholder="输入密码" :type="pwdType">
          <span  class="eye iconfont icon-in_zhengyan" @click="changeEye('close')" v-show="isOpenEye"></span>
          <span  class="eye iconfont icon-biyan1" @click="changeEye('open')" v-show="!isOpenEye"></span>
        </div>
        <div class="btn-contain">
          <span class="sign" @click="signInByName">登录</span>
        </div>
        <!--<div class="btn-contain">-->
        <!--<span class="reset">重置</span>-->
        <!--</div>-->
      </div>
    </div>
    <div class="content" v-if="loginStatus==='code'">

      <div class="field-content">
        <input class="field-input" v-model="mobile" placeholder="11位手机号" type="text">
        <span @click="clearMobile()" v-show="mobile" class="clear iconfont icon-chahao"></span>
      </div>
      <div class="field-content">
        <input class="field-input" v-model="captcha" placeholder="短信验证码" type="password">
        <span class="message-send" @click="sendCode()">{{codeText}}</span>
      </div>
      <div class="btn-contain">
        <span class="sign" @click="signInByMobile()">登录</span>
      </div>
      <!--<div class="btn-contain">-->
      <!--<span class="reset">重置</span>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import { isMobile } from '@/utils/validation'
  import Cookies from 'js-cookie'
  export default {
    name: "guidelogin",
    data(){
      return {
        loginStatus:'userPwd',       //登录方式

        username:'',
        password:'',
        pwdType:'password',
        isOpenEye:false,

        mobile:'',
        captcha:'',                   //验证码
        isOvertime:false,            //是否超出1分钟
        sendTimer:null,              //验证码倒计时计时器
        codeText:'发送验证码',
      }
    },
    methods:{
      /**
       * 选中tab页面
       */
      selectMenu(value){
        this.loginStatus= value
        // if(value ==='userPwd'){
        //   this.loginStatus='userPwd'
        // }else{
        //   this.loginStatus='code'
        // }
      },
      /**
       * 清除用户名的内容
       */
      clear(){
        this.username = ''
      },
      /**
       * 清除用户名的内容
       */
      clearMobile(){
        this.mobile = ''
      },
      /**
       * 修改睁眼，闭眼
       */
      changeEye(value){
        if(value=== 'open'){
          this.pwdType = 'text'
          this.isOpenEye = true
        }else{
          this.pwdType = 'password'
          this.isOpenEye = false
        }
      },
      /**
       *  用户名登录
       */
      signInByName(){

        if(!this.username){
          Toast('请填写用户名')
          return
        }
        if(!this.password){
          Toast('请填写密码')
          return
        }
        let data ={
          username: this.username,
          password: this.password,
          userType: 'guide',
          loginType:'username'
        };
        this.$http.post('/auth/login', data).then(({ data: res }) => {
          if (res.code !== '200') {
            Toast(res.msg)
            return
          }
          Cookies.set('token', res.data.token)
            this.$router.replace({ path: '/home' })
        }).catch(() => {})
      },
      /**
       *  发送验证码
       */
      sendCode(){

        if(!this.mobile){
          Toast('请填写手机号')
          return
        }
        if(!isMobile(this.mobile)){
          Toast('手机号格式不正确')
          return
        }
        if(this.isOvertime){
          return;
        }
        this.$http.get(`/auth/sendCheckCode/${this.mobile}`).then(({ data: res }) => {
          if(res.code !=='200'){
            Toast(res.msg)
            return
          }
          let time = 60;
          this.isOvertime = true;
          this.codeText = time+'秒后重发';
          this.sendTimer = setInterval( () =>{
            time--;
            this.codeText = time+'秒后重发';
            if(time < 0){
              this.isOvertime = false;
              clearInterval(this.sendTimer);
              this.codeText = '重新发送';
            }
          },1000)
        }).catch(() => {})
      },
      /**
       *  手机号登录
       */
      signInByMobile(){
        if(!this.mobile){
          Toast('请填写手机号')
          return
        }
        if(!isMobile(this.mobile)){
          Toast('手机号格式不正确')
          return
        }
        if(!this.captcha){
          Toast('验证码不能为空')
          return
        }
        let data={
          username: this.mobile,
          captcha: this.captcha,
          userType: 'guide',
          loginType:'mobile'
        };
        this.$http.post('/auth/login', data).then(({ data: res }) => {
          if (res.code !== '200') {
            Toast(res.msg)
            return
          }
          Cookies.set('token', res.data.token)
          console.log(this.$router)
          this.$router.replace({ path: '/home' })
        }).catch(() => {})
      },
    }
  };
</script>

<style lang="stylus"  rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/base.styl"
  .login-container
    width 100%
    height: 100%;
    position: absolute;
    top: 0;
    left:0;
    background-color: #fff
    .v-header
      width: 100%
      margin: (100/$base-reference)px 0 (12/$base-reference)px 0
      .icon
        display: block
        margin 0 auto
        width :46px;
        height 46px
        border-radius:50%
        color:#1c9ae7
        font-size 46px
    .tab
      display: flex
      height: 35px
      line-height: 35px
      font-size: 15px
      .tab-item
        flex: 1
        text-align: center
        /*border-bottom 1px solid #ff4c74*/
        .tab-link
          position relative
          color: #555
        &.active
          .tab-link
            color: #232323
            .line
              position:absolute
              left:50%
              bottom:-(20/$base-reference)px
              margin-left:-(30/$base-reference)px
              width (60/$base-reference)px
              height:(10/$base-reference)px
              border-radius:(5/$base-reference)px
              border-width: (2/$base-reference)px
              background: linear-gradient(to right, #ff7d6b , #fd3e72)
    .stroke-type
      margin: 30px (64/$base-reference)px 20px (64/$base-reference)px
      padding 0 0 0 10px;
      font-size :16px;
      .stroke
        float: left
        position relative
        top:15px;
      .radio
        display: block
        float: right
        font-size 16px
        .border-right-1px::after
          border-right none
        .cube-radio-wrap
          width:72px;
        .cube-radio-group[data-horz="true"]::after
          border:none
    .content
      margin 0 (64/$base-reference)px (64/$base-reference)px (64/$base-reference)px
      font-size: (38/$base-reference)px
      .field-content
        position:relative
        width: 100%
        margin-top 30px;
        display:flex
        height 40px;
        border-bottom: 1px solid #ddd;
        .field-input
          flex:1
          display block
          width 100%;
          padding:10px;
          height: 20px
          font-size 15px;
          outline:none
        .message-send
          font-size 14px;
          position:relative;
          top:14px;
          color:#666
        .clear
          position: absolute
          right 13px;
          top:12px;
          font-size 20px
        .eye
          position: absolute
          right 15px;
          top:12px;
          font-size 20px
      .btn-contain
        margin-top:30px
        .sign
          display:block
          height 44px
          line-height 44px
          background-color: #1c9ae7
          text-align:center
          font-size :16px;
          color:#fff;
          border-radius:22px;
        .reset
          display:block
          height 44px
          line-height 44px
          background-color: #fff
          border:1px solid #ddd
          text-align:center
          font-size 16px;
          border-radius:5px;




</style>
<style >
  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #cccccc;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:#cccccc;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:#cccccc;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color:#cccccc;
  }
</style>
