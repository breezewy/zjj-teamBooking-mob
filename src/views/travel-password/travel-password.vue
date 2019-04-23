<template>
  <transition name="slide">
    <div class="reset-password-container">
      <header class="header">
        <h1>个人信息</h1>
        <i @click="back" class="cubeic-back"></i>
      </header>
      <div class="wrapper">
        <ul class="edit_list">
          <li class="edit_item">
            <label for="">原密码</label>
            <input class="list_in" type="password" v-model.trim="dataForm.originPassword" placeholder="原密码">
            <!--<i class="iconfont icon-add-date"></i>-->
          </li>
          <li class="edit_item">
            <label for="">新密码</label>
            <input class="list_in" type="password" v-model.trim="dataForm.resetPassword" placeholder="新密码">
            <!--<i class="iconfont icon-add-date"></i>-->
          </li>
          <li class="edit_item">
            <label for="">确认密码</label>
            <input class="list_in" type="password" v-model.trim="dataForm.sureResetPassword" placeholder="确认密码">
            <!--<i class="iconfont icon-add-date"></i>-->
            <!--<div class="triangle_border_right">-->
            <!--</div>-->

          </li>
        </ul>
        <!--<div class="edit_btn">-->
        <!--<div class="order_btn" @click="addGuest">-->
        <!--<i class="iconfont icon-tianjia"></i>-->
        <!--<span class="on_add">添加游客</span>-->
        <!--</div>-->
        <!--<div class="order_btn" @click="completeGuest()">-->
        <!--<i class="iconfont icon-wancheng"></i>-->
        <!--<span class="on_complete">查看游客列表</span>-->
        <!--</div>-->
        <!--</div>-->
        <div class="handle">
          <span @click="cancelHandle" class="handle-btn reset-btn">取消</span>
          <span  @click="updateHandle" class="handle-btn order-btn">提交</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { Toast } from  'mint-ui'
  export default {
    name: "travel-password",
    data(){
      return {
        guideInfo: {},
        dataForm:{
          originPassword:'',
          resetPassword:'',
          sureResetPassword:''
        }
      }
    },
    methods:{
      /**
       * 获取导游信息
       */
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
      updateHandle(){
        if(!/^[0-9A-Za-z]{6,15}$/.test(this.dataForm.originPassword)) {

          Toast('请填写6~15位原密码')
          return
        }
        // if(!this.dataForm.resetPassword){
        if(!/^[0-9A-Za-z]{6,15}$/.test(this.dataForm.originPassword)) {
          Toast('请填写6~15新密码')
          return
        }
        if(this.dataForm.resetPassword !== this.dataForm.sureResetPassword){
          Toast('两次密码不一致')
          return
        }
        let para = {
          oldPwd: this.dataForm.originPassword,
          newPwd: this.dataForm.resetPassword,
        }
        this.$http.put(`/wap/userAuth`,para).then(({ data: res }) => {
          if(res.code !== '200'){
            this.$createToast({
              txt: res.msg,
              type: 'txt'
            }).show()
            return
          }

          Toast('修改成功')
          setTimeout(()=>{
            this.$router.push({path:'/travel/my'})
          },700)

        }).catch(() =>{
          Toast('服务器异常，请稍后再试')
        })
      },
      back(){
        this.$router.go(-1)
      },
      cancelHandle(){
        this.$router.push({path:'/travel/my'})
      }
    }
  };
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>

<style lang="stylus"  rel="stylesheet/stylus">
  .reset-password-container
    position: absolute
    z-index: 10
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
      height: calc(100% - 90px);
      overflow-x: hidden;
      overflow-y: auto;
      padding-bottom 50px;
      .edit_list
        margin: 1.25rem .6rem 0 .6rem
        border-radius 5px;
        .edit_item
          position: relative;
          border-bottom: 1px solid #e9e9e9;
          background-color: #fff;
          padding: .6rem 0 .6rem .75rem;
          label
            display: inline-block;
            width: 25%;
            font-size: .75rem;
            color:#656565
          .list_in
            width: auto;
            height: 1.2rem;
            text-indent: .2rem;
            font-size: .7rem;
          .select-cerType
            outline:none
            border: none;
            background-color: transparent;
            border-radius: 0;
            box-shadow: none;
            display: inline-block;
            width 60%
            padding: 0;
            margin: 0;
            line-height: normal;
            color: #424242;
            font-size: 0.7rem;
            font-family: inherit;
            box-sizing: border-box;
            -webkit-user-select: text;
            user-select: text;
            -webkit-appearance: none;
            appearance: none;
          .triangle_border_right
            width:0;
            height:0;
            border-width:6px 0 6px 15px;
            border-style:solid;
            border-color:transparent transparent transparent #1c9ae7;/*透明 透明 透明 灰*/
            position:absolute;
            right 20px;
            top:18px
      .handle
        margin:30px 10px 50px 10px
        font-size 16px;
        display: flex;
        justify-content: space-around;
        .handle-btn
          display block
          width 130px;
          height 48px
          line-height 48px
          background-color:#f6383a
          color:#fff;
          border-radius 4px;
          text-align center
          border:1px solid #ddd;
          &.order-btn
            /*background-color :#4cd964*/
            background-color :#1c9ae7
</style>
