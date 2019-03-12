<template>
  <div>
    <div class="order-container">
      <header class="header">
        <h1>预定中心</h1>
        <!--<i @click="back" class="cubeic-back"></i>-->
      </header>
      <div class="wrapper">
        <div class="card">
          <div class="card-content">
            <div class="card-content-inner">
              <div class="list-block">
                <ul>
                  <li>
                    <div class="item-content">

                      <div class="item-inner">
                        <div class="item-title label">联系人</div>
                        <div class="item-input"><span>{{guideInfo.name}}</span></div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content">
                      <div class="item-inner">
                        <div class="item-title label">电话</div>
                        <div class="item-input"><span>{{guideInfo.mobile}}</span></div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content">
                      <div class="item-inner">
                        <div class="item-title label">证件类型</div>
                        <div class="item-input"><span>导游证</span></div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content">
                      <div class="item-inner">
                        <div class="item-title label">证件号码</div>
                        <div class="item-input"><span>{{guideInfo.certNo}}</span></div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <div class="card-content-inner">
              <div class="searchbar">
                <div class="search-input">
                  <!--<label for="search" class="icon iconfont icon-cx"></label>-->
                  <span class="icon iconfont icon-cx"></span>
                  <input type="text" v-model="travelAgency" @focus="focusTravel" class="searchClient" placeholder="输入旅行社名称">
                </div>
              </div>
              <div class="searchbar">
                <div class="search-input">
                  <!--<label for="search" class="icon iconfont icon-cx"></label>-->
                  <span  class="icon iconfont icon-cx"></span>
                  <input type="text" v-model="touristOrigin"  class="searchClient" @focus="focusTourist" placeholder="输入客源地">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <div class="card-content-inner">
              <div class="list-block">
                <ul>
                  <li>
                    <div class="item-content">

                      <div class="item-inner">
                        <div class="item-title label">游玩日期</div>
                        <div class="item-input" @click="shijianCK()">
                          <span class="date">{{performDate}}</span>
                          <span v-show="hasDate" class="enter iconfont icon-arrow-right"></span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content">
                      <div class="item-inner">
                        <div class="item-title label">团队类型</div>
                        <cube-select
                          v-model="teamType"
                          :options="teamTypeSelect">
                        </cube-select>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content">
                      <div class="item-inner">
                        <div class="item-title label">行程类型</div>
                        <cube-select
                          v-model="routingType"
                          :options="routingTypeSelect">
                        </cube-select>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content">
                      <div class="item-inner">
                        <div class="item-title label">演出场次</div>
                        <cube-select @change="sceneChange"
                          v-model="performCode"
                          :options="performCodeSelect">
                        </cube-select>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="card" v-show="isShowSeat">
          <div class="card-content">
            <div class="card-content-inner">
              <div class="list-block">
                <ul>
                  <li v-for="item in detailRequestList">
                    <div class="item-content">
                      <div class="item-inner">
                        <div class="item-title label">{{item.areaName}}</div>
                        <div class="item-input">
                          <input type="number" v-model.number="item.count" class="seat" placeholder="请输入">
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <div class="card-content-inner">
              <div class="list-block">
                <ul>
                  <li>
                    <div class="item-content-remark">
                      <div class="item-inner clear-fix">
                        <div class="item-title label">备注</div>
                        <div class="item-input">
                          <cube-textarea v-model="remark"></cube-textarea>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="handle">
          <a href="javascript:;" class="handle-btn reset-btn">重置</a>
          <a href="javascript:;" @click="goOrder" class="handle-btn order-btn">下单</a>
        </div>
        <search v-if="isSearchShow" :placeholder="placeholdertype" :searchtype='searchtype'
                @cancelboxmodal="cancelBoxModal" @itemselected="itemSelect"></search>
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
  import { Toast,Indicator } from 'mint-ui'
  import { isInteger } from '@/utils/validation'
  import TabBar from './../../base/tabbar/tabbar'
  import Search from '@/components/search/search'
  export default {
    components:{
      TabBar,
      Search
    },
    data(){
      return {
        guideInfo:{},            //导游信息

        travelAgency:'',   //旅行社名称,
        travel:{              //旅行社
          id:'',
          name:''
        },
        touristOrigin:'',   // 客源地名称
        area:{              //客源地
          areaCode:'',
          areaName:'',
        },
        isSearchShow:false,

        hasDate: true,               //是否有游玩日期
        calendarShow:false,          //日期插件是否显示
        formatDateList:[],            //格式化的日期列表
        performDate:'',                //游玩日期

        teamType: '',   //团队类型传入字段
        teamTypeSelect:[],

        routingType:'',                //行程类型
        routingTypeSelect:[{ value: 0, text: '加点' },{ value: 1, text: '行程' }],          //行程类型下拉框

        performCode:'',                //演出场次
        performCodeSelect:[],         //演出场次下拉框

        isShowSeat: false,          //是否显示席位
        vipSeat: 0,           //贵宾席
        commonSeat:0,         //观众席
        moveCommonSeat:0,     //观众移动席
        luxurySofaSeat: 0,   //豪华沙发席
        detailRequestList:[],              //席位详情list //需要传入的

        remark:'',

        selectedTabBar:'observe',          //底部tabbar路由
      }
    },
    created(){
      this.getUseInfo()           //获得导游信息
      this.teamTypeInfo()         //获取团队信息
      this.getDate()             // 获取日期
    },
    watch:{
      performDate(newVal){
        this.performCode = ''
      },
      performCode(newVal){
        if(!newVal){
          this.isShowSeat = false
        }
      },
    },
    methods:{
      /**
       * 获取导游信息
       */
      getUseInfo(){
        this.$http.get(`/wap/guide/info`).then(({ data: res }) => {
          if(res.code !== '200'){
            Toast(res.msg)
            return
          }
          this.guideInfo = res.data
        })
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
            this.showSession(this.performDate)
          }else{
            this.hasDate = false
            this.performDate = '暂无游玩日期'
          }

        })
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
            arr.push({text: teams[key] ,value: key})
          }
          this.teamTypeSelect = arr
        })
      },
      /**
       * 当旅行社名称获取焦点的时候
       */
      focusTravel(e){
        this.travelAgency = ''      //清空旅行社名称
        this.placeholdertype = '输入旅行社名称或拼音缩写'
        this.searchtype = 'travel'
        this.isSearchShow = true;
      },
      /**
       *  当客源地获取焦点的时候
       */
      focusTourist(e){
        this.touristOrigin  =''     //清空客源地名称
        this.placeholdertype = '输入客源地'
        this.searchtype = 'origin'
        this.isSearchShow = true;
      },
      /**
       * 选中的suggest列表中的某一项
       */
      itemSelect(item){
        this.isSearchShow =false
        if(item.areaName){
          this.touristOrigin = item.areaName
          this.area =  item
        }else{
          this.travelAgency = item.name
          this.travel =  item
        }
      },
      /**
       * 点击搜索框的取消按钮
       */
      cancelBoxModal(){
        this.isSearchShow = false
      },
      /**
       * 点击日期 进入日期插件
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
              p.showSession(date);
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
       * 场次改变
       */
      sceneChange(value, index, text){
        console.log(value,index,text)
        if(value){
          this.getPerformSeatDetail(value)
        }else{
          this.isShowSeat = false
        }

      },
      /**
       * 通过日期获取获取场次
       */
      showSession(date){
        this.$http.get(`/wap/performPlan/${date}`).then(({ data: res }) => {
          if(res.code !=='200'){
            Toast(res.msg)
            return
          }
          let performCodeList= res.data
          this.performCodeSelect = performCodeList.map(item => {
            return {text: item.performTime, value: item.performCode };
          });
        }).catch(() => {
        })
      },
      /**
       * 获取座位席详情信息
       */
      getPerformSeatDetail(code){
        this.$http.get(`/wap/performSeatArea/${code}`).then(({ data: res }) => {
          if(res.code !== '200'){
            Toast(res.msg)
            return
          }
          let items = res.data;
          if(items.length){
            this.isShowSeat = true
          }else{
            this.isShowSeat =false
          }
          for(const value of items){
            value.count = 0
          }
          this.detailRequestList = items;
        })
      },
      /**
       * 提交订单
       */
      goOrder(){
        if(!this.travelAgency){
          Toast('旅行社名称不能为空')
          return
        }
        if(!this.touristOrigin){
          Toast('客源地不能为空')
          return
        }
        // 游玩日期  ？？？、
        if(!this.teamType){
          Toast('团队类型不能为空')
          return
        }
        if(this.routingType===''){
          Toast('行程类型不能为空')
          return
        }
        if(!this.performCode){
          Toast('演出场次不能为空')
          return
        }
        if(!this.detailRequestList.length){
          Toast('该演出场次下没有席位，不能下单')
          return
        }
        for(const value of this.detailRequestList){
          if(!isInteger(value.count)){
            Toast('席位都不能为空且为整数')
            return
          }
        }

        let data ={
          travelId: this.travel.id,               //旅行社id
          areaCode: this.area.areaCode,           //客源地
          performDate: this.performDate,           //游玩日期
          teamType: this.teamType,                 //团队类型
          routingType : this.routingType,          //行程类型
          performCode: this.performCode,
          detailRequestList:this.detailRequestList,     //席位总数组
          remark: this.remark                           //备注
        };
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.$http.post('/wap/downOrder',data).then(({ data: res }) => {
            Indicator.close();
            if(res.code !== '200'){
              Toast(res.msg)
              return
            }
            Toast('下单成功')
            setTimeout(() =>{
              this.$router.push({ path:'/order'})
            },1000)



        }).catch(() => {

        })
      },
    }
  };
