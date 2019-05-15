<template>
    <div class="home-copy-container">

      <header class="header">
        <h1>首页</h1>
        <!--<i @click="back" class="cubeic-back"></i>-->
      </header>

      <!--这是首页的copy页面-->
      <div class="wrapper" v-if="flag">
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
              <!--请凭入园单红联，出票当月到票房开具发票，隔月不予补开。-->
            <!--</li>-->

          </ul>
          <div class="handle" v-if="showInvoicingBtn">
            <a class="btn" href="http://receipt.51dmq.com/receipt/index.htm">立即开票</a>
          </div>
          <img src="./../../common/image/rule_float_copy.png" class="rule-float" alt="">
          <img src="./../../common/image/rule_bottom_copy.png" class="rule-bottom" alt="">
        </div>
        <div class="today" v-if="isTodayOrderShow">
          <h1 class="title">当日订单</h1>
          <!--<ul class="list">-->
            <!--<li class="item">-->
              <!--1.通过首页开票按钮进入页面输入开票订单号进行开票-->
            <!--</li>-->
            <!--<li class="item">-->
              <!--2.进入订单列表根据游玩日期查询订单信息，点击开发票按钮进行开票-->
            <!--</li>-->
          <!--</ul>-->
          <div class="info">
            <div class="item">
              <span class="text">编号：</span>
              <span class="value">{{noConfirmOrderInfo.billNo}}</span>
            </div>
            <div class="item">
              <span class="text">订单状态：</span>
              <span class="value">{{noConfirmOrderInfo.billStatus =='01'? '未审核': noConfirmOrderInfo.billStatus =='02'? '准预定':
              noConfirmOrderInfo.billStatus =='03'? '已审核': noConfirmOrderInfo.billStatus =='04'? '已销售':
              noConfirmOrderInfo.billStatus =='05'?'已撤销':''
              }}</span>
            </div>
            <div class="item">
              <span class="text">订单类型：</span>
              <span class="value">{{noConfirmOrderInfo.billType=='01'?'现场售票': noConfirmOrderInfo.billType=='02'? '预定':'' }}</span>
            </div>
            <div class="item">
              <span class="text">{{noConfirmOrderInfo.travelName}}</span>
            </div>
            <div class="item">
              <span class="text" style="margin-right: 3px;">{{noConfirmOrderInfo.performDate}}</span>
              <span class="value" style="margin-right: 3px;">{{noConfirmOrderInfo.performTime}}</span>
            </div>
            <div class="item" v-if="noConfirmOrderInfo.checkTime">
              <span class="text">截止时间：</span>
              <span class="value">{{noConfirmOrderInfo.performDate}}</span>
              <span class="value">{{noConfirmOrderInfo.checkTime}}:00:00</span>
            </div>
            <div class="item" v-if="noConfirmOrderInfo.checkTime">
              <span class="text">倒计时：</span>
              <span class="value">[ <span style="color:#e40000">{{lastTime}}</span> ]</span>
              <span class="value" v-if="leftTime/1000>=0" style="margin-left: 5px;">请及时核团</span>
            </div>

          </div>
          <div class="handle">
            <span class="btn" @click="nuclearByNow" v-if="(noConfirmOrderInfo.billStatus=='01' || noConfirmOrderInfo.billStatus=='02') && noConfirmOrderInfo.checkTime && leftTime/1000>=0">去核团</span>
            <span class="btn" @click="nuclearByNow" v-if="(noConfirmOrderInfo.billStatus=='01' || noConfirmOrderInfo.billStatus=='02') && !noConfirmOrderInfo.checkTime && noCheckTimeFlag">去核团</span>
            <!--<span class="btn" >去核团</span>-->
          </div>
          <img src="./../../common/image/today_float_copy.png" class="today-float" alt="">
          <img src="./../../common/image/today_bottom_copy.png" class="today-bottom" alt="">
        </div>
      </div>
      <tab-bar :selected="selectedTabBar"></tab-bar>
    </div>
</template>

