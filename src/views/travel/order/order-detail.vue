<template>
  <transition name="slide">
    <div class="order-detail-container">
      <header class="header">
        <h1>订单详情</h1>
        <i @click="back" class="cubeic-back"></i>
      </header>
      <div class="wrapper">
        <div class="order-info">
          <h1>订单信息</h1>
          <span class="item">订单编号：{{orders.id}}</span>
          <span class="item">订单明细编号：{{orders.billNo}}</span>
          <span class="item">导游：{{orders.guideName }}</span>
          <span class="item">游玩日期：{{orders.performDate}}</span>
          <span class="item">场次：{{orders.performTime}}</span>
          <span class="item">团队类型：{{orders.teamType | getTeamType}}</span>
          <span class="item">行程类型：{{orders.tripType==0 ? '行程':orders.tripType==1 ? '加点':''}}</span>
          <span
            class="item"
            v-show="orders.checkTime"
          >最晚核团时间：{{orders.performDate}} {{orders.checkTime}}:00</span>

          <cube-tip
            ref="tip"
            direction="bottom"
            :style="{top: orders.checkTime? '248px':'202px'}"
            style="left:30px;right:30px;
              z-index: 10;max-height:none"
          >{{orders.oldData}}</cube-tip>
        </div>
        <div class="order-info" style="margin-bottom: 80px">
          <h1>订单明细</h1>
          <span class="item scene">场次：{{orders.performTime}}</span>
          <div class="seat-detail" v-for="(item,index) in orderDetails" :key="index">
            <span class="item" style="color:red">座位区：{{item.areaName}}</span>
            <span class="item">预订人数：{{item.bookCount}}</span>
            <span class="item">核团人数：{{item.lastCount}}</span>
            <!--<span class="item">排位人数：{{item.arrangeCount}}</span>-->
            <span class="item">销售人数：{{item.saleCount}}</span>
          </div>
        </div>
        <div class="handle-contain" v-if="orders.check || (showBtn && orders.billStatus=='01')">
          <div class="handle-detail">
            <span class="bill btn" v-show="orders.check" @click="modify()">去核团</span>
            <span class="bill btn" @click="cancelOrder()" v-if="orders.billStatus=='01' && showBtn">取消订单</span>
          </div>
        </div>
      </div>
      <div class="popup" :class="{ 'popup-show': popupShow }">
        <div class="date-select">
          <span class="text">演出场次</span>
          <select class="select" v-model="performCode">
            <option
              v-for="(show,index) in performCodeSelect"
              :value="show.value"
              :key="index"
            >{{show.text}}</option>
          </select>
        </div>
        <div class="card">
          <div class="card-content">
            <div class="card-content-inner">
              <div class="list-block">
                <ul>
                  <li v-for="(item,index) in orderDetails" :key="index">
                    <div class="item-content">
                      <div class="item-media"></div>
                      <div class="item-inner">
                        <div class="item-title label">{{item.areaName}}</div>
                        <div class="item-input">
                          <input
                            type="text"
                            v-model.number="item.lastCount"
                            class="count"
                            placeholder="数量"
                          />
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
          <span @click="cancel" class="handle-btn reset-btn">取消</span>
          <span @click="updateHandle" class="handle-btn order-btn">更新核团</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { Toast, MessageBox } from "mint-ui";
