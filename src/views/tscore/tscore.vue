<template>
      <div class="travel-score-container">
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
  import TabBar from '@/base/travelTabBar/travelTabBar'
  import VTop from '@/base/vtop/vtop'
  export default {
    name: "tscore",
    components:{
      TabBar,
      VTop
    },
    data(){
      return {
        title: '积分商城',      // head中我的
        selectedTabBar:'travel-score'
      }
    },


  };
</script>

<style scoped lang="stylus"  rel="stylesheet/stylus">
  .travel-score-container
    position: absolute
    z-index: 10
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #efeff4
    .wrapper
      height: calc(100% - 90px);
      overflow-x: hidden;
      overflow-y: auto;
      padding-bottom 50px;
      .card
        margin: 35px 15px;
        padding 10px;
        background-color:#fff
        color:#666
        h1
         font-size 16px;
         padding 0 10px
         height 40px;
         line-height :40px
         border-bottom :1px solid #f5f5f5
        .info
          font-size 14px;
          padding 0 10px
          height:50px;
          line-height: 50px;

</style>
