<template>
  <transition name="slide">
    <div class="order-detail-container">
      <header class="header">
        <h1>订单详情</h1>
        <i
          @click="back"
          class="cubeic-back"
        ></i>
      </header>
      <div class="wrapper">
        <div class="order-info">
          <h1>订单信息</h1>
          <span class="item">订单编号：{{orders.id}}</span>
          <span class="item">线下订单号：{{orders.billNo}}</span>
          <span class="item">旅行社：{{orders.travelName }}</span>
          <span class="item">游玩日期：{{orders.performDate}}</span>
          <span class="item">场次：{{orders.performTime}}</span>
          <span class="item">团队类型：{{orders.teamType | getTeamType(value)}}</span>
          <!--<span class="item"> 证件类型：导游证 </span>-->
          <span class="item">行程类型：{{orders.tripType==0 ? '行程':orders.tripType==1 ? '加点':''}}</span>
          <span
            class="item"
            v-show="orders.checkTime"
          >最晚核团时间：{{orders.performDate}} {{orders.checkTime}}:00</span>
          <!--<span class="item">退单原因：</span>-->
          <!-- <span
            class="item"
            @click="$refs.tip.show()"
            style="color:#1c9ae7"
          >
            原始信息：{{orders.oldData}}
          </span> -->
          <cube-tip
            ref="tip"
            direction="bottom"
            :style="{top: orders.checkTime? '248px':'202px'}"
            style="left:30px;right:30px;
            z-index: 10;max-height: none"
          >{{orders.oldData}}</cube-tip>

        </div>
        <div
          class="order-info"
          style="margin-bottom: 80px;"
        >
          <h1>订单明细</h1>
          <span class="item scene">场次：{{orders.performTime}}</span>
          <div
            class="seat-detail"
            v-for="item in orderDetails"
          >
            <span
              class="item"
              style="color:red"
            >座位区：{{item.areaName}}</span>
            <span class="item">预定人数：{{item.bookCount}}</span>
            <span class="item">核团人数：{{item.lastCount}}</span>
            <!--<span class="item">排位人数：{{item.arrangeCount}}</span>-->
            <span class="item">销售人数：{{item.saleCount}}</span>
          </div>

        </div>
        <div
          class="handle-contain"
          v-show="orders.check"
        >
          <!--<div class="handle-contain" >-->
          <!--<div class="handle-detail" v-if="orders.billStatus=='01'">-->
          <div class="handle-detail">
            <span
              class="bill btn"
              @click="modify()"
            >去核团</span>
            <span
              class="bill btn"
              @click="cancelOrder()"
            >取消订单</span>
            <!--<span class="nuclei btn" @click="nucleiGroup()">核团</span>-->
          </div>

        </div>
        <!--<div class="handle-contain"  v-if="orders.billStatus=='04'">-->
        <!--<div class="handle-detail">-->
        <!--<a class="bill btn" :href="'http://receipt.51dmq.com/receipt/index.htm?bookBillNo='+orders.billNo">开取发票</a>-->
        <!--</div>-->
        <!--</div>-->

      </div>
      <div
        class="popup"
        :class="{ 'popup-show': popupShow }"
      >
        <div class="date-select clear-fix">
          <span class="text">演出场次</span>
          <!--<select class="select" name="" id="">-->
          <!--<option value="">19:30-20:30</option>-->
          <!--</select>-->
          <select
            class="select"
            v-model="performCode"
          >
            <option
              v-for="show in performCodeSelect"
              :value="show.value"
            >
              {{show.text}}
            </option>
          </select>
        </div>
        <div class="card">
          <div class="card-content">
            <div class="card-content-inner">
              <div class="list-block">
                <ul>
                  <li v-for="item in orderDetails">
                    <div class="item-content">
                      <div class="item-media"></div>
                      <div class="item-inner clear-fix">
                        <div class="item-title label">{{item.areaName? item.areaName.split('-')[1] :''}}</div>
                        <div class="item-input">
                          <input
                            type="text"
                            v-model.number="item.lastCount"
                            class="count"
                            placeholder="数量"
                          >
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
          <span
            @click="cancel"
            class="handle-btn reset-btn"
          >取消</span>
          <span
            @click="updateHandle"
            class="handle-btn order-btn"
          >更新核团</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { Toast, MessageBox } from "mint-ui"