export default {
  name: "t-order-detail",
  data() {
    return {
      title: "订单详情", // head中我的
      popupShow: false,
      orders: {},
      orderDetails: [],
      // cloneOrderDetails:[],     //克隆的订单详情数据
      copyInGetDetailInfo: [], //克隆的座位详情数据
      performCode: "00017945",
      performDate: "",
      performCodeSelect: [], //场次下拉框数据
      showBtn: true, //是否显示取消订单按钮
      checkTime:"",  //核团时间
      timestamp2: "",
      leftTime: "", //剩余核团时间
    };
  },
  created() {
    Promise.all([this.getTeamTypeSelect()]).then(() => {
      this.getOrderDetailInfo();
    });
  },
  methods: {
    /**
     *  获取团队类型select
     */
    getTeamTypeSelect() {
      let type = "teamType";
      return this.$http.get(`/wap/dict/get/${type}`).then(({ data: res }) => {
        if (res.code !== "200") {
          this.$createToast({
            txt: res.msg,
            type: "txt"
          }).show();
        }
        let data = res.data;
        // let arr = []
        // for(var key in data){
        //   arr.push({id:key , name: data[key] })
        // }
        this.teamTypeSelectData = data;
      });
    },
    back() {
      this.$router.go(-1);
    },
        /***
     *      取消订单
     */
    cancelOrder() {
      let id = this.$route.params.id;
      MessageBox({
        $type: "prompt",
        title: "请输入取消订单原因",
        message: " ",
        closeOnClickModal: false, //点击model背景层不关闭MessageBox
        showCancelButton: true, //显示取消按钮
        showInput: true
      }).then(({ value, action }) => {
        /* value 为填写的值，进行下一步操作*/
        // if(action =='confirm' && value =='888888'){
        if (action == "confirm") {
          this.$http
            .put(`/wap/cancel`, {
              cancelReason: value,
              id: id
            })
            .then(({ data: res }) => {
              if (res.code !== 200) {
                // this.getDataList()
                Toast(res.msg);
                return;
              }

              Toast("取消订单成功");
              setTimeout(() => {
                this.$router.push("/travel/order-list");
              }, 500);
            })
            .catch(() => {
              Toast("服务器异常，请稍后再试");
            });
        }
      });
    },
    getOrderDetailInfo() {
      let id = this.$route.params.id;
      this.$http.get(`/wap/order/${id}`).then(({ data: res }) => {
        if (res.code !== "200") {
          this.$createToast({
            txt: res.msg,
            type: "txt"
          }).show();
        }
        this.orders = res.data.orders;
        this.orderDetails = res.data.orderDetails;
        //已排位的时候，不显示取消订单按钮
        this.showBtn = res.data.orders.planSeatStatus === "01" ? true : false;
        for (const value of this.teamTypeSelectData) {
          if (value.dictValue == this.orders.teamType) {
            this.orders.teamTypeName = value.dictName;
          }
        }
        for (const value of orderDetails) {
          if (!value.lastCount) {
            value.lastCount = 0;
          }
        }

        this.checkTime = this.orders.checkTime;
        this.performDate = this.orders.performDate;

        let formatCheckTime = this.checkTime + ":00:00";
        let totalCheckTime = this.performDate + " " + formatCheckTime;

        let date = new Date(totalCheckTime);
        this.timestamp2 = date.getTime();
        var now = new Date().getTime();
        this.leftTime = this.timestamp2 - now;
      });
    },

    /**
     * 订单详情中的修改
     */
    modify() {
      if (this.orders.performDate) {
        this.performCode = this.orders.performCode;
        this.showSeesion(this.orders.performDate);
      }
      this.popupShow = true;
    },
    showSeesion(date) {
      this.$http
        .get(`/wap/performPlan/${date}`)
        .then(({ data: res }) => {
          if (res.code === "200") {
            let performCodeList = res.data;
            this.performCodeSelect = performCodeList.map(item => {
              return { text: item.performTime, value: item.performCode };
            });
          }
        })
        .catch(() => {});
    },

    update() {
      if (this.orders.performDate) {
        this.performCode = this.orders.performCode;
        this.showSeesion(this.orders.performDate);
      }
      setTimeout(() => {
        this.popupShow = true;
      }, 0);
    },
    nucleiGroup() {
      MessageBox.confirm("确定执行核团操作?").then(action => {
        if (action === "confirm") {
          let data = {
            orderId: this.orders.id
          };
          this.$http
            .put(`/wap/confirmOrder`, data)
            .then(({ data: res }) => {
              if (res.code !== "200") {
                MessageBox.alert(res.msg);
                return;
              }
              Toast("核团成功");
              setTimeout(() => {
                this.$router.push({ path: "/travel/order-list" });
              }, 700);
            })
            .catch(() => {});
        }
      });
    },
    //获取弹出框的
    cancel() {
      this.popupShow = false;
    },
    /**
     *  这是弹出框中的更新
     */
    updateHandle() {
      let copyDataOrderDetails = JSON.parse(JSON.stringify(this.orderDetails));
      let formatArr = [];
      for (const value of copyDataOrderDetails) {
        formatArr.push({
          areaCode: value.areaCode,
          areaName: value.areaName,
          count: value.lastCount,
          bookCount: value.bookCount
        });
      }
      let data = {
        detailRequestList: formatArr,
        orderId: this.orders.id,
        performCode: this.performCode
      };

      this.$http
        .put(`/wap/confirmOrder`, data)
        .then(({ data: res }) => {
          if (res.code !== "200") {
            MessageBox.alert(res.msg);
            return;
          }
          Toast("核团成功");
          setTimeout(() => {
            this.$router.push({ path: "/travel/order-list" });
          }, 700);
        })
        .catch(() => {});
    }
  },
  filters: {
    getTeamType: function(value) {
      switch (value) {
        case "101117":
          return "老年团";
          break;
        case "101113":
          return "成人团";
          break;
        case "101122":
          return "外宾团";
          break;
        case "101126":
          return "学生团";
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="stylus"  rel="stylesheet/stylus">
.popup {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #fff;
  bottom: -100%;
  left: 0;
  -webkit-transition: left 0.4s;
  transition: bottom 0.4s;
  z-index: 10000;

  .date-select {
    margin: 20px;
    align-items: center;
    padding: 0 30px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

    .text {
      width: 35%;
      display: inline-block;
    }

    .select {
      appearance: none;
      outline: none;
      box-sizing: border-box;
      border: none;
      background: 0 0;
      border-radius: 0;
      box-shadow: none;
      display: inline-block;
      padding-left: 20px;
      width: 55%;
      height: 40px;
      color: #3d4145;
      font-size: 16px;
      font-family: inherit;
    }
  }

  .card {
    position: relative;
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    margin: 8px 20px;
    font-size: 16px;
    color: #3d4145;

    .card-content {
      position: relative;

      .card-content-inner {
        padding: 5px 15px;
        position: relative;

        .list-block {
          margin: -15px;

          ul {
            padding: 20px 0;
            position: relative;

            li {
              box-sizing: border-box;

              .item-content {
                box-sizing: border-box;
                padding-left: 30px;
                height: 50px;
                line-height: 50px;

                .item-title {
                  float: left;
                  width: 40%;
                }

                .item-input {
                  position: relative;
                  float: left;
                  width: 60%;

                  .count {
                    outline: none;
                    height: 40px;
                    line-height: 40px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .handle {
    margin: 30px 10px 50px 10px;
    font-size: 16px;
    display: flex;
    justify-content: space-around;

    .handle-btn {
      display: block;
      width: 130px;
      height: 48px;
      line-height: 48px;
      background-color: #f6383a;
      color: #fff;
      border-radius: 4px;
      text-align: center;
      border: 1px solid #ddd;

      &.order-btn {
        background-color: #4cd964;
      }
    }
  }
}

.popup-show {
  bottom: 0;
}
</style>
<style lang="stylus"  rel="stylesheet/stylus">
.order-detail-container {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #efeff4;

  .header {
    position: relative;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #edf0f4;
    box-shadow: 0 1px 6px #ccc;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 5;

    h1 {
      font-size: 16px;
      font-weight: 700;
    }

    .cubeic-back {
      position: absolute;
      top: 0;
      left: 0;
      padding: 0 15px;
      color: #1c9ae7;
      font-size: 16px;
    }
  }

  .wrapper {
    height: calc(100% - 40px);
    overflow-x: hidde;
    overflow-y: auto;
    n;
    padding-bottom: 50px;

    .order-info {
      position: relative;
      font-size: 16px;
      padding: 10px;

      h1 {
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        font-weight: 600;
      }

      .item {
        display: block;
        padding-left: 10px;
        height: 40px;
        line-height: 40px;
        color: #666;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .scene {
        border-bottom: 1px solid #999;
      }

      .seat-detail {
        border: 1px solid #999;
        border-top: none;
        // .item:first-child
        // /*border-top:1px solid #999*/
      }
    }

    .handle-contain {
      position: fixed;
      width: 100%;
      height: 64px;
      bottom: 0;
      background-color: #fff;

      .handle-detail {
        display: flex;
        margin: 20px 10px;
        font-size: 14px;

        .btn {
          flex: 1;
          height: 27px;
          line-height: 27px;
          text-align: center;
          border: 1px solid #0894ec;
          border-radius: 0.25rem 0 0 0.25rem;
        }

        .update {
          border-right: none;
        }

        .nuclei {
          border-radius: 0 0.25rem 0.25rem 0;
        }

        .bill {
          border-radius: 0.25rem;
        }
      }
    }
  }
}
</style>

<style  lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
