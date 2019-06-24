<template>
  <div>
    <div class="order-container">
      <v-top :title="title"></v-top>
      <div class="wrapper">
        <!--<div class="search-box-wrapper" @click="shijianCK()">-->
        <!--<i class="iconfont icon-cx icon-search"></i>-->
        <!--&lt;!&ndash;<input ref="query"  v-focus v-model="query" class="box"  :placeholder="placeholder"/>&ndash;&gt;-->
        <!--<span class="box">{{performDate}}</span>-->
        <!--<span class="week">{{today == performDate? '今天': tomorrow ==performDate ?'明天':-->
        <!--performDate ==dayAfterTomorrow ? '后天':week=='0'?'星期日':week=='1'?'星期一':week=='2'?'星期二':-->
        <!--week=='3'?'星期三': week=='4'? '星期四':week=='5'?'星期五':week=='6'? '星期六':''-->
        <!--}}</span>-->
        <!--</div>-->
        <div class="order-date">
          <i class="iconfont icon-cx icon-search"></i>
          <input
            id="my-input"
            class="my-input-date"
            type="text"
            placeholder="游玩日期"
          />
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
          <!-- <div class="item">
            <span class="color-block color-red"></span>
            <span class="text">已销售</span>
          </div> -->
          <div class="item">
            <span class="color-block color-cancel"></span>
            <span class="text">已撤销</span>
          </div>
        </div>
        <div
          class="order-list"
          v-if="orderListFlag"
        >
          <ul v-if="orderList.length">
            <li
              class="order-item"
              @click="goOrderDetail(item.id)"
              v-for="item in orderList"
              :class="{'color-blue': item.examineStatus  ==1,
                   'color-green': (item.billStoType ==0),
                    'color-cancel': item.billStatus ==2
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
                <span class="status">订单状态: {{item.billStatus ==0 ? '未出票': item.billStatus ==1? '已出票':
                  item.billStatus ==2? '已取消': item.billStatus ==3? '超时自动取消': item.billStatus ==7?'(只出门票)':''
                  }}</span>
                <span class="type">订单类型: {{item.billType ==0?'团队预定':item.bookType ==1?'散客预定': item.bookType ==2?'在线预定':''}}</span>
              </div>
              <!--<div class="clear-fix">-->
              <!--<span class="entering" v-if="item.jump"  style="display: block;float:right" @click.stop="goEnter(item)">去录入</span>-->
              <!--</div>-->
              <div class="clear-fix handle">

                <!--<span class="idCard-list handle-item">-->
                <span
                  class="handle-item-left handle-item"
                  v-show="item.jump"
                  @click.stop="goTourist(item)"
                >
                  <span class="idCard-list">游客列表</span>
                </span>
                <span
                  class="handle-item-right handle-item"
                  v-show="item.jump"
                  @click.stop="goEnter(item)"
                >
                  <span class="entering">去录入</span>
                </span>
                <span
                  class="handle-item-none"
                  v-show="!item.jump"
                >

                </span>
              </div>

            </li>
          </ul>
          <div
            v-if="!orderList.length"
            class="no-result-wrapper"
          >
            <no-result title="抱歉，暂无搜索结果"></no-result>
          </div>
        </div>

      </div>
      <tab-bar :selected="selectedTabBar"></tab-bar>
    </div>
    <!--<div id="calendar-box" class="calendar-box" :class="{ 'calendar-show': calendarShow }">-->
    <!--<div class="calendar-handle background-base">-->
    <!--<a href="javascript:;" class="calendar-colse" @click="calendarColse">-->
    <!--<i class="iconfont icon-chahao"></i>-->
    <!--</a>-->
    <!--</div>-->
    <!--<div id="calendar"></div>-->
    <!--</div>-->
  </div>

</template>

