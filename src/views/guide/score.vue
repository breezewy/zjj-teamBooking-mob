<template>
  <div class="score-container">
    <v-top :title="title"></v-top>
    <div class="wrapper">
      <div class="card">
        <h1>公告</h1>
        <span class="info">暂未开放，敬请期待</span>
      </div>
    </div>
    <tab-bar :selected="selectedTabBar"></tab-bar>
  </div>
</template>

<script>
import TabBar from "@/bases/tab/guide-tab";
import VTop from "@/bases/vtop/vtop";
export default {
  name: "score",
  components: {
    TabBar,
    VTop
  },
  data() {
    return {
      title: "积分商城", // head中我的
      selectedTabBar: "guide/score"
    };
  }
};
</script>

<style scoped lang="stylus"  rel="stylesheet/stylus">
.score-container {
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

    .card {
      margin: 35px 15px;
      padding: 10px;
      background-color: #fff;

      h1 {
        font-size: 0.75rem;
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #f5f5f5;
        color: #656565;
        font-weight: bold;
      }

      .info {
        font-size: 0.7rem;
        padding: 0 10px;
        height: 50px;
        line-height: 50px;
        color: #656565;
      }
    }
  }
}
</style>
