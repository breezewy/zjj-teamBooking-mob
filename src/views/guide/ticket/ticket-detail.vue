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
          </div>
          <div class="info clear-fix">
            <span class="name">{{ticketDetail.performDate}}</span>
            <span class="seat">{{cityName}}</span>
          </div>
          <div class="detail clear-fix">
            <span class="show-place">{{ticketDetail.locationName}}</span>
            <span class="ticket-count">{{ticketDetail.performName}}</span>
          </div>
        </li>
      </ul>
      <div class="card">
        <div class="card-content">
          <div class="card-content-inner" style="padding: 5px 15px">
            <div class="teamNum">
              <span class="title">团号验证</span>
                <input
                  type="text"
                  v-model="teamNo"
                  class="teamNumInput"
                  placeholder="请输入团号"
                />
            </div>
            <div class="btn" @click="handleSearch">团号查询</div>
            <div class="teamInfo">
              <div>总人数：{{totalNum}}人</div>
            </div>
          </div>
        </div>
      </div>
      <div class="seat-list" v-show="isShowSeat">
        <ul>
          <li class="seat-item" v-for="(item,index) in detailRequestList" :key="index">
            <span class="seat-name">{{item.areaName}}</span>
            <span class="introduce"></span>
            <input
              type="number"
              v-model.number="item.count"
              class="input-count"
            />
          </li>
        </ul>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="card-content-inner">
            <div class="searchbar" style="margin-bottom: 10px;">
              <div class="search-input">
                <span class="icon iconfont icon-cx"></span>
                <input
                  type="text"
                  v-model="travelAgency"
                  @focus="focusTravel"
                  class="searchClient"
                  placeholder="输入旅行社名称"
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
        <a href="javascript:;" class="reverse" @click="reserve()">预订</a>
      </div>
    </div>
    <search
      v-if="isSearchShow"
      :placeholder="placeholdertype"
      :searchTitle="searchTitle"
      :searchtype="searchtype"
      @cancelboxmodal="cancelBoxModal"
      @searchBack="searchBack"
      @itemselected="itemSelect"
    ></search>
  </div>
</template>

