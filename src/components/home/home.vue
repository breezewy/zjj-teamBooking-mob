<template>
    <div class="home-container">
      <header class="header">
        <h1>首页</h1>
        <!--<i @click="back" class="cubeic-back"></i>-->
      </header>
      <div class="wrapper">
        <div class="notice clear-fix">
          <h1 class="title">预定须知</h1>
          <ul class="list">
            <li v-for="(item,index) in bookingRuleList">{{index+1}}、{{item.content}}</li>
            <!--<li>1、导游每天限购一笔订单。</li>-->
            <!--<li>2、组团、一日游需提前一天预定。</li>-->
            <!--<li>3、华东团队，必须用导游证预定。</li>-->
            <!--<li>4、不支持跨天改场，如需跨天请撤销当天订单重新选择下单日期下单。</li>-->
            <!--<li>5、旅行社抬头及导游信息一旦预定不做更改。</li>-->
            <!--<li>6、成人团下午14:00场按晚上场价格结算。</li>-->
            <!--<li>7、导游提醒团队游客带齐相关证件。</li>-->
            <!--<li>8、下单后，进入“订单”点击明细，查询最晚核团时间，过时订单自动取消。</li>-->
            <!--<li>9、特殊团队需先点人后买票。</li>-->
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

        <div class="notice clear-fix" v-if="isTodayOrderShow">
          <h1 class="title">当天订单</h1>
          <ul class="list">
            <li>编号：{{noConfirmOrderInfo.billNo}}</li>
            <li>订单状态：{{noConfirmOrderInfo.billStatus =='01'? '未审核': noConfirmOrderInfo.billStatus =='02'? '准预定':
              noConfirmOrderInfo.billStatus =='03'? '已审核': noConfirmOrderInfo.billStatus =='04'? '已销售':
              noConfirmOrderInfo.billStatus =='05'?'已撤销':''
              }}</li>
            <li>订单类型：{{noConfirmOrderInfo.billType=='01'?'现场售票': noConfirmOrderInfo.billType=='02'? '预定':'' }}</li>
            <li>{{noConfirmOrderInfo.performDate}} &nbsp;&nbsp;&nbsp;{{noConfirmOrderInfo.performTime}}</li>
            <li>{{noConfirmOrderInfo.travelName}}</li>
            <li style="margin-top:20px;font-size: 15px">
              截止时间：{{noConfirmOrderInfo.performDate}} {{noConfirmOrderInfo.checkTime}}:00:00
            </li>
            <li style="font-size: 15px"> 倒计时：【<span style="color:red">{{lastTime}}</span>】<span v-if="leftTime/1000>=0">请及时核团</span></li>
          </ul>
          <div class="handle-detail">
            <span class="update btn" @click="viewOrder()">查看订单</span>
            <span class="nuclei btn" @click="nuclearByNow()" v-if="(noConfirmOrderInfo.billStatus=='01' || noConfirmOrderInfo.billStatus=='02') && leftTime/1000>=0">立即核团</span>
                  <!--v-if="(noConfirmOrderInfo.billStatus=='01' || noConfirmOrderInfo.billStatus=='02') && leftTime/1000>=0">立即核团</span>-->

          </div>
        </div>
      </div>
      <tab-bar :selected="selectedTabBar"></tab-bar>
    </div>
</template>

<script>
  import TabBar from '@/base/tabbar/tabbar'
  import { Toast,MessageBox  } from 'mint-ui'
  export default {
    name: "home",
    components:{
      TabBar,
    },
    created(){
      this.getBookingRule()
      this.getNoConfirmOrder()
    },
    data(){
      return {
        selectedTabBar:'home',
        noConfirmOrderInfo:{},
        isTodayOrderShow:false,
        performDate:'',             //游玩的日期
        orderId:'',
        lastTime:'',                 //显示的日期
        timestamp2:'',                //核团的日期
        timer: null,                 //定时器
        leftTime:'',
        bookingRuleList:[]
      }
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
      order(){
        this.$router.push({path:'/fix'})
      },
      getNoConfirmOrder(){
        this.$http.get('/wap/noConfirmOrder').then(({ data: res }) => {
          if(res.code !== '200'){
            Toast(res.msg)
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
           let formatCheckTime = checkTime+':00:00'
           let totalCheckTime = playDate+' '+formatCheckTime

           if(this.noConfirmOrderInfo.billStatus=='01' || this.noConfirmOrderInfo.billStatus=='02'){
             let date = new Date(totalCheckTime);
             this.timestamp2 = date.getTime()
             this.countTime()
           }else{
             this.lastTime = '核团时间已过期'
           }
         }

        })
      },
      countTime(){
            var date = new Date();
           var now = date.getTime();
           var leftTime = this.timestamp2-now;
           this.leftTime = leftTime
           //定义变量 d,h,m,s保存倒计时的时间
           var d,h,m,s;
           if (leftTime/1000>=0) {
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
        this.$router.push({ path:'/order'})
      },
      /**
       * 立即核团
       */
      nuclearByNow(){
          if(this.leftTime/1000 <= 0){
            Toast('核团时间已过，无法核团')
            return
          }
          sessionStorage.setItem('SET_DATE',this.performDate)
          // this.$router.push({ name: 'order-detail', params: { heId: '111111',id:this.orderId }})
          this.$router.push({ name: 'order-detail', params: {id:this.orderId }})
      }
    },
    beforeDestroy(){
      this.timer = null
    }
  };
</script>

<style lang="stylus"  rel="stylesheet/stylus">
  .home-container
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
          /*display: flex*/
          /*margin :10px 20px*/
          margin-left 10px
          margin-right 10px;
          font-size: 14px;
          .btn
            display :inline-block
            margin-right :10px;
            width 100px
            height :35px;
            line-height :35px
            text-align center
            color:#1c9ae7
            border :1px solid #1c9ae7
            border-radius .25rem
            /*border-radius: .25rem 0 0 .25rem;*/
          .update
            /*border-right :none*/
          .nuclei
            /*border-radius: 0 .25rem .25rem 0;*/
          .bill
            border-radius: .25rem

</style>
