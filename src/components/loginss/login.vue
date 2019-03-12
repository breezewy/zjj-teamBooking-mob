<template>
    <div class="login-container">
      <div class="v-header">
        <img class="icon" src="./login.png" alt="">
      </div>
      <div class="tab">
          <div class="tab-item">
            <span class="tab-link">
              手机验证码登录
              <span class="line"></span>
            </span>
          </div>
          <div class="tab-item active">
             <span class="tab-link">
               账号密码登录
               <span class="line"></span>
             </span>
          </div>
      </div>
      <div class="content">
        <cube-form
          :model="model"
          :schema="schema"
          :immediate-validate="false"
          :options="options"
          @validate="validateHandler"
          @submit="submitHandler"
          @reset="resetHandler"></cube-form>

      </div>
      <cube-button>show toast</cube-button>


      <!--<div class="content">-->
        <!--<div class="user border-1px-bottom">-->
          <!--<input class="user-input-box" type="text" placeholder="用户名">-->
        <!--</div>-->
        <!--<div class="password">-->
          <!--<input type="pwd-input-box" placeholder="输入明码">-->
        <!--</div>-->

      <!--</div>-->

    </div>
</template>

<script>
  export default {
    name: "login",
    data(){
      return {
        validity: {},
        valid: undefined,
        model: {
          inputValue:''
        },

        placeholder:'asfas',
        schema:{
          fields: [
            {
              type: 'input',
              modelKey: 'inputValue1',
              label: '',
              props: {
                type:'text',
                placeholder: '用户名',
              },
              rules: {
                required: true
              },
              // validating when blur
              trigger: 'blur'
            },
            {
              type: 'input',
              modelKey: 'inputValue2',
              label: '',
              props: {
                type:'password',
                placeholder: '输入密码',
                eye:{open: false,reverse: false}
              },
              rules: {
                required: true
              },
              // validating when blur
              trigger: 'blur'
            }
          ]
        },
        options: {
          scrollToInvalidField: true,
          layout: 'classic' // standard fresh
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../base/stylus/mixin.styl"
  .login-container
    width 100%
    height: 100%;
    position: absolute;
    top: 0;
    left:0;
    background-color: #fff
  .v-header
    width: 100%
    margin: 1rem 0 .12rem 0
    .icon
      display: block
      margin 0 auto
      width: 1.67rem
      height: 1.67rem
      border-radius:50%
  .tab
    display: flex
    height: 1rem
    line-height: 1rem
    font-size: .38rem
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
            bottom:-0.2rem
            margin-left:-0.3rem
            width 0.6rem
            height:0.1rem;
            border-radius:0.05rem;
            border-width: 0.02rem
            background-color: #ff4c74
  .content
    margin 0 .64rem
    font-size: 0.38rem
    /*.cube-input-field*/
     // border-bottom :1px solid #ff4c74
    .cube-input::after
      border:none
      border-bottom: 1px solid #dadada
  //border-1px-bottom(rgb(216, 216, 216))

    /*.user*/
      /*padding :0.24rem 0.36rem*/
      //border-1px-bottom(rgb(216, 216, 216))
      /*.user-input-box*/
        //line-height 1rem
        //height 0.58rem
        /*outline :0*/
        /*border:0*/


</style>
