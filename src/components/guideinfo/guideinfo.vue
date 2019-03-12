<template>
  <transition name="slide">
    <div class="guideInfo-container">
      <header class="header">
        <h1>个人信息</h1>
        <i @click="back" class="cubeic-back"></i>
      </header>
      <div class="wrapper">
        <ul class="wrap-info">
          <li class="card">
            <span class="text">用户名：</span>
            <span class="info">{{guideInfo.name}}</span>
          </li>
          <li class="card">
            <span class="text">邮箱：</span>
            <span class="info">按时发放</span>
          </li>
          <li class="card">
            <span class="text">手机号：</span>
            <span class="info">按时发放</span>
          </li>



          <li class="card">
            <span class="text">导游姓名：</span>
            <span class="info">{{guideInfo.name}}</span>
          </li>
          <li class="card">
            <span class="text">卡号：</span>
            <span class="info">{{guideInfo.certNo}}</span>
          </li>
          <li class="card">
            <span class="text">身份证：</span>
            <span class="info">按时发放</span>
          </li>
          <li class="card">
            <span class="text">所属片区：</span>
            <span class="info">按时发放</span>
          </li>

        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "guideInfo",
    data(){
      return {
        guideInfo: {}
      }
    },
    created(){
      this.getUseInfo()           //获得导游信息
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
      back(){
        this.$router.go(-1)
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
  .guideInfo-container
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
        color: #fc9153;
        font-size: 16px
    .wrapper
      height: calc(100% - 90px);
      overflow-x: hidden;
      overflow-y: auto;
      padding-bottom 50px;
      .wrap-info
        background-color:#fff;
        margin: 40px 20px
        padding 15px 5px
        box-shadow: 0 1px 2px rgba(0,0,0,.3);
        .card
          position: relative
          padding :0 15px
          height 50px
          line-height:50px
          font-size:16px;
          color:#666

</style>
