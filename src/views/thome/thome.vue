<template>
  <div class="travel-home-container">
    <header class="header">
      <h1>首页</h1>
      <!--<i @click="back" class="cubeic-back"></i>-->
    </header>
    <div class="wrapper">
      <div class="notice clear-fix">
        <h1 class="title">预定须知</h1>
        <ul class="list">
          <li v-for="(item,index) in bookingRuleList">{{index+1}}、{{item.content}}</li>
        </ul>
        <span class="order-btn" @click="order()">立即预定</span>
      </div>
      <div class="notice clear-fix">
        <h1 class="title">开票规则</h1>
        <ul class="list">
          <li>1、通过首页开票按钮进入页面输入开票订单号进行开票。</li>
          <li>2、进入订单列表根据游玩日期查询订单信息，点击开发票按钮进行开票。</li>
        </ul>
        <a href="http://receipt.51dmq.com/receipt/index.htm" class="order-btn">订单开票</a>
      </div>

    </div>
    <tab-bar :selected="selectedTabBar"></tab-bar>
  </div>
</template>

<script>
  import TabBar from '@/base/travelTabBar/travelTabBar'
  import { Toast } from 'mint-ui'
  export default {
    name: "thome",
    components:{
      TabBar,
    },
    data(){
      return {
        selectedTabBar:'travel-home',
        bookingRuleList:[],
      }
    },
    created(){
      this.getBookingRule()
    },
    methods:{
      getBookingRule() {
        this.$http.get('/wap/bookingRule').then(({ data: res }) => {
          if (res.code !== '200') {
            Toast(res.msg)
            return
          }
          console.log(res)
          this.bookingRuleList = res.data

        }).catch(() => {

        })
      },
      order(){
        this.$router.push({path:'/travel-observe'})
      }
    }
  };
</script>

<style lang="stylus"  rel="stylesheet/stylus">
  .travel-home-container
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
      .notice
        margin-bottom: 10px;
        padding-bottom :20px;
        background-color #fff
        .title
          padding: 0 15px;
          font-size: 14px
          font-weight: 700
          border-bottom: 1px solid #dadada
          height: 35px
          line-height: 36px
        .list
          font-size 14px;
          line-height 30px;
          padding : 10px 20px;
        .order-btn
          display block
          margin-left:20px
          width:90px
          height: 35px
          line-height 35px
          background: #ffffff
          border: 1px solid #1c9ae7;
          text-align :center
          border-radius 4px
          font-size 14px
          color: #1c9ae7;

        .handle-detail
          display: flex
          /*margin :10px 20px*/
          margin-left 10px
          width 200px
          font-size: 14px;
          .btn
            flex: 1
            height :35px;
            line-height :35px
            text-align center
            color:#1c9ae7

            border :1px solid #1c9ae7
            border-radius: .25rem 0 0 .25rem;
          .update
            border-right :none
          .nuclei
            border-radius: 0 .25rem .25rem 0;
          .bill
            border-radius: .25rem

</style>