<script>
  import TabBar from '@/base/tabbar/tabbar'
  import { Toast,MessageBox  } from 'mint-ui'
  import {isPositive} from "../../utils/validation";

  export default {
    name: "home-copy",
    components:{
      TabBar,
    },
    data(){
      return {
        selectedTabBar:'home/copy',
        noConfirmOrderInfo:{},
        isTodayOrderShow:false,
        performDate:'',             //游玩的日期
        orderId:'',
        lastTime:'',                 //显示的日期
        timestamp2:'',                //核团的日期
        timer: null,                 //定时器
        leftTime:'',
        bookingRuleList:[],
        receiptRuleList:[],             //开票规则
        flag: true,              //显示标志位
        noCheckTimeFlag:false,       //当没有核团时间控制是否 去核团显示
        showInvoicingBtn:false
      }
    },
    created(){
      // /wap/receiptRule
      this.getBookingRule()
      this.getReceiptRule()

      this.getNoConfirmOrder()
    },
    methods:{
      getBookingRule(){
        // setTimeout(()=>{
          this.$http.get('/wap/bookingRule').then(({ data: res }) => {
            this.flag=true
            if(res.code !== '200'){
              Toast(res.msg)
              return
            }
            this.bookingRuleList = res.data
          }).catch(() =>{
            Toast('服务器异常，请稍后再试')
            this.flag=true
          })
        // },1000)

      },
      getReceiptRule(){
        this.$http.get('/wap/receiptRule').then(({ data: res }) => {
          if(res.code !== '200'){
            Toast(res.msg)
            return
          }
          this.showInvoicingBtn = res.data.show
          this.receiptRuleList = res.data.list
        }).catch(() =>{})
      },
      getNoConfirmOrder(){
        this.$http.get('/wap/noConfirmOrder').then(({ data: res }) => {
          if(res.code !== '200'){
            // Toast(res.msg)
            return
          }
          let data = res.data
          if(Object.keys(data).length ==0){
            this.isTodayOrderShow = false
          }else{
            this.isTodayOrderShow = true
            this.noConfirmOrderInfo = data
            this.performDate = this.noConfirmOrderInfo.performDate
            this.orderId = this.noConfirmOrderInfo.id
            let playDate = this.performDate
            let checkTime = this.noConfirmOrderInfo.checkTime
            if(checkTime){
              let formatCheckTime = checkTime+':00:00'
              let totalCheckTime = playDate+' '+formatCheckTime
              totalCheckTime = totalCheckTime.replace(/-/g,'/')
              console.log(totalCheckTime)
              // alert(totalCheckTime)
              // alert(typeof(totalCheckTime))

              if(this.noConfirmOrderInfo.billStatus=='01' || this.noConfirmOrderInfo.billStatus=='02'){
                let date = new Date(totalCheckTime);
                this.timestamp2 = date.getTime()
                this.countTime()
              }else{
                this.lastTime = '核团时间已过期'
              }
            }else{
              console.log(checkTime)
              let nowNoCheck = new Date().getTime()
              let  performNoCheckTime = this.noConfirmOrderInfo.performTime.split('-')[0]+':00'
              let totalNoCheckTime = playDate+' '+performNoCheckTime;
              totalNoCheckTime = totalNoCheckTime.replace(/-/g,'/')
              let dateNoCheckTime = new Date(totalNoCheckTime).getTime();
              if(nowNoCheck > dateNoCheckTime){
                this.noCheckTimeFlag = false
              }else{
                this.noCheckTimeFlag = true
              }
            }
          }

        }).catch(() =>{
        })
      },
      countTime(){
        var date = new Date();
        var now = date.getTime();
        var leftTime = this.timestamp2-now;
        this.leftTime = leftTime
        //定义变量 d,h,m,s保存倒计时的时间
        var d,h,m,s;
      // ^[0-9]+\.?[0-9]{0,9}$
        if (leftTime/1000>=0) {

        // if (isPositive(leftTime/1000)) {
          // console.log(leftTime)
          d = Math.floor(leftTime/1000/60/60/24);
          h = Math.floor(leftTime/1000/60/60%24);
          m = Math.floor(leftTime/1000/60%60);
          s = Math.floor(leftTime/1000%60);
          if(d){
            this.lastTime = `${d}天${h}时${m}分${s}秒`
          }else{
            this.lastTime = `${h}时${m}分${s}秒`
          }
          this.timer=setTimeout(this.countTime,1000);
        }else{
          this.lastTime= '核团时间已过期'
          clearTimeout(this.timer)
        }
      },
      /**
       * 查看订单
       */
      viewOrder(){
        sessionStorage.setItem('SET_DATE',this.performDate)
        this.$router.push({ path:'/order/copy'})
      },
      /**
       * 立即核团
       */
      nuclearByNow(){
        sessionStorage.setItem('SET_DATE',this.performDate)
        // this.$router.push({ name: 'order-detail', params: { heId: '111111',id:this.orderId }})
        this.$router.push({ name: 'order-detail', params: {id:this.orderId }})
      },
      order(){
        this.$router.push({path:'/fix/copy'})
      },
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .home-copy-container
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
      height: calc(100% - 90px)
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
        margin: .65rem .4rem .65rem .4rem;
        background-color #fff;
        /*padding :.875rem  .85rem 1.575rem .85rem;*/
        padding :.875rem  .85rem .875rem .85rem;
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

      .today
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
        .info
          color:#4e4e4e
          font-size .65rem;
          .item
            line-height 2

        .list
          margin-right: 2rem;
          font-size:.7rem;
          color:#4e4e4e
          .item
            line-height 2;
        .handle
          margin: 15px 0
          .btn
            display block
            margin 25px auto 15px auto
            width 200px;
            height 40px;
            line-height 40px;
            border-radius 20px
            text-align center
            background linear-gradient(90deg, #64d2c5, #00ac96 50%, #64d2c5);
            background:-webkit-linear-gradient(90deg, #64d2c5, #00ac96 50%, #64d2c5)
            //background:linear-gradient(top, #1b99e5 0%,#1a9ef0 100%)
            color: #ffffff
            font-size 16px;
            letter-spacing 1px
        .today-float
          position absolute
          right: -.5rem;
          top:-.15rem;
          width 3.75rem
          height 3.275rem;
        .today-bottom
          position absolute
          width calc(100%+1.15rem);
          bottom:-.9rem;
          left:-.6rem;
          height 2rem;
</style>
