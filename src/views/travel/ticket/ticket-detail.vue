<template>
  <div class="ticket-detail-container">
    <header class="header">
      <h1>
        票务详情
        <span style="font-size: 14px;">({{teamTypeText}} {{routingTypeText}} )</span>
      </h1>
      <i @click="back" class="cubeic-back"></i>
    </header>
    <div class="wrapper">
      <ul class="wrap-list">
        <li class="wrap-item">
          <div class="time-slot">
            <span
              class="start-time"
            >{{ticketDetail.performTime? ticketDetail.performTime.split('-')[0] :'' }}</span>
            <!-- <span class="line"></span>
            <span class="total">1小时</span>
            <span class="line"></span>
            <span
              class="end-time"
            >{{ticketDetail.performTime? ticketDetail.performTime.split('-')[1] :''}}</span> -->
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
          <li class="seat-item" v-for="(item,index) in detailRequestList" :key="index">
            <span class="seat-name">{{item.areaName}}</span>
            <span class="introduce"></span>
            <input type="number" v-model.number="item.count" class="input-count" />
          </li>
        </ul>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="card-content-inner">
            <div class="searchbar">
              <div class="search-input">
                <span class="icon iconfont icon-cx"></span>
                <input
                  type="text"
                  v-model="guideInfo"
                  @focus="focusGuide"
                  class="searchClient"
                  placeholder="输入导游名称或者手机号"
                />
              </div>
            </div>
            <div class="searchbar">
              <div class="search-input">
                <span class="icon iconfont icon-cx"></span>
                <input
                  type="text"
                  v-model="touristOrigin"
                  class="searchClient"
                  @focus="focusTourist"
                  placeholder="输入客源地"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="card-content-inner" style="padding: 5px 15px">
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
    <search
      v-if="isSearchShow"
      :placeholder="placeholdertype"
      :searchTitle="searchTitle"
      :searchtype="searchtype"
      @cancelboxmodal="cancelBoxModal"
      @itemselected="itemSelect"
      @searchBack="searchBack"
    ></search>
  </div>
</template>

