<template>
  <div>
    <div class="order-container">
      <v-top :title="title"></v-top>
      <div class="wrapper">
        <div class="order-date">
          <i class="iconfont icon-cx icon-search"></i>
          <input id="my-input" class="my-input-date" type="text" placeholder="游玩日期" />
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
        <div class="order-list" v-if="orderListFlag">
          <ul v-if="orderList.length">
            <li
              class="order-item"
              @click="goOrderDetail(item.id)"
              v-for="(item,index) in orderList"
              :class="{'color-blue': item.examineStatus  ==1,
                   'color-green': (item.billStoType ==0),
                    'color-cancel': item.billStatus ==2
                }"
              :key="index"
            >
              <div class="show-info">
                <span class="date">{{item.performDate}}</span>
                <span class="show">场次：{{item.performTime}}</span>
              </div>
              <div class="show-info">
                <span>导游：{{item.guideName }}</span>
                <span>人数：{{item.total }}</span>
              </div>

              <div class="order">
                <span class="status">
                  订单状态: {{item.billStatus ==0 ? '未出票': item.billStatus ==1? '已出票':
                  item.billStatus ==2? '已取消': item.billStatus ==3? '超时自动取消': item.billStatus ==7?'(只出门票)':''
                  }}
                </span>
                <span
                  class="type"
                >订单类型: {{item.billType ==0?'团队预订':item.bookType ==1?'散客预订': item.bookType ==2?'在线预订':''}}</span>
              </div>
              <div class="clear-fix handle">
                <span
                  class="handle-item-left handle-item"
                  @click.stop="goTourist(item)"
                >
                  <span class="idCard-list">确认游客</span>
                </span>
                <!-- <span
                  class="handle-item-right handle-item"
                  @click.stop="goEnter(item)"
                >
                  <span class="entering">确认游客</span>
                </span> -->
                <span class="handle-item-none" v-show="!item.jump"></span>
              </div>
            </li>
          </ul>
          <div v-if="!orderList.length" class="no-result-wrapper">
            <no-result title="抱歉，暂无搜索结果"></no-result>
          </div>
        </div>
      </div>
      <tab-bar :selected="selectedTabBar"></tab-bar>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import TabBar from "@/bases/tab/travel-tab";
import VTop from "@/bases/vtop/vtop";
import NoResult from "@/bases/no-result/no-result";
import moment from "moment";
import { addDate } from "../../../common/js/format";
const perpage = 1000;
export default {
  name: "travelorder",
  data() {
    return {
      sysName: "",

      today: "",
      tomorrow: "",
      dayAfterTomorrow: "", //后天
      week: "",
      title: "订单列表",
      current: 1, //第几页
      orderList: [],
      select_date: "", //sessionStorage的内容
      performDate: "",
      dataArray: [], //未格式化的日期格式
      formatDateList: [], //格式化的日期格式
      calendarShow: false,
      selectedTabBar: "travel/order-list",
      lastDate: "", //最后一个日期
      orderListFlag: false
    };
  },
  mounted() {
    let p = this;
  },
  created() {
    this.select_date = sessionStorage.getItem("SET_DATE");
    this.today = moment().format("YYYY-MM-DD");
    this.tomorrow = addDate(new Date());
    this.dayAfterTomorrow = addDate(new Date(), 2);
    this.getDate();
  },
  methods: {
    /**
     *  实名录入
     */
    goEnter(item) {
      this.$router.push({ name: "guide-id-enterr", params: { id: item.id } });
    },
    goTourist(item) {
      this.$router.push({ name: "guide-id-list", params: { id: item.id } });
    },

    getDate() {
      const that = this;
      this.$http
        .get(`/wap/maxDay`)
        .then(({ data: res }) => {
          if (res.code !== "200") {
            Toast(res.msg);
            return;
          }

          this.dataArray = res.data;
          if (this.dataArray.length) {
            let dataArray = this.dataArray;
            this.lastDate = dataArray[dataArray.length - 1];
            this.select_date = sessionStorage.getItem("SET_DATE");
            if (this.select_date) {
              this.performDate = this.select_date;
              $("#my-input").val(this.performDate);
            } else {
              this.performDate = this.today;
              $("#my-input").val(this.performDate);
            }

            $("#my-input").calendar({
              // value:['2018-04-19'],
              maxDate: that.lastDate,
              dateFormat: "yyyy-mm-dd",
              onChange: function(p, values, displayValues) {
                sessionStorage.setItem("SET_DATE", values[0]);
                that.getOrderList(values[0]);
              }
            });
            // this.week =  new Date(this.performDate).getDay()              //这里获取星期几

            // sessionStorage.setItem('SET_DATE',this.performDate)
            this.formatDateList = this.dataArray.map(item => {
              return { date: item };
            });
            this.getOrderList(this.performDate);
          } else {
            // this.performDate = '暂无游玩日期'                   //不可能，不限考虑
          }
        })
        .catch(err => {});
    },
    getOrderList(date) {
      // POST /wap/listOrders
      let data = {
        page: {
          current: this.current,
          size: perpage
        },
        date: date
      };
      this.$http
        .post(`/wap/listOrders`, data)
        .then(({ data: res }) => {
          if (res.code !== "200") {
            Toast(res.msg);
            this.orderListFlag = true;
            return;
          }
          this.orderList = res.data.records;
          this.orderListFlag = true;
        })
        .catch(err => {
          this.orderListFlag = true;
          Toast("服务器异常，请稍后再试");
        });
    },
    shijianCK() {
      const p = this;
      this.$http
        .get(`/wap/maxDay`)
        .then(({ data: res }) => {
          if (res.code === "200") {
            this.dataArray = res.data;
            this.formatDateList = this.dataArray.map(item => {
              return { date: item };
            });
            this.calendarShow = true;
            let data = this.formatDateList;
            let options = {
              onClick: function(evl, date, price) {
                p.calendarShow = false;
                p.performDate = date;
                p.week = new Date(date).getDay();
                sessionStorage.setItem("SET_DATE", p.performDate);
                p.getOrderList(date);
              },
              optionsdays: data,
              monthnum: 2,
              selecteday: p.performDate
            };
            $("#calendar").calendar(options);
          }
        })
        .catch(() => {});
    },
    /**
     * 点击日期中插件中的叉号
     */
    calendarColse() {
      this.calendarShow = false;
    },
    /**
     * 跳转到订单详情
     */
    goOrderDetail(id) {
      this.$router.push({ path: `/travel/order-detail/${id}` });
    }
  },
  components: {
    TabBar,
    VTop,
    NoResult
  }
};
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
          // background-color:#ffe4ac
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
          margin-top: 7px;
          margin-bottom: 4px;

          .handle-item {
            flex: 1;
            height: 1.325rem;
            /* line-height 1.325rem; */
            line-height: 1.4rem;
            background-color: #1a9ef0;
            // background linear-gradient(90deg, #2090d2, #1f98e1 50%, #2090d2);
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

