<template>
  <div>
    <div class="order-container">
      <v-top :title="title"></v-top>
      <div class="wrapper">
        <div class="search-box-wrapper" @click="shijianCK()">
          <i class="iconfont icon-cx icon-search"></i>
          <!--<input ref="query"  v-focus v-model="query" class="box"  :placeholder="placeholder"/>-->
          <span class="box">{{performDate}}</span>
          <span class="week">{{today == performDate? '今天': tomorrow ==performDate ?'明天':
            performDate ==dayAfterTomorrow ? '后天':week=='0'?'星期日':week=='1'?'星期一':week=='2'?'星期二':
            week=='3'?'星期三': week=='4'? '星期四':week=='5'?'星期五':week=='6'? '星期六':''
            }}</span>


        </div>
        <div class="order-status">
          <div class="item">
            <span class="color-block color-blue"></span>
            <span class="text">已审核</span>
          </div>
          <div class="item">
            <span class="color-block color-green"></span>
            <span class="text">待定</span>
          </div>
          <div class="item">
            <span class="color-block color-red"></span>
            <span class="text">已销售</span>
          </div>
          <div class="item">
            <span class="color-block color-cancel"></span>
            <span class="text">已撤销</span>
          </div>
        </div>
        <div class="order-list">
          <ul>
            <li class="order-item" @click="goOrderDetail(item.id)"
                v-for="item in orderList"
                :class="{'color-blue': item.billStatus =='03',
                   'color-green': (item.billStatus =='01' || item.billStatus =='02'),

                    'color-red': item.billStatus =='04',
                    'color-cancel': item.billStatus =='05'
                }"
            >
              <div class="show-info">
                <span class="date">{{item.performDate}}</span>
                <span class="show">场次：{{item.performTime}}</span>
              </div>
              <div class="name">
                {{item.travelName }}
              </div>
              <div class="order">
                <span class="status">订单状态：{{item.billStatus =='01'? '预定状态': item.billStatus =='02'? '准预定':
                  item.billStatus =='03'? '已审核': item.billStatus =='04'? '已销售': item.billStatus =='05'?'已撤销':''
                  }}</span>
                <span class="type">订单类型:{{item.bookType =='01'?'预定':item.bookType =='02'?'准预定': item.bookType =='03'?'候补':''}}</span>
              </div>
              <div class="clear-fix">
                <span class="entering" v-if="item.jump"  style="display: block;float:right" @click.stop="goEnter(item)">去录入</span>
              </div>

            </li>
          </ul>
        </div>

      </div>
      <tab-bar :selected="selectedTabBar"></tab-bar>
    </div>
    <div id="calendar-box" class="calendar-box" :class="{ 'calendar-show': calendarShow }">
      <div class="calendar-handle background-base">
        <a href="javascript:;" class="calendar-colse" @click="calendarColse">
          <i class="iconfont icon-chahao"></i>
        </a>
      </div>
      <div id="calendar"></div>
    </div>
  </div>

</template>