<script>
import { Toast, Indicator, MessageBox } from "mint-ui";
import { isInteger } from "../../../utils/validation";
import Search from "../../../bases/search/search";
export default {
  name: "ticket-detail",
  components: {
    Search
  },
  data() {
    return {
      cityName:"" , //城市名
      guideinfo: {},
      guideId: "",
      performCodeList: [],
      seatInputCount: 0,
      ticketDetail: {},
      filter: {},
      performDate: "",
      detailRequestList: [], //座位详情
      isShowSeat: false,
      teamTypeText: "",
      routingTypeText: "",
      teamNo:"",  // 团号
      totalNum: 0, // 团号查询总人数 
      //后面添加的
      travelAgency: "",
      touristOrigin: "",
      copyTravelAgency: "",
      copyTouristOrigin: "",

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
      }
    };
  },
    // 监听团号变动，查询的总人数清空
  watch:{
    teamNo(value){
      this.totalNum = 0
    }
  },
  created() {
    this.filter = JSON.parse(sessionStorage.getItem("filter"));
    this.performDate = this.filter.performDate;
    this.teamTypeText = this.filter.teamTypeText;
    this.routingTypeText = this.filter.routingTypeText;
    this.teamType = this.filter.teamType; //团队类型
    this.routingType = this.filter.routingType;
    this.ticketDetail = JSON.parse(sessionStorage.getItem("ticketDetail"));
    if (!this.ticketDetail) {
      this.showSession(this.performDate);
    } else {
      this.performCode = this.ticketDetail.performCode;
      this.getPerformSeatDetail(this.performCode);
    }

    this.getUseInfo();
    this.getCityName();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getUseInfo() {
      this.$http.get(`/wap/guide/info`).then(({ data: res }) => {
        if (res.code !== "200") {
          this.$createToast({
            txt: res.msg,
            type: "txt"
          }).show();
          return;
        }
        this.guideInfo = res.data;
        this.guideId = res.data.id;
      });
    },
    showSession(date) {
      this.$http
        .get(`/wap/performPlan/${date}`)
        .then(({ data: res }) => {
          if (res.code !== "200") {
            Toast(res.msg);
            return;
          }
          let data = res.data;
          for (const value of data) {
            let performTime = value.performTime;
            if (performTime) {
              let timestamp1 = performTime.split("-")[0];
              let timestamp2 = performTime.split("-")[1];
              let formatTime1 = this.performDate + " " + timestamp1 + ":00";
              let formatTime2 = this.performDate + " " + timestamp2 + ":00";
              let date1 = new Date(formatTime1);
              let date2 = new Date(formatTime2);
              let formatDate1 = date1.getTime();
              let formatDate2 = date2.getTime();
              let leftTime = formatDate2 - formatDate1;
              var d, h, m, s;
              if (leftTime / 1000 >= 0) {
                d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
                h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
                m = Math.floor((leftTime / 1000 / 60) % 60);
                s = Math.floor((leftTime / 1000) % 60);
                if (h && m) {
                  value.intervalTime = `${h}小时${m}分`;
                } else if (h && !m) {
                  value.intervalTime = `${h}小时`;
                } else if (!h && m) {
                  value.intervalTime = `${m}分`;
                }
              }
            }
          }
          this.performCodeList = data;
        })
        .catch(() => {});
    },
    /**
     * 提交订单
     */
    reserve() {
      if(this.totalNum === 0){
        Toast("请先输入团号查询总人数");
        return;
      }
      let copyDetailRequestList = JSON.parse(
        JSON.stringify(this.detailRequestList)
      );
      let arr = [];
      for (const value of copyDetailRequestList) {
        //只有席位数大于0的时候，才会存入arr数组
        if (value.count > 0) {
          arr.push({
            areaCode: value.areaCode,
            areaName: value.areaName,
            count: value.count
          });
        }
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
      let isMoreThanZero = false;
      let arrCountSeat = [];
      for (const value of arr) {
        if (value.count > 0) {
          arrCountSeat.push({ value: value.count, name: value.areaName });
          isMoreThanZero = true;
        }
      }
      let total = 0
      arrCountSeat.forEach(item => {
        total += item.value
      })
      if (!isMoreThanZero) {
        Toast("席位至少有一个大于0");
        return;
      }
      if(total != this.totalNum) {
        Toast("行程单人数与预订人数不一致");
        return;
      }
      if (!this.travelAgency) {
        Toast("旅行社名称不能为空");
        return;
      }
      if (!this.touristOrigin) {
        Toast("客源地不能为空");
        return;
      }
      var htmls = `<div class><p style="line-height: 2">${this.performDate} ${
        this.ticketDetail.performTime
      }</p><p style="line-height: 2">${this.travel.name}</p>`;

      for (var item of arrCountSeat) {
        var str = `<p style="line-height: 2">${item.name}${item.value}人</p>`;
        htmls += str;
      }
      MessageBox.confirm("", {
        message: htmls,
        title: "下单信息"
      })
        .then(action => {
          if (action == "confirm") {
            //确认的回调
            let data = {
              guideId: this.guideId,
              travelId: this.travel.id, //旅行社id
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
                  // Toast(res.msg)
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
                  this.$router.push({ path: "/guide/order-list" });
                }, 1000);
              })
              .catch(() => {});
          }
        })
        .catch(err => {
          // if (err == 'cancel') {     //取消的回调
          //   console.log(2);
          // }
        });
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
    focusTravel() {
      this.copyTravelAgency = this.travelAgency;
      this.travelAgency = ""; //清空旅行社名称
      this.placeholdertype = "输入旅行社名称或拼音缩写";
      this.searchtype = "travel";
      this.searchTitle = "搜索旅行社";
      this.isSearchShow = true;
    },
    focusTourist() {
      this.copyTouristOrigin = this.touristOrigin;
      this.touristOrigin = ""; //清空客源地名称
      this.placeholdertype = "输入客源地";
      this.searchtype = "origin";
      this.searchTitle = "搜索客源地";
      this.isSearchShow = true;
    },
    searchBack() {
      if (this.copyTravelAgency) {
        this.travelAgency = this.copyTravelAgency;
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
      this.copyTouristOrigin = "";
      this.copyTravelAgency = "";
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
      } else {
        this.travelAgency = item.name;
        this.travel = item;
      }
    },
    handleSearch() {
      if(this.teamNo.length == 0 ){
         Toast('请先输入团号');
         return
      }
      this.$http.get(`/wap/getByTeam/${this.teamNo}`).then(res => {
        if (res.data.code !== "200") {
          Toast(res.data.msg);
          return;
        }
        this.totalNum = res.data.data
      })
    },
    // 获取城市名
    getCityName() {
      this.$http.get("/wap/sysAreaName").then(({ data: res }) => {
        if (res.code !== "200") {
          Toast(res.msg);
          return;
        }
        this.cityName = res.data.name;
      });
    }
  }
};
</script>

<style lang="stylus"  rel="stylesheet/stylus" >
@import '../../../assets/ticket-detail';
</style>
