<template>
    <div class="login-account-container">
      <div style="height: 100%;overflow: auto">
        <div class="type">
          <span class="type_item type_account_item" :class="{ active: isActive==='account' }" @click="changeLoginType('account')">身份证登录</span>
          <span class="type_item type_code_item" :class="{ active: isActive==='code' }" @click="changeLoginType('code')">验证码登录</span>
          <i class="bg_type"></i>
        </div>
        <div class="contain" v-if="isActive==='account'">
          <div class="item">
            <div class="title">
              <span class="icon iconfont icon-shouji"></span>
              <span class="text">请输入身份证</span>
            </div>
            <div class="entry">
              <input type="text" class="entry_input">
            </div>
          </div>

          <div class="item">
            <div class="title">
              <span class="icon iconfont icon-icon-test"></span>
              <span class="text">请输入密码</span>
              <span class="eye"></span>
            </div>
            <div class="entry">
              <input type="password" class="entry_input">


            </div>
          </div>
          <div class="sign_area">
          登录
          </div>
        </div>




        <div class="contain" v-if="isActive==='code'">
          <div class="item">
            <div class="title">
              <span class="icon iconfont icon-shouji"></span>
              <span class="text">请输入手机号</span>
            </div>
            <div class="entry">
              <input type="number" class="entry_input">
            </div>
          </div>

          <div class="item">
            <div class="title">
              <span class="icon iconfont icon-icon-test"></span>
              <span class="text">请输入验证码</span>
              <span class="eye"></span>
            </div>
            <div class="message clear-fix">
              <!--<input type="password" class="entry_input">-->
              <input type="password" class="capture_input">
              <div class="message-send">发送验证码</div>
            </div>
          </div>
          <div class="sign_area">
            登录
          </div>
        </div>
        <!--<div class="other">-->
          <!--<span class="pass_forget">忘记密码?</span>-->
        <!--</div>-->
      </div>

    </div>
</template>

<script>
  export default {
    name: "guidelogincopy",
    data(){
      return {
        isActive: 'account',

      }
    },
    methods:{
      changeLoginType(val){
        console.log(val)
        this.isActive =val
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .login-account-container
    width 100%
    height: 100%;
    position: absolute;
    top: 0;
    left:0;
    background:url("./../common/image/login.jpg") no-repeat #000;
    background-size: 100% auto;
    //background-color :rgba(0,0,0,.3)
    .type
      display flex
      width:63%;
      margin 3.425rem auto .35rem auto
      height :1.8rem;
      text-align center
      border-radius :.65rem;
      background-color: #595451;
      font-size .7rem;
      color:#fff;
      /*.bg_type*/

      .type_item
        transition: all 0.4s;

        flex:1;
        border-radius :.4rem;
        /*background-color #199beb*/
        /*color:#fff*/
        height 1.4rem
        line-height 1.4rem;
        text-align center
        &.active
          background-color:#199beb
          color:#fff
          box-shadow: 0 1px 2px rgba(0,0,0,.3);
      .type_account_item
        margin .2rem .2rem 0 .2rem
      .type_code_item
        margin .2rem .2rem .2rem 0

    .contain
      position relative
      width :85%
      background-color #fff
      border-radius :5px;
      /*height :8.8rem*/
      box-sizing border-box
      margin .5rem auto
      padding 1rem 1rem;
      /*padding .8rem 1rem;*/

      .item
        .title
          padding .2rem 0;
          span
            display: inline-block
          .icon
            font-weight bold
            color:#199beb
            font-size .9rem;
            vertical-align middle
          .text
            margin-left 5px;
            color:#ababab
            font-size .6rem;
        .entry
          margin :3px 5px 20px 5px;
          padding :5px 0;
          /*font-size 16px;*/
          font-size .75rem;
          border-bottom: 1px solid #ddd
          .entry_input
            width: 100%;
            outline none

        .message
          position relative
          margin: 3px 5px 20px 5px;
          padding: 5px 0;
          font-size .75rem;
          border-bottom: 1px solid #ddd;
          .capture_input
            outline none;
            width 9.25rem;
          .message-send
           position absolute
           right :0;
           top:.25rem;
           width 3rem;
           font-size .6rem;
           /*color:#ababab*/
           color:#26a2ff
      .sign_area
        position: absolute
        bottom:-25px;
        background-color #26a2ff
        color:#fff;
        left:50%
        width :80%
        margin-left -40%
        /*height 50px*/
        /*line-height 50px*/
        height :2.325rem
        line-height :2.325rem
        text-align center;
        font-size 18px;
        letter-spacing :2px;
        border-radius:5px;
    .other
      margin 50px
      text-align center
      color:#fff;
      font-size 16px;
      .pass_forget
        display inline-block;
        border-bottom 1px solid #fff

</style>