<script>
  import { Toast } from 'mint-ui'
  import TabBar from '@/base/tabbar/tabbar'
  import VTop from '@/base/vtop/vtop'
  import moment from 'moment'
  import {addDate } from "../../common/js/format";
  const perpage = 1000
  export default {
    name: "order",
    data(){
      return {
        today:'',
        tomorrow:'',
        dayAfterTomorrow:'',  //后天
        week:'',



        title: '订单列表',
        current:1,                  //第几页
        orderList: [],
        select_date:'',            //sessionStorage的内容
        performDate:'游玩日期',
        dataArray:[],                 //未格式化的日期格式
        formatDateList:[],               //格式化的日期格式
        calendarShow: false,
        selectedTabBar:'order'

      }
    },
    created(){
      // this.select_date =  sessionStorage.getItem('SET_DATE')
      // if(this.select_date){
      //   this.getOrderList(this.select_date)
      // }else{
      //   this.getDate()    //根据日期查询订单列表
      // }

      this.today =  moment().format('YYYY-MM-DD')
      this.tomorrow = addDate(new Date())
      this.dayAfterTomorrow =  addDate(new Date(),2)




      this.getDate()
    },
    methods:{
      /**
       *  去录入
       */
      goEnter(item){
        this.$router.push({ name: 'idCard-enter', params: { id:  item.id}})
      },
      // /**
      //  *
      //  * /
      getDate(){
        this.$http.get(`/wap/maxDay`).then(({ data: res }) => {
          if(res.code !== '200'){
            Toast(res.msg)
            return
          }
          this.dataArray = res.data
          if(this.dataArray.length){
            this.select_date =  sessionStorage.getItem('SET_DATE')
            if(this.select_date){
              this.performDate = this.select_date
            }else{
              this.performDate = this.dataArray[0]
            }

            this.week =  new Date(this.performDate).getDay()              //这里获取星期几




            // sessionStorage.setItem('SET_DATE',this.performDate)
            this.formatDateList = this.dataArray.map(item => {
              return { date: item };
            })
            this.getOrderList(this.performDate)
          }else{
            this.performDate = '暂无游玩日期'
          }

        }).catch((err)=>{

        })
      },
      getOrderList(date){
        // POST /wap/listOrders
        let data= {
          page:{
            current:  this.current,
            size: perpage,
          },
          date : date
        };
        this.$http.post(`/wap/listOrders`,data).then(({ data: res }) => {
          console.log(res)
          if(res.code !== '200'){
              Toast(res.msg)
          }
          this.orderList = res.data.records
        }).catch((err) =>{
          Toast(err)
        })
      },
      shijianCK(){
        const p = this;
        this.$http.get(`/wap/maxDay`).then(({ data: res }) => {
          if(res.code === '200'){
            this.dataArray = res.data
            this.formatDateList = this.dataArray.map(item => {
              return { date: item };
            });
            this.calendarShow = true;
            let data = this.formatDateList
            let options ={
              onClick: function (evl, date, price) {
                p.calendarShow = false;
                p.performDate = date;
                p.week = new Date(date).getDay();
                sessionStorage.setItem('SET_DATE',p.performDate)
                p.getOrderList(date);
              },
              optionsdays: data,
              monthnum:2,
              selecteday: p.performDate,
            };
            $("#calendar").calendar(options);
          }
        }).catch(() => {
        })
      },
      /**
       * 点击日期中插件中的叉号
       */
      calendarColse(){
        this.calendarShow = false
      },
      /**
       * 跳转到订单详情
       */
      goOrderDetail(id){
        this.$router.push({ path:`/order-detail/${id}`})
      },
    },
    components:{
      TabBar,
      VTop
    },
  };
</script>

<style scoped lang="stylus"  rel="stylesheet/stylus">
  .order-container
    position: absolute
    z-index: 10
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #efeff4
    .wrapper
      height: calc(100% - 90px);
      overflow-x: hidden;
      overflow-y: auto;
      padding-bottom 50px;
      .search-box-wrapper
        display: flex
        margin: 10px 10px;
        align-items: center
        box-sizing: border-box
        padding: 10px
        height: 32px;
        background-color: #fff
        border-radius: 8px;
        border:1px solid #ddd;
        .icon-search
          font-size: 14px
          color: #222
        .box
        //  flex: 1
         // margin: 5px;
          //padding 5px;
          //line-height: 18px;
          //color: #666
          //font-size: 14px;
          margin: 5px;
          padding 5px;
          line-height: 18px;
          color: #666
          font-size: 14px;
        .week
          font-size:14px;
          color: #666

      .order-status
        display:flex
        margin 10px 10px;
        padding 10px 5px;
        background-color :#fff;
        border: 1px solid #ddd;
        border-radius :4px;
        .item
          flex:1
          text-align center
          font-size :14px
          .color-block
            display:inline-block
            width :15px;
            height :15px;
          .color-blue
            background-color:#A5CBF7
          .color-green
            background-color:#84F329
          .color-red
            background-color:#FF00FF
          .color-cancel
            background-color:#C6C3C6
          .text
            display block
            color:#666
      .order-list
        font-size :16px
        color:#666
        .color-blue
          background-color:#A5CBF7
        .color-green
          background-color:#84F329
        .color-red
          background-color:#FF00FF
        .color-cancel
          background-color:#C6C3C6
        .order-item
          padding :10px 15px;
          margin-bottom: 10px
          .show-info
             display :flex
             justify-content:space-between
             height :30px;
             line-height 30px
          .name
             height :30px;
             line-height: 30px;
             overflow: hidden;
             text-overflow:ellipsis;
             white-space: nowrap;
          .order
            display :flex
            justify-content:space-between
            height :30px;
            line-height: 30px;

          .entering
            float: right;
            border 1px solid #ddd
            padding:10px 20px
            display: block;
            border-radius 5px;


</style>