</script>

<style lang="stylus"  rel="stylesheet/stylus">
  .order-container
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
      height: calc(100% - 90px)
      overflow-x: hidden
      overflow-y: auto
      .card
        position: relative
        background-color:#fff;
        box-shadow: 0 1px 2px rgba(0,0,0,.3);
        border-radius:2px;
        margin : 8px 0;
        font-size 15px
        .card-content
          position: relative
          .card-content-inner
            padding 5px 15px;
            position:relative
            .list-block
              margin : -15px
              ul
                padding 20px 0
                position relative
                li
                  box-sizing: border-box
                  .item-content
                    box-sizing: border-box
                    padding-left: 20px;
                    height :40px;
                    line-height 40px

                    .item-title
                      float: left
                      width: 30%
                    .item-input
                      position :relative
                      float: left
                      width: 70%
                      .seat
                        height 28px
                        padding-left :5px
                      .date
                        color:red;
                        font-size:16px;
                      .enter
                        position: absolute;
                        top:-1px;
                        right:13px;
                    .cube-select
                      float left
                      width 65%
                      margin-top 3px
                      padding: 6px 20px 6px 10px;
                  .item-content-remark
                    box-sizing: border-box
                    padding-left: 20px;
                    .item-title
                      margin-top:12px
                      float: left
                      width: 30%
                    .item-input
                      float: left
                      width: 70%
                      .seat
                        height 28px
                        padding-left :5px
                    .cube-select
                      float left
                      width 65%
                      margin-top 3px
          .searchbar
            padding: 8px 0;
            overflow: hidden;
            /*height: 44px;*/
            .search-input
              position relative
              display:flex
              border 1px solid #ddd;
              padding:2px;
              .icon
                font-size: 14px;
                color: #b4b4b4;
                padding :3px 8px 3px 2px;
                position relative
                top:3px;
                left:2px;
              .searchClient
                height: 28px;
                flex:1
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
            background-color :#4cd964

</style>
