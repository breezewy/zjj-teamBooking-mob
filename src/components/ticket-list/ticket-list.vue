<template>
    <div>
      <div class="ticket-list-container">
        <header class="header">
          <h1>票务列表 <span style="font-size: 14px">({{teamTypeText}} {{routingTypeText}})</span></h1>
          <i @click="back" class="cubeic-back"></i>
        </header>
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
          <div class="scroll-container">
            <cube-scroll class="scroll-contain"
                     :options="options"
                     @pulling-down="onPullingDown"
                    :data="performCodeList"
                    ref="scroll"
            >
              <ul class="wrap-list">
                <li class="wrap-item" v-for="item in performCodeList" @click="goDetail(item)">
                  <div class="time-slot">
                    <span class="start-time">{{item.performTime? item.performTime.split('-')[0] :'' }}</span>
                    <span class="line"></span>
                    <span class="total">{{item.sceneId}}小时</span>
                    <span class="line"></span>
                    <span class="end-time">{{item.performTime? item.performTime.split('-')[1] :''}}</span>
                    <span class="place">杭州</span>
                  </div>
                  <div class="info clear-fix">
                    <span class="name">{{item.performName}}</span>
                    <span class="seat">贵宾席</span>
                  </div>
                  <div class="detail clear-fix">
                    <span class="show-place">一号剧院</span>
                    <span class="ticket-count">有票</span>
                  </div>
                </li>
              </ul>
            </cube-scroll>

          </div>

        </div>
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
  import Scroll from '@/base/scroll/scroll'
  import VTop from '@/base/vtop/vtop'
  import {addDate } from "../../common/js/format";
  import moment from 'moment'
  export default {
    name: "ticket-list",
    components:{
      VTop,
      Scroll
    },
    computed:{
      options() {
        return {
          pullDownRefresh: this.pullDownRefreshObj,
          scrollbar: false,
        }
      },
      pullDownRefreshObj: function() {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),

          txt: this.pullDownRefreshTxt
        } : false
      },
    },
    data(){
      return {
        pullDownRefresh: true,
        pullDownRefreshThreshold: 60,
        pullDownRefreshStop: 40,
        pullDownRefreshTxt: '刷新成功',
        today:'',
        tomorrow:'',
        dayAfterTomorrow:'',  //后天
        week:'',
        title: '票务列表',
        filter:{
          performDate:'',
          teamType:'',
          routingType:''
        },
        performDate:'',
        formatDateList:[],
        calendarShow: false,

        performCodeList:[],   //演出场次列表

        teamTypeText: '',
        routingTypeText:''
      }
    },
    created(){
      this.today =  moment().format('YYYY-MM-DD')
      this.tomorrow = addDate(new Date())
      this.dayAfterTomorrow =  addDate(new Date(),2)
      this.filter = JSON.parse(sessionStorage.getItem('filter'))
      console.log(this.filter)
      this.performDate =  this.filter.performDate
      this.teamTypeText = this.filter.teamTypeText
      this.routingTypeText = this.filter.routingTypeText

      this.week =  new Date(this.performDate).getDay()
      this.showSession(this.performDate)

    },
    methods:{
      back(){
        this.$router.go(-1)
      },
      onPullingDown(){
        this.$http.get(`/wap/performPlan/${this.performDate}`).then(({ data: res }) => {
          if(res.code !=='200'){
            return
          }
          this.performCodeList= res.data
        }).catch(() => {
        })
      },
      /**
       * 去票务详情
       */
      goDetail(item){
        sessionStorage.setItem('ticketDetail', JSON.stringify(item))
        this.$router.push({ path:'/ticket-detail'})
      },
      showSession(date){
        this.$http.get(`/wap/performPlan/${date}`).then(({ data: res }) => {
          if(res.code !=='200'){
            return
          }
          this.performCodeList= res.data
          // this.$refs.scroll.update()
        }).catch(() => {
        })
      },
      shijianCK(){
        const p = this;
        this.$http.get(`/wap/maxDay`).then(({ data: res }) => {
          if(res.code !== '200') {
            return
          }
          let dataArray = res.data
          this.formatDateList = dataArray.map(item => {
            return { date: item };
          });
          this.calendarShow = true;
          let data = this.formatDateList
          let options ={
            onClick: function (evl, date, price) {
              p.calendarShow = false;
              p.performDate = date;
              p.showSession(date);
              p.week = new Date(date).getDay();
              p.filter.performDate = date
              console.log('无敌')
              sessionStorage.setItem('filter',JSON.stringify(p.filter))
            },
            optionsdays: data,
            selecteday: p.performDate,
          };
          $("#calendar").calendar(options);

        }).catch(() => {
        })
      },
      /**
       * 点击日期中插件中的叉号
       */
      calendarColse(){
        this.calendarShow = false
      }
    }
  };
</script>

<style lang="stylus"  rel="stylesheet/stylus">
  @import "./../../assets/ticket-list"
  .ticket-list-container
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
        color: #fc9153;
        font-size: 16px
    .wrapper
      height: calc(100% - 40px);
      overflow-x: hidden;
      overflow-y: auto;
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
          margin: 5px;
          padding 5px;
          line-height: 18px;
          color: #666
          font-size: 14px;
        .week
          font-size:14px;
          color: #666


</style>