<script>
import { Toast, Indicator, MessageBox } from "mint-ui";
import { isInteger } from "@/utils/validation";
import Search from "@/bases/search/search";
export default {
  name: "t-ticket-detail",
  components: {
    Search
  },
  data() {
    return {
      travelInfo: {},
      travelInfoId: "", //旅行社id

      teamNo:"",//团号
      performCodeList: [],
      seatInputCount: 0,
      ticketDetail: {},
      filter: {},
      performDate: "",
      detailRequestList: [], //座位详情
      isShowSeat: false,
      teamTypeText: "",
      routingTypeText: "",
      //后面添加的
      guideInfo: "", //导游信息
      touristOrigin: "",
      copyGuideInfo: "", //复制的导游字段
      copyTouristOrigin: "", //复制的客源地字段

      remark: "",
      isSearchShow: false,
      area: {
        //客源地
        areaCode: "",
        areaName: ""
      },

      travel: {
        //旅行社
        id: "",
        name: ""
      },

      guide: {
        id: "",
        name: ""
      }
    };
  },
  created() {
    this.filter = JSON.parse(sessionStorage.getItem("filter"));
    this.performDate = this.filter.performDate;
    this.teamTypeText = this.filter.teamTypeText;
    this.routingTypeText = this.filter.routingTypeText;
    this.teamType = this.filter.teamType; //团队类型
    this.teamNo = this.filter.teamNo;
    this.routingType = this.filter.routingType;

    this.ticketDetail = JSON.parse(sessionStorage.getItem("ticketDetail"));
    if (!this.ticketDetail) {
      this.showSession(this.performDate);
    } else {
      this.performCode = this.ticketDetail.performCode;
      this.getPerformSeatDetail(this.performCode);
    }

    this.getTravelInfo();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getTravelInfo() {
      this.$http
        .get(`/wap/travel/info`)
        .then(({ data: res }) => {
          if (res.code !== "200") {
            Toast(res.msg);
            return;
          }
          this.travelInfo = res.data;
          this.travelInfoId = res.data.id;
        })
        .catch(() => {});
    },
    showSession(date) {
      this.$http
        .get(`/wap/performPlan/${date}`)
        .then(({ data: res }) => {
          if (res.code !== "200") {
            return;
          }
          this.performCodeList = res.data;
        })
        .catch(() => {});
    },
    /**
     * 提交订单
     */
    reserve() {
      let copyDetailRequestList = JSON.parse(
        JSON.stringify(this.detailRequestList)
      );
      let arr = [];
      for (const value of copyDetailRequestList) {
        arr.push({
          areaCode: value.areaCode,
          areaName: value.areaName,
          count: value.count
        });
      }

      // 游玩日期  ？？？、
      if (!this.teamType) {
        Toast("团队类型不能为空");
        return;
      }
      if (this.routingType === "") {
        Toast("行程类型不能为空");
        return;
      }
      if (!this.performCode) {
        Toast("演出场次不能为空");
        return;
      }
      if (!this.detailRequestList.length) {
        Toast("该演出场次下没有席位，不能下单");
        return;
      }
      if(this.teamNo === ""){
        Toast("团号不能为空");
        return;
      }
      // for (const value of arr) {
      //   if (!isInteger(value.count)) {
      //     Toast("席位不能为空且都为整数");
      //     return;
      //   }
      // }

      let isMoreThanZero = false;

      let arrCountSeat = [];
      for (const value of arr) {
        if (value.count > 0) {
          arrCountSeat.push({ value: value.count, name: value.areaName });
          isMoreThanZero = true;
        }
      }

      if (!isMoreThanZero) {
        Toast("席位至少有一个大于0");
        return;
      }
      if (!this.guideInfo) {
        Toast("导游信息不能为空");
        return;
      }
      if (!this.touristOrigin) {
        Toast("客源地不能为空");
        return;
      }

      var htmls = `<div class><p style="line-height: 2">${this.performDate} ${
        this.ticketDetail.performTime
      }</p><p style="line-height: 2">导游名称：${this.guide.name}</p>`;

      for (var item of arrCountSeat) {
        var str = `<p style="line-height: 2">${item.name}${item.value}人</p>`;
        htmls += str;
      }

      MessageBox.confirm("", {
        message: htmls,
        title: "下单信息"
      })
        .then(action => {
          let data = {
            travelId: this.travelInfoId, //旅行社id
            guideId: this.guide.id,
            areaCode: this.area.areaCode, //客源地
            performDate: this.performDate, //游玩日期
            teamType: this.teamType, //团队类型
            teamNo:this.teamNo,
            routingType: this.routingType, //行程类型
            performCode: this.performCode,
            detailRequestList: arr, //席位总数组
            remark: this.remark //备注
          };
          Indicator.open({
            text: "加载中...",
            spinnerType: "snake"
          });
          this.$http
            .post("/wap/downOrder", data)
            .then(({ data: res }) => {
              Indicator.close();
              if (res.code !== "200") {
                MessageBox({
                  title: " ",
                  message: res.msg,
                  closeOnClickModal: false
                });
                return;
              }
              sessionStorage.setItem("SET_DATE", this.performDate);
              Toast("下单成功");
              setTimeout(() => {
                this.$router.push({ path: "/travel/order-list" });
              }, 1000);
            })
            .catch(() => {});
        })
        .catch(err => {});
    },

    /**
     * 获取座位席详情信息
     */
    getPerformSeatDetail(code) {
      this.$http.get(`/wap/performSeatArea/${code}`).then(({ data: res }) => {
        if (res.code !== "200") {
          Toast(res.msg);
          return;
        }
        let items = res.data;
        if (items.length) {
          this.isShowSeat = true;
        } else {
          this.isShowSeat = false;
        }
        for (const value of items) {
          value.count = 0;
        }
        this.detailRequestList = items;
      });
    },
    focusGuide() {
      this.copyGuideInfo = this.guideInfo;
      this.guideInfo = ""; //清空旅行社名称
      this.placeholdertype = "输入导游名称或者手机号";
      this.searchtype = "guide";
      this.searchTitle = "搜素导游";
      this.isSearchShow = true;
    },
    focusTourist() {
      this.copyTouristOrigin = this.touristOrigin;
      this.touristOrigin = ""; //清空客源地名称
      this.placeholdertype = "输入客源地";
      this.searchtype = "origin";
      this.searchTitle = "搜素客源地";
      this.isSearchShow = true;
    },
    searchBack() {
      if (this.copyGuideInfo) {
        this.guideInfo = this.copyGuideInfo;
      }
      if (this.copyTouristOrigin) {
        this.touristOrigin = this.copyTouristOrigin;
      }

      this.isSearchShow = false;
    },
    /**
     * 点击搜索框的取消按钮
     */
    cancelBoxModal() {
      this.isSearchShow = false;
    },
    /**
     * 选中的suggest列表中的某一项
     */
    itemSelect(item) {
      this.isSearchShow = false;
      if (item.areaName) {
        this.touristOrigin = item.areaName;
        this.area = item;
      } else if (item.certNo) {
        this.guideInfo = item.name;
        this.guide = item;
      } else {
        this.travelAgency = item.name;
        this.travel = item;
      }
    }
  }
};
</script>

<style lang="stylus"  rel="stylesheet/stylus" >
@import '../../../assets/ticket-detail';
</style>
