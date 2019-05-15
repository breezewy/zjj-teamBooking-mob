<template>
  <div class="travel-home-copy-container">

    <header class="header">
      <h1>首页</h1>
      <!--<i @click="back" class="cubeic-back"></i>-->
    </header>

    <!--这是首页的copy页面-->
    <div class="wrapper">
      <div class="notice">
        <h1 class="title">预定须知</h1>
        <ul class="list">
          <!--<li class="item">1.每位导游每日限购一笔订单</li>-->
          <li class="item" v-for="(item,index) in bookingRuleList">{{index+1}}、{{item.content}}</li>
        </ul>
        <div class="handle">
          <span class="btn" @click="order()">立即预定</span>
        </div>
        <img src="./../../common/image/notice_float_copy.png" class="notice-float" alt="">
        <img src="./../../common/image/notice_bottom_copy.png" class="notice-bottom" alt="">
      </div>
      <div class="rule">
        <h1 class="title">开票规则</h1>
        <ul class="list">
          <li class="item" v-for="(item, index) in  receiptRuleList">
            {{index+1}}、{{item.content}}
          </li>
          <!--<li class="item">-->
          <!--2.进入订单列表根据游玩日期查询订单信息，点击开发票按钮进行开票-->
          <!--</li>-->
        </ul>
        <!--<div class="handle">-->
        <!--<span class="btn">立即开票</span>-->
        <!--</div>-->
        <img src="./../../common/image/rule_float_copy.png" class="rule-float" alt="">
        <img src="./../../common/image/rule_bottom_copy.png" class="rule-bottom" alt="">
      </div>
    </div>
    <tab-bar :selected="selectedTabBar"></tab-bar>
  </div>
</template>

<script>
  import TabBar from '@/base/travelTabBar/travelTabBar'
  import { Toast,MessageBox  } from 'mint-ui'
  export default {
    name: "travelhome",
    components:{
      TabBar,
    },
    data(){
      return {
        selectedTabBar:'travel/home',
        noConfirmOrderInfo:{},
        isTodayOrderShow:false,
        performDate:'',             //游玩的日期
        orderId:'',
        lastTime:'',                 //显示的日期
        timestamp2:'',                //核团的日期
        timer: null,                 //定时器
        leftTime:'',
        bookingRuleList:[],
        receiptRuleList:[],  //开票规则
      }
    },
    created(){
      this.getBookingRule()
      this.getReceiptRule()
    },
    methods:{
      getBookingRule(){
        this.$http.get('/wap/bookingRule').then(({ data: res }) => {
          if(res.code !== '200'){
            Toast(res.msg)
            return
          }
          this.bookingRuleList = res.data
        }).catch(() =>{})
      },
      getReceiptRule(){
        this.$http.get('/wap/receiptRule').then(({ data: res }) => {
          if(res.code !== '200'){
            Toast(res.msg)
            return
          }
          this.receiptRuleList = res.data.list
        }).catch(() =>{})
      },
      order(){
        this.$router.push({path:'/travel/observe'})
      },
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .travel-home-copy-container
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
      height: calc(100% - 50px)
      //height: calc(100%)
      overflow-x: hidden
      overflow-y: auto
      .notice
        position relative
        /*margin: 1.25rem .4rem 1.25rem .4rem;*/
        margin: .65rem .4rem .65rem .4rem;
        background-color #fff;
        padding :.875rem  .85rem .875rem .85rem;
        border-radius 8px;
        box-shadow: 0 1px 6px #ddd;
        .title
          padding: .55rem 0 1.1rem 0;
          color:#4f4f4f;
          letter-spacing :1px
          font-weight bold
          font-size:.75rem;
        /*border-bottom 1px solid #ddd;*/
        .list
          /*margin-right: 1.6rem;*/
          /*font-size:.7rem;*/
          font-size:.65rem;
          /*color:#4e4e4e*/
          color:#656565
          .item
            line-height 2;
            span
              display :inline-block
        .handle
          /*margin: 15px 0*/
          .btn
            display block
            margin 20px auto 10px auto
            width 200px;
            height 40px;
            line-height 40px;
            border-radius 20px
            text-align center
            background-color #1a9ef0
            //background linear-gradient(90deg, #67b7e8, #1a9ef0 50%, #67b7e8);
            //background:-webkit-linear-gradient(90deg, #67b7e8, #1a9ef0 50%, #67b7e8)
            //background:linear-gradient(top, #1b99e5 0%,#1a9ef0 100%)
            color: #ffffff
            font-size 16px;
            letter-spacing 1px
        .notice-float
          position absolute
          right: -.5rem;
          top:-.15rem;
          width 3.75rem
          height 3.275rem;
        .notice-bottom
          position absolute
          width calc(100%+1.15rem);
          bottom:-.9rem;
          left:-.6rem;
          height 2rem;
      .rule
        position relative
        /*margin: 1.25rem .4rem 1.25rem .4rem;*/
        margin: .65rem .4rem 2.65rem .4rem;
        background-color #fff;
        padding :.875rem  .85rem 1.575rem .85rem;
        border-radius 8px;
        box-shadow: 0 1px 6px #ddd;
        .title
          padding: .55rem 0 1.1rem 0;

          color:#4f4f4f;
          letter-spacing :1px
          font-weight bold
          font-size:.75rem;
        .list
          /*margin-right: 1.6rem;*/
          font-size:.65rem;
          /*color:#4e4e4e*/
          color:#656565
          .item
            line-height: 2
        .handle
          margin: 15px 0
          .btn
            display block
            margin 25px auto 15px auto
            width 7.8rem;
            height 1.6rem;
            line-height 1.6rem;
            border-radius 20px
            text-align center
            background linear-gradient(90deg, #f18b26, #ef7800 50%, #f18b26);
            background:-webkit-linear-gradient(90deg, #f18b26, #ef7800 50%, #f18b26)
            //background:linear-gradient(top, #1b99e5 0%,#1a9ef0 100%)
            color: #ffffff
            font-size 16px;
            letter-spacing 1px
        .rule-float
          position absolute
          right: -.5rem;
          top:-.15rem;
          width 3.75rem
          height 3.275rem;
        .rule-bottom
          // position absolute
          // width 100%
          //bottom:-18px;
          //left:0;
          //height 40px;
          position absolute
          width calc(100%+1.15rem);
          bottom:-.9rem;
          left:-.6rem;
          height 2rem;


</style>
