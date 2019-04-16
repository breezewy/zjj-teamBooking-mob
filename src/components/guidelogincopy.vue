<template>
    <div class="login-account-container">
      <div class="type">
        <span class="type_item type_account_item" :class="{ active: isActive==='account' }" @click="changeLoginType('account')">账户登录</span>
        <span class="type_item type_code_item" :class="{ active: isActive==='code' }" @click="changeLoginType('code')">验证码登录</span>
        <i class="bg_type"></i>
      </div>
      <div class="contain">
        <div class="item">
          <div class="title">
            <span class="icon iconfont icon-shouji"></span>
            <span class="text">请输入账号</span>
          </div>
          <div class="entry">
            <input type="text" class="entry_input">
          </div>
        </div>

        <div class="item">
          <div class="title">
            <span class="icon iconfont icon-icon-test"></span>
            <span class="text">请输入账号密码</span>
            <span class="eye"></span>
          </div>
          <div class="entry">
            <input type="text" class="entry_input">
          </div>
        </div>
        <div class="sign_area">
          登录
        </div>
      </div>
      <div class="other">
        <span class="pass_forget">忘记密码?</span>
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
    background-color :rgba(0,0,0,.3)
    .type
      display flex
      width:63%;
      margin 80px auto 20px auto
      height :52px;
      text-align center
      border-radius :13px;
      background-color: #6d6455;
      font-size 18px;
      color:#fff;
      /*.bg_type*/

      .type_item
        transition: all 0.4s;

        flex:1;
        border-radius :8px;
        /*background-color #199beb*/
        /*color:#fff*/
        height 40px
        line-height 40px;
        text-align center
        &.active
          background-color:#199beb
          color:#fff
          box-shadow: 0 1px 2px rgba(0,0,0,.3);
      .type_account_item
        margin 6px 3px 6px 6px
      .type_code_item
        margin 6px 6px 6px 3px

    .contain
      position relative
      width :80%
      background-color #fff
      border-radius :5px;
      margin 10px auto
      padding 30px;
      box-sizing border-box
      .item
        margin 20px 0
        .title
          padding 4px 0;
          span
            display: inline-block
          .icon
            font-weight bold
            color:#199beb
            font-size 26px;
            vertical-align middle
          .text
            margin-left 5px;
            color:#aba9aa
            font-size 18px;
        .entry
          margin :5px;
          padding :10px;
          font-size 16px;
          border-bottom: 1px solid #ddd
          .entry_input
            width: 100%;
            outline none

      .sign_area
        position: absolute
        bottom:-30px;
        background-color #26a2ff
        color:#fff;
        left:50%
        width :80%
        margin-left -40%
        height 60px
        line-height 60px
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