<script>
import { Toast } from "mint-ui"
import TabBar from "@/base/tabbar/tabbar"
import VTop from "@/base/vtop/vtop"
import moment from "moment"
import NoResult from "@/base/no-result/no-result"
import { addDate } from "../../common/js/format"
const perpage = 1000
export default {
  name: "order-copy",
  data() {
    return {
      today: "",
      tomorrow: "",
      dayAfterTomorrow: "", //后天
      week: "",
      title: "订单列表",
      current: 1, //第几页
      orderList: [],
      orderListFlag: false,
      select_date: "", //sessionStorage的内容
      performDate: "",
      dataArray: [], //未格式化的日期格式
      formatDateList: [], //格式化的日期格式
      calendarShow: false,
      selectedTabBar: "order/copy",
      lastDate: "" //最后一个日期
    }
  },
  mounted() {
    let p = this
    // this.$nextTick(() =>{
    //   // $("#my-input").calendar({
    //   //   value: ['2019-04-17']
    //   // });
    //
    //
    //   $("#my-input").calendar({
    //     maxDate:'2019-04-20',
    //     onChange(){
    //       p.getOrderList()
    //     }
    //   });
    //   // $("#my-input").calendar("setValue", ["2019-04-17"]);  //设置日期
    // })
  },
  created() {
    this.select_date = sessionStorage.getItem("SET_DATE")
    this.today = moment().format("YYYY-MM-DD")
    this.tomorrow = addDate(new Date())
    this.dayAfterTomorrow = addDate(new Date(), 2)
    this.getDate()
    // if(this.select_date){
    //   $('#my-input').val(this.select_date);
    //   this.getOrderList(this.select_date)
    // }else{
    //   this.getOrderList(this.today)
    //   // this.getDate()    //根据日期查询订单列表
    // }

    // this.getDate()
  },
  methods: {
    /**
     *  去录入
     */
    goEnter(item) {
      this.$router.push({ name: "idCard-enter", params: { id: item.id } })
    },
    goTourist(item) {
      this.$router.push({ name: "idCard-list", params: { id: item.id } })
    },
    // /**
    //  *
    //  * /
    // getDate(){
    //   this.$http.get(`/wap/maxDay`).then(({ data: res }) => {
    //     if(res.code !== '200'){
    //       Toast(res.msg)
    //       return
    //     }
    //     this.dataArray = res.data
    //     if(this.dataArray.length){
    //       this.select_date =  sessionStorage.getItem('SET_DATE')
    //       if(this.select_date){
    //         this.performDate = this.select_date
    //       }else{
    //         this.performDate = this.dataArray[0]
    //       }
    //
    //       this.week =  new Date(this.performDate).getDay()              //这里获取星期几
    //
    //
    //
    //
    //       // sessionStorage.setItem('SET_DATE',this.performDate)
    //       this.formatDateList = this.dataArray.map(item => {
    //         return { date: item };
    //       })
    //       this.getOrderList(this.performDate)
    //     }else{
    //       this.performDate = '暂无游玩日期'
    //     }
    //
    //   }).catch((err)=>{
    //
    //   })
    // },
    getDate() {
      const that = this
      this.$http
        .get(`/wap/maxDay`)
        .then(({ data: res }) => {
          if (res.code !== "200") {
            Toast(res.msg)
            return
          }

          this.dataArray = res.data
          if (this.dataArray.length) {
            let dataArray = this.dataArray
            this.lastDate = dataArray[dataArray.length - 1]
            console.log(this.lastDate)
            this.select_date = sessionStorage.getItem("SET_DATE")
            if (this.select_date) {
              this.performDate = this.select_date
              $("#my-input").val(this.performDate)
            } else {
              this.performDate = this.today
              $("#my-input").val(this.performDate)
            }

            $("#my-input").calendar({
              // value:['2018-04-19'],
              maxDate: that.lastDate,
              dateFormat: "yyyy-mm-dd",
              onChange: function(p, values, displayValues) {
                sessionStorage.setItem("SET_DATE", values[0])
                that.getOrderList(values[0])
              }
            })
            // this.week =  new Date(this.performDate).getDay()              //这里获取星期几

            // sessionStorage.setItem('SET_DATE',this.performDate)
            this.formatDateList = this.dataArray.map(item => {
              return { date: item }
            })
            this.getOrderList(this.performDate)
          } else {
            // this.performDate = '暂无游玩日期'                   //不可能，不限考虑
          }
        })
        .catch(err => {
          Toast("服务器异常，请稍后再试")
        })
    },
    getOrderList(date) {
      // POST /wap/listOrders
      let data = {
        page: {
          current: this.current,
          size: perpage
        },
        date: date
      }
      this.$http
        .post(`/wap/listOrders`, data)
        .then(({ data: res }) => {
          if (res.code !== "200") {
            Toast(res.msg)
            this.orderListFlag = true
            return
          }
          this.orderList = res.data.records
          this.orderListFlag = true
        })
        .catch(err => {
          Toast("服务器异常，请稍后再试")
          this.orderListFlag = true
        })
    },
    shijianCK() {
      const p = this
      this.$http
        .get(`/wap/maxDay`)
        .then(({ data: res }) => {
          if (res.code === "200") {
            this.dataArray = res.data
            this.formatDateList = this.dataArray.map(item => {
              return { date: item }
            })
            this.calendarShow = true
            let data = this.formatDateList
            let options = {
              onClick: function(evl, date, price) {
                p.calendarShow = false
                p.performDate = date
                p.week = new Date(date).getDay()
                sessionStorage.setItem("SET_DATE", p.performDate)
                p.getOrderList(date)
              },
              optionsdays: data,
              monthnum: 2,
              selecteday: p.performDate
            }
            $("#calendar").calendar(options)
          }
        })
        .catch(() => {})
    },
    /**
     * 点击日期中插件中的叉号
     */
    calendarColse() {
      this.calendarShow = false
    },
    /**
     * 跳转到订单详情
     */
    goOrderDetail(id) {
      this.$router.push({ path: `/order-detail/${id}` })

      // .entering
      //  float: right;
      //border 1px solid #ddd
      //padding:10px 20px
      //display: block;
      //border-radius 5px;
    }
  },
  components: {
    TabBar,
    VTop,
    NoResult
  }
}
</script>

