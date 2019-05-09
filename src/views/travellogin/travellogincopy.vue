<template>
  <div class="login-account-container">
    <div style="height: 100%;overflow: auto">
      <div class="type">
        <span class="type_item type_account_item active">旅行社登录</span>
        <!--<span class="type_item type_account_item active" :class="{ active: isActive==='account' }" @click="changeLoginType('account')">旅行社登录</span>-->
        <!--<span class="type_item type_code_item" :class="{ active: isActive==='code' }" @click="changeLoginType('code')">验证码登录</span>-->
        <i class="bg_type"></i>
      </div>
      <div class="contain" >
        <div class="item">
          <div class="title">
            <span class="icon iconfont icon-shouji"></span>
            <span class="text">旅行社</span>
          </div>
          <div class="entry">
            <input type="text" placeholder="请输入旅行社名称" v-model="username" class="entry_input">
          </div>
        </div>

        <div class="item">
          <div class="title">
            <span class="icon iconfont icon-icon-test"></span>
            <span class="text">密码</span>
            <!--<span class="eye"></span>-->
          </div>
          <div class="entry">
            <input type="password" placeholder="请输入密码" v-model="password" class="entry_input">
          </div>
        </div>
        <div class="sign_area" @click="signInByIdName">
          登录
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { Toast } from  'mint-ui'
  import Cookies from 'js-cookie'
  import {IdentityCodeValid, isMobile} from "../../utils/validation";
  export default {
    name: "travellogincopy",
    data(){
      return {
        // username:'杭州市中国旅行社集团有限公司',
        username:'',
        // password:'888888'
        password:''
      }
    },
    methods:{
      signInByIdName(){
        if(!this.username){
          Toast('请输入旅行社')
          return
        }
        if(!this.password){
          Toast('请输入密码')
          return
        }
        let data ={
          username: this.username,
          password: this.password,
          userType: 'travel',
          // loginType:'username'
          loginType:'username'
        };
        this.$http.post('/auth/login', data).then(({ data: res }) => {
          if (res.code !== '200') {
            Toast(res.msg)
            return
          }
          Cookies.set('token', res.data.token)
          sessionStorage.setItem('loginType','travel')
          this.$router.replace({ path: '/travel/home' })
        }).catch(() => {
          Toast('服务器异常，请稍后再试')
        })
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
    background:url("./../../common/image/login.jpg") no-repeat #000;
    background-size: 100% auto;
    //background-color :rgba(0,0,0,.3)
    .type
      display flex
      width:38%;
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
            color:#666
            /*color:#ababab*/
            /*font-size .6rem;*/
            font-size .65rem;
        .entry
          margin :3px 5px 20px 5px;
          /*padding :5px 0;*/
          /*font-size 16px;*/
          /*font-size .75rem;*/
          padding: 8px 0;
          font-size: 0.65rem;
          border-bottom: 1px solid #ddd
          .entry_input
            width: 100%;
            outline none
            &::placeholder
              color:#ababab;
              font-size .6rem

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
            width: 3.5rem;
            text-align: right;
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
