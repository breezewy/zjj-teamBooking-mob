<template>
  <div class="foot-container">
    <div class="foot-item" @click="changePage(item)" v-for="(item,index) in tabbarDes" :key="index">
      <span v-show="item.page!=selected" style="display: block">
        <i class="foot-icon" :class="item.selfFont"></i>
        <span class="text" v-text="item.txt"></span>
      </span>
      <span v-show="item.page==selected" style="display: block">
        <i style="color:#1c9ae7" class="foot-icon" :class="item.selfFont"></i>
        <span class="text" style="color:#1c9ae7" v-text="item.txt"></span>
      </span>
    </div>
  </div>
</template>
<script type="text/javascript">
import TabBarItem from "./tab-item";
export default {
  components: {
    TabBarItem
  },
  props: ["selected"],
  methods: {
    changePage(item) {
      this.page = item.page;
      //点击跳转对应的页面
      this.$router.push("/" + item.page);
    }
  },
  data() {
    return {
      tabbarDes: [
        {
          txt: "首页",
          page: "travel/home",
          selfFont: "iconfont icon-home"
        },
        {
          txt: "预订",
          page: "travel/booking",
          selfFont: "iconfont icon-yudingzhongxin1"
        },
        {
          txt: "积分",
          page: "travel/score",
          selfFont: "iconfont icon-jifen1"
        },
        {
          txt: "订单",
          page: "travel/order-list",
          selfFont: "iconfont icon-icon"
        },
        {
          txt: "我的",
          page: "travel/my",
          selfFont: "iconfont icon-wode1"
        }
      ]
    };
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.foot-container {
  position: fixed;
  width: 100%;
  height: 50px;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  background-color: #fff;

  .foot-item {
    flex: 1;
    text-align: center;

    .foot-icon {
      display: block;
      position: relative;
      top: 6px;
      font-size: 18px;
      padding-bottom: 3px;
      color: #656565;
    }

    .text {
      font-size: 14px;
      display: block;
      margin-top: 8px;
      color: #656565;
    }
  }
}
</style>
