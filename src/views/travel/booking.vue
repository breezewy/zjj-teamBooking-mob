<template>
  <div>
    <div class="fix-start-copy-container">
      <header class="header">
        <h1>预定中心</h1>
      </header>
      <div class="wrapper">
        <div class="start-info">
          <div class="name">{{sysName}}</div>
          <div class="date-content clear-fix" @click="shijianCK">
            <p class="date">{{performDate}}</p>

            <span
              class="week"
            >星期{{week=='1'?'一':week=='2'?'二': week=='3'?'三': week=='4'?'四': week=='5'? '五': week=='6'?'六':week=='0'?'日':''}}</span>
            <span
              class="day"
            >{{performDate==today ? '今天': performDate== tomorrow?'明天': performDate== dayAfterTomorrow? '后天':''}}</span>
          </div>

          <div class="stroke-type clear-fix">
            <span class="stroke">行程类型</span>
            <span class="radio">
              <cube-radio-group
                v-model.number="routingType"
                :options="routingTypeSelect"
                :horizontal="true"
              />
            </span>
          </div>
          <div class="team-type" @click="_showTeamTypeList">
            <span class="team">团队类型</span>
            <span class="icon">{{teamTypeText}}</span>
          </div>
          <div class="team-type" >
            <span class="team">团号</span>
            <input type="tel"  maxlength="6" class="num" v-model.trim="num1">
            <span>+</span>
            <input type="tel"  maxlength="8" class="num" v-model.trim="num2">
          </div>
        </div>
        <div class="btn-search" @click="searchTicket()">
          <span class="go-search">搜索行程</span>
        </div>
        <team-list
          :teamTypeSelect="teamTypeSelect"
          :selected="teamType"
          @item="itemSelected"
          ref="teamlist"
        ></team-list>
        <tab-bar :selected="selectedTabBar"></tab-bar>
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
import { Toast } from "mint-ui";
import { addDate } from "../../common/js/format";
import moment from "moment";
import TeamList from "@/bases/teamlist/teamlist";
import TabBar from "@/bases/tab/travel-tab";
export default {
  name: "travelobserve",
  components: {
    TabBar,
    TeamList
  },
  data() {
    return {
      sysName: "",

      today: "",
      tomorrow: "",
      dayAfterTomorrow: "", //后天
      week: "", // 星期几
      selectedTabBar: "travel/booking",

      hasDate: true,
      calendarShow: false,
      formatDateList: [],
      performDate: "",
      filter: {},

      routingType: "", //行程类型
      routingTypeSelect: [
        { value: 1, label: "行程" },
        { value: 0, label: "加点" }
      ], //行程类型下拉框

      teamType: "",
      num1:"",
      num2:"",
      teamTypeText: "单选 >",
      teamTypeSelect: []
    };
  },
  created() {
    this.today = moment().format("YYYY-MM-DD");
    this.tomorrow = addDate(new Date());
    this.dayAfterTomorrow = addDate(new Date(), 2);
    this.filter = JSON.parse(sessionStorage.getItem("filter"));
    if (this.filter) {
      this.performDate = this.filter.performDate;
      this.week = new Date(this.performDate).getDay();
      this.teamTypeText = this.filter.teamTypeText;
      this.teamType = this.filter.teamType;
      this.routingType = this.filter.routingType;
    } else {
      this.getDate();
    }
    this.teamTypeInfo();
    this.getSysName();
  },
  methods: {
    getSysName() {
      this.$http
        .get(`/wap/sysName`)
        .then(({ data: res }) => {
          if (res.code !== "200") {
            Toast(res.msg);
            return;
          }
          this.sysName = res.data.name;
          console.log(res);
        })
        .catch(() => {});
    },
    /**
     *  搜索票
     */
    searchTicket() {
      if (this.routingType === "") {
        Toast("请选择行程类型");
        return;
      }
      if (!this.teamType) {
        Toast("请选择团队类型");
        return;
      }
      if(this.num1 === "" || this.num2 === ""){
        Toast("请输入团号");
        return;
      }
      let filter = {
        performDate: this.performDate,
        teamType: this.teamType,
        teamNo:this.num2 + '+' + this.num1,
        routingType: this.routingType,
        teamTypeText: this.teamTypeText,
        routingTypeText: this.routingType === 0 ? "加点" : "行程"
      };
      sessionStorage.setItem("filter", JSON.stringify(filter));
      this.$router.push({ path: "/travel/ticket-list" });
    },
    /**
     * 首次获取日期列表
     */
    getDate() {
      this.$http.get(`/wap/maxDay`).then(({ data: res }) => {
        if (res.code !== "200") {
          Toast(res.msg);
          return;
        }
        if (res.data.length) {
          this.hasDate = true;
          this.performDate = res.data[0];
          this.week = new Date(this.performDate).getDay();
        } else {
          this.hasDate = false;
          this.performDate = "暂无游玩日期";
        }
      });
    },
    /**
     * 选中某个团队类型
     */
    itemSelected(value, label) {
      this.teamType = value;
      this.teamTypeText = label;
    },
    /**
     *  选择日期
     */
    shijianCK() {
      const p = this;
      this.$http
        .get(`/wap/maxDay`)
        .then(({ data: res }) => {
          if (res.code !== "200") {
            Toast(res.msg);
            return;
          }
          let dataArray = res.data;
          this.formatDateList = dataArray.map(item => {
            return { date: item };
          });
          this.calendarShow = true;
          let data = this.formatDateList;
          let options = {
            onClick: function(evl, date, price) {
              p.calendarShow = false;
              p.performDate = date;
              p.week = new Date(date).getDay();
            },
            optionsdays: data,
            selecteday: p.performDate
          };
          $("#calendar").calendarSelf(options);
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
     * 获取团队类型信息
     */
    teamTypeInfo() {
      this.$http.get(`/wap/teamType`).then(({ data: res }) => {
        if (res.code !== "200") {
          Toast(res.msg);
          return;
        }
        let teams = res.data;
        let arr = [];
        for (var key in teams) {
          arr.push({ label: teams[key], value: key });
        }
        this.teamTypeSelect = arr;
      });
    },
    _showTeamTypeList() {
      this.$refs.teamlist.show();
    }
  }
};
</script>

<style lang="stylus"  rel="stylesheet/stylus">
.fix-start-copy-container {
  position: absolute;
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
    height: calc(100% - 90px);
    overflow-x: hidden;
    overflow-y: auto;

    .start-info {
      margin: 0.85rem 0.6rem 0.85rem 0.6rem;
      padding: 0.725rem 0.7rem;
      background-color: #fff;
      border-radius: 10px;

      .name {
        /* margin-top:10px; */
        /* margin-bottom :10px; */
        padding-bottom: 5px;
        font-size: 0.8rem;
        font-weight: bold;
        /* font-weight 500; */
        color: #4f4f4f;
        letter-spacing: 1px;
        border-bottom: 1px solid #efefef;
        /* text-align left */
        height: 1.75rem;
        line-height: 1.75rem;
      }

      .date-content {
        margin-top: 0.475rem;
        height: 44px;
        line-height: 44px;

        .date {
          font-size: 0.75rem;
          display: inline-block;
          color: #656565;
          position: relative;
          top: -0.15rem;
          font-weight: bold;
        }

        .day {
          float: right;
          margin-left: 30px;
          font-size: 0.65rem;
          color: #656565;
          font-weight: bold;
        }

        .week {
          float: right;
          margin-left: 25px;
          font-size: 0.65rem;
          color: #656565;
          font-weight: bold;
        }
      }

      .team-type {
        position: relative;
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;

        .team {
          font-size: 0.65rem;
          color: #656565;
          font-weight: bold;
        }
        .num{
          display:inline-block;
          width:4.5rem;
          border:1px solid #888;
          margin:5px 0;
          padding:3px 2px;
        }
        .num:focus{
          outline:none;
        }
        .icon {
          /* font-size :16px; */
          /* color: #8a8989 */
          font-size: 15px;
          color: #656565;
        }

        .iconfs {
          position: absolute;
          top: 0;
          right: 0;
        }
      }

      .stroke-type {
        font-size: 0.65rem;
        color: #656565;
        font-weight: bold;

        .stroke {
          float: left;
          position: relative;
          top: 12px;
          font-weight: bold;
        }

        .radio {
          display: block;
          float: right;
          font-size: 16px;

          .border-right-1px::after {
            border-right: none;
          }

          .cube-radio-group[data-horz='true'] {
            padding: 0;

            .cube-radio {
              padding-left: 10px;
              padding-right: 0;

              .cube-radio-label {
                color: #656565;
                font-weight: bold;
                font-size: 15px;
              }
            }
          }

          .cube-radio-group[data-horz='true']::after {
            border: none;
          }
        }
      }

      .search-btn {
        margin: 10px 0;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: #1c9ae7;
        text-align: center;
        border-radius: 5px;
        font-size: 16px;
        color: #fff;
      }
    }

    .team-contain {
      margin: 0 10px;
      background-color: #fff;
      border-radius: 10px;
      font-size: 18px;

      .title {
        font-size: 18px;
        font-weight: bold;
        color: #676767;
        line-height: 40px;
        margin-left: 20px;
      }

      .cube-radio-wrap {
        padding: 5px 0;

        .cube-radio-label {
          font-weight: bold;
          color: #666;
        }
      }
    }

    .btn-search {
      margin: 31px 0.6rem 70px 0.6rem;

      .go-search {
        display: block;
        width: 100%;
        margin: 0 auto;
        height: 2.575rem;
        line-height: 2.575rem;
        border-radius: 15px;
        text-align: center;
        color: #fff;
        // background: -webkit-linear-gradient(left, #199aeb , #1682c2); /* Safari 5.1 - 6.0 */
        // background: -o-linear-gradient(right, #199aeb, #1682c2); /* Opera 11.1 - 12.0 */
        // background: -moz-linear-gradient(right, #199aeb, #1682c2); /* Firefox 3.6 - 15 */
        // background: linear-gradient(to right, #199aeb , #1682c2); /* 标准的语法 */
        background-color: #1a9ef0;
      }
    }
  }
}
</style>
