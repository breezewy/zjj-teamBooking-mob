<template>
  <div>
    <div class="fix-start-copy-container">
      <header class="header">
        <h1>预定中心</h1>
        <!--<i @click="back" class="cubeic-back"></i>-->
      </header>
      <div class="wrapper">
        <div class="start-info">
          <div class="name">宋城千古情演出</div>
          <div class="date-content clear-fix" @click="shijianCK">
            <!--<p class="date border-bottom-1px">{{performDate}}</p>-->
            <p class="date">{{performDate}}</p>
            <!--<span class="day">今天</span>-->
            <span class="day">{{performDate==today ? '今天': performDate== tomorrow?'明天': performDate== dayAfterTomorrow? '后天':''}}</span>
            <span class="week">星期{{week=='1'?'一':week=='2'?'二': week=='3'?'三': week=='4'?'四': week=='5'? '五': week=='6'?'六':week=='0'?'日':''}}</span>
          </div>
          <!--<div class="team-type" @click="_showTeamTypeList">-->
            <!--<span class="team">团队类型</span>-->
            <!--&lt;!&ndash;<span class="icon iconfont icon-arrow-right"></span>&ndash;&gt;-->
            <!--<span class="icon">{{teamTypeText}}</span>-->

          <!--</div>-->
          <div class="stroke-type clear-fix">
            <span class="stroke">行程类型</span>
            <!--<span class="icon iconfont icon-arrow-right"></span>-->
            <!--<span class="icon">单选</span>-->
            <span class="radio">
                <cube-radio-group v-model.number="routingType" :options="routingTypeSelect" :horizontal="true" />
              </span>

          </div>
          <!--<div class="search-btn" @click="searchTicket()">-->
            <!--搜索-->
          <!--</div>-->
        </div>


        <div class="team-contain">
          <h1 class="title">
            团队类型
            <!--<span class="text">团队类型</span>-->
            <!--<span class="clear" @click="showConfirm"><i class="icon-clear"></i></span>-->
          </h1>
          <cube-radio-group v-model="selected" :options="teamTypeSelect" />
        </div>
        <div class="btn-search" @click="searchTicket()">
          <span class="go-search">搜索行程</span>
        </div>
        <playlist :teamTypeSelect="teamTypeSelect" @item="itemSelected" ref="playlist"></playlist>

        <tab-bar :selected="selectedTabBar" ></tab-bar>
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
  import { Toast } from 'mint-ui'
  import {addDate } from "../common/js/format";
  import moment from 'moment'
  import playlist from './../base/playlist/playlist'
  import TabBar from './../base/tabbar/tabbar'
  export default {
    name: "fix-copy",
    components:{
      TabBar,
      playlist
    },
    data(){
      return {
        today:'',
        tomorrow:'',
        dayAfterTomorrow:'',  //后天
        week:'',             // 星期几
        selectedTabBar: 'fix',


        hasDate: true,
        calendarShow: false,
        formatDateList:[],
        performDate: '',
        filter:{},



        routingType:'',                //行程类型
        routingTypeSelect:[{ value: 1, label: '行程' },{ value: 0, label: '加点' }],          //行程类型下拉框

        teamType:'',
        teamTypeText:'单选',
        teamTypeSelect:[]
      }
    },
    created(){
      this.today =  moment().format('YYYY-MM-DD')
      this.tomorrow = addDate(new Date())
      this.dayAfterTomorrow =  addDate(new Date(),2)
      this.filter = JSON.parse(sessionStorage.getItem('filter'))
      if(this.filter){
        this.performDate = this.filter.performDate
        this.week =  new Date(this.performDate).getDay()
        this.teamTypeText =  this.filter.teamTypeText
        this.teamType = this.filter.teamType
        this.routingType = this.filter.routingType
      }else{
        this.getDate()
      }
      this.teamTypeInfo()
    },
    methods:{
      /**
       *  搜索票
       */
      searchTicket(){
        if(!this.teamType){
          Toast('请选择团队')
          return
        }
        if(this.routingType===''){
          Toast('请选择行程')
          return
        }
        let filter = {
          performDate:  this.performDate,
          teamType: this.teamType,
          routingType: this.routingType,
          teamTypeText: this.teamTypeText,
          routingTypeText: this.routingType===0 ? '加点':'行程'
        };
        sessionStorage.setItem('filter', JSON.stringify(filter))
        this.$router.push({ path:'/ticket-list'})
      },
      /**
       * 首次获取日期列表
       */
      getDate(){
        this.$http.get(`/wap/maxDay`).then(({ data: res }) => {
          if(res.code !== '200'){
            Toast(res.msg)
            return
          }
          if(res.data.length){
            this.hasDate = true
            this.performDate = res.data[0];
            this.week =  new Date(this.performDate).getDay()
            // this.showSession(this.performDate)
          }else{
            this.hasDate = false
            this.performDate = '暂无游玩日期'
          }

        })
      },
      /**
       * 选中某个团队类型
       */
      itemSelected(value,label) {
        this.teamType  = value
        this.teamTypeText = label
      },
      /**
       *  选择日期
       */
      shijianCK(){
        const p = this;
        this.$http.get(`/wap/maxDay`).then(({ data: res }) => {
          if(res.code !== '200') {
            Toast(res.msg)
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
              // p.showSession(date);
              p.week = new Date(date).getDay();
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
      },
      /**
       * 获取团队类型信息
       */
      teamTypeInfo(){
        this.$http.get(`/wap/teamType`).then(({ data: res }) => {
          if(res.code !== '200'){
            Toast(res.msg)
            return
          }
          let teams = res.data
          let arr  = []
          for (var key in teams){
            arr.push({label: teams[key] ,value: key})
          }
          this.teamTypeSelect = arr
        })
      },
      _showTeamTypeList(){
        this.$refs.playlist.show()
      }
    }
  };
</script>

<style lang="stylus"  rel="stylesheet/stylus">
  .fix-start-copy-container
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
      overflow-x: hidden
      overflow-y: auto
      .start-info
        margin :30px 15px 10px 15px;
        padding :10px 15px
        background-color:#fff
        .name
          margin-top:10px;
          margin-bottom :10px;
          padding-bottom 5px;
          font-size 20px
          font-weight 500;
          color:#333
          letter-spacing :1px
          border-bottom 1px solid #ddd;
          /*text-align left*/
          height 44px
          line-height :44px;
        .date-content
          height :44px;
          line-height :44px
          .date
            font-size :20px
            display: inline-block
            color: #656565
          .day
            margin-left :30px
            font-size 18px
            color: #656565
            font-weight:500
          .week
            margin-left :10px
            font-size 18px
            color: #656565
            font-weight:500
        .team-type
          display flex
          justify-content space-between
          height: 40px;
          line-height :40px;
          .team
            font-size :16px;
          .icon
            font-size :16px;
            color: #409eff
        .stroke-type
          font-size :18px;
          color:#666666
          .stroke
            float: left
            position relative
            top:12px;
          .radio
            display: block
            float: right
            font-size 16px
            .border-right-1px::after
              border-right none
            .cube-radio-group[data-horz="true"]::after
              border:none

        .search-btn
          margin 10px 0
          width :100%
          height :40px
          line-height 40px
          background-color :#1c9ae7
          text-align center
          border-radius :5px
          font-size 16px
          color: #fff
      .team-contain
        margin 0 10px;
        background-color #fff;
        border-radius :10px;
        font-size 18px;
        .title
          font-size 18px;
          font-weight bold
          color:#676767
          line-height 40px;
          margin-left 20px;
        .cube-radio-wrap
          padding:5px 0
          .cube-radio-label
            font-weight bold
            color:#666
      .btn-search
        margin 50px 0 70px 0;
        .go-search
         display block
         width :100%;
         margin 0 auto
         height 60px;
         line-height 60px;
         text-align center
         color:#fff;
         background-color #199def

</style>