<style scoped lang="stylus"  rel="stylesheet/stylus">
.order-container {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #efeff4;

  .wrapper {
    height: calc(100% - 90px);
    overflow-x: hidden;
    overflow-y: auto;
    padding-bottom: 50px;

    .search-box-wrapper {
      display: flex;
      margin: 10px 10px;
      align-items: center;
      box-sizing: border-box;
      padding: 10px;
      height: 32px;
      background-color: #fff;
      border-radius: 8px;
      border: 1px solid #ddd;

      .icon-search {
        font-size: 14px;
        color: #222;
      }

      .box {
        // flex: 1
        // margin: 5px;
        // padding 5px;
        // line-height: 18px;
        // color: #666
        // font-size: 14px;
        margin: 5px;
        padding: 5px;
        line-height: 18px;
        color: #666;
        font-size: 14px;
      }

      .week {
        font-size: 14px;
        color: #666;
      }
    }

    .order-date {
      position: relative;
      margin: 10px;
      font-size: 14px;

      .my-input-date {
        width: 100%;
        height: 35px;
        border-radius: 20px;
        padding-left: 40px;
        box-sizing: border-box;
      }

      .icon-search {
        position: absolute;
        top: 9px;
        left: 12px;
      }
    }

    .order-status {
      display: flex;
      margin: 0 0.6rem;
      /* padding 10px 5px; */
      padding: 15px 0px;
      /* background-color :#fff; */
      /* border: 1px solid #ddd; */
      border-radius: 4px;

      .item {
        flex: 1;
        text-align: center;
        font-size: 14px;
        line-height: 30px;

        .color-block {
          display: inline-block;
          width: 15px;
          height: 15px;
        }

        .color-blue {
          /* background-color:#A5CBF7 */
          background-color: #b5d6ff;
        }

        .color-green {
          background-color: #84F329;
          /* background-color:#a9ffb4 */
        }

        .color-red {
          background-color: #FF00FF;
          /* background-color:#ffe4ac */
        }

        .color-cancel {
          /* background-color:#C6C3C6 */
          background-color: #c5c3c6;
        }

        .text {
          /* display block */
          display: inline-block;
          position: relative;
          top: -3px;
          color: #666;
        }
      }
    }

    .order-list {
      margin: 0 0.6rem;
      font-size: 0.65rem;
      /* color:#3d3d3b */
      color: #656565;

      .color-blue {
        /* background-color:#A5CBF7 */
        background-color: #b5d6ff;
      }

      .color-green {
        /* background-color:#84F329 */
        /* background-color:#a9ffb4 */
        background-color: #fff;
      }

      .color-red {
        background-color: #FF00FF;
        /* background-color:#ffe4ac */
      }

      .color-cancel {
        /* background-color:#C6C3C6 */
        background-color: #c5c3c6;
      }

      .order-item {
        padding: 0.5rem 0.7rem;
        /* padding :10px 15px; */
        border-radius: 5px;
        margin-bottom: 10px;

        .show-info {
          display: flex;
          justify-content: space-between;
          height: 30px;
          line-height: 30px;
        }

        .name {
          height: 30px;
          line-height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .order {
          display: flex;
          justify-content: space-between;
          height: 30px;
          line-height: 30px;
        }

        .handle {
          display: flex;
          /* margin-top 7px; */
          margin-top: 10px;
          /* margin-bottom 4px; */
          margin-bottom: 6px;

          .handle-item-none {
            flex: 1;
          }

          .handle-item {
            flex: 1;
            /* height 1.325rem; */
            /* line-height 1.325rem; */
            /* line-height 1.4rem; */
            height: 1.5rem;
            line-height: 1.5rem;
            // background linear-gradient(90deg, #2090d2, #1f98e1 50%, #2090d2);
            background-color: #1a9ef0;
            color: #fff;
            border-radius: 0.65rem;
            text-align: center;
          }

          .handle-item-left {
            margin-right: 4px;
          }

          .handle-item-right {
            margin-left: 4px;
          }
        }
      }

      .no-result-wrapper {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>

