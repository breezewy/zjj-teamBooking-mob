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
          <li>1、导游每天限购一笔订单。</li>
          <li>2、组团、一日游需提前一天预定。</li>
          <li>3、华东团队，必须用导游证预定。</li>
          <li>4、不支持跨天改场，如需跨天请撤销当天订单重新选择下单日期下单。</li>
          <li>5、旅行社抬头及导游信息一旦预定不做更改。</li>
          <li>6、成人团下午14:00场按晚上场价格结算。</li>
          <li>7、导游提醒团队游客带齐相关证件。</li>
          <li>8、下单后，进入“订单”点击明细，查询最晚核团时间，过时订单自动取消。</li>
          <li>9、特殊团队需先点人后买票。</li>
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

      <!--<div class="notice clear-fix">-->
        <!--<h1 class="title">当天订单</h1>-->
        <!--<ul class="list">-->
          <!--<li>编号：{{noConfirmOrderInfo.billNo}}</li>-->
          <!--<li>订单状态：{{noConfirmOrderInfo.billStatus}}</li>-->
          <!--<li>订单类型：{{noConfirmOrderInfo.billType}}</li>-->
          <!--<li>{{noConfirmOrderInfo.performDate}} &nbsp;&nbsp;&nbsp;{{noConfirmOrderInfo.performTime}}</li>-->
          <!--<li>{{noConfirmOrderInfo.travelName}}</li>-->
          <!--<li style="margin-top:20px;font-size: 15px">-->
            <!--截止时间：2019-03-20 12:00-->
          <!--</li>-->
          <!--<li style="font-size: 15px"> 倒计时：【<span style="color:red">保留时间已结束</span>】请及时核团</li>-->
        <!--</ul>-->
        <!--<div class="handle-detail">-->
          <!--<span class="update btn" @click="viewOrder()">查看订单</span>-->
          <!--<span class="nuclei btn" @click="nuclearByNow()">立即核团</span>-->
        <!--</div>-->
      <!--</div>-->
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
        noConfirmOrderInfo:{}
      }
    },
    methods:{
      order(){
        this.$router.push({path:'/travel-order'})
      },
      nuclearByNow(){

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
        color: #fc9153;
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
          border: 1px solid #fc9153;
          text-align :center
          border-radius 4px
          font-size 14px
          color: #fc9153;

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
            color:#fc9153

            border :1px solid #fc9153
            border-radius: .25rem 0 0 .25rem;
          .update
            border-right :none
          .nuclei
            border-radius: 0 .25rem .25rem 0;
          .bill
            border-radius: .25rem

</style>
