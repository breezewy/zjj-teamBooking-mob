<template>
  <div class="ticket-detail-container">
    <header class="header">
      <h1>票务详情 <span style="font-size: 14px;">({{teamTypeText}} {{routingTypeText}} )</span></h1>
      <i @click="back" class="cubeic-back"></i>
    </header>
    <div class="wrapper">
      <ul class="wrap-list">
        <li class="wrap-item">
          <div class="time-slot">
            <span class="start-time">{{ticketDetail.performTime? ticketDetail.performTime.split('-')[0] :'' }}</span>
            <span class="line"></span>
            <span class="total">{{ticketDetail.sceneId}}小时</span>
            <span class="line"></span>
            <span class="end-time">{{ticketDetail.performTime? ticketDetail.performTime.split('-')[1] :''}}</span>
            <!--<span class="place">杭州</span>-->
          </div>
          <div class="info clear-fix">
            <span class="name">{{ticketDetail.performDate}}</span>
            <span class="seat">杭州</span>
          </div>
          <div class="detail clear-fix">
            <span class="show-place">一号剧院</span>
            <span class="ticket-count">{{ticketDetail.performName}}</span>
          </div>
        </li>
      </ul>
      <div class="seat-list" v-show="isShowSeat">
        <ul>
          <li class="seat-item" v-for="item in detailRequestList">
            <span class="seat-name">{{item.areaName}}</span>
            <span class="introduce">有票</span>
            <input type="number" v-model.number="item.inputCount" class="input-count">
          </li>
          <!--<li class="seat-item">-->
            <!--<span class="seat-name">观众席</span>-->
            <!--<span class="introduce">无票</span>-->
            <!--<input type="text" v-model="seatInputCount" class="input-count">-->
          <!--</li>-->
          <!--<li class="seat-item">-->
            <!--<span class="seat-name">观众移动席</span>-->
            <!--<span class="introduce">票务紧急</span>-->
            <!--<input type="text" v-model="seatInputCount" class="input-count">-->
          <!--</li>-->
        </ul>
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
              <ul style="padding: 10px 0">
                <li>
                  <div class="item-content-remark">
                    <div class="item-inner clear-fix">
                      <div class="item-title label">备注</div>
                      <div class="item-input">
                        <cube-textarea v-model="remark" placeholder="请输入"></cube-textarea>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="order-btn">
        <a href="javascript:;" class="reverse" @click="reserve()">预定</a>
      </div>
    </div>
    <search v-if="isSearchShow" :placeholder="placeholdertype" :searchtype='searchtype'
            @cancelboxmodal="cancelBoxModal" @itemselected="itemSelect"></search>
  </div>
</template>

<script>
  import { Toast,Indicator } from 'mint-ui'
  import { isInteger } from '@/utils/validation'
  import Search from '@/components/search/search'
  export default {
    name: "ticket-detail",
    components:{
      Search
    },
    data(){
      return {
        performCodeList:[],
        seatInputCount:0,
        ticketDetail: {},
        filter:{},
        performDate:'',
        detailRequestList:[],             //座位详情
        isShowSeat: false,
        teamTypeText:'',
        routingTypeText:'',
        //后面添加的
        travelAgency:'',
        touristOrigin:'',
        remark:'',
        isSearchShow:false,
        area:{              //客源地
          areaCode:'',
          areaName:'',
        },

        travel:{              //旅行社
          id:'',
          name:''
        },

      }
    },
    created(){
      this.filter = JSON.parse(sessionStorage.getItem('filter'))
      this.performDate = this.filter.performDate
      this.teamTypeText = this.filter.teamTypeText
      this.routingTypeText = this.filter.routingTypeText
      this.teamType = this.filter.teamType               //团队类型
      this.routingType  = this.filter.routingType

      this.ticketDetail = JSON.parse(sessionStorage.getItem('ticketDetail'))
      if(!this.ticketDetail){
        this.showSession(this.performDate)
      }else{
        this.performCode = this.ticketDetail.performCode
        this.getPerformSeatDetail(this.performCode)

      }
    },
    methods:{
      back(){
        this.$router.go(-1)
      },
      showSession(date){
        this.$http.get(`/wap/performPlan/${date}`).then(({ data: res }) => {
          if(res.code !=='200'){
            return
          }
          this.performCodeList= res.data
          console.log(this.performCodeList)
        }).catch(() => {
        })
      },
      /**
       * 提交订单
       */
      reserve(){
        console.log(isInteger(20))
        console.log(this.detailRequestList)
          let copyDetailRequestList =  JSON.parse(JSON.stringify(this.detailRequestList))
          let arr = []
          for(const value of copyDetailRequestList){
           arr.push({areaCode: value.areaCode, areaName: value.areaName,count: value.inputCount})
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
          for(const value of arr){
            if(!isInteger(value.count)){
              Toast('席位不能为空且都为整数')
              return
            }
          }
          if(!this.travelAgency){
            Toast('旅行社名称不能为空')
            return
          }
          if(!this.touristOrigin){
            Toast('客源地不能为空')
            return
          }

          let data ={
            travelId: this.travel.id,               //旅行社id
            areaCode: this.area.areaCode,           //客源地
            performDate: this.performDate,           //游玩日期
            teamType: this.teamType,                 //团队类型
            routingType : this.routingType,          //行程类型
            performCode: this.performCode,
            detailRequestList:arr,     //席位总数组
            remark: this.remark                           //备注
          };
          console.log(data)
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
          console.log(this.detailRequestList)
        })
      },
      focusTravel(){
        this.travelAgency = ''      //清空旅行社名称
        this.placeholdertype = '输入旅行社名称或拼音缩写'
        this.searchtype = 'travel'
        this.isSearchShow = true;
      },
      focusTourist(){
        this.touristOrigin  =''     //清空客源地名称
        this.placeholdertype = '输入客源地'
        this.searchtype = 'origin'
        this.isSearchShow = true;
      },
      /**
       * 点击搜索框的取消按钮
       */
      cancelBoxModal(){
        this.isSearchShow = false
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
    }
  };
</script>

<style lang="stylus"  rel="stylesheet/stylus" >
  @import "./../../assets/ticket-detail"

</style>