import { isInteger } from "@/utils/validation"
export default {
  name: "order-detail",
  data() {
    return {
      title: "订单详情", // head中我的
      popupShow: false,
      orders: {},
      orderDetails: [],
      teamTypeSelectData: [], //团队类型下拉框
      // cloneOrderDetails:[],     //克隆的订单详情数据
      copyInGetDetailInfo: [], //克隆的座位详情数据
      performCode: "00017945",
      performCodeSelect: [], //场次下拉框数据
      leftTime: "", //剩余核团时间
      performDate: "",
      checkTime: "", //核团时间
      timestamp2: ""
    }
  },
  created() {
    // if(this.$route.params.heId==='111111'){
    //   this.popupShow = true
    // }
    Promise.all([this.getTeamTypeSelect()]).then(() => {
      this.getOrderDetailInfo()
    })
  },
  // watch:{
  //   leftTime(){
  //       let formatCheckTime = this.checkTime+':00:00'
  //       let totalCheckTime = this.performDate+' '+formatCheckTime
  //       let date = new Date(totalCheckTime);
  //       this.timestamp2 = date.getTime()
  //       var now = new Date().getTime();
  //       let count = this.timestamp2-now;
  //       console.log(count)
  //       this.leftTime = count
  //       // return count
  //
  //   }
  // },
  methods: {
    back() {
      this.$router.go(-1)
    },
    /***
     *      取消订单
     */
    cancelOrder() {
      let id = this.$route.params.id
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
              console.log(res)
              if (res.code !== "200") {
                // this.getDataList()
                Toast(res.msg)
                return
              }

              Toast("取消订单成功")
              setTimeout(() => {
                this.$router.push("/order/copy")
              }, 500)
            })
            .catch(() => {
              Toast("服务器异常，请稍后再试")
            })
        }
      })

      // MessageBox.confirm('确定取消订单吗?').then(action => {
      // if(action ==='confirm'){
      //   console.log('afdas')
      // let data= {
      //   orderId: this.orders.id
      // };
      // this.$http.put(`/wap/confirmOrder`,data
      // ).then(({ data: res }) => {
      //   if(res.code !=='200'){
      //     MessageBox.alert(res.msg)
      //     return
      //   }
      //   Toast('核团成功')
      //   setTimeout(() =>{
      //     this.$router.push({path:'/order'})
      //   },700)
      //
      //
      // }).catch(() => {
      // })
      // }
      // });
    },
    /**
     *  获取团队类型select
     */
    getTeamTypeSelect() {
      let type = "teamType"
      return this.$http.get(`/wap/dict/get/${type}`).then(({ data: res }) => {
        if (res.code !== "200") {
          this.$createToast({
            txt: res.msg,
            type: "txt"
          }).show()
        }
        let data = res.data
        console.log(data)
        // let arr = []
        // for(var key in data){
        //   arr.push({id:key , name: data[key] })
        // }
        this.teamTypeSelectData = data
      })
    },
    getOrderDetailInfo() {
      let id = this.$route.params.id
      this.$http.get(`/wap/order/${id}`).then(({ data: res }) => {
        if (res.code !== "200") {
          this.$createToast({
            txt: res.msg,
            type: "txt"
          }).show()
        }
        this.orders = res.data.orders
        for (const value of this.teamTypeSelectData) {
          if (value.dictValue == this.orders.teamType) {
            this.orders.teamTypeName = value.dictName
          }
        }
        console.log(this.orders)

        let orderDetails = res.data.orderDetails
        for (const value of orderDetails) {
          if (!value.lastCount) {
            value.lastCount = 0
          }
        }

        this.orderDetails = orderDetails
        this.checkTime = this.orders.checkTime
        this.performDate = this.orders.performDate

        let formatCheckTime = this.checkTime + ":00:00"
        let totalCheckTime = this.performDate + " " + formatCheckTime

        let date = new Date(totalCheckTime)
        this.timestamp2 = date.getTime()
        var now = new Date().getTime()
        this.leftTime = this.timestamp2 - now
      })
    },

    /**
     * 订单详情中的修改
     */
    modify() {
      // let formatCheckTime = this.checkTime+':00:00'
      // let totalCheckTime = this.performDate+' '+formatCheckTime
      // let date = new Date(totalCheckTime);
      // this.timestamp2 = date.getTime()
      // var now = new Date().getTime();
      // let count = this.timestamp2-now;
      // this.leftTime = count
      // console.log(this.leftTime)
      // if(this.leftTime/1000<=0){
      //   Toast('已超过核团时间')
      //   return
      // }
      if (this.orders.performDate) {
        this.performCode = this.orders.performCode
        this.showSeesion(this.orders.performDate)
      }
      this.popupShow = true
    },
    showSeesion(date) {
      this.$http
        .get(`/wap/performPlan/${date}`)
        .then(({ data: res }) => {
          if (res.code !== "200") {
            Toast(res.msg)
            return
          }

          let performCodeList = res.data
          this.performCodeSelect = performCodeList.map(item => {
            return { text: item.performTime, value: item.performCode }
          })
        })
        .catch(() => {})
    },

    update() {
      if (this.orders.performDate) {
        this.performCode = this.orders.performCode
        this.showSeesion(this.orders.performDate)
      }
      setTimeout(() => {
        this.popupShow = true
      }, 0)
    },
    // nucleiGroup(){
    //   MessageBox.confirm('确定执行核团操作?').then(action => {
    //     if(action ==='confirm'){
    //       let data= {
    //         orderId: this.orders.id
    //       };
    //       this.$http.put(`/wap/confirmOrder`,data
    //         ).then(({ data: res }) => {
    //         if(res.code !=='200'){
    //           MessageBox.alert(res.msg)
    //           return
    //         }
    //         Toast('核团成功')
    //         setTimeout(() =>{
    //           this.$router.push({path:'/order/copy'})
    //         },700)
    //
    //
    //       }).catch(() => {
    //       })
    //     }
    //   });
    //
    //
    //
    // },
    //获取弹出框的
    cancel() {
      this.popupShow = false
    },
    /**
     *  这是弹出框中的更新
     */
    updateHandle() {
      let copyDataOrderDetails = JSON.parse(JSON.stringify(this.orderDetails))
      let formatArr = []
      for (const value of copyDataOrderDetails) {
        formatArr.push({
          areaCode: value.areaCode,
          areaName: value.areaName,
          count: value.lastCount,
          bookCount: value.bookCount
        })
      }

      for (const value of formatArr) {
        if (!isInteger(value.count)) {
          Toast("席位不能为空且都为整数")
          return
        }
      }
      let isMoreThanZero = false

      for (const value of formatArr) {
        if (value.count > 0) {
          isMoreThanZero = true
        }
      }

      if (!isMoreThanZero) {
        Toast("席位至少有一个大于0")
        return
      }

      let htmls =
        "请先确认人数，如有变动请先修改以上信息再进行核团，核团后将不可再次修改，是否确定？"
      MessageBox.confirm("", {
        message: htmls,
        title: "下单信息"
      })
        .then(action => {
          if (action == "confirm") {
            //确认的回调
            let data = {
              detailRequestList: formatArr,
              orderId: this.orders.id,
              performCode: this.performCode
            }
            this.$http
              .put(`/wap/confirmOrder`, data)
              .then(({ data: res }) => {
                if (res.code !== "200") {
                  MessageBox({
                    title: "提示",
                    message: res.msg,
                    closeOnClickModal: false
                  })
                  return
                }
                Toast("核团成功")
                setTimeout(() => {
                  this.$router.push({ path: "/order/copy" })
                }, 700)
              })
              .catch(() => {})
          }
        })
        .catch(err => {})
    }
  },
  filters: {
    getTeamType: function(value) {
      if (value === "101117") {
        return "老年团"
      } else if (value === "101113") {
        return "成人团"
      } else if (value === "101122") {
        return "外宾团"
      } else if (value === "101126") {
        return "学生团"
      }
    }
  }
}
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
    padding: 0 15px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

    .text {
      width: 43%;
      float: left;
    }

    .select {
      float: right;
      appearance: none;
      outline: none;
      box-sizing: border-box;
      border: none;
      background: 0 0;
      border-radius: 0;
      box-shadow: none;
      padding-left: 20px;
      padding-right: 20px;
      height: 40px;
      color: #3d4145;
      font-size: 16px;
      font-family: inherit;
      position: relative;
      top: 8px;
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
                padding-left: 15px;
                height: 50px;
                line-height: 50px;
                font-size: 16px;

                .item-title {
                  float: left;
                }

                .item-input {
                  position: relative;
                  float: right;
                  width: 115px;

                  .count {
                    width: 100%;
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
        /* background-color :#4cd964 */
        background-color: #1c9ae7;
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
      padding: 10px;
      font-size: 16px;

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
          margin: 0 10px;
          box-sizing: border-box;
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
